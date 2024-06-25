import { Events_CS } from "../const/enum";

export default class AnimUtils {


    /**
     * 在所有客户端播放动画
     * 调用端：双端
     * @param assetId 资源id
     * @param loop 循环次数
     * @param speed 播放速度
     * @param playerId 玩家id(服务端调用时需要传入)
     */
    public static playAtAllClient(assetId: string, loop: number = 1, speed: number = 1, playerId?: number) {
        if (SystemUtil.isServer()) {
            Event.dispatchToAllClient(Events_CS.PlayAnimation_C, playerId, assetId, loop, speed);
        } else {
            Event.dispatchToServer(Events_CS.PlayAnimation_S, assetId, loop, speed);
        }
    }

    /**
     * 在本地播放动画
     * 调用端：客户端
     * @param assetId 资源id
     * @param loop 循环次数
     * @param speed  播放速度
     */
    public static playAtLocal(assetId: string, loop: number = 1, speed: number = 1) {
        
    }
}