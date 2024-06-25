import { BagUIBase } from "./BagUIBase";
import IBagData from "./IBagData";
import { IBagUI, Layout } from "./IBagUI";

export default abstract class BagPanelBase<Data extends IBagData, ItemUI extends mw.UIScript> implements IBagUI {

    /**UI项的map, key为该项的唯一标识，value为item类 */
    public itemMap: Map<number, BagUIBase<Data, ItemUI>> = new Map();
    /**背包UI */
    public canvas: Canvas;
    /**布局参数 */
    layout: Layout;


    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.layout = this.initLayout();
    }

    /**设置布局规则,所有参数都要设置 */
    abstract initLayout(): Layout;

    /**背包刷新后的回调 */
    protected afterRefresh(): void {

    }

    /**背包项刷新后的回调 */
    protected afterOneItemRefresh(item: BagUIBase<Data, ItemUI>): void {

    }

    /**背包刷新前的回调 */
    protected beforeRefresh() {

    }

    /**刷新背包 */
    public refreshPanel(data: Data[]): void {

        // data.forEach((data) => {
        //     console.log("新数据的Key为：" + data.key);
        // });
        // this.itemMap.forEach((item, key) => {
        //     console.log("旧数据的Key为：" + key);
        // });
        // 将这次data没有的item数据删除
        let deleteKeyList: number[] = [];
        this.itemMap.forEach((item, key) => {
            let include = false;
            data.forEach((data) => {
                if (data.key == key) {
                    include = true;
                    return;
                }
            });
            // 新数据不包含item的key，就删除
            if (!include) deleteKeyList.push(key);
        });
        deleteKeyList.forEach((key) => {
            this.itemMap.get(key).delUI();
            this.itemMap.delete(key);
            // console.log("删除");
        });
        // 新增和更新
        data.forEach((data, index) => {
            let k = data.key;
            let item = this.itemMap.get(k);
            // 如果没有这个item，就添加
            if (item == null) {
                item = this.onAddItem(data);
                item.addUI(index + 1);
                // console.log("新增");

            }
            // 如果有这个item，就更新
            else {
                item.moveUI(index + 1);
                item.data = data;
                // console.log("更新");
            }

            this.afterOneItemRefresh(item);
        });


        this.afterRefresh();
    }

    /**添加item */
    abstract onAddItem(data: Data): BagUIBase<Data, ItemUI>;

}