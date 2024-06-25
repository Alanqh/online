/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-26 11:08:40
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-25 15:53:16
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\store\ShopBean.ts
 * @Description  : 
 */

import { GameConfig } from "../../../config/GameConfig";
import { IShopElement } from "../../../config/Shop";
import UIShop from "./ui/UIShop";

export default class ShopBean {
    private _shopID: number = 1
    private _shopData: IShopElement[] = []
    private _isReady: boolean = false;
    private _shopCamera: Camera;
    private _shopPoint: mw.GameObject;
    private _playerCamera: Camera;
    private _models: Map<number, mw.GameObject> = new Map();
    private _curItem: mw.GameObject;
    private _curItemID: number;
    private _tempRotation: Rotation = Rotation.zero;
    constructor(shopID: number, camera: Camera, point: mw.GameObject) {
        this._shopID = shopID;
        this._shopCamera = camera;
        this._shopPoint = point;
        this._shopData = GameConfig.Shop.getAllElement().filter(e => e.shopID == shopID);
        this._playerCamera = Camera.currentCamera;
        this.initShop()
    }

    async initShop() {
        if (!this._shopCamera || !this._shopPoint || !this._shopData) return
        this._shopData.forEach(async e => {
            let item = await GameObject.asyncSpawn(e.modelGuid)
            if (!item) return
            if (e.otherRot) item.worldTransform.rotation = new Rotation(e.otherRot.x, e.otherRot.y, e.otherRot.z)
            if (e.otherScale) item.worldTransform.scale = e.otherScale;
            item.worldTransform.position = this._shopPoint.worldTransform.position.clone()
            if (e.otherLoc) item.worldTransform.position = item.worldTransform.position.add(e.otherLoc)
            item.setVisibility(mw.PropertyStatus.Off, true)
            this._models.set(e.id, item)
        })
        this._isReady = true;
    }

    public openStore() {
        if (!this._isReady) return
        Camera.switch(this._shopCamera);
        UIService.show(UIShop, this._shopID)
        // UIService.hide(MainUI)
        let filterUI = ["Animation2D_Generate", "UIShop", "GMHUD_Generate", "Tips"]
        //偏移已经打开的ui
        UIService[`inst`][`createPanelMap`].forEach((panels, name) => {
            panels.forEach(element => {
                if (element.visible && !filterUI.includes(name)) {
                    element.uiObject.position = new Vector(100000, 0)
                }
            });
        });
        // let shop = UIService.getUI(UIShop)
        // let x = shop.canvas_list.position.x / 2;
        // let y = getViewportSize().y / 2
        // let myResult = InputUtil.convertScreenLocationToWorldSpace(x, y);

        // if (myResult.result) {
        //     let pos = Vector.add(myResult.worldPosition, myResult.worldDirection.multiply(2000))
        //     pos.z = this._shopPoint.worldTransform.position.z
        //     console.log("AAAAAAAAAAAAAAAAAAAAAAAAA22", pos);
        //     this._shopPoint.worldTransform.position = pos
        //     setInterval(() => {
        //         QueryUtil.lineTrace(myResult.worldPosition, pos, true, true)
        //     }, 2000)
        // }
    }

    public closeStore() {
        Camera.switch(this._playerCamera);
        UIService.hide(UIShop)
        this._curItem?.setVisibility(mw.PropertyStatus.Off, true);
        // UIService.show(MainUI)
    }

    public selectItem(itemID: number) {
        console.log("AAAAAAAAAA选中物品", itemID, "#####当前物品", this._curItem);
        if (!this._models.has(itemID)) return
        if (this._curItem) {
            let data = GameConfig.Shop.getElement(this._curItemID)
            this._curItem.setVisibility(mw.PropertyStatus.Off, true);
            this._curItem.worldTransform.rotation = data.otherRot ? new Rotation(data.otherRot.x, data.otherRot.y, data.otherRot.z) : Rotation.zero;
        }
        let item = this._models.get(itemID)
        item.setVisibility(mw.PropertyStatus.On, true)
        this._curItem = item
        this._curItemID = itemID
        let data = GameConfig.Shop.getElement(this._curItemID)
        this._tempRotation = data.otherRot ? new Rotation(data.otherRot.x, data.otherRot.y, data.otherRot.z) : Rotation.zero;
    }

    public rotateModel(state: boolean) {
        if (!this._curItem) return
        let delta = state ? -10 : 10
        this._tempRotation.z += delta
        this._curItem.worldTransform.rotation = this._tempRotation
    }

    public setRotate(rotation: Rotation) {
        if (this._curItem) this._curItem.worldTransform.rotation = rotation
    }

    public setScale(scale: Vector) {
        if (this._curItem) this._curItem.worldTransform.scale = scale
    }
    public setPosition(pos: Vector) {
        if (this._curItem) this._curItem.worldTransform.position = this._curItem.worldTransform.position.add(pos)
    }
}