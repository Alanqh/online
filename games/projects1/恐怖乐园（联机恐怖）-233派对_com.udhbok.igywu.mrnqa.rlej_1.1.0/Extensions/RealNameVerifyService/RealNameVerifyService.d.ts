declare namespace RealNameVerifyExtend {
    /**
     * @author huipeng.jia
     * @groups 服务/货币
     * @description 实名认证状态
     */
    enum VerificationStatus {
        /** 未实名 */
        UnVerified = "0",
        /** 实名成年 */
        VerifiedAdult = "1",
        /** 实名未成年 */
        VerifiedMinor = "2"
    }
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
        static getVerificationStatus(): Promise<VerificationStatus>;
        /**
         * @groups 服务/货币
         * @description 拉起实名认证
         * @effect 只在客户端调用生效
         */
        static promoteRealNameVerify(): void;
    }
}
