
import { GlobalData } from "../../const/GlobalData";
import { Singleton } from "../../utils/uitls";
import PlayerTempData from "../Player/PlayerTempData";


@Singleton()
export class AreaCheck {

    public static instance: AreaCheck = null;

    /**
     * 获取在某个区域内的玩家
     * @param center npc 中心点位置
     * @param players 玩家列表
     * @returns
     */
    public getAreaPlayer(center: mw.Vector, players: PlayerTempData[]) {

        let tarPlayers: PlayerTempData[] = [];

        players.forEach((playerData) => {
            let player = mw.Player.getPlayer(playerData.PlayerId);
            let playerLoc = player.character.worldTransform.position;
            let disSeq = mw.Vector.squaredDistance(playerLoc, center);
            if (disSeq < Math.pow(GlobalData.NPC.searchDis, 2)) {
                tarPlayers.push(playerData);
            }
        });

        return tarPlayers;
    }

}