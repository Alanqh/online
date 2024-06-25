
@Component
export default class MoTianLun extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        const roll = this.gameObject;
        const children = roll.getChildren();
        for(const child of children){
            child.setAbsolute(false,true,false);
        }
    }
}