
@Component
export default class L5_cubeTransfor extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        let Obj = this.gameObject.parent;
        if(SystemUtil.isServer()){
            // console.log("======================")
            // console.log(Obj.name)
            // console.log(Obj.gameObjectId)
            // console.log("======================")
            let Obj1 = Obj.parent.getChildByName("玻璃道路");
            let Obj2List = Obj1.getChildren()
            Obj2List.forEach(Obj3 => {
                let cubeList = Obj3.getChildren();
                cubeList.forEach(cube => {
                    //console.log(cube.name)
                    cube.localTransform.scale = cube.localTransform.scale.multiply(new Vector(0.9,0.9,0.9));
                });
            });
        }
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