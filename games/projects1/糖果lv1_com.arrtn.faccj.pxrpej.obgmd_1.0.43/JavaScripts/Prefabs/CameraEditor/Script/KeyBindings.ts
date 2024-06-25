import { KeyAction } from "./KeyAction";
import { Setting } from "./Setting";

export namespace KeyBindings {
    const _actionStates: Map<KeyAction, boolean> = new Map();
    const _btnStates: Map<KeyAction, mw.Button> = new Map();
    export function start() {
        Setting.keyActionMap.forEach((theKey, action, map) => {
            // 初始化按下状态 并设定状态改变监听
            _actionStates.set(action, false);
            InputUtil.onKeyDown(theKey, () => {
                _actionStates.set(action, true);
                const btn = _btnStates.get(action);
                if (btn) {
                    btn.onClicked.broadcast();
                }
            });
            InputUtil.onKeyUp(theKey, () => {
                _actionStates.set(action, false);
            });
        });
    }

    export function isKeyPress(key: KeyAction) {
        return _actionStates.get(key);
    }

    /**绑定按钮和快捷键 */
    export function bindButton(key: KeyAction, btn: mw.Button) {
        _btnStates.set(key, btn);
    }
}