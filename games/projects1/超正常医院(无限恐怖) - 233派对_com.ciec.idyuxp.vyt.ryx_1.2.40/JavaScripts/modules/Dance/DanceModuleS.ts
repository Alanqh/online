import DanceModuleC from "./DanceModuleC";

export default class DanceModuleS extends ModuleS<DanceModuleC, null> {

    private savePlayerAnim: Map<number, Animation> = new Map();

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    protected onPlayerEnterGame(player: mw.Player): void {
        this.getAllClient().net_CreateWorldUI(player.playerId);
    }

    public async net_PlayAnim(assetGuid: string) {
        let player = this.currentPlayer;
        if (this.savePlayerAnim.has(player.playerId)) {
            this.savePlayerAnim.get(player.playerId).stop();
            this.savePlayerAnim.delete(player.playerId);
        }
        if (!AssetUtil.assetLoaded(assetGuid)) {
            await AssetUtil.asyncDownloadAsset(assetGuid);
        }
        let anim = player.character.loadAnimation(assetGuid);
        if (!anim) return
        anim.loop = 1;
        anim.play();
        this.savePlayerAnim.set(player.playerId, anim);
    }

    public net_PlayExpression(assetGuid: string) {
        this.getAllClient().net_PlayExpression(this.currentPlayerId, assetGuid);
    }

}