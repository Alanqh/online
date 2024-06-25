import { FindModuleC } from "./FindModuleC";

@Component
export default class FindCom extends Script {
    private _ispick: boolean = false;;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        Event.addLocalListener("FindCom", async (guid: string) => {
            if (guid != this.gameObject.gameObjectId) {
                return;
            }
            if (this._ispick) {
                return;
            }
            this._ispick = true;
            const cfgId = Number(this.gameObject.name);
            const module = ModuleService.getModule(FindModuleC);
            module.reqFindItem(cfgId);
            module.setAsWater(this.gameObject);
            module.findHallItem(cfgId);
            this.gameObject.setCollision(CollisionStatus.Off, true);
            this.gameObject.getChildByName("pickEffect").setVisibility(PropertyStatus.Off, true)
        })
        Event.addLocalListener("OnFindItem", (id: number) => {
            if (id != Number(this.gameObject.name)) {
                return;
            }
            if (this._ispick) {
                return;
            }
            this._ispick = true;
            const cfgId = Number(this.gameObject.name);
            const module = ModuleService.getModule(FindModuleC);
            module.reqFindItem(cfgId);
            module.setAsWater(this.gameObject);
            module.findHallItem(cfgId);
            this.gameObject.setCollision(CollisionStatus.Off, true);
            this.gameObject.getChildByName("pickEffect").setVisibility(PropertyStatus.Off, true)
        })
    }


}