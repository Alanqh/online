

export default class PropModuleData extends Subdata {

    /**已经装备过跳舞枪 */
    @Decorator.persistence()
    public hasEquipDanceGun: boolean = false;


    /**第一次装备跳舞枪 */
    public firstEquipDanceGun(){
        this.hasEquipDanceGun = true;
        this.save(true);
    }
}