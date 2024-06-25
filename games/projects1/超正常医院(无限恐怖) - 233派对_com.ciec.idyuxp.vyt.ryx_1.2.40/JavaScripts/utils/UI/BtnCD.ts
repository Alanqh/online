import { GlobalData } from "../../const/GlobalData";
import { EPlayerState } from "../../const/enum";
import { Singleton } from "../uitls";


@Singleton()
export class BtnCD {

    /**所有技能cd key:skillID value:冷却时间*/
    private lastUseTimeStamp: Map<number, number> = new Map();

    public static instance: BtnCD;

    constructor() {

    }

    /**
     * 注册skillID释放时间
     */
    public registerSkillUsed(skillID: number) {
        this.lastUseTimeStamp.set(skillID, Date.now());
    }

    /**
     * 获取上次使用Skill的时间戳(ms)
     */
    public getRegisteredSkillLastUseTime(skillID: number): number {
        if (!this.lastUseTimeStamp.has(skillID)) return 0;
        return this.lastUseTimeStamp.get(skillID);
    }
 
    /**
     * 是否在cd中
     */
    public getIsInCD(skillID: number, cd: number): [boolean,number] {
        let lastUseTime = this.getRegisteredSkillLastUseTime(skillID);
        let time = Date.now() - lastUseTime;
        let intervalTime = time - cd * 1000;
        if (intervalTime < 0) {
            // console.log("cd中",Math.abs(time / 1000));
            return [true , Math.abs(time / 1000)];
        } else {
            // console.log("cd结束");
            return [false , 0];;
        }
    }
 
}