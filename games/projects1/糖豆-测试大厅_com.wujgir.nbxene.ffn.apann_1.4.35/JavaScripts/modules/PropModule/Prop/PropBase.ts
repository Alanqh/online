import { SpawnManager } from '../../../Modified027Editor/ModifiedSpawn';
import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
import { Prop } from "../Prop";
import { PropModuleC } from "../PropModuleC";


export abstract class PropBase {


    //武器模型
    weapon: mw.GameObject;
    //持有者guid
    owner: string;

    //是否是主控端
    isMaster: boolean = false;
    //是否是玩家
    isPlayer: boolean = false;
    canUpdate: boolean = false;

    currentCha: mw.Character;
    ownerCha: mw.Character;
    equip(chaGuid: string, guid: string, location: Vector, scale: Vector, rotation: Rotation, slot: mw.HumanoidSlotType, isMaster: boolean, param: any) {
        this.isMaster = isMaster;
        this.owner = chaGuid;
        const character = GameObject.findGameObjectById(chaGuid) as mw.Character;
        this.ownerCha = character;
        if (PlayerManagerExtesion.isCharacter(character)) {
            this.isPlayer = true;
        }
        this.currentCha = Player.localPlayer.character
        if (character) {
            this.weapon = GameObject.spawn(guid);
            this.weapon.worldTransform.scale = scale;
            character.attachToSlot(this.weapon, slot);
            this.weapon.localTransform.position = location;
            this.weapon.localTransform.rotation = rotation;
        }
        this.onEquip(param);

        //如果是主控端玩家  同步到其他客户端
        if (this.isMaster && this.isPlayer) {
            ModuleService.getModule(PropModuleC).equipProp(guid, location, scale, rotation, slot, param, this.type);
        }
        this.canUpdate = true
    }

    unEquip() {
        this.ownerCha = null;
        this.onUnEquip();
        if (this.weapon) {
            this.weapon.destroy()
            this.weapon = null;
        }
        if (this.isMaster && this.isPlayer) {
            ModuleService.getModule(PropModuleC).unEquipProp(this.type);
        }
        this.isDestroy = true;
    }

    use() {
        this.onUse();
        if (this.isMaster && this.isPlayer) {
            ModuleService.getModule(PropModuleC).useProp(this.type);
        }
    }

    hit(cha: mw.Character, param: any) {
        if (this.isMaster && this.isPlayer && PlayerManagerExtesion.isCharacter(cha)) {
            ModuleService.getModule(PropModuleC).onHit(cha.player.playerId, this.type, param);
        } else {
            this.onHit(cha, param)
        }

    }

    isDestroy: boolean = false;
    update(dt: number): boolean {
        if (this.isDestroy) {
            return true;
        }
        if (this.canUpdate) {
            this.onUpdate(dt);
        }
        return false;
    }

    abstract onUpdate(dt: number): void;
    abstract onEquip(param: any): void;
    abstract onUnEquip(): void;
    abstract onUse(): void;
    abstract onHit(cha: mw.Character, param: any): void;
    abstract get type(): Prop.PropType;

}