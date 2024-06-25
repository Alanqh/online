import { Camera } from "../../CameraRuntime/Script/Camera";

/** 
 * @Author       : yuanqi.bai
 * @Date         : 2023-02-09 13:45:03
 * @LastEditors  : chenxinyu
 * @LastEditTime : 2023-07-23 18:27:50
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\GameStater\Script\StartCamera.ts
 * @Description  : 相机参数
 */
const ViewScene: string = "GameState.Overlook.Client";
const ReadyStart: string = "GameState.CountDown.Client";
@Component
export default class StartCamera extends mw.Script {
    @mw.Property({ displayName: "相机参数" })
    private _cameraData: string = "0,-3341.60,8546.89,117.46,0.00,-1.80,169.78,1.16,-5101.41,8193.62,65.00,0.00,-1.80,169.78";
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        Event.addLocalListener(ViewScene, () => {
            Camera.simplePlay(this._cameraData);
        });
        Event.addLocalListener(ReadyStart, () => {
            Camera.getPlayer().destroy();
        });


        InputUtil.onKeyDown(mw.Keys.L, () => {
            Event.dispatchToLocal(ViewScene);
        });
    }

}
