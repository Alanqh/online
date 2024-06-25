import { Prop } from "./Prop";
import { IceLolly } from "./Prop/IceLolly";
import { PropBase } from "./Prop/PropBase";
import { PropModuleS } from "./PropModuleS";

export class PropModuleC extends ModuleC<PropModuleS, null>{


    weaponMap: Map<string, PropBase> = new Map();

    list: PropBase[] = [];
    protected onEnterScene(sceneType: number): void {
        Event.addServerListener(Prop.equipProp, (playerId: number, guid: string, location: Vector, scale: Vector, rotation: Rotation, slot: mw.HumanoidSlotType, param: any, type: Prop.PropType) => {
            if (this.localPlayerId != playerId) {
                const player = Player.getPlayer(playerId);
                if (player && this.weaponMap.has(player.character.gameObjectId)) {
                    this.weaponMap.get(player.character.gameObjectId).unEquip();
                    this.weaponMap.delete(player.character.gameObjectId);
                }
                let weapon: PropBase;
                switch (type) {
                    case Prop.PropType.IceLolly:
                        weapon = new IceLolly();
                        break;
                    default:
                        weapon = new IceLolly();
                        break;
                }
                weapon.equip(player.character.gameObjectId, guid, location, scale, rotation, slot, false, param);
                this.weaponMap.set(player.character.gameObjectId, weapon);
                this.list.push(weapon);
            }
        });

        Event.addServerListener(Prop.unEquipProp, (playerId: number, type: Prop.PropType) => {
            if (this.localPlayerId != playerId) {
                const player = Player.getPlayer(playerId);
                if (player && this.weaponMap.has(player.character.gameObjectId)) {
                    const weapon = this.weaponMap.get(player.character.gameObjectId)
                    if (weapon.type == type) {
                        weapon.unEquip();
                        this.weaponMap.delete(player.character.gameObjectId);
                    }
                }
            }
        })

        Event.addLocalListener(Prop.unEquipProp, (guid: string) => {
            if (this.weaponMap.has(guid)) {
                const weapon = this.weaponMap.get(guid)
                weapon.unEquip();
                this.weaponMap.delete(guid);
            }
        })
        Event.addServerListener(Prop.useProp, (playerId: number, type: Prop.PropType) => {
            if (this.localPlayerId != playerId) {
                const player = Player.getPlayer(playerId);
                if (player && this.weaponMap.has(player.character.gameObjectId)) {
                    const weapon = this.weaponMap.get(player.character.gameObjectId)
                    if (weapon.type == type) {
                        weapon.use();
                    }
                }
            }
        })

        Event.addServerListener(Prop.onHit, (playerId: number, hitPlayerId: number, type: Prop.PropType, param: any) => {
            if (this.localPlayerId != playerId) {
                const player = Player.getPlayer(playerId);
                if (player && this.weaponMap.has(player.character.gameObjectId)) {
                    const weapon = this.weaponMap.get(player.character.gameObjectId);
                    if (hitPlayerId == this.localPlayerId && weapon.type == type) {
                        weapon.hit(this.localPlayer.character, param);
                    }
                }
            }
        })

        Event.addServerListener(Prop.playerLeft, (playerId: number) => {
            if (this.localPlayerId != playerId) {
                const player = Player.getPlayer(playerId);
                if (player && this.weaponMap.has(player.character.gameObjectId)) {
                    const weapon = this.weaponMap.get(player.character.gameObjectId);
                    weapon.unEquip();
                    this.weaponMap.delete(player.character.gameObjectId);
                }
            }
        })

        Event.addLocalListener(Prop.getProp, (cha: mw.Character, guid: string, location: Vector, scale: Vector, rotation: Rotation, slot: mw.HumanoidSlotType, param: any, type: Prop.PropType) => {
            this.equipPropSelf(cha, guid, location, scale, rotation, slot, param, type)
        })
    }

    equipProp(guid: string, location: Vector, scale: Vector, rotation: Rotation, slot: mw.HumanoidSlotType, param: any, type: Prop.PropType) {
        this.server.net_equipProp(guid, location, scale, rotation, slot, param, type);
    }
    unEquipProp(type: Prop.PropType) {
        this.server.net_unEquipProp(type);
    }
    useProp(type: Prop.PropType) {
        this.server.net_useProp(type);
    }

    onHit(playerId: number, type: Prop.PropType, param: any) {
        this.server.net_onHit(playerId, type, param);
    }

    equipPropSelf(cha: mw.Character, guid: string, location: Vector, scale: Vector, rotation: Rotation, slot: mw.HumanoidSlotType, param: any, type: Prop.PropType) {
        let weapon: PropBase;
        switch (type) {
            case Prop.PropType.IceLolly:
                weapon = new IceLolly();
                break;
            default:
                weapon = new IceLolly();
                break;
        }
        weapon.equip(cha.gameObjectId, guid, location, scale, rotation, slot, true, param);
        this.weaponMap.set(cha.gameObjectId, weapon);
        this.list.push(weapon);

    }
    hasEquip(guid: string) {
        return this.weaponMap.has(guid);
    }

    protected onUpdate(dt: number): void {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].update(dt)) {
                this.list.splice(i, 1);
                i--;
            }
        }
    }

}