import { oTraceError } from "odin";
import InteractBtn from "../../utils/UI/InteractBtn";


@Component
export default class RP_Bed extends Script {

    @Property({ displayName: "爬的触发器GUID" })
    private crawlTriggerGuid: string = "";

    @Property({ displayName: "躲藏区域的触发器GUID" })
    private hideTriggerGuid: string = "";

    @Property({ displayName: "爬的动画Guid" })
    private crawlAnimGuid: string = "14613";

    @Property({ displayName: "爬行时胶囊碰撞体v3" })
    private crawlCapsuleV3: Vector = new Vector(50, 150, 50);

    // C端字段
    private isCrawling: boolean = false;

    // S端字段
    private crawlAnimMap: Map<number, Animation> = new Map();

    protected onStart(): void {
        if (SystemUtil.isClient()) {
            this.initClient();
        } else {
            this.initServer();
        }
    }


    private initClient() {
        let crawlTrigger = GameObject.findGameObjectById(this.crawlTriggerGuid) as Trigger;
        if (crawlTrigger == null) {
            oTraceError("RP_Bed initClient error, crawlTrigger not find! guid = " + this.crawlTriggerGuid);
            return;
        }
        crawlTrigger.onEnter.add(this.onEnterCrawlTrigger.bind(this));
        crawlTrigger.onLeave.add(this.onLeaveCrawlTrigger.bind(this));
    }

    private initServer() {

        let hideTrigger = GameObject.findGameObjectById(this.hideTriggerGuid) as Trigger;
        if (hideTrigger == null) {
            oTraceError("RP_Bed initClient error, hideTrigger not find! guid = " + this.hideTriggerGuid);
            return;
        }
        hideTrigger.onEnter.add(this.onEnterHideTrigger.bind(this));
        hideTrigger.onLeave.add(this.onLeaveHideTrigger.bind(this));
    }

    /**进入爬触发器 */
    private onEnterCrawlTrigger() {
        console.log("进入爬触发器");
        InteractBtn.instance.addClickFun(this.switchCrawlState, this, Player.localPlayer.playerId);
    }

    /**离开爬触发器 */
    private onLeaveCrawlTrigger() {
        console.log("离开爬触发器");
        // 离开触发器时如果正在爬，取消爬
        if (this.isCrawling == true) {
            this.switchCrawlState(Player.localPlayer.playerId);
        }
        InteractBtn.instance.removeClickFun(this.switchCrawlState, this, Player.localPlayer.playerId);
    }

    /**进入躲藏触发器 */
    private onEnterHideTrigger() {

    }

    /**离开躲藏触发器 */
    private onLeaveHideTrigger() {

    }


    private switchCrawlState(playerId: number) {
        if (this.isCrawling) {
            this.endCrawl(playerId);
        } else {
            this.startCrawl(playerId);
        }
        this.isCrawling = !this.isCrawling;
    }

    @RemoteFunction(mw.Server)
    private async startCrawl(playerId: number) {
        let character = Player.getPlayer(playerId)?.character;
        if (character == null) {
            oTraceError("RP_Bed startCrawl error, player not find! playerId = " + playerId);
            return;
        }
        console.log("开始爬")
        let anim = this.crawlAnimMap.get(playerId);
        if (anim == null) {
            if (!AssetUtil.assetLoaded(this.crawlAnimGuid)) await AssetUtil.asyncDownloadAsset(this.crawlAnimGuid);
            anim = character.loadAnimation(this.crawlAnimGuid);
            anim.loop = 0;
            this.crawlAnimMap.set(playerId, anim);
        }
        anim.play();
        character.capsuleCorrectionEnabled = false;
        character.setCollisionShapeAndExtent(CustomShapeType.HorizontalCapsule, this.crawlCapsuleV3);
    }


    @RemoteFunction(mw.Server)
    private endCrawl(playerId: number) {
        let character = Player.getPlayer(playerId)?.character;
        if (character == null) {
            oTraceError("RP_Bed startCrawl error, player not find! playerId = " + playerId);
            return;
        }
        let anim = this.crawlAnimMap.get(playerId);
        if (anim == null) {
            oTraceError("RP_Bed endCrawl error, anim not find! playerId = " + playerId);
            return;
        }
        console.log("停止爬")
        anim.stop();
        character.capsuleCorrectionEnabled = true;
        character.description.advance.bodyFeatures.body.height = character.description.advance.bodyFeatures.body.height;
    }

}