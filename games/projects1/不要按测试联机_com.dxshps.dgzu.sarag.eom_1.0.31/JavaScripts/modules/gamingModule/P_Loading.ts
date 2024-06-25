import { GameConfig } from "../../config/GameConfig";
import LevelPics_Generate from "../../ui-generate/Game/LevelPics_generate";
import Loading_Generate from "../../ui-generate/Game/Loading_generate";

const ShowMaxNum = 5
const ItemWidth = 800
const ItemSpacing = 50
const TEMPV2 = new mw.Vector2()

export default class P_Loading extends Loading_Generate {
    allItem: LevelPicsUI[] = []
    curPicsIdx: number = 0
    allWidth: number = 0
    chooseItem: LevelPicsUI = null
    curTime: number = 0
    curSpeed: number = 1500

    private loadingTimer: number;
    private curLevelIndex: number;
    private moveItem: boolean = false;
    onStart() {
        this.layer = mw.UILayerMiddle;

        for (let i = 0; i < ShowMaxNum; i++) {
            let item = mw.UIService.create(LevelPicsUI);
            this.allItem.push(item);
            this.mIconCanvas.addChild(item.uiObject);
            item.setInitPos(TEMPV2.set((ItemWidth + ItemSpacing) * i, (this.mIconCanvas.size.y - item.uiObject.size.y) / 2));
            // item.uiObject.position = TEMPV2.set((ItemWidth + ItemSpacing) * i, (this.mIconCanvas.size.y - item.uiObject.size.y) / 2);
            // this.curPicsIdx++;
        }
        this.allWidth = ShowMaxNum * ItemWidth + (ShowMaxNum - 1) * ItemSpacing
        this.loadingTimer = GameConfig.RuleGame.getElement(10006).int_Value;
    }

    onShow(levelID: number) {
        this.mText_Tips_Loading.text = "下一关是：???";
        this.curLevelIndex = 0;

        let allConfigs = GameConfig.Level.getAllElement();
        for (let i = 0; i < allConfigs.length; i++) {
            if (allConfigs[i].id == levelID) {
                this.curLevelIndex = i;
                break;
            }
        }

        // let config = GameConfig.Level.getElement(levelID);
        // this.mText_Tips_Loading.text = "下一关是：" + config.content;

        for (let i = 0; i < this.allItem.length; i++) {
            this.setItemUI(this.allItem[i], i);
            this.allItem[i].resetScale();
        }
        this.curPicsIdx = 0;
        this.chooseItem = null;
        this.curTime = 0;
        this.moveItem = true;
        this.canUpdate = true;
    }

    onUpdate(dt: number) {
        // 保底处理
        if (this.curTime >= this.loadingTimer + 1) {
            this.setVisible(false)
        }
        this.curTime += dt;

        if (!this.moveItem) return;

        for (let item of this.allItem) {
            item.uiObject.position = TEMPV2.set(item.uiObject.position.x + this.curSpeed * dt, item.uiObject.position.y);
            if (item.uiObject.position.x > this.mIconCanvas.size.x) {
                //时间到时, 选中目标
                if (!this.chooseItem && this.curTime >= this.loadingTimer - 3) {
                    this.curPicsIdx = this.curLevelIndex;
                    this.chooseItem = item;
                    this.setItemUI(item, this.curPicsIdx);
                    item.uiObject.position = TEMPV2.set(item.uiObject.position.x - this.allWidth - ItemSpacing, item.uiObject.position.y);
                    this.curPicsIdx++;
                    //其他图片全部设置一下,防止出现重复图片
                    for (let i = 0; i < this.allItem.length; i++) {
                        if (this.allItem[i] != item) {
                            this.setItemUI(this.allItem[i], this.curPicsIdx);
                            this.curPicsIdx++;
                        }
                    }
                } else {
                    item.uiObject.position = TEMPV2.set(item.uiObject.position.x - this.allWidth - ItemSpacing, item.uiObject.position.y);
                    this.setItemUI(item, this.curPicsIdx);
                    this.curPicsIdx++;
                }
            }
        }

        if (this.chooseItem) {
            //已选中目标,准备停止
            if (this.chooseItem.uiObject.position.x + ItemWidth / 2 - this.mIconCanvas.size.x / 2 >= -15) {
                for (let item of this.allItem) {
                    item.canUpdate = false;
                }
                this.chooseItem.choosed();
                this.moveItem = false;
                let config = GameConfig.Level.getAllElement()[this.curLevelIndex];
                this.mText_Tips_Loading.text = "下一关是：" + config.content;
            }
        }



    }

    setItemUI(item: LevelPicsUI, index: number) {
        let allConfigs = GameConfig.Level.getAllElement();
        item.mImg_Level01.imageGuid = allConfigs[index % allConfigs.length].banner;
    }

    onHide() {
        this.canUpdate = false;
    }
}

class LevelPicsUI extends LevelPics_Generate {
    private isChoosed: boolean = false;
    private scaleRate: number = 1;
    private startP: Vector2 = null;

    choosed() {
        this.canUpdate = true;
        this.isChoosed = true;
    }
    onHide() {
        this.canUpdate = false;
    }

    public setInitPos(pos: Vector2) {
        this.startP = pos.clone();
        this.uiObject.position = this.startP;
    }
    public resetScale() {
        this.uiObject.renderScale = TEMPV2.set(1, 1);
        this.uiObject.position = this.startP;
        this.isChoosed = false;
        this.canUpdate = false;
    }

    onUpdate(dt: number) {
        let offset = this.uiObject.position.x + this.uiObject.size.x / 2 - this.uiObject.parent.size.x / 2;
        if (offset <= 0 && offset > -500 || this.isChoosed) {
            this.uiObject.zOrder = 100;
            let scale = this.uiObject.renderScale;
            if (this.uiObject.renderScale.x < 1.4) {
                this.uiObject.renderScale = scale.set(scale.x + this.scaleRate * dt, scale.y + this.scaleRate * dt);
            }
        } else if (offset > 0 && offset < 500) {
            this.uiObject.zOrder = 1;
            let scale = this.uiObject.renderScale;
            if (this.uiObject.renderScale.x > 1) {
                this.uiObject.renderScale = scale.set(scale.x - this.scaleRate * dt, scale.y - this.scaleRate * dt);
            }
        } else {
            if (this.uiObject.renderScale.x != 1) {
                this.uiObject.renderScale = TEMPV2.set(1, 1);
            }
        }

        if (this.uiObject.renderScale.x > 1.4) {
            this.uiObject.renderScale = TEMPV2.set(1.4, 1.4);
        }

        if (this.uiObject.renderScale.x < 1) {
            this.uiObject.renderScale = TEMPV2.set(1, 1);
        }
    }
}
