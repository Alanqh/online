/** 
 * @Author       : lei.zhao
 * @Date         : 2023-09-05 11:16:22
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-11-23 15:44:59
 * @FilePath     : \stumbleguys_new\JavaScripts\UI\LevelChooseUI.ts
 * @Description  : 修改描述
 */
import { GameConfig } from "../config/GameConfig";
import { LifeState } from "../Prefabs/GameStater/Script/LifeState";
import { TeamManager } from "../Prefabs/GameStater/Script/TeamManager";
import { LanUtils } from "../tool/LanguageUtil";
import LevelChoose_Generate from "../ui-generate/LevelPic/LevelChoose_generate";
import LevelPicsUI from "./LevelPicsUI";

const TEMPV2 = new mw.Vector2()

export default class LevelChooseUI extends LevelChoose_Generate {

    private levelPicIndex: number = 0;
    private allItem: LevelPicsUI[] = [];
    // private zOrderItem: LevelPicsUI[] = [];
    private interval = null;
    private sizeX = 0;
    private speed = 1500;
    /**
     * 已经过去的时间
     */
    private passTime = 0;

    private showMaxNum = 5
    private itemWidth = 480
    private itemSpacing = 55
    private currentIndex = 0;
    private totalTime: number = 5;
    private isStop: boolean = false;
    private stageData: { pic: number, name: string }[] = [];
    private delay: number = 0;
    private isStart: boolean = false;
    private preIndex = 0;
    private zOrderIndex = 0;
    private midPicUI: LevelPicsUI;
    /**
     * 找图片
     */
    private isPreFind: boolean = false;
    private handle: mw.EventListener[] = [];
    onAwake() {
        Event.addLocalListener(`LanguageInit`, () => {
            super.onAwake();
            this.start();
        });

    }

    start() {
        this.layer = mw.UILayerTop;
        const pic = GameConfig.GameInfo.getElement(1).levelPic;
        const cfg = GameConfig.ChooseInfo.getElement(1);
        for (let i = 0; i < cfg.picList.length; i++) {
            this.stageData.push({
                pic: cfg.picList[i],
                name: LanUtils.getLanguage(cfg.picNameList[i])
            });
        }
        //乱序
        this.stageData.sort(() => MathUtil.randomFloat(-1, 1));
        while (this.stageData.length < 30) {
            this.stageData.push(...this.stageData);
        }
        this.levelPicIndex = this.stageData.findIndex(i => i.pic == pic);

        //兼容找不到图片的问题
        if (this.levelPicIndex < 0) this.levelPicIndex = 0;
        this.handle.push(Event.addLocalListener("GameState.CountDown.Client", () => {
            this.destroy();
        }))
        this.handle.push(Event.addLocalListener("GameState.Gameing.Client", () => {
            this.destroy();
        }))
        this.handle.push(Event.addLocalListener("GameState.Overlook.Client", () => {
            this.destroy();
        }));

        this.totalTime = GameConfig.GameInfo.getElement(1).loadTime;
        this.handle.push(Event.addLocalListener("GameState.Join.Client", () => {
            this.passTime = 0;
            this.isStart = true;
        }))
        this.mTextBlockRound.text = "";
        this.handle.push(
            Event.addServerListener("TeamState.Answer", (state: LifeState, round: string, time: number) => {
                if (state != LifeState.Loading && state != LifeState.Idle) {
                    //状态不对，关闭
                    this.destroy();
                    return;
                } else if (state == LifeState.Loading) {
                    this.isStart = true;
                    this.passTime = time;
                }
                this.mTextBlockRound.text = "Round   " + round
            })
        )
        if (TeamManager.teams[0]) {
            const teamState = TeamManager.teams[0].state
            if (teamState != LifeState.Loading && teamState != LifeState.Idle) {
                this.destroy();
                return;
            }
        }

        Player.asyncGetLocalPlayer().then((player) => {
            Event.dispatchToServer("TeamState.Ask");
        });

        this.delay = 0.1;
        this.canUpdate = true;
    }
    onUpdate(dt: number) {
        this.delay -= dt;
        if (this.delay <= 0) {
            if (!this.sizeX) {
                this.init();
            } else {
                this.update(dt);
            }
        }
    }
    private init() {
        this.sizeX = this.mIconCanvas.size.x;
        this.showMaxNum = Math.ceil(this.sizeX / this.itemWidth) + 1;
        this.currentIndex = this.showMaxNum;
        this.itemSpacing = 55;
        this.zOrderIndex = this.showMaxNum + 5;
        for (let i = 0; i < this.showMaxNum; i++) {
            let item = mw.UIService.create(LevelPicsUI);
            this.mIconCanvas.addChild(item.uiObject);
            item.uiObject.position = TEMPV2.set((this.itemWidth + this.itemSpacing) * i - 2, (this.mIconCanvas.size.y - item.uiObject.size.y) / 2);
            item.mIconPic.imageGuid = this.stageData[i].pic.toString();
            item.mTextBlock.text = this.stageData[i].name;
            this.allItem.push(item);
            // this.zOrderItem.push(item);
            this.mIconCanvas.addChild(item.uiObject);
        }
    }
    private nextLevelPic(pic: LevelPicsUI) {
        this.currentIndex = (this.currentIndex + 1) % this.stageData.length;
        if (this.isPreFind) {
            //更换正确图片
            if (this.preIndex == 1) {
                pic.mIconPic.imageGuid = this.stageData[this.levelPicIndex].pic.toString();
                pic.mTextBlock.text = this.stageData[this.levelPicIndex].name;
            } else {
                let rd = this.stageData[this.currentIndex];
                while (this.stageData[this.levelPicIndex] && rd.name == this.stageData[this.levelPicIndex].name) {
                    this.currentIndex = (this.currentIndex + 1) % this.stageData.length;
                    rd = this.stageData[this.currentIndex];
                }
                pic.mIconPic.imageGuid = rd.pic.toString();
                pic.mTextBlock.text = rd.name;
            }
            this.preIndex++;
        } else {
            pic.mIconPic.imageGuid = this.stageData[this.currentIndex].pic.toString();
            pic.mTextBlock.text = this.stageData[this.currentIndex].name;
        }
    }
    onDestroy() {
        this.midPicUI && this.midPicUI.stopTween();
        for (let i of this.handle) {
            i.disconnect();
        }
        this.handle = [];
        RoomService.reportLogInfo("ts_game_result", "轮播图结束", JSON.stringify({ "record": "101" }));
        Event.dispatchToLocal("showChatView");
        this.interval && clearInterval(this.interval);
    }
    private update(dt: number) {
        if (this.isStop) return;
        this.move(dt);
        if (!this.isStart) return;
        const time = this.totalTime - this.passTime;
        this.isPreFind = time <= (this.sizeX / 1500) + 3;
        if (this.isPreFind) {
            //需要停止 
            this.speed = this.isStop ? 0 : MathUtil.clamp(time * 350, 100, 1000);
            //更换图片和名字
            if (time <= 3)
                this.checkStop(dt);
        }
        this.passTime += dt;

    }

