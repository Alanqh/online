/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-02-28 11:54:31
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-10-20 15:17:59
 * @FilePath     : \stumbleguys\JavaScripts\modules\gm\ui\GMBasePanelUI.ts
 * @Description  : 修改描述
 */
import { AddGMCommand, GMBasePanel } from "module_gm";
import peifuTest from "../../../UI/peifuTest";
import ProcessModuleC from "../../ProcessModule/ProcessModuleC";
import GMHUD from "./GMHUD";
import GMItem from "./GMItem";
AddGMCommand("打开纯净模式", () => {
    Event.dispatchToLocal("PLAYERNAME_VISIBLE", false);
    mw.UIService.canvas.renderOpacity = 0;
}, null, "");
AddGMCommand("关闭纯净模式", () => {
    Event.dispatchToLocal("PLAYERNAME_VISIBLE", true);
    mw.UIService.canvas.renderOpacity = 1;
}, null, "", mw.Keys.E);

// AddGMCommand("摇杆, 1-显示，0-隐藏", (player: mw.Player, value: string) => {
//     if (value == "1") {
//         mw.UIService.getUI(PlayerControllerUI).showUI();
//     }
//     else if (value == "0") {
//         mw.UIService.getUI(PlayerControllerUI).hideUI();
//     }
// });
AddGMCommand("飞扑参数, 1-显示，0-隐藏", (player: mw.Player, value: string) => {
    if (value == "1") {
        mw.UIService.show(peifuTest);
    }
    else if (value == "0") {
        mw.UIService.hide(peifuTest);
    }
});
AddGMCommand("摄像相对位置 x,y,z", (player: mw.Player, value: string) => {
    let arr = value.split(',');
    if (arr.length === 3) {
        let x = Number(arr[0]);
        let y = Number(arr[1]);
        let z = Number(arr[2]);
        if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
            let camera = Camera.currentCamera;
            let transform = camera.localTransform.clone();
            transform.position.x = x;
            transform.position.y = y;
            transform.position.z = z;
            camera.localTransform = transform;
        }
    }
});

AddGMCommand("摄像相对旋转 x,y,z", (player: mw.Player, value: string) => {
    let arr = value.split(',');
    if (arr.length === 3) {
        let x = Number(arr[0]);
        let y = Number(arr[1]);
        let z = Number(arr[2]);
        if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
            let camera = Camera.currentCamera;
            let transform = camera.localTransform.clone();
            transform.rotation.x = x;
            transform.rotation.y = y;
            transform.rotation.z = z;
            camera.localTransform = transform;
        }
    }
});

AddGMCommand("摄像臂长", (player: mw.Player, value: string) => {
    if (!isNaN(Number(value))) {
        let camera = Camera.currentCamera;
        camera.springArm.length = Number(value);
    }
});

AddGMCommand("切换飞行模式", (player: mw.Player) => {
    player.character.switchToFlying();
    player.character.maxFlySpeed = 3000;
});

AddGMCommand("切换走路模式", (player: mw.Player) => {
    player.character.switchToWalking();
});

AddGMCommand("升高位置(需要先飞)", (player: mw.Player) => {
    player.character.addMovement(new Vector(0, 0, 300));
});


AddGMCommand("相机聚焦", () => {
    ModuleService.getModule(ProcessModuleC).setObjCloseUp(true, null, 0, -100, 250);
})

AddGMCommand("相机离开", () => {
    ModuleService.getModule(ProcessModuleC).setObjCloseUp(false, null);
})

AddGMCommand("显示版本号", () => {
    Event.dispatchToLocal("ShowVersion");
})

//主面板
export class GMBasePanelUI extends GMBasePanel<GMHUD, GMItem> {
    constructor() {
        super(GMHUD, GMItem);
    }
}
