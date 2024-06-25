import { GameConfig } from "../../config/GameConfig";
import { IItemElement } from "../../config/Item";
import { GlobalData } from "../../const/GlobalData";
import { GameMode } from "../../const/enum";
import { utils } from "../../utils/uitls";
import TimeModuleC from "../Time/TimeModuleC";
import TimeModuleS from "../Time/TimeModuleS";
import FindModuleC from "./FindModuleC";

export class PropInfo_S {
    /**该道具在服务端唯一标识 */
    propKey: number;
    /**道具生成位置 */
    propPosId: number;
    /**道具配置 */
    propId: number;
}

export default class FindModuleS extends ModuleS<FindModuleC, null> {

    /**模式-生成点位置map */
    modePosMap: Map<number, number[]> = new Map();
    /**模式-道具map */
    modePropMap: Map<number, IItemElement[]> = new Map();

    /**S端道具信息列表 */
    propInfoList: PropInfo_S[] = [];

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        this.initModePosMap();
        ModuleService.getModule(TimeModuleS).onDayStart.add(this.initDayScene.bind(this));
        console.log("FindModuleS onStart");
    }

    /**初始化各个模式的生成点列表 */
    initModePosMap() {
        let confLs = GameConfig.ItemPoint.getAllElement();
        confLs.forEach(conf => {
            let posList = this.modePosMap.get(conf.GameMode)
            if (posList == null) {
                posList = [];
                this.modePosMap.set(conf.GameMode, posList);
            }
            posList.push(conf.id);
        })
    }

    /**初始化白天场景的可破坏物和道具 */
    private async initDayScene() {
        // console.error("通知客户端生成道具");
        this.getAllClient().net_spawnProps();
    }


    /**重新生成道具 */
    public reSpawnProps(playerId: number) {
        this.getClient(playerId).net_spawnProps();
    }

    /**生成S端道具 */
    public async spawnAllProp_S(mode: GameMode) {
        let posList = this.modePosMap.get(mode);
        utils.shuffleArray(posList);
        let propConfList = this.modePropMap.get(mode);
        this.propInfoList = [];
        let keyOffset = 10000;
        let generKey = 0 + keyOffset;
        for (let i = 0; i < propConfList.length; i++) {
            const propConf = propConfList[i];
            for (let j = 0; j < propConf.CreateNum; j++) {
                let propInfo = new PropInfo_S();
                propInfo.propKey = generKey;
                propInfo.propPosId = posList[i];
                propInfo.propId = propConf.id;
                this.propInfoList.push(propInfo);
                generKey++;
            }
        }
        this.getAllClient().net_spawnAllProp_S(this.propInfoList);
    }


    // ------------------------ net方法 ------------------------
    /**
     * 回收道具
     * @param propKey 道具key
     * @returns 拾取道具是否成功
     */
    public net_despawnProp(propKey: number): boolean {
        this.getAllClient().net_despawnProp(propKey);

        let index = this.propInfoList.findIndex(prop => prop.propKey == propKey);
        if (index != -1) {
            this.propInfoList.splice(index, 1);
        }
        return index != -1;
    }
}