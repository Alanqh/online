import map_Generate from "../../../../ui-generate/ShareUI/世界UI/map_generate";
import { LanUtil } from "../../../utils/LanUtil";
import Tips from "../../../utils/Tips";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import DoorScript from "../../DoorScript";
import PushItemControl from "../../Level/PushItemControl";
import { BagModuleC } from "../../bag/BagModuleC";
import { BoardHelper } from "../../blackboard/BoardDefine";
import ItemPicker from "../../controller/ItemPicker";
import { HintTraceUI, HintUI } from "../../equip/ui/HintUI";
import HandTriggerCom from "../HandTriggerCom";

const nearVec = new Vector(500, 500, 500);

interface IChainItem {
    isUseCue: boolean;
    setCueSave();
    setCueUnSave();
}

export class ItemTraceHelper {
    public static instance: ItemTraceHelper = new ItemTraceHelper();

    private itemPickerMap: Map<number, ItemPicker[]> = new Map();

    private _curId: number = 0;

    private _traceItem: ItemPicker;

    private _targetPos: Vector = Vector.zero;

    private _selectedChain: IChainItem;

    private _traceChain: IChainItem;

    private _traceItemId: number = 0;

    private _traceIdMap: Map<number, boolean> = new Map();

    public constructor() {
        Event.addLocalListener(BoardHelper.BoardClearEvent, () => {
            this._traceItemId = 0;
            this.hideTrace();
            this._traceIdMap.clear();
        })
    }

    public hideTrace() {
        UIService.hide(HintTraceUI);
        if (this._traceItem) {
            let go = this._traceItem.gameObject;
            go.worldTransform && this.highLightByColor(go, false);
            this._traceItem = null;
            this._traceItemId = 0;
        }
    }

    public addItemPicker(picker: ItemPicker) {
        if (!this.itemPickerMap.has(picker.itemId)) {
            this.itemPickerMap.set(picker.itemId, []);
        }
        this.itemPickerMap.get(picker.itemId).push(picker);
    }

    public removePicker(picker: ItemPicker, isItem: boolean = false) {
        if (!picker) {
            return;
        }
        if (this.itemPickerMap.has(picker.itemId)) {
            const arr = this.itemPickerMap.get(picker.itemId);
            const index = arr.indexOf(picker);
            if (index !== -1) {
                arr.splice(index, 1);
            }
        }
        if (!isItem) {
            return;
        }
        if (this._traceItem && this._traceItem.itemId == picker.itemId) {
            UIService.hide(HintTraceUI);
            const go = this._traceItem.gameObject;
            go.worldTransform && this.highLightByColor(go, false);
            GhostTraceHelper.uploadMGS("ts_action_upgrade_pet", "寻路状态", { isfirstupgrade: this._traceItem.itemId, lifetime: 2 });
            this._traceItem = null;
            // if (this._traceChain && this._traceChain.isUseCue) {
            //     this._traceChain.setCueUnSave()
            // }
        }
    }

    public traceItem(itemId: number, trigger: HandTriggerCom, chain: IChainItem) {
        let itemNum = trigger.isNeedTip;
        if (chain.isUseCue) {
            itemNum = 0;
        }
        if (this._traceIdMap.get(itemId)) {
            itemNum = 0;
        }
        this._curId = itemId;
        let arr = this.itemPickerMap.get(itemId);
        if (!arr || arr.length == 0) {
            return;
        }
        UIService.show(HintUI);
        let ui = UIService.getUI(HintUI);
        ui.showHint(this._curId == this._traceItemId ? 1 : 0)
        ui.setNum(itemNum);
        this._selectedChain = chain
    }

    public hideTraceUI() {
        UIService.getUI(HintUI).hideHint();
    }

    public startTrace() {
        if (this._selectedChain) {
            this._selectedChain.setCueSave();
        }
        if (this._traceItem) {
            GhostTraceHelper.uploadMGS("ts_action_upgrade_pet", "寻路状态", { isfirstupgrade: this._traceItem.itemId, lifetime: 1 });
            this.highLightByColor(this._traceItem.gameObject, false);
        }
        let arr = this.itemPickerMap.get(this._curId);
        let charpos = Player.localPlayer.character.worldTransform.position;
        let item = arr[0];
        let curDis = Vector.distance(charpos, arr[0].gameObject.worldTransform.position);
        for (let index = 1; index < arr.length; index++) {
            const newItem = arr[index];
            if (!newItem) {
                continue;
            }
            let trans = newItem.gameObject.worldTransform
            if (!trans) {
                continue;
            }
            const dis = Vector.distance(trans.position, charpos);
            if (curDis > dis) {
                curDis = dis;
                item = newItem;
            }
        }
        this._traceItem = item;
        this._traceChain = this._selectedChain;
        this._traceItemId = this._curId;
        this._targetPos.set(item.gameObject.worldTransform.position);
        this.highLightByColor(item.gameObject, true);
        let newPos = this._targetPos;
        newPos = Navigation.getClosestReachablePoint(newPos, nearVec);
        UIService.getUI(HintTraceUI).setTargetLoc(newPos, this._targetPos);
        Tips.show(LanUtil.getText("UI_lightBulbUsed_01"))
        GhostTraceHelper.uploadMGS("ts_action_upgrade_pet", "寻路状态", { isfirstupgrade: this._traceItem.itemId, lifetime: 0 });
    }

    public checkGo(go: GameObject) {
        if (!this._traceItem) {
            return;
        }
        if (go["interTag"] == this._traceItem.gameObject["interTag"]) {
            let model = go as Model
            model.setPostProcessOutline(true, LinearColor.yellow, 4);
        }
    }

    private highLightByColor(root: GameObject, isHigh: boolean) {
        root["shighFunc"](isHigh, LinearColor.yellow);
    }

    public setItemTrace(itemId: number, isTrace: boolean) {
        this._traceIdMap.set(itemId, isTrace);
    }
}