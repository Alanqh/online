import { GameConfig } from "../config/GameConfig";

class LevelEffectCenter {
    /**
     * 角色跳跃特效
     */
    private playerJumpEffect: Effect;
    /**
     * 角色复活特效
     */
    private playerRespawnEffect: Effect;
    constructor() {
        Event.addLocalListener("CommonEffect_Jump", async (character: Character) => {
            const cfg = GameConfig.CommonEffect.getElement(10);
            if (!this.playerJumpEffect) {
                this.playerJumpEffect = await Effect.asyncSpawn(cfg.EfectGuid[0]);
                const trans = this.playerJumpEffect.localTransform;
                trans.scale = cfg.EffectOffset[2];
                this.playerJumpEffect.loopCount = 1;
            }
            const trans = this.playerJumpEffect.worldTransform;
            trans.position = character.worldTransform.position.add(cfg.EffectOffset[0]);
            this.playerJumpEffect.stop();
            this.playerJumpEffect.play();
        });
        Event.addLocalListener("Player.Respawn.Success.Client", async (characterGuid: string) => {
            if (Player.localPlayer && Player.localPlayer.character && Player.localPlayer.character.gameObjectId == characterGuid) {
                const character = Player.localPlayer.character;
                const cfg = GameConfig.CommonEffect.getElement(1);
                if (!this.playerRespawnEffect) {
                    this.playerRespawnEffect = await Effect.asyncSpawn(cfg.EfectGuid[0]);
                    character.attachToSlot(this.playerRespawnEffect, mw.HumanoidSlotType.Root);
                    this.playerRespawnEffect.localTransform.scale = cfg.EffectOffset[2];
                    this.playerRespawnEffect.localTransform.position = cfg.EffectOffset[0];

                }
                this.playerRespawnEffect.loopCount = 1;
                this.playerRespawnEffect.stop();
                this.playerRespawnEffect.play();
            }
        });
    }
}
const outport = new LevelEffectCenter();