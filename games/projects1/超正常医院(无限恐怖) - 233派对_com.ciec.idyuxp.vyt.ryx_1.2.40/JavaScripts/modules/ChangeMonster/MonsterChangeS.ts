
import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";
import ChangeJS from "./ChangeJS";
import { MonsterChangeC } from "./MonsterChangeC";


export class MonsterChangeS extends ModuleS<MonsterChangeC, null> {


    /**脚本Map */
    private scriptMap: Map<number, ChangeJS> = new Map();

    onStart() {

    }
    protected onPlayerEnterGame(player: mw.Player): void {
        let script = player.character.addComponent(ChangeJS, true);

        if (!this.scriptMap.has(player.playerId)) {
            this.scriptMap.set(player.playerId, script);
        }

    }

    /**获取脚本 */
    private getScript(player: Player) {
        if (this.scriptMap.has(player.playerId)) {
            return this.scriptMap.get(player.playerId);
        }
        let script = player.character.addComponent(ChangeJS, true);
        this.scriptMap.set(player.playerId, script);
        return script;
    }

    /**成功攻击 */
    public successAttack(player: Player) {
        let script = this.getScript(player);
        script.onPlayerAttackSuccess();
    }





    /**开始生化变身 */
    public changeBio(player: Player) {
        let script = this.getScript(player);
        let cfgs = GlobalData.Biochemical.changeArr;
        let id = MathUtil.randomInt(0, cfgs.length);
        script.change(cfgs[id], player.playerId);

    }

    /**恢复正常 */
    public changeNormal(player: Player) {
        if (!this.isMonster(player.playerId)) return;
        let script = this.getScript(player);
        script.recovery();
    }



    /**攻击怪物
     * @param guid 怪物guid
     * @param danceId 舞蹈id
     */
    public attackMonster(guid: string, danceId: number) {

        let obj = GameObject.findGameObjectById(guid);
        let player = (obj as mw.Character)?.player;
        // 玩家为空
        if (player == null) {
            return;
        }
        if (!this.isMonster(player.playerId)) return;
        player.character.getComponent(ChangeJS).onPlayerGun(danceId);
    }

    /**玩家变身团团 */
    public changeModel(guid: string) {
        let obj = GameObject.findGameObjectById(guid);
        let player = (obj as mw.Character)?.player;
        if (player == null) return;
        if (!this.isMonster(player.playerId)) return;
        player.character.getComponent(ChangeJS).changeSmall();
    }

    private isMonster(playerId: number) {
        let script = this.scriptMap.get(playerId);
        if (!script) return false;
        return script.OwnerID != 0;
    }

    /**获取击杀人数 */
    public getKillPlayerNum(playerID: number) {
        let script = this.scriptMap.get(playerID);
        if (script == null) return 0;
        return script.killCount;
    }
}