import { AchievementS, registerAchievementSAndC } from "../Achievement";


@registerAchievementSAndC
export default class AliveDayCount extends AchievementS {

    public getCurProgress(achievementId: number): string {
        const cfg = this.cfgArr.find(v => { return v.id === achievementId });
        return `${this.getPlayerRecordData().baseRecordInfo.maxAliveDay}/${cfg.targetPara[0]}`;
    }

    public listen(playerInfo: Player | string | number, aliveDay: number): void {
        let player: Player = playerInfo instanceof Player ? playerInfo : Player.getPlayer(playerInfo);
        if (!player) {
            console.error(`DEBUG MyTypeError>>> ${this.constructor.name} 成就监听失败，没找到玩家`);
            return;
        }
        const data = this.getData(player);
        if (!data) { return; }
        data.saveNewAchieves(
            this.cfgArr.filter(v => { return aliveDay >= Number(v.targetPara[0]) && !data.checkAchieveIsFinish(v.id) })
                .map(v => { return v.id })
        );
    }
}