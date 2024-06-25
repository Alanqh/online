import { ActionCommon } from "../../const/GlobalData";
import { PlayerCurState } from "../../const/enum";
import P_Game_HUD from "../../modules/GameHud/UI/P_Game_HUD";
import { Singleton, utils } from "../uitls";


class Func {
    /**点击事件 */
    public func: Function;
    /**作用域 */
    public arg: any;
    /**参数 */
    public param: any[];

    constructor(func: Function, arg?: any, ...param: any[]) {
        this.func = func;
        this.arg = arg;
        this.param = param;
    }
}


/**交互按钮单例 仅客户端 */
@Singleton()
export default class InteractBtn {

    public static instance: InteractBtn;
    /**交互按钮UI对象 */
    public btn: Button = null;
    /**当前点击事件 */
    public clickFun: Func = null;
    /**点击事件队列 */
    public clickFunQueue: Func[] = [];
    /**空点击事件 */
    public voidFun: Func;
    /**可用状态 */
    private _enable: boolean = true;
    public set enable(v: boolean) {
        // 禁用按钮时, 隐藏UI并移除所有点击事件
        if (v == false) {
            this.btn.visibility = SlateVisibility.Collapsed;
            this.removeAllClickFun();
        }
        this._enable = v;
    }
    public get enable(): boolean {
        return this._enable;
    }


    constructor() {
        this.btn = UIService.getUI(P_Game_HUD).mBtn_Interactive;
        this.voidFun = new Func(this.voidFunc);
        this.clickFun = this.voidFun;
        this.btn.onClicked.add(() => {
            // console.log("点击交互按钮, funcName = " + this.clickFun.func.name, "arg = ", this.clickFun.arg, "param = ", this.clickFun.param);
            this.clickFun.func.call(this.clickFun.arg, ...this.clickFun.param);
        });
        ActionCommon.onPlayerCurStateChange.add((state: PlayerCurState, playerId) => {
            if (playerId != Player.localPlayer.playerId) return;
            if (state == PlayerCurState.Weak) {
                this.enable = false;
                console.error("玩家死亡，关闭交互按钮");
            } else {
                this.enable = true;
                console.error("玩家复活，开启交互按钮");
            }
        })
        console.log("lmn log: 初始化交互按钮 visible:" + this.btn.visibility);
    }


    /**添加点击事件 */
    addClickFun(fun: Function, arg: any, ...param: any[]) {

        if (this.enable == false) return;

        let func = new Func(fun, arg, ...param);
        this.clickFunQueue.push(func);
        // console.log(`添加点击事件 name=${fun.name}, 当前点击事件队列长度为:`, this.clickFunQueue.length)
        if (this.clickFun == this.voidFun) {
            this.clickFun = this.clickFunQueue.shift();
        }
        this.btn.visibility = SlateVisibility.Visible;
        // console.log("lmn log: 添加交互事件 visible" + this.btn.visibility);
    }

    /**移除点击事件 */
    removeClickFun(fun: Function, arg, ...param: any[]) {
        if (this.enable == false) return;

        // 如果当前点击事件为该事件，将当前点击事件置空
        if (fun == this.clickFun.func && utils.deepEqual(this.clickFun.param, param) && arg == this.clickFun.arg) this.clickFun = this.voidFun;
        // 从点击事件队列移除该事件
        let index = this.clickFunQueue.findIndex((item) => {
            return item.func == fun && item.arg == arg && utils.deepEqual(item.param, param);
        })
        if (index != -1) {
            this.clickFunQueue.splice(index, 1);
        }
        // 当前点击事件为空时，从队列中取出下一个点击事件
        if (this.clickFun == this.voidFun && this.clickFunQueue.length > 0) {
            this.clickFun = this.clickFunQueue.shift();
        }
        // 当前点击事件为空且点击事件队列为空时，隐藏按钮
        if (this.clickFun == this.voidFun) this.btn.visibility = SlateVisibility.Collapsed;

        // console.log("lmn log: 移除交互事件, visible" + this.btn.visibility);
        // console.log(`移除点击事件 name=${fun.name}, 当前点击事件队列长度为: `, this.clickFunQueue.length);
    }

    /**空点击事件 */
    voidFunc() { }

    /**移除所有点击事件 */
    removeAllClickFun() {
        this.clickFunQueue = [];
        this.clickFun = this.voidFun;
        this.btn.visibility = SlateVisibility.Collapsed;
    }

    /**判断列表1和列表2的内容是否相同 */
    private isSameParam(param1: any[], param2: any[]) {
        if (param1.length != param2.length) return false;
        for (let i = 0; i < param1.length; i++) {
            if (param1[i] != param2[i]) return false;
        }
        return true;
    }
}