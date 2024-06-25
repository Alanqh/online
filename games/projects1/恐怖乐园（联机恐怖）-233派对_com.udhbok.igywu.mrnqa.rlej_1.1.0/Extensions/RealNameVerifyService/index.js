'use strict';

/**
 * 文档
 * 实名认证交互协议：https://meta.feishu.cn/wiki/wikcnvdFGOPUvKCaGy4QXaik9sh
 */
/**
 * @author huipeng.jia
 * @description 实名认证服务拓展包
 */
var RealNameVerifyExtend;
(function (RealNameVerifyExtend) {
    /**
     * @internal
     */
    const TIMEOUT_THRESHOLD = 5;
    /**
     * @internal
     * @description 与233客户端通信的协议，用枚举不易出错
     */
    let ActionStr233;
    (function (ActionStr233) {
        /** - 获取用户实名状态 */
        ActionStr233["RealNameStatusRequest"] = "ue.action.game.realname.info";
        /** - 获取用户实名状态回调 */
        ActionStr233["RealNameStatusResponse"] = "bridge.action.game.realname.info.result";
        /** - 打开客户端实名弹窗 */
        ActionStr233["VerifyRequest"] = "ue.action.game.realname.showdialog";
    })(ActionStr233 || (ActionStr233 = {}));
    (function (VerificationStatus) {
        /** 未实名 */
        VerificationStatus["UnVerified"] = "0";
        /** 实名成年 */
        VerificationStatus["VerifiedAdult"] = "1";
        /** 实名未成年 */
        VerificationStatus["VerifiedMinor"] = "2";
    })(RealNameVerifyExtend.VerificationStatus || (RealNameVerifyExtend.VerificationStatus = {}));
    /**
     * @author huipeng.jia
     * @groups 服务/货币
     * @description 实名认证服务
     * @networkStatus usage: 双端
     */
    class RealNameVerifyService {
        /**
         * @groups 服务/货币
         * @description 查询玩家的实名认证状态
         * @effect 只在客户端调用生效
         * @returns 实名认证状态
         */
        static getVerificationStatus() {
            return RealNameVerifyService.getInstance().getVerificationStatus();
        }
        /**
         * @groups 服务/货币
         * @description 拉起实名认证
         * @effect 只在客户端调用生效
         */
        static promoteRealNameVerify() {
            return RealNameVerifyService.getInstance().promoteRealNameVerify();
        }
        // ============================================ 成员方法 =========================================
        /**
         * @internal
         * @description 构造函数，用于初始化委托和事件绑定
         */
        constructor() {
            // Pending Requests
            this.pendingVerifyStatusRequests = new Map();
            if (SystemUtil.isClient()) {
                // 绑定回调(From: 233)
                MessageChannelService.registerAction(ActionStr233.RealNameStatusResponse, this, (dataStr) => {
                    console.log("-RealNameVerifyService- RealNameStatusResponse: ", dataStr);
                    // 添加trycatch预防游戏逻辑有报错，影响后续的执行
                    try {
                        const resp = JSON.parse(dataStr);
                        const callbackObj = this.pendingVerifyStatusRequests.get(resp.messageId);
                        if (callbackObj) {
                            callbackObj.callback(resp);
                            callbackObj.timerHandle && clearTimeout(callbackObj.timerHandle);
                            this.pendingVerifyStatusRequests.delete(resp.messageId);
                        }
                        // this.pendingVerifyStatusRequests.forEach((callbackObj) => {
                        //     if (callbackObj) {
                        //         callbackObj.callback(resp);
                        //         callbackObj.timerHandle && clearTimeout(callbackObj.timerHandle);
                        //     }
                        // });
                        // this.pendingVerifyStatusRequests.clear();
                    }
                    catch (error) {
                        console.error("-RealNameVerifyService- Process RealNameStatusResponse has exception: ", error);
                    }
                });
                console.log("-RealNameVerifyService- bind events callback");
            }
            else {
                console.warn("-RealNameVerifyService- not supported on Server");
            }
        }
        /**
         * @internal
         * @description 获取管理器全局实例
         * @effect 调用端生效
         * @returns 应用管理器全局实例
         */
        static getInstance() {
            if (!this.instance) {
                this.instance = new RealNameVerifyService();
            }
            return this.instance;
        }
        /**
         * @internal
         * @description 查询玩家的实名认证状态
         * @effect 只在客户端调用生效
         */
        getVerificationStatus() {
            return new Promise((resolve, reject) => {
                // 创建messageId，用于校验回调是不是对应本次请求
                const messageId = this.createMessageId();
                // 构造回调处理对象，用于在收到回调后解析消息
                const receiveRealNameStatusCallback = (resp) => {
                    // 解析所需数据
                    resp?.data?.uuid;
                    const status = resp?.data?.status;
                    resolve(status);
                };
                // 创建定时器，处理超时
                const timerHandle = setTimeout(() => {
                    // 闭包捕获了局部变量 messageId
                    console.error("-RealNameVerifyService- getVerificationStatus request timeout");
                    this.pendingVerifyStatusRequests.delete(messageId);
                    reject(new Error("Time out"));
                }, TIMEOUT_THRESHOLD * 1000);
                // 绑定回调
                this.pendingVerifyStatusRequests.set(messageId, {
                    callback: receiveRealNameStatusCallback,
                    timerHandle: timerHandle,
                });
                // 发起请求
                const requestData = {
                    action: ActionStr233.RealNameStatusRequest,
                    messageId: messageId,
                    callbackType: "Call",
                    data: {},
                };
                const requestDataStr = JSON.stringify(requestData);
                MessageChannelService.sendTo(MessageChannelReceiver.Client, requestDataStr);
            });
        }
        /**
         * @internal
         * @description 拉起实名认证
         */
        promoteRealNameVerify() {
            // 拉起实名认证的请求
            const requestData = {
                action: ActionStr233.VerifyRequest,
                messageId: this.createMessageId(),
                callbackType: "Call",
                data: {},
            };
            const requestDataStr = JSON.stringify(requestData);
            MessageChannelService.sendTo(MessageChannelReceiver.Client, requestDataStr);
        }
        /**
         * @internal
         * @description 使用Unix时间戳拼接两位随机数字，来生成“唯一”Id，用于匹配回调和请求
         * @returns “唯一”Id
         */
        createMessageId() {
            return (TimeUtil.time() % 10000) * 100 + MathUtil.randomInt(1, 100);
        }
    }
    RealNameVerifyExtend.RealNameVerifyService = RealNameVerifyService;
})(RealNameVerifyExtend || (RealNameVerifyExtend = {}));
globalThis.RealNameVerifyExtend = RealNameVerifyExtend;
RealNameVerifyExtend.RealNameVerifyService.getInstance();

var foreign0 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get RealNameVerifyExtend() { return RealNameVerifyExtend; }
});

const MWModuleMap = {
    'RealNameVerifyService': foreign0,
};

exports.MWModuleMap = MWModuleMap;
//# sourceMappingURL=index.js.map
