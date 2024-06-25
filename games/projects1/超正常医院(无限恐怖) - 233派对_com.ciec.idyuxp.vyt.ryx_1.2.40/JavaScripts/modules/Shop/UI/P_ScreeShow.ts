import { GameConfig } from "../../../config/GameConfig";
import { IScreenshowElement } from "../../../config/Screenshow";
import ScreenShowPanel_Generate from "../../../ui-generate/Shop/ScreenShow/ScreenShowPanel_generate";
import { ShopData } from "../ShopData";
import { ShopModuleC } from "../ShopModuleC";
import { P_ScreenShowItem } from "./P_ScreenShowItem";

export class P_ScreeShow extends ScreenShowPanel_Generate {
    private shopData: ShopData | null = null;
    private selectState: SelectState;
    /**购买事件 类型，id  */
    public onClickScreenItem: Action2<number, number> = new Action2();
    public shopModuleC: ShopModuleC;
    public itemId: number = 11011;

    protected onAwake(): void {
        this.layer = UILayerMiddle;

        this.shopModuleC = ModuleService.getModule(ShopModuleC);
        this.shopData = DataCenterC.getData(ShopData);
        this.selectState = this.shopData && this.shopData.isShowGift ? SelectState.Unchecked : SelectState.Checked;
        this.updateSelectState();
        this.setupCheckBox();
        this.mBtn_Close.onClicked.add(() => {
            this.itemId++;
            if (this.itemId > 11013) {
                this.hide();
            } else {
                this.hide();
                this.shopModuleC.showScreenShop(this.itemId);
            }
        });
    }

    /** 设置单选框 */
    private setupCheckBox(): void {
        this.mBtn_Select.onClicked.add(() => {
            this.selectState = this.selectState === SelectState.Checked ? SelectState.Unchecked : SelectState.Checked;
            this.updateSelectState();
            this.shopModuleC.setShowGiftInfo(this.selectState === SelectState.Unchecked);
        });
    }

    /** 更新单选框状态 */
    private updateSelectState(): void {
        this.mImg_Select.visibility = this.selectState === SelectState.Checked ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }

    public showScreen(config: IScreenshowElement) {
        this.show();
        //商品容器
        this.mCanvas_Item.removeAllChildren();
        this.mCanvas_Item.position = config.CanvasLoaction;
        config.ItemID.forEach((itemId, index) => {
            let screenItem = UIService.create(P_ScreenShowItem);
            screenItem.uiObject.size = new Vector2(300, 400);
            screenItem.uiObject.renderScale = new Vector2(config.ItemSize[0], config.ItemSize[0]);
            screenItem.init(GameConfig.ShopItem.getElement(itemId), this, !config.IsTransfer)
            screenItem.uiObject.position = config.ItemLocation[index];
            this.mCanvas_Item.addChild(screenItem.uiObject);
            screenItem.mTxt_name.text = config.ItemName[index];

        });

        if (config.IsTransfer) {
            this.mBtn_Transfer.onClicked.clear();
            this.mBtn_Transfer.onClicked.add(() => {
                this.shopModuleC.showShop(config.transferType, config.transferChildType);
            });
            this.mCanvas_Item.visibility = SlateVisibility.SelfHitTestInvisible;
            this.mBtn_Transfer.enable = true;
            this.mBtn_Transfer.visibility = SlateVisibility.Visible;
        } else {
            console.warn(`lwj 移仓`);
            this.mCanvas_Item.visibility = SlateVisibility.Visible;
            this.mBtn_Transfer.enable = false;
            this.mBtn_Transfer.visibility = SlateVisibility.Collapsed;
        }
        //界面背景
        this.mImg_BG.imageGuid = config.BG;
        //标题背景和位置
        this.mImg_Title.position = config.TitleLoaction;
        this.mImg_Title.imageGuid = config.Title;
        //立绘背景和位置
        this.mImg_Picturebg.position = config.PictureBGLocation
        this.mImg_Picturebg.imageGuid = config.PictureBG;
        //立绘和位置
        this.mImg_Picture.position = config.PictureLoaction
        this.mImg_Picture.imageGuid = config.Picture;
        //活动时间字样
        this.mTxt_Time.position = config.TimeLocation;
        this.mTxt_Time.text = this.mTxt_Time.text + config.Time;
        //活动说明
        this.mTxt_Describe.position = config.DescribeLoaction;
        this.mTxt_Describe.text = this.mTxt_Describe.text + config.Describe;

    }
}

export enum SelectState {
    Unchecked,
    Checked
}
