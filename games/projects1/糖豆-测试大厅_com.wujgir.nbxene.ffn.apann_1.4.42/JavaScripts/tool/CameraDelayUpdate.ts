import { GameConfig } from "../config/GameConfig";

/** 
 * @Author       : yuanqi.bai
 * @Date         : 2023-06-11 13:08:02
 * @LastEditors  : bao.zhang bao.zhang@appshahe.com
 * @LastEditTime : 2023-07-23 16:51:43
 * @FilePath     : \stumbleguys\JavaScripts\tool\CameraDelayUpdate.ts
 * @Description  : 修改描述
 */
if (SystemUtil.isClient) {
    Event.addLocalListener("CAMERA_DELAY_UPDATE", (open: boolean) => {
        CameraDelayUpdate.openCameraDelayUpdate(open);
    });
}
const delaySpeed: number = GameConfig.Swoop.getElement(16).Value;
const CameraLagMaxDistance: number = GameConfig.Swoop.getElement(17).Value;
class CameraDelayUpdate {
    public static openCameraDelayUpdate(open: boolean) {
        let camera = Camera.currentCamera;
        camera.positionLagSpeed = delaySpeed;
        camera["ueCamera"].CameraSystemComponent.CameraSetting.LocationSettings.CameraLocationLagSettings.CameraLagMaxDistance = CameraLagMaxDistance
        camera.positionLagEnabled = open;
    }
}