import { IPropElement } from "../../config/Prop";
import IBagData from "./Base/IBagData";


export class PropItemData implements IBagData {
    /**每个item的唯一标识 */
    key: number;
    /**道具id */
    id: number;
    /**数量 */
    count: number;

    constructor(key: number, id: number, count: number) {
        this.key = key;
        this.id = id;
        this.count = count;
    }
}