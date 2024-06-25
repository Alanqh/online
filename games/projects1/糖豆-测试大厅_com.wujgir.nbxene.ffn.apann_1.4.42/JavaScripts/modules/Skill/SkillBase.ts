import { GameConfig } from "../../config/GameConfig";
import { ISkillElement } from "../../config/Skill";

/** 
 * @Author       : weihao.xu
 * @Date         : 2023-11-20 14:35:42
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-11-21 10:53:07
 * @FilePath     : \stumbleguys_new\JavaScripts\modules\Skill\SkillBase.ts
 * @Description  : 修改描述
 */
export abstract class SkillBase {
    public skillConfig: ISkillElement;
    public character: Character;
    constructor(public skillId: number) {
        this.skillConfig = GameConfig.Skill.getElement(this.skillId);
        this.character = Player.localPlayer.character;
    }

    abstract onSkillInit(): void;

    abstract onSkillStart(): void;

    abstract onSkillEnd(): void;

    abstract onSkillUpdate(dt: number): boolean;
}

