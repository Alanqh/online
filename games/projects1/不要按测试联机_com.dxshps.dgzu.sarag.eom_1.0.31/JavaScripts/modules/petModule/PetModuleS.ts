import { PetModuleC } from "./PetModuleC";
import { SuitInfo } from "./PetModuleData";
import PlayerPet from "./PlayerPet";


export type PetEnableData = { enable: boolean, suitInfo: SuitInfo }
export class PetModuleS extends ModuleS<PetModuleC, null> {


    /**玩家宠物脚本 */
    private _playerPetMap: Map<number, PlayerPet> = new Map();

    protected onStart(): void {

    }




    /**
    * 玩家登录 生成新的宠物脚本
    * @param player 进入的玩家
    */
    public async playerJoined(playerId: number, nickName: string) {
        if (this._playerPetMap.has(playerId)) {
            return;
        }
        let player = Player.getPlayer(playerId);
        //生成玩家四足脚本
        let playerPet = await mw.Script.spawnScript(PlayerPet, true, player.character);
        playerPet.playerId = playerId;
        playerPet.playerName = nickName;
        this._playerPetMap.set(playerId, playerPet)

    }

    /**
    * 删除宠物脚本
    * @param player 退出的玩家
    */
    protected onPlayerLeft(player: mw.Player): void {
        if (this._playerPetMap.has(player.playerId)) {
            this._playerPetMap.get(player.playerId)?.destroy();
            this._playerPetMap.delete(player.playerId);
        }
    }

    @Decorator.noReply()
    public net_playerChangeSuit(playerId: number, enable: boolean, info: SuitInfo) {
        let playerPet = this._playerPetMap.get(playerId);
        if (playerPet && playerPet.enableData.enable != enable) {
            let petEnableData: PetEnableData = { enable: enable, suitInfo: info };
            playerPet.enableData = petEnableData;
            Player.getPlayer(playerId).character.capsuleCorrectionEnabled = !enable;
        }
    }

    public getCurPetId(playerId: number) {
        if (!this._playerPetMap.has(playerId))return;
        let playerPet = this._playerPetMap.get(playerId);
        if (playerPet.enableData) {
            return playerPet.enableData.suitInfo.petId;
        }
    }

    public getPetState(playerId: number) {
        if (this._playerPetMap.has) {
            return this._playerPetMap.get(playerId).petState;
        }
    }


}