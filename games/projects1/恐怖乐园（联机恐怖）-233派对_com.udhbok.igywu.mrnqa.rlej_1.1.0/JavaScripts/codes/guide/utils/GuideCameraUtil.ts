/*
 * @Author       : enyu.liu enyu.liu@appshahe.com
 * @Date         : 2024-05-16 17:24:17
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-05-19 17:43:03
 * @FilePath     : \1001_hall\JavaScripts\codes\guide\utils\GuideCameraUtil.ts
 * @Description  : 
 */

import { GlobalDefine } from "../../../DefNoSubModule";
import { GameDefines } from "../../CehuaDefines";


type CameraPreset = {
    cameraRelPos: Vector;
    cameraRelRot: Rotation;
    fov: number;
    cameraArmRelPos: Vector;
    cameraArmRelRot: Rotation;
    armLength: number;
    upAngle: number;
    downAngle: number;
}

const FirstPersonPreset: CameraPreset = {
    cameraRelPos: Vector.zero,
    cameraRelRot: Rotation.zero,
    fov: 90,
    cameraArmRelPos: Vector.zero,
    cameraArmRelRot: Rotation.zero,
    armLength: 0,
    upAngle: 60,
    downAngle: 40
}

const ThirdPersonPreset: CameraPreset = {
    cameraRelPos: new Vector(0, 0, 3),
    cameraRelRot: Rotation.zero,
    fov: 100,
    cameraArmRelPos: new Vector(0, 0, 30),
    cameraArmRelRot: Rotation.zero,
    armLength: 300,
    upAngle: 60,
    downAngle: 40
}

export class GuideCameraUtil {

    static get thirdPersonPreset() {
        return ThirdPersonPreset;
    }

    static switchToFirstPerson(onFinished: () => void) {
        console.log("switchToFirstPerson")
        const cameraPos = Camera.currentCamera.worldTransform.position;
        const fov = ThirdPersonPreset.fov;
        const targetFov = FirstPersonPreset.fov;
        const targetPos = Player.localPlayer.character.getSlotWorldPosition(HumanoidSlotType.Eyes);
        let tween = new Tween({ pos: cameraPos.clone(), fov: fov }).to({ pos: targetPos, fov: targetFov }, 3000).easing(TweenUtil.Easing.Quadratic.InOut)
            .onUpdate((p) => {
                Camera.currentCamera.worldTransform.position = p.pos;
                Camera.currentCamera.fov = p.fov;
            })
            .onComplete(() => {
                GameDefines.isThirdPerson = false;
                GlobalDefine.isThirdPerson = false;
                Camera.currentCamera.preset = CameraPreset.FirstPerson;
                console.log("switchToFirstPerson complete")
                onFinished && onFinished();

            })
            .start();
    }
    static switchToThirdPerson(onFinished: () => void) {
        console.log("switchToThirdPerson")

        const cameraPos = Camera.currentCamera.worldTransform.position;
        const fov = FirstPersonPreset.fov;
        const targetFov = ThirdPersonPreset.fov;
        // 计算targetPos, 玩家的世界坐标加上弹簧臂的相对坐标加上弹簧臂长度加上摄像机的相对坐标
        const pos1 = ThirdPersonPreset.cameraArmRelPos;
        const pos2 = ThirdPersonPreset.cameraRelPos;
        let relPos = Vector.zero.add(new Vector(pos1.x, pos1.y, 0)).add(new Vector(pos2.x, pos2.y, 0)).add(Vector.back.multiply(ThirdPersonPreset.armLength));
        console.log("rotation", Player.localPlayer.character.worldTransform.rotation)
        relPos = Camera.currentCamera.worldTransform.rotation.clone().rotateVector(relPos);
        const targetPos = Player.localPlayer.character.worldTransform.position.add(relPos).add(new Vector(0, 0, pos1.z + pos2.z));
        let tween = new Tween({ pos: cameraPos.clone(), fov: fov }).to({ pos: targetPos, fov: targetFov }, 3000).easing(TweenUtil.Easing.Quadratic.InOut)
            .onUpdate((p) => {
                Camera.currentCamera.worldTransform.position = p.pos;
                Camera.currentCamera.fov = p.fov;
            })
            .onComplete(() => {
                GameDefines.isThirdPerson = true;
                GlobalDefine.isThirdPerson = true;
                Camera.currentCamera.preset = CameraPreset.ThirdPerson;
                Camera.currentCamera.springArm.length = ThirdPersonPreset.armLength;
                Camera.currentCamera.worldTransform.rotation = Player.localPlayer.character.worldTransform.rotation;
                Camera.currentCamera.localTransform.position = ThirdPersonPreset.cameraRelPos;
                Camera.currentCamera.localTransform.rotation = ThirdPersonPreset.cameraRelRot
                console.log("switchToThirdPerson complete", Camera.currentCamera.worldTransform.rotation);
                onFinished && onFinished();
            })
            .start();
    }
}