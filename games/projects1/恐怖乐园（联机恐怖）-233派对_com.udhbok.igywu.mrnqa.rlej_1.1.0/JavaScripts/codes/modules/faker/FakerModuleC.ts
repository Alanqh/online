/*
 * @Author: yudong.wu yudong.wu@appshahe.com
 * @Date: 2024-05-19 15:48:44
 * @LastEditors: yudong.wu yudong.wu@appshahe.com
 * @LastEditTime: 2024-05-20 16:08:49
 * @FilePath: \1001_hall\JavaScripts\codes\modules\faker\FakerModuleC.ts
 * @Description: 
 */
/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-04-18 16:53:11
 * @LastEditors: yudong.wu yudong.wu@appshahe.com
 * @LastEditTime: 2024-05-17 18:12:24
 * @FilePath: \1001_hall\JavaScripts\codes\modules\faker\FakerModuleC.ts
 * @Description  : 
 */



import { AddGMCommand } from "module_gm";
import FakerModuleS from "./FakerModuleS";
import FakerScript from "./FakerScript";
import { EGameTheme } from "../../Defines";
import GameStart from "../../GameStart";
import { DanmakuModuleC } from "../danmaku/DanmakuModule";
import { LanUtil } from "../../utils/LanUtil";
import { GameConfig } from "../../../config/GameConfig";
import { CommonUtils } from "../../utils/CommonUtils";

AddGMCommand("生成一个伪人", () => {

}, () => {
    ModuleService.getModule(FakerModuleS).createFaker()
})

export default class FakerModuleC extends ModuleC<FakerModuleS, null> {

    /**是否被伪人锁定 */
    public static beLocked: boolean = false;

    public fakerMap: Map<string, mw.Character> = new Map;

    protected onStart(): void {
        Event.addLocalListener("PlayerAlready", () => {
            if (GameStart.GameTheme != EGameTheme.Hall) {
                this.server.net_playerReady(this.localPlayerId)
            }
        })
    }

    /**
     * 拍个伪人
     * @param goId 
     */
    public async shotOneFaker(goId: string): Promise<number> | null {
        const faker = await GameObject.asyncFindGameObjectById(goId);
        if (!faker["photoTag"]) { return null; }
        const providePieceArr: number[][] = GameConfig.SubGlobal[`${faker["photoTag"]}Pieces`].numberList;
        // 权重列表
        const weightArr = providePieceArr.map(v => { return v[1] });
        // 索引
        const index = CommonUtils.weightRandom(weightArr);
        // 找到图录配置
        const graphCfg = GameConfig.GhostGraph.getAllElement().find(v => { return v.tag === faker["photoTag"] });
        // 找到碎片配置
        const pieceCfg = GameConfig.GhostFragment.getAllElement().find(v => { return v.ghostGraphId === graphCfg.id && v.fragmentCode === providePieceArr[index][0] });
        // 返回碎片id
        return pieceCfg.id;
    }

    /**扫描伪人 */
    private scanFaker() {
        if (!this.localPlayer || !this.localPlayer.character) return;
        let forward = this.localPlayer.character.worldTransform.getForwardVector().normalize()
        let startPos = Vector.add(this.localPlayer.character.worldTransform.position, forward.multiply(50));
        let endPos = Vector.add(startPos, forward.multiply(260))
        let hitResult = QueryUtil.boxTrace(startPos, endPos, new Vector(40, 40, 40), mw.Rotation.zero, true, false);
        for (let i = 0; i < hitResult.length; ++i) {
            if (!hitResult[i].gameObject || !hitResult[i].gameObject.tag) continue;
            if (hitResult[i].gameObject.tag == "Faker") {
                let script = hitResult[i].gameObject.getComponent(FakerScript)
                script.beFoundClient();
                break;
            }
        }
    }

    public saveFaker(faker: mw.Character) {
        if (this.fakerMap.has(faker.gameObjectId)) return
        this.fakerMap.set(faker.gameObjectId, faker);
    }

    public net_deleteFaker(gameObjectId: string) {
        if (!this.fakerMap.has(gameObjectId)) return
        this.fakerMap.delete(gameObjectId)
    }

    public net_fakerBeCleaned(name: string, text: string, type: number) {
        ModuleService.getModule(DanmakuModuleC).net_ChatEmoji(name, StringUtil.format(LanUtil.getText(text), name), type)
    }

    /**伪人被发现的客户端表现 */
    public async net_findFaker(gameObjectId: string) {
        let faker = await GameObject.asyncFindGameObjectById(gameObjectId) as Character;
        if (faker) {
            if (faker.player) {
                const playerId = faker.player.playerId;
                faker.setOutline(true, LinearColor.red, 0.4);
                setTimeout(() => {
                    Player.getPlayer(playerId)?.character?.setOutline(false);
                }, 5000);
                return;
            }
        }
    }

    /**伪人报警 */
    public async reportFaker(gameObjectId: string) {
        let faker = await GameObject.asyncFindGameObjectById(gameObjectId) as Character;
        if (faker) {
            Event.dispatchToLocal("Bubble_scMsg", StringUtil.format(LanUtil.getText("Report_12"), this.localPlayer.character.displayName, faker.displayName));
            let index = MathUtil.randomInt(0, GameConfig.Report.getAllElement().length);
            this.server.net_warnFaker(gameObjectId, GameConfig.Report.getAllElement()[index].content)
            return true
        }
    }


    protected onUpdate(dt: number): void {
        if (FakerModuleC.beLocked) {
            this.scanFaker();
        }
    }
}