
import { GameConfig } from "../../config/GameConfig";
import { PlayerModuleData } from "../Player/PlayerModuleData";
import { ShareModuleS } from "../Share/ShareModule";
import TeamS from "../Team/TeamS";
import { DressUpItemData, DressUpTab1, DressUpTab2 } from "./DressData";
import { DressScript } from "./DressScript";
import DressUpModuleC from "./DressUpModuleC";
import DressUpModuleData from "./DressUpModuleData";


export default class DressUpModuleS extends ModuleS<DressUpModuleC, DressUpModuleData> {

    private playerDressMap: Map<number, DressScript> = new Map();

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    protected onPlayerEnterGame(player: mw.Player): void {
        let curPlayer = player;
        if (this.playerDressMap.has(curPlayer.playerId)) {
            return;
        }
        let dressScript = curPlayer.character.addComponent(DressScript);
        // 初始化换装脚本
        dressScript.init(curPlayer.playerId).then(() => {
            this.playerDressMap.set(curPlayer.playerId, dressScript);

            let data = this.getPlayerData(curPlayer);
            let arr = [];
            Object.values(DressUpTab2).filter(v => !Number.isNaN(Number(v))).forEach((v) => {
                let type = v as DressUpTab2;
                let item = data.getCurDressByTab2(type)
                arr.push(item ? item.id : null);
            });
            dressScript.updateDress(arr);
        })

    }

    protected onPlayerLeft(player: mw.Player): void {
        try {
            let dressScript = this.playerDressMap.get(player.playerId);
            if (dressScript) {
                dressScript.updateDress([]);
                dressScript = null;
                this.playerDressMap.delete(player.playerId);
            }
        } catch (error) {
        }
    }

    // 
    net_UpdateDress(arr: number[]) {

        // arr.forEach((v) => {
        //     console.warn(`lwj v = ${v}`);
        // })
        let script = this.playerDressMap.get(this.currentPlayerId);
        if (script) {
            script.updateDress(arr);
        }
        Object.values(DressUpTab2).filter(v => !Number.isNaN(Number(v))).forEach((v, index) => {
            let type = v as DressUpTab2;
            let id = arr[index] ?? -1;
            this.currentData.setDressEquip(id, type);
        });
        this.currentData.save(true);
    }


    /**添加一个装扮 */
    public addDress(playerId: number, dressData: DressUpItemData) {
        let data = this.getPlayerData(playerId);
        let has = data.getDressById(dressData.id);
        if (has) {
            // TODO 转换成异常币
            let dressConf = GameConfig.Dress.getElement(has.id);
            let coin = dressConf.transNum;
            ModuleService.getModule(TeamS).addGameCoin(coin, playerId);
            console.warn(`装扮重复:${dressConf.Name},转换成${dressConf.transNum}代币`);
        }
        data.addDress(dressData);
        data.save(true);
        data.onDressChange.call()
        console.warn(`添加装扮: ${JSON.stringify(dressData)}`);
        return has;
    }


    /**添加多个装扮 */
    public addDressList(playerId: number, dressList: DressUpItemData[]): number[] {
        let data = this.getPlayerData(playerId);
        let repeatList: number[] = [];
        dressList.forEach(dressData => {
            let has = data.getDressById(dressData.id)
            if (has) {
                // 转换成异常币
                repeatList.push(has.id);
                let dressConf = GameConfig.Dress.getElement(has.id);
                let coin = dressConf.transNum;
                ModuleService.getModule(TeamS).addGameCoin(coin, playerId);
                console.warn(`装扮重复:${dressConf.Name},转换成${dressConf.transNum}代币`);
            }
            data.addDress(dressData);
        })
        data.save(true);
        data.onDressChange.call();
        return repeatList;
    }


    public net_showLog() {
        console.log(`${JSON.stringify(this.currentData.node1DataList)}`);
    }

    public net_AddDress(dressData: DressUpItemData) {
        this.addDress(this.currentPlayerId, dressData);
    }

}