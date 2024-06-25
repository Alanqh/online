import IBagData from "./Base/IBagData";

export default class BagItemData implements IBagData {
    /**唯一标识 */
    key: number;
    /**对应配置表里的id */
    id: number;
    /**中文名 */
    name: string;
    /**数量 */
    count: number;

    constructor(key: number, id: number, count: number = 1) {
        this.key = key;
        this.id = id;
        this.count = count;
    }
}