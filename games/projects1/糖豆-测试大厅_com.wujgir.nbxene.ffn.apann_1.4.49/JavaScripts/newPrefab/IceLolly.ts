import { PlayerManagerExtesion } from '../Modified027Editor/ModifiedPlayer';
import { SpawnManager } from '../Modified027Editor/ModifiedSpawn';
import { GeneralManager } from '../Modified027Editor/ModifiedStaticAPI';
import PlayerCtrlUI from "../playerCtrl/PlayerCtrlUI";
import { PlayerParam } from '../playerCtrl/PlayerParam';
import { Utils } from "../tool/Utils";
import { Tools } from '../utils/Tools';


@Component
export default class IceLolly extends mw.Script {

    @mw.Property({ displayName: "武器Guid" })
    weaponGuid: string = "40832"

    @mw.Property({ displayName: "武器缩放" })
    weaponScale: Vector = new Vector(0.3, 0.3, 0.3);

    @mw.Property({ displayName: "装备位置(挂点右手)" })
    weaponLoc: Vector = new Vector(0, 0, 0);

    @mw.Property({ displayName: "装备旋转" })
    weaponRot: Rotation = new Rotation(0, 0, 0);
    // @mw.Property({ displayName: "使用次数" })
    // time: number = 3

    // @mw.Property({ displayName: "冷却时间" })
    // cd: number = 2

    @mw.Property({ displayName: "动作Guid" })
    animationGuid: string = "20263"

    @mw.Property({ displayName: "动画播放速率" })
    animationRate: number = 1

    @mw.Property({ displayName: "检测触发时间" })
    triggerTime: number = 500

    @mw.Property({ displayName: "冲量大小" })
    impulse: number = 50000

    @mw.Property({ displayName: "检测范围" })
    checkRange: Vector = new Vector(200, 150, 150);



    @mw.Property({ displayName: "装备的玩家", replicated: true, onChanged: "onEquipPlayerChange", hideInEditor: true })
    equipPlayerStr: string = "";
    equipPlayer: number[] = [];

    equipPlayerClient: number[] = [];

    trigger: mw.Trigger;

    currentPlayerId: number = 0;

    private hitBtn: mw.Button;

    weaponMap: Map<number, RodWeapon> = new Map();
    protected onStart(): void {
        if (SystemUtil.isClient()) {
            Utils.downloadAsset("84931")
            Utils.downloadAsset("84931")
            this.trigger = this.gameObject as mw.Trigger;
            this.trigger.onEnter.add((character) => {
                if (character && PlayerManagerExtesion.isCharacter(character) && character.player && character.player.playerId && Player.localPlayer && character.player.playerId === Player.localPlayer.playerId) {
                    if (this.weaponMap.has(character.player.playerId)) return;
                    if (!this.hitBtn) {
                        this.hitBtn = mw.UIService.getUI(PlayerCtrlUI).mHitBtn;
                        let cd = false;
                        this.hitBtn.onClicked.add(() => {
                            if (cd) return;
                            this.attack(character.player.playerId);
                            cd = true;
                            setTimeout(() => {
                                cd = false;
                            }, 1000);
                        })
                    }
                    this.hitBtn.visibility = mw.SlateVisibility.Visible;
                    Event.dispatchToLocal("Hand.Hide", Player.localPlayer.character, PropertyStatus.Off);
                    this.hitBtn.visibility = mw.SlateVisibility.Visible;
                    // ItemService.equipItem(ItemService.HandItemType.IceLolly);
                    this.equipServer(character.player.playerId);
                    Event.dispatchToLocal("PLAY_BY_CFG", 57);
                }
            })
            Player.asyncGetLocalPlayer().then(player => {
                this.currentPlayerId = player.playerId;
            })
            Utils.downloadAsset(this.animationGuid)

            // ItemService.addUseHandler(type => {
            //     if (type === ItemService.HandItemType.IceLolly) {
            //         this.attack(this.currentPlayerId);
            //     }
            // })
            // ItemService.addUnEquipHandler((type) => {
            //     if (type === ItemService.HandItemType.IceLolly) {
            //         this.unEquipServer(this.currentPlayerId);
            //     }
            // })
            Event.addLocalListener("IceLolly.Hit", (playerId: number, dir: Vector) => {
                this.hitServer(playerId, dir);
            })
            Event.addLocalListener("IceLolly.Attack", () => {
                if (this.currentPlayerId) {
                }
            })
        }

        if (SystemUtil.isClient()) {
            Player.onPlayerLeave.add(player => {
                this.unEquipServer(player.playerId);
            })
        }
    }

