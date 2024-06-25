/*

 * @Date         : 2023-02-15 16:52:22

 * @LastEditTime: 2023-09-11 11:46:50
 * @FilePath: \commonprefab\JavaScripts\Prefabs\射线枪\Script\Prefab\Tools\AssetsHelper.ts
 * @Description  : 
 */
export class AssetsHelper {
    public static async checkAssets(...assets: string[]) {
        for (let index = 0; index < assets.length; index++) {
            const element = assets[index];
            if (!AssetUtil.assetLoaded(element)) {
                await AssetUtil.asyncDownloadAsset(element);
                AssetUtil.assetLoaded(element);
            }
        }
    }
}