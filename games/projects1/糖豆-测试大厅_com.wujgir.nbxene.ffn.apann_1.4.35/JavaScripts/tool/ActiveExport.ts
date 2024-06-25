/** 
 * @Author       : lei.zhao
 * @Date         : 2022-11-08 16:49:53
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2022-11-17 18:53:31
 * @FilePath     : \HappyParty\JavaScripts\ActiveExport.ts
 * @Description  : 修改描述
 */

@Component
export default class ActiveExport extends mw.Script {

    @mw.Property({ displayName: "配置表Stage中的ID" })
    private sceneId: number = 0;
    @mw.Property({ displayName: "导出坐标" })
    private location: boolean = true;
    @mw.Property({ displayName: "导出旋转" })
    private rotation: boolean = true;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (mw.SystemUtil.isClient()) {

            const inter = setInterval(() => {
                if (mw.UIService.canvas) {
                    const _tb = mw.InputBox.newObject(mw.UIService.canvas);
                    _tb.autoWrap = true;
                    _tb.textLengthLimit = 10000000;
                    _tb.size = new mw.Vector2(500, 500);
                    const children = this.gameObject.getChildren();
                    let str = "";
                    children.forEach(child => {
                        if (this.location) {
                            str += child.worldTransform.position.x + "|" + child.worldTransform.position.y + "|" + child.worldTransform.position.z;
                        }
                        if (this.rotation) {
                            str += "\t" + child.worldTransform.rotation.x + "|" + child.worldTransform.rotation.y + "|" + child.worldTransform.rotation.z;
                        }
                        str += "\n";
                    });
                    _tb.text = str;

                    clearInterval(inter);
                }
            }, 100)

        }
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.bUseUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}