    equipClient(playerId: number) {
        if (this.weaponMap.has(playerId)) {
            this.unEquipClient(playerId);
        }
        const weapon = new RodWeapon();
        weapon.impulse = this.impulse;
        this.weaponMap.set(playerId, weapon);
        Utils.downloadAsset(this.weaponGuid).then(() => {
            weapon.equip(playerId, this.weaponGuid, this.weaponLoc, this.weaponScale, this.weaponRot, this.animationGuid, this.animationRate, this.triggerTime, this.checkRange);
        })
    }


    /**
     * 服务端装备
     */
    @RemoteFunction(mw.Server)
    equipServer(playerId: number) {
        if (this.equipPlayer.indexOf(playerId) < 0) {
            this.equipPlayer.push(playerId);
            this.equipPlayerStr = this.equipPlayer.toString();
            // Singleton.getIns(ScriptService).getScriptOnPlayer(playerId, ItemObj).isBubbleGun = false;
            Event.dispatchToClient(Player.getPlayer(playerId), "WaterUseAll");

        }
    }

    onEquipPlayerChange() {
        let cache = [];
        const players: string[] = this.equipPlayerStr.split(",");
        for (let i = 0; i < players.length; i++) {
            const playerId = parseInt(players[i]);
            const index = this.equipPlayerClient.indexOf(playerId)
            if (index < 0) {
                this.equipClient(playerId);
            } else {
                this.equipPlayerClient.splice(index, 1)
            }
            cache.push(playerId);
        }
        for (let i = 0; i < this.equipPlayerClient.length; i++) {
            this.unEquipClient(this.equipPlayerClient[i])
        }
        this.equipPlayerClient = cache;

    }

    unEquipClient(playerId: number) {
        if (this.weaponMap.has(playerId)) {
            this.weaponMap.get(playerId).unEquip();
            this.weaponMap.delete(playerId);
        }
    }
    /**
     * 服务端卸载
     */
    @RemoteFunction(mw.Server)
    unEquipServer(playerId: number) {
        const index = this.equipPlayer.indexOf(playerId)

        if (index > -1) {
            this.equipPlayer.splice(index, 1);
            this.equipPlayerStr = this.equipPlayer.toString();
        }
    }

    @RemoteFunction(mw.Server)
    hitServer(playerId: number, dir: Vector) {
        const player = Player.getPlayer(playerId);
        if (player) {
            GeneralManager.rpcPlayEffectAtLocation("84931", player.character.worldTransform.position)
            this.hitClient(player, dir);
        }
    }

    @RemoteFunction(mw.Client)
    hitClient(player: mw.Player, dir: Vector) {
        player.character.addImpulse(dir.multiply(this.impulse))
        Event.dispatchToLocal("GEAR_EFF_BY_CFG", player.character.gameObjectId, 4, player.character.worldTransform.position);
    }

    /**
     * 攻击
     * @param playerId 
     */
    attack(playerId: number) {
        if (this.weaponMap.has(playerId)) {
            TimeUtil.delayExecute(() => {
                this.playEffect(playerId)
            }, 10)
            this.weaponMap.get(playerId).attack();
        }
    }

    @RemoteFunction(mw.Server)
    playEffect(playerId: number) {
        const player = Player.getPlayer(playerId);
        if (player) {
            GeneralManager.rpcPlayEffectOnPlayer("84931", player, mw.HumanoidSlotType.Root, 1, Vector.zero, Rotation.zero.set(150, 0, 0), Vector.one.multiply(1.2));
        }
    }

