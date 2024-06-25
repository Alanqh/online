import { ModifiedCameraSystem, CameraModifid, CameraSystemData, } from '../Modified027Editor/ModifiedCamera';
/**相机信息处理 */
export class CameraManger {

    private static _instance: CameraManger;
    public static get instance() {
        return this._instance || (this._instance = new CameraManger());
    }
    private camera: Camera = null;
    private character: mw.Character = null;
    public data: CameraSystemData = null;

    private _tmpTran: mw.Transform = new mw.Transform();
    private _tmpTran1: mw.Transform = new mw.Transform();
    constructor() {
        this.init();
        TimeUtil.onEnterFrame.add(this.onUpdate, this);
    }

    private init(): void {
        this.character = Player.localPlayer.character;
        this.camera = Camera.currentCamera;
    }

    private onUpdate(dt: number): void {

    }

    /**摄像机改变延时 */
    private changeCameraDelay: any = null;
    /**摄像机旋转至玩家后方 */
    public changeRotationToForward(time: number = 2000): void {
        if (!this.camera) this.init();
        if (this.changeCameraDelay) return;
        let rot = Player.localPlayer.character.worldTransform.rotation;
        let nRot = new mw.Rotation(0, 0, 360 + rot.z);
        this.camera.rotationLagEnabled = true;
        ModifiedCameraSystem.setOverrideCameraRotation(nRot);
        this.changeCameraDelay = setTimeout(() => {
            this.camera.rotationLagEnabled = false;
            ModifiedCameraSystem.resetOverrideCameraRotation();
            this.changeCameraDelay = null;
        }, time)
    }

    /**保存当前摄像机信息 */
    public saveCamera(): CameraSystemData {
        if (!this.camera) this.init();
        let data = ModifiedCameraSystem.getCurrentSettings();
        let data2: CameraSystemData = {}
        data2.cameraRelativeTransform = data.cameraRelativeTransform.clone();
        data2.cameraWorldTransform = data.cameraWorldTransform.clone();
        data2.cameraProjectionMode = data.cameraProjectionMode;

        data2.targetArmLength = data.targetArmLength;

        data2.cameraLocationLagSpeed = data.cameraLocationLagSpeed;
        data2.enableCameraRotationLag = data.enableCameraRotationLag;
        data2.cameraRotationLagSpeed = data.cameraRotationLagSpeed;
        data2.cameraFOV = data.cameraFOV;
        data2.cameraLocationMode = data.cameraLocationMode;
        data2.cameraRotationMode = data.cameraRotationMode;
        data2.enableCameraCollision = data.enableCameraCollision;

        return data2;
    }


    private _cameraTween: mw.Tween<any> = null;

    /**还原至上次保存的摄像机信息 */
    public resetCamera(camData: CameraSystemData, tweenTime: number = 0): void {
        if (!this.camera) this.init();

        if (tweenTime > 0) {

            this.tweenAnim(camData, tweenTime);


        } else {
            ModifiedCameraSystem.applySettings(camData);
        }
    }

    /**停止相机动画 */
    public stopCameraTween() {
        if (this._cameraTween) {
            this._cameraTween.stop();
            this._cameraTween = null;
        }
    }

