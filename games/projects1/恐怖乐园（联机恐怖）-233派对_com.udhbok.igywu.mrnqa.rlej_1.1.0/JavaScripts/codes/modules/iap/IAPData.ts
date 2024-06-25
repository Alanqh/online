

export class IAPData extends Subdata {

    /**保存购买过的乐币id 判断是不是首充 */
    @Decorator.persistence()
    alreadyBuyList: number[] = [];


    recordingPurchaseId(id: number) {
        if (!this.isPurchased(id)) {
            this.alreadyBuyList.push(id);
            this.save(true);
            this.onDataChange.call()
        }
    }

    /**是否买过 */
    isPurchased(id: number) {
        return this.alreadyBuyList.indexOf(id) != -1
    }


}