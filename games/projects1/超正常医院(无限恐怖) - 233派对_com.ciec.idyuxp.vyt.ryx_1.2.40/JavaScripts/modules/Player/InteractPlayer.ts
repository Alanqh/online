
import { Events_CS } from "../../const/enum";

/**
 * npc与玩家交互
 */
export class InteractPlayer {
    public accectPlayerId: number = 0;
    /**是否正在交互 */
    public isInteract: boolean = false;
    /**是否正在交互 玩家id */
    public action: mw.Action2<boolean, number> = new mw.Action2();

    private npc: Character = null;
    private player: Player = null;
    private ani: mw.Animation = null;

    public async start(model, player: mw.Player): Promise<void> {
        this.npc = model.npc_S;
        this.player = player;
        this.accectPlayerId = player.playerId;

        this.attChar(player.character, this.npc);
        this.changeAni(player.character, "285582");

        this.isInteract = true;
        this.action.call(true, this.accectPlayerId);
    }

    public leave(rotation?: Rotation, stance?: string): void {

        this.isInteract = false;
        this.changeAni(this.player.character, "");
        this.removeAttChar(this.player.character, this.npc);
        this.action.call(false, this.accectPlayerId);
        this.accectPlayerId = null;
        // ActionCommon.onPlayerDropBlood.call(this.player.playerId, false);
    }

    private attChar(char: Character, npc: Character): void {

        char.setCollision(mw.CollisionStatus.Off);
        char.collisionWithOtherCharacterEnabled = false;
        npc.collisionWithOtherCharacterEnabled = false;

        char.parent = npc;
        setTimeout(() => {
            if (char.localTransform)
                char.localTransform.rotation = new Rotation(20, -30, 0);
        }, 10);
        setTimeout(() => {
            if (char.localTransform)
                char.localTransform.rotation = new Rotation(20, -30, -20);
        }, 50);

    }

    private removeAttChar(char: Character, npc: Character): void {
        char.parent = null;
        char.collisionWithOtherCharacterEnabled = true;
        npc.collisionWithOtherCharacterEnabled = true;
        char.setCollision(mw.CollisionStatus.On);
        setTimeout(() => {
            Event.dispatchToClient(this.player, Events_CS.SetCoslth)
            if (char && char.localTransform) {
                char.localTransform.rotation = new Rotation(0, 0, 0)
                char.worldTransform.scale = new mw.Vector(1, 1, 1);
                char.localTransform.scale = new mw.Vector(1, 1, 1);
            }
        }, 50);

    }


    private changeAni(char: Character, aniGuid: string): void {
        if (!char) return;
        if (aniGuid == "") {
            char.currentAnimation?.stop();
            return;
        }

        this.ani = char.loadAnimation(aniGuid);
        this.ani.loop = 0;
        this.ani.play();

    }
}