    private tweenAnim(camData: CameraSystemData, time: number) {

        if (this._cameraTween) {
            this._cameraTween.stop();
        }
        this._cameraTween = null;

        if (camData.cameraRelativeTransform == null) return;

        let relativeTran = this.camera.localTransform.clone();
        let tran = this.camera.worldTransform.clone();

        let target_relativeTran = camData.cameraRelativeTransform.clone();
        let target_tran = camData.cameraWorldTransform.clone();

        this._cameraTween = new mw.Tween({
            re_ro_x: relativeTran.rotation.x,
            re_ro_y: relativeTran.rotation.y,
            re_ro_z: relativeTran.rotation.z,

            re_loc_x: relativeTran.position.x,
            re_loc_y: relativeTran.position.y,
            re_loc_z: relativeTran.position.z,

            rot_x: tran.rotation.x,
            rot_y: tran.rotation.y,
            rot_z: tran.rotation.z,

            loc_x: tran.position.x,
            loc_y: tran.position.y,
            loc_z: tran.position.z,
        }).to({
            re_ro_x: target_relativeTran.rotation.x,
            re_ro_y: target_relativeTran.rotation.y,
            re_ro_z: target_relativeTran.rotation.z,

            re_loc_x: target_relativeTran.position.x,
            re_loc_y: target_relativeTran.position.y,
            re_loc_z: target_relativeTran.position.z,

            rot_x: target_tran.rotation.x,
            rot_y: target_tran.rotation.y,
            rot_z: target_tran.rotation.z,

            loc_x: target_tran.position.x,
            loc_y: target_tran.position.y,
            loc_z: target_tran.position.z,
        }, time * 1000).onUpdate((data) => {

            this._tmpTran.position.x = data.re_loc_x;
            this._tmpTran.position.y = data.re_loc_y;
            this._tmpTran.position.z = data.re_loc_z;

            this._tmpTran.rotation.x = data.re_ro_x;
            this._tmpTran.rotation.y = data.re_ro_y;
            this._tmpTran.rotation.z = data.re_ro_z;

            camData.cameraRelativeTransform = this._tmpTran;



            this._tmpTran1.position.x = data.loc_x;
            this._tmpTran1.position.y = data.loc_x;
            this._tmpTran1.position.z = data.loc_x;

            this._tmpTran1.rotation.x = data.rot_x;
            this._tmpTran1.rotation.y = data.rot_y;
            this._tmpTran1.rotation.z = data.rot_z;
            camData.cameraWorldTransform = this._tmpTran1;



            ModifiedCameraSystem.applySettings(camData);

        }).onComplete(() => {
            this._cameraTween = null;
        });

        ModifiedCameraSystem.followTargetEnable = true;
        this._cameraTween.start();

    }


    public bindTarget(target: mw.GameObject, camBindData?: CameraBindData) {
        if (target == null) return;
        mw.Camera.currentCamera.parent = target;

        mw.Camera.currentCamera.springArm.localTransform.position = mw.Vector.zero;

        if (camBindData == null) {
            return;
        }

        if (camBindData.rotMode != null) {
            mw.Camera.currentCamera.rotationMode = camBindData.rotMode;
        }

        //console.error("====bindTargetspringLen  ", camBindData.springLen == null)
        if (camBindData.springLen != null) {
            mw.Camera.currentCamera.springArm.length = camBindData.springLen;
        }
        //console.error("====bindTargetrot ", camBindData.rot == null)
        if (camBindData.rot != null) {
            mw.Camera.currentCamera.springArm.localTransform.rotation = camBindData.rot;
        }

        if (camBindData.springArmLen != null) {
            mw.Camera.currentCamera.springArm.length = camBindData.springArmLen;
        }

        //console.error("====bindTarget1 ", camBindData.rotMode == null, camBindData.rotMode)

        //console.error("====bindTarget2 ", mw.Camera.currentCamera.rotationMode)
    }

    public unBindTarget() {
        let chrac = mw.Player.localPlayer.character;
        if (mw.Camera.currentCamera.parent == chrac) {
            return;
        }
        mw.Camera.currentCamera.parent = chrac;
        mw.Camera.currentCamera.springArm.localTransform.position = mw.Vector.zero;

        if (mw.Camera.currentCamera.rotationMode == mw.CameraRotationMode.RotationFixed) {
            mw.Camera.currentCamera.rotationMode = mw.CameraRotationMode.RotationControl;
        }

    }


}

export interface CameraBindData {
    springLen?: number;
    rot?: mw.Rotation;
    rotMode?: mw.CameraRotationMode;
    springArmLen?: number;
}