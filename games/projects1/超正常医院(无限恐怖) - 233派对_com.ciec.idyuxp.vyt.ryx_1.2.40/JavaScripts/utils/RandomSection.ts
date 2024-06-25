export class RandomSection{
    private sectionMap:Map<number,number>
    private valueMark:number

    constructor() {
        this.sectionMap = new Map()
        this.valueMark = 0
    }

    pushSection(weight:number,pairValue:number):RandomSection{
        if(this.valueMark > 1){
            console.error(`随机范围总和超过1!!`);
            return this
        }
        this.valueMark += weight
        this.sectionMap.set(this.valueMark,pairValue)
        return this
    }
    
    getRandom():number{
        if(Number(this.valueMark.toFixed(2)) != 1){
            console.error(`随机区间未填充至1!!,当前${this.valueMark}`);
            return -1
        }
        let random = Math.random()
        for (const weight of this.sectionMap.keys()) {
            if(random <= weight) return this.sectionMap.get(weight)
        }
        return -1
    }
}