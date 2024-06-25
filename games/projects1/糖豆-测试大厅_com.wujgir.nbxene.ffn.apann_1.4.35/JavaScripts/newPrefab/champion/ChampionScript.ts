/** 
 * @Author       : weihao.xu
 * @Date         : 2023-12-13 09:40:16
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2024-01-08 11:17:04
 * @FilePath     : \stumbleguys_new\JavaScripts\newPrefab\champion\ChampionScript.ts
 * @Description  : 修改描述
 */
import { CountDownUI } from "../../modules/ProcessModule/UI/CountDownUI";
import GameUI from "../../modules/ProcessModule/UI/GameUI";
import { BGMHelper } from "../../tool/BGMScript";
import TransitionUI from "../../TransitionUI";
import { ChampionShow } from "./ChampionShow";

@Component
export default class ChampionScript extends Script {
    private championShow: ChampionShow;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        AssetUtil.asyncDownloadAsset("178179");
        AssetUtil.asyncDownloadAsset("178369");
        AssetUtil.asyncDownloadAsset("121410");
        AssetUtil.asyncDownloadAsset("122432");
        AssetUtil.asyncDownloadAsset("122561");
        AssetUtil.asyncDownloadAsset("156811");
        AssetUtil.asyncDownloadAsset("286362");
        AssetUtil.asyncDownloadAsset("286363");
        this.championShow = new ChampionShow();
        InputUtil.onKeyDown(Keys.P, () => {
            this.championShow.init(this.gameObject, "156363", "xxxxxx")
            mw.UIService.show(TransitionUI, () => {
                this.useUpdate = true;
                this.championShow.start();
            })
        })
        let isNoChampion = false;
        Event.addLocalListener("CHAMPION_INIT", (name: string, skin: string) => {
            if (name === "") {
                isNoChampion = true;
                return;
            }
            this.championShow.init(this.gameObject, skin, name)
        });
        Event.addLocalListener("CHAMPION_SHOW", () => {
            if (isNoChampion) {
                // 没冠军，直接进结算
                Event.dispatchToLocal("LEVEL_SETTLE");
            } else {
                UIService.hide(GameUI);
                UIService.hide(CountDownUI);
                BGMHelper.stopBGM();
                mw.UIService.show(TransitionUI, () => {
                    this.useUpdate = true;
                    this.championShow.start();
                })
            }
        });

    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        this.championShow && this.championShow.onUpdate(dt);
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}