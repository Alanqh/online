
@Component
export default class left_right extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        (this.gameObject as Model).setCollision(CollisionStatus.Off);
        let Cube = this.gameObject.parent;
        Event.addLocalListener("Level6Init",()=>{
            Cube.setVisibility(true);
            (Cube as Model).setCollision(CollisionStatus.On);
            let chilren = Cube.getChildren();
            chilren.forEach(element => {
                if(element.name == "运动器"){
                    let moveEle = element as IntegratedMover;
                    moveEle.enable = false;
                    moveEle.moverReset();
                    setTimeout(() => {
                        moveEle.enable = true;
                    }, 10*1000);
                }
            });
        }) 
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}