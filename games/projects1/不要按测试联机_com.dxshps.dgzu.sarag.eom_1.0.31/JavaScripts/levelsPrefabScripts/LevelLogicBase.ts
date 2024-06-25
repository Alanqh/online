import { oTrace } from "odin";
import { GameConfig } from "../config/GameConfig";
import { ILevelElement } from "../config/Level";
import { LevelBase } from "./LevelBase";
import { LevelComData } from "./LevelComData";

/**
 * 关卡控制基类，注册net方法
 */
export abstract class LevelLogicBase<T extends LevelBase>{
    private paramScript: T;
    protected myConfig: ILevelElement = null;
    protected myLevelData_S: LevelComData = new LevelComData();

    constructor(paramScript: T) {
        this.paramScript = paramScript;
        this.init();
    }
    //初始化
    protected async init() {
        await this.info.gameObject.asyncReady();
        this.myConfig = GameConfig.Level.getElement(this.info.configID);
        this.myLevelData_S.levelID = this.info.configID;
        try {
            // this.registerNetFun();
            this.onScriptStart();
        } catch (error) {
            console.error("LevelLogicBase init error:", error);
        }
    }
    //游戏对象上挂载的原始脚本
    protected get info(): T {
        return this.paramScript;
    }
    //游戏对象
    protected get gameObject(): mw.GameObject {
        return this.info.gameObject;
    }
    // 预制体guid
    protected get guid(): string {
        return this.info.guid;
    }
    // 预制体名称
    protected get name(): string {
        return this.info.name;
    }
    //设置脚本Update
    protected set useUpdate(value: boolean) {
        if (this.info) {
            this.info.useUpdate = value;
        }
    }
    // //注册自己的网络方法(自己的和父类的)
    // private registerNetFun() {
    //     this.registerObjNetFun(this);
    //     let parent = this["__proto__"];
    //     while (parent != null) {
    //         this.registerObjNetFun(parent);
    //         parent = parent["__proto__"];
    //     }
    // }
    // //注册对象网络方法
    // private registerObjNetFun(obj: any) {
    //     if (obj == null) return;
    //     let prototype = Object.getPrototypeOf(obj);
    //     if (typeof prototype != "object" || prototype == null) {
    //         return
    //     }
    //     let funNames = Reflect.ownKeys(prototype);
    //     for (let i = 0; i < funNames.length; i++) {
    //         let funName: string = funNames[i].toString();
    //         if ((funName.startsWith('net_')) && typeof this[funName] === 'function') {
    //             NetManager.registerFun(this[funName], this, this.guid + funName);
    //         }
    //     }
    // }

    // private unRegisterNetFun() {
    //     this.unRegisterObjNetFun(this);
    //     this.unRegisterObjNetFun(this["__proto__"]);
    // }
    // private unRegisterObjNetFun(obj: any) {
    //     if (obj == null) return;
    //     let prototype = Object.getPrototypeOf(obj);
    //     let funNames = Reflect.ownKeys(prototype);
    //     for (let i = 0; i < funNames.length; i++) {
    //         let funName: string = funNames[i].toString();
    //         if ((funName.startsWith('net_')) && typeof this[funName] === 'function') {
    //             NetManager.unRegisterFun(this[funName]);
    //         }
    //     }
    // }

    /**帧事件 */
    public update(dt: number): void {
        this.onScriptUpdate(dt);
    };
    /**脚本销毁 */
    public destroy(): void {
        try {
            this.onScriptDestroy();
        } catch (error) {
            console.error("LevelLogicBase destroy error:", error);
        }
        this.paramScript = null;
        // this.unRegisterNetFun();
    }

    /** 脚本初始化 */
    protected abstract onScriptStart(): void;
    /**update */
    protected abstract onScriptUpdate(dt: number): void;
    /** 玩家中途离开 */
    protected abstract onPlayerLeave(player: mw.Player): void;
    /**脚本销毁 */
    protected abstract onScriptDestroy(): void;


    /**
     * 注册对象网络方法,必须以net_开头，只用在子类调用1次，会递归注册父类方法
     * @param obj 类
     * @param map 方法名和方法的映射
     */
    protected registerObjNetFun(obj: any, map: Map<string, Function>) {
        if (obj == null) return;
        let prototype = Object.getPrototypeOf(obj);
        if (typeof prototype != "object" || prototype == null) {
            // console.log("typeof prototype != object", typeof prototype != "object");
            // console.log("prototype == null", prototype == null);
            return
        }

        let funNames = Reflect.ownKeys(prototype);
        for (let i = 0; i < funNames.length; i++) {
            let funName: string = funNames[i].toString();
            if ((funName.startsWith('net_')) && typeof this[funName] === 'function') {
                map.set(funName, this[funName]);
                oTrace('guan log 注册网络方法', funName);
            }
        }
        // 递归注册父类方法
        this.registerObjNetFun(prototype, map);
    }
}
