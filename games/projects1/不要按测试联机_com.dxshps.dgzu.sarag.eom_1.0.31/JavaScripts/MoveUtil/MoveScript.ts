/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-11-14 11:17:14
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-12-11 18:05:01
 * @FilePath     : \petparty\JavaScripts\MoveUtil\MoveScript.ts
 * @Description  : 修改描述
 */

import { EGamingFsmType } from "../const/Enum";
import { GamingCtrlEventC2C, GamingCtrlEventS2S } from "../const/GameCommonEvent";
import { GlobalData } from "../const/GlobalData";
import MoveObjManager from "./MoveObjManager";

export enum MoveType {
    World = "0",
    Local = "1"
}

export enum MovePlace {
    Client = "0",
    Server = "1"
}

export enum Axle {
    X = "0",
    Y = "1",
    Z = "2",
}

@Component
export default class MoveScript extends Script {
    @mw.Property({ displayName: "是否为预制体创建，是的话需要配合allTrapScript脚本配合运动，否的话直接运动" })
    private needWait: boolean = true;
    @mw.Property({ displayName: "选择那个端移动", selectOptions: { "客户端": "0", "服务器": "1" } })
    private movePlace: string = "0";
    @mw.Property({ displayName: "运动方式", selectOptions: { "世界轴向": "0", "本地轴向": "1" } })
    private moveType: string = "0";
    //平移相关
    @mw.Property({ group: "平移设置", displayName: "速度" })
    private move_Speed: Vector = Vector.zero;
    @mw.Property({ group: "平移设置", displayName: "首次启用延时时间" })
    private move_DelayTime: number = 0;
    // 重复移动
    @mw.Property({ group: "平移设置", displayName: "重复执行，和YOYO冲突" })
    private move_Repeat: boolean = false;
    @mw.Property({ group: "平移设置", displayName: "到达后重生时间" })
    private move_RestartTime: number = 0;
    @mw.Property({ group: "平移设置", displayName: "单程运动时间" })
    private move_MoveTimer: number = 0;

    // 位移YOYO
    @mw.Property({ group: "平移设置", displayName: "YOYO开关" })
    private move_YOYO: boolean = false;
    @mw.Property({ group: "平移设置", displayName: "YOYO单程运动时间" })
    private move_MoveTime: number = 0;
    @mw.Property({ group: "平移设置", displayName: "YOYO到达后停顿时间" })
    private move_GoStopTime: number = 0;
    @mw.Property({ group: "平移设置", displayName: "YOYO返回后停顿时间" })
    private move_BackStopTime: number = 0;


    //旋转相关 旋转改的都是相对旋转
    @mw.Property({ group: "旋转设置", displayName: "速度" })
    private rotate_Speed: Vector = Vector.zero;
    @mw.Property({ group: "旋转设置", displayName: "首次启用延时时间" })
    private rotate_DelayTime: number = 0;
    @mw.Property({ group: "旋转设置", capture: true, displayName: "锁定旋转Guid" })
    private rotate_Lock: string = "";

    @mw.Property({ group: "旋转设置", displayName: "重复执行，和YOYO冲突" })
    private rotate_Repeat: boolean = false;
    @mw.Property({ group: "旋转设置", displayName: "到达后停顿时间" })
    private rotate_RestartTime: number = 0;
    @mw.Property({ group: "旋转设置", displayName: "单程运动时间" })
    private rotate_MoveTimer: number = 0;

    @mw.Property({ group: "旋转设置", displayName: "YOYO开关" })
    private rotate_YOYO: boolean = false;
    @mw.Property({ group: "旋转设置", displayName: "YOYO单程运动时间" })
    private rotate_MoveTime: number = 0;
    @mw.Property({ group: "旋转设置", displayName: "YOYO到达后停顿时间" })
    private rotate_GoStopTime: number = 0;
    @mw.Property({ group: "旋转设置", displayName: "YOYO返回后停顿时间" })
    private rotate_BackStopTime: number = 0;

    //缩放相关
    @mw.Property({ group: "缩放设置", displayName: "速度" })
    private scale_Speed: Vector = Vector.zero;
    @mw.Property({ group: "缩放设置", displayName: "重复执行" })
    private scale_Repeat: boolean = false;
    @mw.Property({ group: "缩放设置", displayName: "单程运动时间" })
    private scale_MoveTime: number = 0;
    @mw.Property({ group: "缩放设置", displayName: "到达后停顿时间" })
    private scale_GoStopTime: number = 0;
    @mw.Property({ group: "缩放设置", displayName: "返回后停顿时间" })
    private scale_BackStopTime: number = 0;
    @mw.Property({ group: "缩放设置", displayName: "首次启用延时时间" })
    private scale_DelayTime: number = 0;
    //单摆相关
    @mw.Property({ group: "单摆设置(用这个的时候确保摆动物体已经放到最低点，否则可能达不到要的效果)", displayName: "速度（大于零首次逆时针，小于零顺时针）" })
    private swing_Speed: number = 0;
    @mw.Property({ group: "单摆设置(用这个的时候确保摆动物体已经放到最低点，否则可能达不到要的效果)", displayName: "那个轴移动", selectOptions: { "x轴": "0", "y轴": "1", "z轴": "2" } })
    private swing_Axle: string = "0";
    @mw.Property({ group: "单摆设置(用这个的时候确保摆动物体已经放到最低点，否则可能达不到要的效果)", displayName: "摆动角度", range: { min: 0, max: 360, showSlider: true } })
    private swing_Angle: number = 0;
    @mw.Property({ group: "单摆设置(用这个的时候确保摆动物体已经放到最低点，否则可能达不到要的效果)", displayName: "首次启用延时时间" })
    private swing_DelayTime: number = 0;

