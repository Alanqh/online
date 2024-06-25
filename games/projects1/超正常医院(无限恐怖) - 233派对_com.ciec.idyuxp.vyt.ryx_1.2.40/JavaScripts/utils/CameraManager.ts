import { GlobalData } from "../const/GlobalData";



type cameraInfo = {
    length: number,
    pos: Vector,
    offset: Vector,
    rotation: Rotation,
}




export class CameraManager {

    private _camera: Camera;
    private _owner: Character;
    private static _instance: CameraManager;
    private _lastData: cameraInfo = null;
    public static get instance(): CameraManager {
        if (this._instance == null) {
            this._instance = new CameraManager();
            this._instance._camera = Camera.currentCamera;
            this._instance._owner = Player.localPlayer.character;
        }
        return this._instance;
    }

    public get worldTransform(): Transform {
        return this._camera.worldTransform;
    }


    public get localTransform(): Transform {
        return this._camera.localTransform;
    }

    public get armLength() {
        return this._camera.springArm.length;
    }

    public saveCurCameraData() {
        this._lastData = { length: this._camera.springArm.length, offset: this._camera['offset'], pos: this._camera.localTransform.position, rotation: this._camera.worldTransform.rotation }
    }

    public resumeCameraData() {
        this._camera.localTransform.position = this._lastData.pos;
        this._camera['offset'] = this._lastData.offset;
        this._camera.springArm.length = this._lastData.length;

    }

    public setCameraOffset() {
        this._camera.localTransform.position = GlobalData.Gun.cameraOffset
        this._camera['offset'] = new Vector(0, 60, 0);
        this._camera.springArm.length = 300
    }

    public setCameraLen(len: number) {

        this._camera.springArm.length = len;
    }



}