    protected onUpdate(dt: number): void {
        // if (this.playerCtrlUI && this.playerCtrlUI.iceLollyBtn.fanShapedValue < 1) {
        //     this.playerCtrlUI.iceLollyBtn.fanShapedValue += this.cd * dt / this.cd;
        //     if (this.playerCtrlUI.iceLollyBtn.fanShapedValue >= 1) {
        //         this.playerCtrlUI.iceLollyBtn.enable = true;
        //     }
        // }
    }


}

/**
 * 棒类武器道具,仅客户端存在
 */

class RodWeapon {

    //武器模型
    weapon: mw.GameObject;
    //使用次数
    // time: number;
    //持有者playerId
    owner: number;
    animationGuid: string;
    animationRate: number;
    guids: string[] = [];
    triggerTime: number = 0;
    checkRange: Vector
    impulse: number = 50000;

    async equip(playerId: number, guid: string, location: Vector, scale: Vector, rotation: Rotation, animationGuid: string, rate: number, triggerTime: number, checkRange: Vector) {
        this.checkRange = checkRange;
        this.owner = playerId;
        // this.time = time;
        this.triggerTime = triggerTime;
        const player = await Tools.getPlayer(playerId);
        if (player) {
            this.weapon = SpawnManager.modifyPoolSpawn(guid);
            if (this.weapon) {
                this.weapon.worldTransform.scale = scale;
                player.character.attachToSlot(this.weapon, mw.HumanoidSlotType.RightHand);
                this.weapon.localTransform.position = location;
                this.weapon.localTransform.rotation = rotation;
            }
            this.animationGuid = animationGuid;
            this.animationRate = rate;
        }
    }

    unEquip() {
        if (this.weapon) {
            GameObjPool.despawn(this.weapon);
            this.weapon = null;
        }
    }

    async attack() {
        const character = Player.localPlayer.character;
        this.guids.length = 0;

        PlayerManagerExtesion.rpcPlayAnimation(character, this.animationGuid, 1, this.animationRate);
        setTimeout(() => {
            this.checkHit();
        }, this.triggerTime);
        // await TimeUtil.delaySecond(0.3);
        // await this.waitAnimation(animation);
        // this.time--;
        // return this.time;
    }

    async waitAnimation(animation: mw.Animation) {
        return new Promise<void>((resolve: () => void) => {
            if (!animation.isPlaying) {
                resolve();
            } else {
                let id = setInterval(() => {
                    if (!animation.isPlaying) {
                        clearInterval(id);
                        resolve();
                    }
                }, 30);
            }
        });
    }


    checkHit() {
        const character = Player.getPlayer(this.owner)?.character;
        if (!character) return;
        const rs = GeneralManager.modiftboxOverlap(character.worldTransform.position, character.worldTransform.getForwardVector().multiply(this.checkRange.x).add(character.worldTransform.position), this.checkRange.y, this.checkRange.z, false, [], false, character);
        for (let i = 0; i < rs.length; i++) {
            const result = rs[i];
            if (PlayerManagerExtesion.isCharacter(result) && result.getVisibility() && this.guids.indexOf(result.gameObjectId) < 0) {
                Event.dispatchToLocal("IceLolly.Hit", result.player.playerId, result.worldTransform.position.subtract(character.worldTransform.position).normalize())
                this.guids.push(result.gameObjectId);
            }
            if (result.tag && result.tag === "mole") {
                Event.dispatchToLocal("MOLE_HIT", result);
                mw.SoundService.playSound(`186455`, 1);
                const location = result.worldTransform.position;
                location.z += 50;
                GeneralManager.rpcPlayEffectAtLocation(`89106`, location, 1, mw.Rotation.zero, new mw.Vector(1, 1, 1));

            }
            else if (result instanceof Character && !result.player) {
                console.log("NPC", result);
                result.groundFrictionEnabled = false;
                result.brakingDecelerationWalking = 750;
                setTimeout(() => {
                    result.brakingDecelerationWalking = PlayerParam.defaultdelSpeed
                }, 3000);
                result.addImpulse(result.worldTransform.position.subtract(character.worldTransform.position).normalize().multiply(this.impulse / 2));
            }
        }
    }


}