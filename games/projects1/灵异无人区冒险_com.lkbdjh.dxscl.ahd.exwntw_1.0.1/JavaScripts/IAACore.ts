
export class IAACore {
    /**
         * 播放广告
         * @param myAdsType 广告类型 
         * @param callback 回调（是否成功播放）
         * @returns 
         */
    public static playAds(callback: (result: boolean) => void) {
        if (SystemUtil.isPIE) {
            callback(true);
        }
        //未激活广告
        if (!AdsService.isActive(AdsType.Reward)) {
            return;
        }
        //准备播放广告
        AdsService.isReady(AdsType.Reward, async (isReady: boolean) => {
            if (isReady) {
                //准备好了广告
                AdsService.showAd(AdsType.Reward, async (state: boolean) => {
                    if (state) {
                        setTimeout(() => {
                            callback(true);
                        }, 1000);
                    }
                })
            } else {
                //没准备好广告
                return
            }
        })
    }
}