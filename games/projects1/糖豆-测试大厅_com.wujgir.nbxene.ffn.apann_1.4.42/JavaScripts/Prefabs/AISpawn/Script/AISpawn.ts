import { GameConfig } from "../../../../JavaScripts/config/GameConfig";
import { Utils } from "../../../../JavaScripts/tool/Utils";
import { CLAI } from "../../../AI/client/ClientAIService";
import { PlayerManagerExtesion } from '../../../Modified027Editor/ModifiedPlayer';
import { SpawnManager } from '../../../Modified027Editor/ModifiedSpawn';
import { PlayerHudUI } from "../../../UI/PlayerHudUI";

type AIData = { name: string, skinId: number, garnitureId: number[], seat: number, teamId: string };
const TEMP_ROTATION = new mw.Rotation();
@Component
export default class AISpawn extends mw.Script {

    @mw.Property({ displayName: "终点" })
    private dist: mw.Vector = new mw.Vector();

    @mw.Property({ hideInEditor: true, replicated: true, onChanged: "onAICreated" })
    private guids: string = "";

    private guidList: string[] = [];
    /**生成间隔 */
    private interval: number = 0.15;
    private _interval: number = 0;
    /**当前索引 */
    private currentIndex: number = 0;
    private aiCount: number = 0;
    @mw.Property({ displayName: "全场最大AI数量" })
    private maxAiCount: number = 20;
    private aiDataCache: AIData[] = [];
    private aiCache: Character[] = [];
    private _tempTransfrom: Transform = new Transform();

    private aiHuds: PlayerHudUI[] = [];
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.gameObject.setVisibility(mw.PropertyStatus.Off);
        CLAI.birth(this.dist, this.gameObject.worldTransform.rotation);
        // AssetUtil.asyncDownloadAsset("NPC").then(() => {
        //     this.useUpdate = true;
        // });
        // this.useUpdate = SystemUtil.isClient();
        // if (SystemUtil.isServer()) {
        //     Event.addLocalListener("GameState.Join.Server", (aiList: AIData[], teamId: string) => {
        //         for (const aiData of aiList) {
        //             aiData.teamId = teamId;
        //             this.aiDataCache.push(aiData);
        //         }
        //     });
        //     Event.addLocalListener("AI.Eliminate.Server", (character: Character) => {
        //         const aiConfigIndex = this.guidList.findIndex(i => i.startsWith(character.guid));
        //         if (aiConfigIndex >= 0) {
        //             const guids = this.guidList[aiConfigIndex].split("|");
        //             guids[3] = "";
        //             this.guidList[aiConfigIndex] = guids.join("|");
        //         }
        //         this.guids = this.guidList.join(",");
        //     });

        //     Event.addLocalListener("AI.Recycle.Server", (character: Character) => {
        //         const index = this.aiCache.indexOf(character);
        //         if (index >= 0) {
        //             //删除当前NPC
        //             this.aiCache.splice(index, 1);
        //             //将当前NPC插入到下一个使用位置
        //             this.aiCache.splice(this.currentIndex, 0, character);
        //         } else {
        //             this.aiCache.push(character);
        //         }
        //     });

