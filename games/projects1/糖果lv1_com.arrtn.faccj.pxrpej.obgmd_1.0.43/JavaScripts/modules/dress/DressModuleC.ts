import { PlayerManagerExtesion } from '../../Modified027Editor/ModifiedPlayer';
/** 
* @Author       : zhenhaung.luo  zhenhuang.luo@appshahe.com
* @Date         : 2023-03-02 10:28:38
* @LastEditors  : weihao.xu
* @LastEditTime : 2023-08-20 11:10:12
* @FilePath     : \stumbleguys\JavaScripts\modules\dress\DressModuleC.ts
* @Descripttion : 
*/
import { GameConfig } from "../../config/GameConfig";
import { Singleton } from "../../tool/Singleton";
import ProcessModuleC, { PlayerDressInfo } from "../ProcessModule/ProcessModuleC";
import { DressData } from "./DressData";
import { DressModuleS } from "./DressModuleS";
import { Enums } from "./Enums";
import ItemObj from "./ItemObj";
import { ScriptManager } from "./ScriptManager";

export type DecorateTrans = { location: Vector, rotation: Rotation }

/** 装扮模块客户端 */
export class DressModuleC extends ModuleC<DressModuleS, DressData> {
    appearance: CharacterDescription;

    onStart() {
        ModuleService.getModule(ProcessModuleC).getPlayerDressInfo().then((data: PlayerDressInfo) => {
            let inter = setInterval(async () => {
                const itemObj = Singleton.getIns(ScriptManager).getScriptOnPlayer(Player.localPlayer.playerId, ItemObj);
                if (itemObj) {

                    clearInterval(inter);
                    if (data && data.garnitureId) itemObj.clientSetDecorateId(data.garnitureId);
                    if (data && data.title) itemObj.clientSetTitle(data.title);
                    if (data && data.skinId) itemObj.clientSetSkin(data.skinId);
                }
            }, 100);

            Player.asyncGetLocalPlayer().then(player => {
                player.character.asyncReady().then(char => {
                    this.appearance = char.description;
                    let appinter = setInterval(() => {
                        if (this.appearance != undefined) {
                            clearInterval(appinter);
                            AssetUtil.asyncDownloadAsset("154704").then(() => {
                                PlayerManagerExtesion.changeBaseStanceExtesion(player.character, "154704");
                            });
                        } else {
                            this.appearance = char.description;
                        }
                    }, 100)
                })
            })
        });
    }

    /**获取挂件transform数据 */
    getDecorateData(id: number, isLeft: boolean) {
        let config = GameConfig.Item.getElement(id)
        if (config.type == Enums.EquipDressType.hand) {
            if (isLeft) {
                return { location: config.location, rotation: new Rotation(config.rotation.x, config.rotation.y, config.rotation.z) }
            } else {
                return { location: new Vector(config.location.x, -config.location.y, config.location.z), rotation: new Rotation(config.rotationR.x, config.rotationR.y, config.rotationR.z) }
            }
        } else {
            return { location: config.location, rotation: new Rotation(config.rotation.x, config.rotation.y, config.rotation.z) }
        }
    }

    /**
     * 获取玩家穿戴的装扮
     * @returns 已经穿戴的装扮
     */
    public getAllCloth(): number[] {
        return DataCenterC.getData(DressData).getAllCloth();
    }

    /**
    * 获取玩家使用的表情
    * @returns 已经穿戴的装扮
     */
    public getAllEmotes(): number[] {
        return DataCenterC.getData(DressData).getAllEmotes();
    }
}
