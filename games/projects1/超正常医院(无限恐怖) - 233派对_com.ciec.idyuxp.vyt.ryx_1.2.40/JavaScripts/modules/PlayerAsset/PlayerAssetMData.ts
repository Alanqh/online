import PropSaveData from "./PropSaveData";

export default class PlayerAssetModuleData extends Subdata {


    /**道具保存数据 */
    @Decorator.persistence()
    propDataList: PropSaveData[] = [];

    protected onDataInit(): void {
        this.propDataList.forEach(data => {
            if (data.count == null) data.count = 1;
        });
    }

    /**添加需要保存的道具 */
    public addSavedProp(saveData: PropSaveData) {
        let dataList = this.propDataList;
        let data = dataList.find(data => data.id == saveData.id);
        // 添加试用道具
        if (saveData.isForever == false) {
            this.addTryProp(dataList, saveData);
            console.log("添加试用道具");
            return;
        }
        // 添加永久道具
        // 添加单例道具
        if (saveData.isSingle) {
            // 未拥有直接添加
            console.log("添加单例永久道具");
            if (data == null) {
                dataList.push(saveData);
                return;
            }
            // 已拥有但不是永久的则更新为永久
            if (data.isForever == false) {
                data.isForever = true;
                data.tryTime = -1;
                return;
            }
            // 已拥有，且为永久则添加失败
            // 添加失败逻辑
            return;
        }
        // 添加多例道具
        if (data == null) dataList.push(saveData);
        else data.count += saveData.count;
        console.log("添加多例永久道具")
    }

    /**添加试用道具 */
    private addTryProp(dataList: PropSaveData[], saveData: PropSaveData) {
        let data = dataList.find(data => data.id == saveData.id);
        if (data == null) {
            dataList.push(saveData)
        }
        else data.tryTime += saveData.tryTime;
    }

    /**删除指定数量的道具，返回成功状态 */
    delProp(id: number, count: number = 1):boolean {
        let index = this.propDataList.findIndex((data) => data.id == id);
        if (index == -1) return false;

        if (this.propDataList[index].count < count) return false;

        this.propDataList[index].count -= count;
        if (this.propDataList[index].count <= 0) {
            this.propDataList.splice(index, 1);
        }
        return true;
    }


    /**根据Id获取玩家对应道具信息 */
    getProp(id: number): PropSaveData {
        return this.propDataList.find(data => data.id == id);
    }


    /**更新所有道具剩余时间 */
    updateRemainTime() {
        this.propDataList.forEach((data) => {
            if (data.isForever) return;
            data.remain = data.unlockTime + data.tryTime - TimeUtil.time();
        })
    }
}