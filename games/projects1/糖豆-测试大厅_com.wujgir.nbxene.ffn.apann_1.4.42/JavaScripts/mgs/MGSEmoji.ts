/*
 * @Author: zhenhaung.luo  zhenhuang.luo@appshahe.com
 * @Date: 2023-02-23 11:26:41
 * @LastEditors: zhenhuang.luo  zhenhuang.luo@appshahe.com
 * @LastEditTime: 2023-02-23 18:09:36
 * @FilePath: \stumbleguys\JavaScripts\mgs\MGSEmoji.ts
 * @Descripttion: 
 */
import { MGSBase } from "./MGSBase";

export class MGSEmoji extends MGSBase {
    /**
     * 表情和动作埋点
     * @param step 
     */
    public emojiType(area_id: number) {
        this.reportLog("ts_action_do", "关卡内播放表情和动作", { area_id: area_id })
    }

    /**
 * 发送快捷对话id埋点
 */
    tsBtnClickWordid(scene_id: string) {
        this.reportLog("ts_action_click", "发送快捷对话ID", { scene_id: scene_id });
    }
}