/** 
 * @Author       : yuanqi.bai
 * @Date         : 2023-03-31 17:05:35
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-11-22 15:01:07
 * @FilePath     : \stumbleguys_new\JavaScripts\playerCtrl\PlayerCtrlUI.ts
 * @Description  : 修改描述
 */

import { TestMode } from "../TestMode";
import PlayerController_Generate from "../ui-generate/Prefabs/PlayerController/UI/PlayerController_generate";
import { PlayerParam } from "./PlayerParam";

// import PlayerController_Generate from "../ui-generate/PlayerController_generate";

export default class PlayerCtrlUI extends PlayerController_Generate {
    private _character: Character;
    private _rotation: mw.Rotation;
    private _isupdate: Boolean = true;

    private tween: Tween<{ x, y }>;

    /** 仅在游戏时间对非模板实例调用一次 */
    protected onStart() {
        this._character = Player.localPlayer.character;
        Event.addLocalListener("CHANGE_JUMP_IMG", (isJump: boolean) => {
            this.changeJumpImage(isJump);
        });
        Event.addLocalListener("SET_CTRL_UI_VISIBLE", (visible: boolean) => {
            const resultVisible = visible ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
            if (resultVisible != this.uiObject.visibility) {
                this.uiObject.visibility = resultVisible;
                this.resetJoyStick();
            }
        })

        this.joyCon.onJoyStickDown.add(() => {
            Event.dispatchToLocal("Joy.Down.Client");
        })
        this.joyCon.onJoyStickUp.add(() => {
            Event.dispatchToLocal("Joy.Up.Client");
        })
        this.btnJump.onClicked.clear();
        this.btnJump.onPressed.add(() => {
            Event.dispatchToLocal("PLAYER_JUMP");
        })
        this.joyCon.onInputDir.add((vec: mw.Vector2) => {
            //当滑行时，手动控制人物的转向
            if (vec.sqrMagnitude > 0) {
                Event.dispatchToLocal("Joy.Move.Client", vec);
                this.onSlideCameraController(vec);
                Event.dispatchToLocal("JoystickMove", vec);
            }
        });
        Event.addLocalListener("SET_CTRL_VISIBLE", (visible: boolean, jumpEnable: boolean = true) => {
            if (visible) {
                this.uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            } else {
                this.uiObject.visibility = mw.SlateVisibility.Hidden;

            }
            // visible ? mw.UIService.showUI(this) : mw.UIService.hideUI(this);
            this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_5").visibility = jumpEnable ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;

        });
        this.changeJumpImage(true);

        if (TestMode.testMode) {
            const dir = new mw.Vector();
            this.joyCon.controlType = mw.CameraControlType.None;
            this.joyCon.onInputDir.add(dir2d => {
                dir.set(dir2d.y, dir2d.x, 0).normalize();
                this._character.addMovement(dir);
            });
        }
        this.scoreCVS.visibility = mw.SlateVisibility.Hidden;
        this.btnGiveUp.onClicked.add(() => {
            this.scoreCVS.visibility = mw.SlateVisibility.Hidden;
            Event.dispatchToLocal("Character_Give_Up", Player.localPlayer.character);
        });
        Event.addLocalListener("CharacterSelf_Fresh_Score", () => {
            this.scoreCVS.visibility = mw.SlateVisibility.Hidden;
        })
        Event.addLocalListener("Character_Catch_Gift", (character: Character) => {
            if (Player.localPlayer && Player.localPlayer.character == character) {
                this.scoreCVS.visibility = mw.SlateVisibility.Visible;
                if (!this.tween) {
                    const temp = new Vector2();
                    this.tween = new Tween({ x: 0, y: 0 }).to({ x: 1, y: 1 }, 300).onUpdate(({ x, y }) => {
                        temp.set(x, y);
                        this.scoreCVS.renderScale = temp;
                    }).easing(TweenUtil.Easing.Back.Out);
                }
                this.tween.start();
            }
        });

    }
    onShow(): void {
        this.resetJoyStick();
    }
    onHide() {
        this.resetJoyStick();
    }

    private changeJumpImage(isJump: boolean) {
        this.btn_Jump.visibility = isJump ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
        this.btn_Force.visibility = isJump ? mw.SlateVisibility.Collapsed : mw.SlateVisibility.SelfHitTestInvisible;
    }

    /**
     * 手动控制人物转向
     * @param vec 摇杆输入
     * @returns 
     */
    private onSlideCameraController(vec) {
        if (!PlayerParam.isSlide) {
            return;
        }
        if (this._isupdate) {
            this._rotation = new mw.Rotation(0, 0, Camera.currentCamera.worldTransform.clone().rotation.z - Math.atan2(vec.normalize().y, vec.normalize().x) / Math.PI * 180 + 90)
            this._isupdate = !this._isupdate;
            this._character.worldTransform.rotation = this._rotation;
        } else {
            this._isupdate = !this._isupdate;
        }
    }
    private resetJoyStick() {
        this.joyCon.resetJoyStick();
        this.joyCon.onJoyStickUp.broadcast();
        Event.dispatchToLocal("Joy.Move.Stop");

    }
}







