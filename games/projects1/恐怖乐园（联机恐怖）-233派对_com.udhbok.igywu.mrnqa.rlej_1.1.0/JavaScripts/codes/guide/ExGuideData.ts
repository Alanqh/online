/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-05-19 14:09:31
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-05-21 13:13:04
 * @FilePath     : \1001_hall\JavaScripts\codes\guide\ExGuideData.ts
 * @Description  : 
 */
import { GamesStartDefines } from "../Defines";

export default class ExGuideData extends Subdata {

    @Decorator.persistence()
    guideStage: number = 0
    /**完成引导当天的时间戳 */
    @Decorator.persistence()
    completeTimeStamp: string = null;

    protected onDataInit(): void {
        if (GamesStartDefines.isJumpGuide) {
            this.guideStage = 6;
        }

        if (!this.currentVersion) {
            this.currentVersion = 1;
        }
        while (this.currentVersion != this.version) {
            switch (this.currentVersion) {
                case 1:
                    this.currentVersion = 3;
                    if (this.guideStage > 0) { this.guideStage = 6; this.completeTimeStamp = "canPop"; }
                    break;
                case 3:
                    this.currentVersion = 4;
                    if (this.guideStage > 0) {
                        this.guideStage = 6; this.completeTimeStamp = "canPop";
                    }
                    break;
                default:
                    console.error("未处理的数据版本", this.currentVersion);
                    this.currentVersion = this.version;
                    break;
            }
            this.save(false);
        }
    }


    protected get version(): number {
        return 4
    }
}