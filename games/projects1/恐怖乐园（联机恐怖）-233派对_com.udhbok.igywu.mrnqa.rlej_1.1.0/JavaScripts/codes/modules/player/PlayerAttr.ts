/*
 * @Author       : dal
 * @Date         : 2024-03-06 17:41:50
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-19 15:34:16
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\player\PlayerAttr.ts
 * @Description  : 
 */

import { DegreeType } from "../blackboard/BoardDefine";

/**  玩家身上的基础属性 */
@Serializable
export class PlayerAttr {

    /** 额外属性字段名列表 */
    public static readonly exList: string[] = ["moveSpeed", "reviveEff", "shiftTime", "changeHp"];

    // -------------------如果是带Property注解的则需要由服务端主动同步---------------------

    /** 经验系数 */
    @Property({ replicated: true })
    public expIndex: number = 1;

    public archiveId: number = -1;

    public curDegree: DegreeType = DegreeType.Simple;

    public set moveSpeed(changeVal: number) {
        Player.localPlayer.character.maxWalkSpeed += changeVal;
    }

    /** 回血效率 */
    public reviveEff: number = 1;

    /** 换弹时间  */
    public shiftTime: number = 0;

    /** 初始化 */
    public init() {
        this.expIndex = 1;
    }
}