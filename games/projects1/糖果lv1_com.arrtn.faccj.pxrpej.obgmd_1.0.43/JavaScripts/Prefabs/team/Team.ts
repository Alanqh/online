import { TestMode } from "../../TestMode";


/** 
 * @Author       : lei.zhao
 * @Date         : 2023-05-10 18:25:30
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-08-20 11:13:34
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\team\Team.ts
 * @Description  : 修改描述
 */
class TeamModel {
    members: string[] = [];
}
export namespace TeamService {
    export const teams: TeamModel[] = [];
    export const client: TeamModel = new TeamModel();
    if (SystemUtil.isServer()) {
        Event.addLocalListener("Team.Jump", (userId: string) => {
            const index = teams.findIndex(i => i.members.includes(userId));
            if (index >= 0) {
                teams.splice(index, 1);
            }
        });
        Event.addClientListener("Team.Query", player => {
            makeTeamFromJump(RouteService.getTeamCarryingData(player.teamId));
            if (TestMode.testMode) {
                const serverData = {};
                // serverData["46485372"] = { team: ["46485372", "46485373"] }
                // serverData["46485373"] = { team: ["46485372", "46485373"] }
                makeTeamFromJump(serverData)
            }
            let team = teams.find(i => i.members.includes(player.userId));
            if (team) {
                Event.dispatchToClient(player, "Team.Query", team.members);
            }
        });
        RouteService.onReceiveTeamData.add((teamId, data) => {
            makeTeamFromJump(data);
        });
    } else {
        Event.addServerListener("Team.Query", (members: string[]) => {
            client.members = members;
        });
    }
    export function isInTeam(userId: string) {
        return client.members.includes(userId);
    }
    function makeTeam(teamData: string[]) {
        let team = teams.find(i => i.members.includes(teamData[0]));
        if (!team) {
            team = new TeamModel();
            team.members.push(teamData[0]);
            teams.push(team);
        }
        for (const key of teamData) {
            if (!team.members.includes(key)) {
                team.members.push(key);
            }
        }
    }
    function makeTeamFromJump(jumpData: Record<string, unknown>) {
        if (!jumpData) return;
        for (const key in jumpData) {
            const teamData = jumpData[key]["team"];
            if (teamData) {
                makeTeam(teamData);
            }
        }
    }

    export function getTeamSize() {
        return client.members.length;
    }

    export function getCurTeamSize() {
        let size = 0;
        const playerIds = Player.getAllPlayers().map(i => i.userId);
        for (let id of client.members) {
            if (playerIds.includes(id)) {
                size++;
            }
        }
        return size;
    }

}