        // }
    }
    /**
     * 客户端调用，ai更新时同步
     */
    private onAICreated() {
        const guidList = this.guids.split(",");
        for (let i = 0; i < guidList.length; i++) {
            const guids = guidList[i].split("|");
            if (!this.guidList.includes(guidList[i])) {
                const spliceIndex = this.guidList.findIndex(i => i.startsWith(guids[0]));
                if (spliceIndex >= 0) {
                    //删除对应数组
                    this.guidList.splice(spliceIndex, 1);
                }
                this.guidList.push(guidList[i]);
                this.skin(guids[0], parseInt(guids[1]), parseInt(guids[2]), guids[3]);
            }
        }
    }

    private async skin(guid: string, skinId: number, garnitureId: number, teamId: string) {
        const player = await Player.asyncGetLocalPlayer();
        const character = await GameObject.asyncFindGameObjectById(guid) as Character;
        if (character == null) {
            console.error("找不到对应guid的物体", guid);
            return;
        }
        if (player.teleportId == teamId) {
            //装扮角色外观，同组人员
            await this.changeSkin(skinId, character);
            //没有装扮过，初始化装扮
            character.setVisibility(mw.PropertyStatus.On);
            const cfg = GameConfig.Item.getElement(garnitureId);
            character["garnitureId"] = garnitureId;
            character["tailCache"] = await Utils.garniture(character, cfg.resGUID.toString(), cfg.location, TEMP_ROTATION.set(cfg.rotation.x, cfg.rotation.y, cfg.rotation.z));
        } else {
            character.setVisibility(mw.PropertyStatus.Off);
            //这里需要把AI从观战列表移除
            Event.dispatchToLocal("AI.Eliminate.Client", character.gameObjectId);
        }
    }

    private async changeSkin(skinId: number, character: Character) {
        if (character["skinId"] == skinId) return;
        const cfg = GameConfig.Item.getElement(skinId);
        if (!cfg) {
            console.log("_________________TypeErrorAIDress", skinId);
            return;
        }
        await character.asyncReady();
        // if (character.characterType == mw.AppearanceType.HumanoidV2) {
        //     await character.appearanceReady();
        //     character.characterType = mw.AppearanceType.HumanoidV1;
        // }
        character["skinId"] = skinId;
        setTimeout(() => {
            character.description.base.wholeBody = cfg.resGUID;
        }, 1000);
        AssetUtil.asyncDownloadAsset("154704").then(() => {
            PlayerManagerExtesion.changeBaseStanceExtesion(character, "154704");
        });

        let hud: PlayerHudUI = this.aiHuds.find(i => i.character == character)
        if (!hud) {
            hud = new PlayerHudUI(character, false, "");
            this.aiHuds.push(hud);
        }
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if (this.isRunningClient()) {

            this.aiHuds.forEach(hud => {
                hud.onUpdate(dt);
            });
        } else {
            if (this.aiDataCache.length > 0) {
                if (this._interval <= 0) {
                    this._interval = this.interval;
                    const aiData = this.aiDataCache.shift();
                    let isReuse = false;
                    if (this.aiCount < this.maxAiCount) {
                        //
                        this.createAI(aiData);
                        this.aiCount++;
                    } else {
                        this.createAI(aiData, this.aiCache[this.currentIndex]);
                        this.currentIndex++;
                        isReuse = true;
                        if (this.currentIndex == this.maxAiCount) {
                            this.currentIndex = 0;
                        }
                    }
                    if (isReuse || this.aiDataCache.length == 0) {
                        //刷新完后一次性同步
                        this.guids = this.guidList.join(",");
                    }
                }
                this._interval -= dt;
            }
        }

    }

    /**创建AI */
    private createAI(data: AIData, cache?: Character) {
        const cfg = GameConfig.GameInfo.getElement(1);
        let dressData = GameConfig.Item.getElement(data.skinId);
        const seat = data.seat;
        this._tempTransfrom.position = cfg.spawns[seat] ? cfg.spawns[seat] : cfg.spawns[0];
        this._tempTransfrom.rotation = this.gameObject.worldTransform.rotation;
        let character: Character = null;
        if (cache) {
            character = cache;
            character.movementEnabled = true;
        } else {
            character = SpawnManager.spawn({ guid: "NPC", replicates: true, transform: this._tempTransfrom });
            // character.characterType = mw.AppearanceType.HumanoidV1;
            PlayerManagerExtesion.changeBaseStanceExtesion(character, "154704");
            setTimeout(() => {
                character.description.base.wholeBody = (dressData ? dressData.resGUID : "151886");
            }, 2000);
        }
        if (cache) {
            //被复用的AI对象
            if (cache["ai"]) {
                cache["ai"].stop();
            }

            Event.dispatchToLocal("AI.Reuse.Server", cache);
            const setIndex = this.guidList.findIndex(i => i.startsWith(cache.gameObjectId));
            if (setIndex >= 0) {
                this.guidList.splice(setIndex, 1, `${character.gameObjectId}|${data.skinId}|${data.garnitureId}|${data.teamId}`);
            }

            character.worldTransform.position = cfg.spawns[seat];
            character.worldTransform.rotation = this.gameObject.worldTransform.rotation;
        } else {
            //新的AI对象
            this.aiCache.push(character);
            this.guidList.push(`${character.gameObjectId}|${data.skinId}|${data.garnitureId}|${data.teamId}`);
            character.forceUpdateMovement = true;
        }
        character["teamId"] = data.teamId;
        character.displayName = data.name;

        Event.dispatchToLocal("AI.Created.Server", character, this.dist, data);
    }

}