    private eventListener: EventListener = null;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart() {
        /**保证客户端或者服务器仅有一端执行 */
        if (SystemUtil.isClient() && this.movePlace == MovePlace.Client) {
            this.setRotLock();
            this.initClient();
        }

        if (SystemUtil.isServer() && this.movePlace == MovePlace.Server) {
            this.setRotLock();
            this.initServer();
        }


    }

    private initClient() {
        // 这个几乎不可能
        if (GlobalData.gameingState_C == EGamingFsmType.Gaming) {
            this.allTrapReady();
            return;
        }
        // 不需要等，直接开始
        if (!this.needWait) {
            this.allTrapReady();
            return;
        }
        // 添加监听
        this.eventListener = Event.addLocalListener(GamingCtrlEventC2C.CTRL_GAMING_STATE_CHANGE_C2C, (state: EGamingFsmType) => {
            if (state != EGamingFsmType.Gaming) {
                return;
            }
            this.allTrapReady();
        });
    }

    private initServer() {
        // 不需要等，直接开始
        if (!this.needWait) {
            this.allTrapReady();
            return;
        }
        // 添加监听
        this.eventListener = Event.addLocalListener(GamingCtrlEventS2S.CTRL_GAMING_STATE_CHANGE_S2S, (state: EGamingFsmType) => {
            if (state != EGamingFsmType.Gaming) {
                return;
            }
            this.allTrapReady();
        });
    }

    private setRotLock() {
        if (this.rotate_Lock == "") {
            return
        }
        GameObject.asyncFindGameObjectById(this.rotate_Lock).then((obj) => {
            if (!obj) {
                return;
            }
            // 修改旋转锁定
            obj["privateActor"].GetStaticMeshComponent().SetAbsolute(false, true, false);
        })
    }

    public async allTrapReady() {
        await this.gameObject.asyncReady();
        let moveType = this.moveType as MoveType;
        let axle = this.swing_Axle as Axle;
        let moveObj = MoveObjManager.instance.addMoveObj(this.gameObject);
        if (!this.vectorIsZero(this.move_Speed)) {
            moveObj.moveTween(moveType,
                this.move_Speed,
                this.move_DelayTime,
                {
                    repeat: this.move_Repeat,
                    restartTime: this.move_RestartTime,
                    moveTimer: this.move_MoveTimer
                },
                this.move_YOYO ? {
                    YOYO: true,
                    moveTime: this.move_MoveTime,
                    goStopTime: this.move_GoStopTime,
                    backStopTime: this.move_BackStopTime
                } : null
            );
        }
        if (!this.vectorIsZero(this.rotate_Speed)) {
            // moveObj.rotateTween(moveType, this.rotate_Speed, this.rotate_Repeat, this.rotate_MoveTime, this.rotate_GoStopTime, this.rotate_BackStopTime, this.rotate_DelayTime);

            moveObj.rotateTween(moveType,
                this.rotate_Speed,
                this.rotate_DelayTime,
                {
                    repeat: this.rotate_Repeat,
                    restartTime: this.rotate_RestartTime,
                    moveTimer: this.rotate_MoveTimer
                },
                this.rotate_YOYO ? {
                    YOYO: true,
                    moveTime: this.rotate_MoveTime,
                    goStopTime: this.rotate_GoStopTime,
                    backStopTime: this.rotate_BackStopTime
                } : null
            );
        }
        if (!this.vectorIsZero(this.scale_Speed)) {
            moveObj.scaleTween(moveType, this.scale_Speed, this.scale_Repeat, this.scale_MoveTime, this.scale_GoStopTime, this.scale_BackStopTime, this.scale_DelayTime);
        }
        if (this.swing_Angle != 0 && this.swing_Speed != 0) {
            moveObj.swingTween(this.swing_Speed, axle, this.swing_Angle, moveType, this.swing_DelayTime);
        }
    }

    private vectorIsZero(vector: Vector) {
        if (vector.x == 0 && vector.y == 0 && vector.z == 0) {
            return true;
        }
        return false;
    }
    private rotationIsZero(rot: Rotation) {
        if (rot.x == 0 && rot.y == 0 && rot.z == 0) {
            return true;
        }
        return false;
    }
    onDestroy(): void {
        MoveObjManager.instance.deleteMove(this.gameObject);
        if (!this.eventListener) {
            return;
        }
        Event.removeListener(this.eventListener);
    }

}