    private checkStop(dt: number) {
        if (!this.isStop && this.midPicUI && (this.midPicUI.mTextBlock.text == this.stageData[this.levelPicIndex].name)) {
            this.isStop = Math.abs(this.midPicUI.uiObject.position.x - this.sizeX / 2 + this.itemWidth / 2) < this.speed * dt + 15;
            if (this.isStop) {
                //移动到中间
                const xOffset = this.sizeX / 2 - this.itemWidth / 2 - this.midPicUI.uiObject.position.x;
                this.speed = 1;
                this.move(xOffset);
                this.midPicUI.showTween();

            }
        }
    }

    private move(dt: number) {
        const offset = this.speed * dt;
        const midLine = this.sizeX / 2 - this.itemWidth - 100;
        for (let i = 0; i < this.allItem.length; i++) {
            const picUI = this.allItem[i];
            TEMPV2.set(picUI.uiObject.position);
            const isFixZorderPre = TEMPV2.x < midLine;
            TEMPV2.x += offset;
            if (isFixZorderPre && TEMPV2.x >= midLine) {
                picUI.uiObject.zOrder = this.zOrderIndex++;
                this.midPicUI = picUI;
            }
            picUI.uiObject.position = TEMPV2;
        }
        // let isFixZorder = false;
        for (let i = 0; i < this.allItem.length; i++) {
            const picUI = this.allItem[i];
            TEMPV2.set(picUI.uiObject.position);
            if (TEMPV2.x >= this.sizeX) {
                TEMPV2.x = this.allItem[(i + 1) % this.allItem.length].uiObject.position.x - this.itemWidth - this.itemSpacing;
                this.nextLevelPic(this.allItem[i]);
                picUI.uiObject.position = TEMPV2;
            }
            const scale = MathUtil.clamp((1 - Math.abs(TEMPV2.x + this.itemWidth / 2 - this.sizeX / 2) / this.sizeX) * 1.4, 1, 1.4);
            picUI.uiObject.renderScale = TEMPV2.set(scale, scale);
        }
        // if (!isFixZorder) return;
        // //fixZOrder
        // this.zOrderItem.sort((a, b) => {
        //     return a.uiObject.renderScale.x - b.uiObject.renderScale.x;
        // });
        // for (let i = 0; i < this.zOrderItem.length; i++) {
        //     const zOrder = this.zOrderItem[i].uiObject.zOrder;
        //     if (zOrder != i) {
        //         this.zOrderItem[i].uiObject.zOrder = i;
        //     }
        // }
    }
}