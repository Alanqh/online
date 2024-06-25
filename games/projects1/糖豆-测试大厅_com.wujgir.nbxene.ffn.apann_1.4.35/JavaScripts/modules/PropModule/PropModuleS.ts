import { TeamManager } from "../../Prefabs/GameStater/Script/TeamManager";
import { Team } from "../../Prefabs/GameStater/Script/data/Team";
import { Prop } from "./Prop";
import { PropModuleC } from "./PropModuleC";


export class PropModuleS extends ModuleS<PropModuleC, null>{


    protected onPlayerLeft(player: mw.Player): void {
        const team = this.getTeam(player.playerId);
        if (team) {
            team.broadcast(Prop.playerLeft, player.playerId)
        }
    }
    net_equipProp(guid: string, location: Vector, scale: Vector, rotation: Rotation, slot:mw.HumanoidSlotType, param: any, type: Prop.PropType) {
        const team = this.getTeam(this.currentPlayerId);
        if (team) {
            team.broadcast(Prop.equipProp, this.currentPlayerId, guid, location, scale, rotation, slot, param, type)
        }
    }


    net_unEquipProp(type: Prop.PropType) {
        const team = this.getTeam(this.currentPlayerId);
        if (team) {
            team.broadcast(Prop.unEquipProp, this.currentPlayerId, type)
        }
    }


    net_useProp(type: Prop.PropType) {
        const team = this.getTeam(this.currentPlayerId);
        if (team) {
            team.broadcast(Prop.useProp, this.currentPlayerId, type)
        }
    }

    net_onHit(hitPlayerId: number, type: Prop.PropType, param: any) {
        const team = this.getTeam(this.currentPlayerId);
        if (team) {
            team.broadcast(Prop.onHit, this.currentPlayerId, hitPlayerId, type, param)
        }
    }


    getTeam(playerId: number): Team {
        return TeamManager.getPlayerTeam(playerId);
    }

}