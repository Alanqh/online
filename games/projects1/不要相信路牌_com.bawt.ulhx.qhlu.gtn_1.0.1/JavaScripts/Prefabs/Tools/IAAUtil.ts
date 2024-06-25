/*

 * @Date: 2023-09-11 09:25:01

 * @LastEditTime: 2023-09-11 13:09:03
 * @FilePath: \commonprefab\JavaScripts\Prefabs\Tools\IAAUtil.ts
 * @Description: 
 */
const AdsInstance = mw.AdsService;
const isActive = AdsInstance.isActive(AdsType.Reward);

export class IAAUtil {
    /**
         * 播放广告
         * @param myAdsType 广告类型 
         * @param callback 回调（是否成功播放）
         * @returns 
         */
    public static playAds(callback: (result: boolean) => void) {
        if (mw.SystemUtil.isPIE) {
            callback(true);
        }
        //未激活广告
        if (!isActive) {
            return;
        }
        //准备播放广告
        AdsInstance.isReady(AdsType.Reward, async (isReady: boolean) => {
            if (isReady) {
                let isSucess = false;
                //准备好了广告
                AdsInstance.showAd(AdsType.Reward, async (res) => {
                    if (res) {
                        console.log("ads is reward")
                        isSucess = true;

                        setTimeout(() => {
                            callback(true);
                        }, 1000);
                    }
                    else {
                        console.warn("MyTypeError ads is not reward", res);
                    }

                })
            } else {
                //没准备好广告
                return
            }
        })
    }
}