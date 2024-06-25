import { GameConfig } from "../../../../config/GameConfig";
import { IItemElement } from "../../../../config/Item";
import BossResultItem_UI_Generate from "../../../../ui-generate/ShareUI/boss/BossResultItem_UI_generate";
import BossResult_UI_Generate from "../../../../ui-generate/ShareUI/boss/BossResult_UI_generate";
import { GridContainer } from "../../../utils/UIPool";

export class BossResultUI extends BossResult_UI_Generate {
    private _con: GridContainer<ItemResultUI>;

    private _timer: number = 0;

    private prizeImgs: Image[] = [];

    onStart() {
        this.layer = UILayerDialog;
        this._con = new GridContainer(this.mCanvas_ResultItem, ItemResultUI);
        this.closeBtn.onClicked.add(() => {
            UIService.hideUI(this);
        })
        this.prizeImgs.push(this.mImage_gold);
        this.prizeImgs.push(this.mImage_silver);
        this.prizeImgs.push(this.mImage_bronze);
    }

    showReward(ids: number[], counts: number[], issuc: boolean, level: number) {
        this.mCanvas_BossResult.visibility = SlateVisibility.SelfHitTestInvisible;
        if (issuc) {
            this.mTextBlock_Win.visibility = SlateVisibility.SelfHitTestInvisible;
            this.mTextBlock_Lose.visibility = SlateVisibility.Collapsed;
            this.mCanvas_BossPrice.visibility = SlateVisibility.SelfHitTestInvisible;
        }
        else {
            this.mTextBlock_Win.visibility = SlateVisibility.Collapsed;
            this.mTextBlock_Lose.visibility = SlateVisibility.SelfHitTestInvisible;
            this.mCanvas_BossPrice.visibility = SlateVisibility.Collapsed;
        }
        level = 3 - level;
        for (let index = 0; index < this.prizeImgs.length; index++) {
            const element = this.prizeImgs[index];
            element.visibility = level == index ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
        }

        this._con.clear();
        for (let index = 0; index < ids.length; index++) {
            const id = ids[index];
            const cfg = GameConfig.Item.getElement(id);
            if (!cfg) {
                continue;
            }
            this._con.addNode().setData(cfg, counts[index]);
        }
        this._timer = 5;
        UIService.showUI(this, this.layer);

        this.canUpdate = true;
    }

    onUpdate(dt: number) {
        this._timer -= dt;
        if (this._timer <= 0) {
            this.mCanvas_BossResult.visibility = SlateVisibility.Collapsed;
        }
    }
}

class ItemResultUI extends BossResultItem_UI_Generate {
    setData(cfg: IItemElement, count: number) {
        this.mImage_BossResultItem.imageGuid = cfg.icon;
        this.mTextBlock_BossResultItemNum.text = `${count}`
    }

}

