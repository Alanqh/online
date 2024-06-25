import { ITaskElement } from "../../config/Task";
import IBagData from "../Bag/Base/IBagData";

export default class GuideItemData extends IBagData {

    conf: ITaskElement;
    constructor(conf: ITaskElement) {
        super();
        this.conf = conf;
        this.key = conf.id;
    }
}