import { GameConfig } from "../../../config/GameConfig";
import { GameThemeConfig } from "../../../config/GameTheme";
import { EGameTheme } from "../../Defines";
import GameStart from "../../GameStart";
import { CommonUtils } from "../../utils/CommonUtils";
import { MapEx } from "../../utils/MapEx";
import { ArchiveHelper, ClueSaveData } from "../archive/ArchiveHelper";
import { InterSaveModuleS } from "../inter/InterSaveHelper";
import { PoolScoreHelper } from "./PoolScoreData";
import { ScenePropsData } from "./ScenePropsData";
import { ScenePropsRefreshMgr } from "./ScenePropsRefreshMgr";


export class ScenePropsModuleC extends ModuleC<ScenePropsModuleS, ScenePropsData>{
    private _curDatas: Map<string, GameObject> = new Map();

    /**
     * 获得一组新的道具
     * @param diffcult 难度
     * @returns 获取的道具
     */
    public async asyncGetProps(diffcult: number) {
        return await this.server.net_getProps(diffcult);
    }

    /**
     * 刷新道具
     * @param diffcult 难度
     */
    public async refreshProps(clueItemSet: (go: GameObject, key: string, data: ClueSaveData) => void) {
        let clueMap = await this.server.net_getGraveYardProps();
        this._curDatas.forEach(e => {
            e.destroy();
        })
        this._curDatas.clear();
        MapEx.forEach(clueMap, async (key: string, val: ClueSaveData) => {
            const cfg = GameConfig.Item.getElement(val.assid);
            if (!cfg) {
                console.error("MyTypeError 生成线索物品失败cfg not find\n", val.assid);
                return;
            }

            let go = await GameObject.asyncSpawn(cfg.prefab, { replicates: false });
            if (!go) {
                console.error("MyTypeError 资源生成失败\n资源的id为" + cfg.prefab)
                return;
            }
            if (go) {
                let box = go.getBoundingBoxExtent(true, false);
                let offsetz = Math.max(0, box.z / 2);
                let fallPos = CommonUtils.arr2Vec(val.loc);
                fallPos.z += offsetz;
                go.worldTransform.position = fallPos;
                go.worldTransform.rotation = CommonUtils.arr2Rot(val.rot);
                clueItemSet(go, key, val);
                go.setCollision(CollisionStatus.QueryOnly);
                this._curDatas.set(key, go);
            }
        })
    }
}

export class ScenePropsModuleS extends ModuleS<ScenePropsModuleC, ScenePropsData> {
    protected onStart(): void {
        Event.addLocalListener(InterSaveModuleS.onClueDel, (pid: number, key: string) => {
            let data = this.getPlayerData(pid);
            if (!data) {
                return;
            }
            data.delProp(key);
        })
    }

    public async net_getProps(diffcult: number) {
        const player = this.currentPlayer
        const data = await PoolScoreHelper.getPoolScoreData(player.userId);
        let props = ScenePropsRefreshMgr.instance.refreshSceneProps(diffcult);
        data && props.push(...ScenePropsRefreshMgr.instance.refreshNewProps(data));
        PoolScoreHelper.setPoolScoreData(player.userId, data);
        return props;
    }

    public async net_getGraveYardProps() {
        const player = this.currentPlayer
        const propData = this.getPlayerData(this.currentPlayer);
        const data = await PoolScoreHelper.getPoolScoreData(player.userId);
        let props = propData.getPropsData(data);
        PoolScoreHelper.setPoolScoreData(player.userId, data);
        return props;
    }
}
