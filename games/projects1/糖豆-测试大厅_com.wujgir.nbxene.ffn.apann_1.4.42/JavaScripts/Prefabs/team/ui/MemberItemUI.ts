import MemberItemUI_Generate from "../../../ui-generate/Prefabs/Team/MemberItemUI_generate";
import { Tools } from "../../../utils/Tools";

/** 
 * @Author       : lei.zhao
 * @Date         : 2023-05-05 11:47:34
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-07-04 16:15:11
 * @FilePath     : \stumbleguys\JavaScripts\prefabs\team\ui\MemberItemUI.ts
 * @Description  : 修改描述
 */
export class MemberItemUI extends MemberItemUI_Generate {
    public setPlayerId(characterName: string, playerId: number) {
        this.nameTxt.text = Tools.getUITextAfterOmission(characterName, 18);
    }
}