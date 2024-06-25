@Component

export default class RPCtest extends Script {

    protected onStart(): void {

        if(SystemUtil.isServer()){
            Event.addLocalListener("Level5Init",()=>{
                // console.log("L5重置方块");
                //let trigger = this.gameObject as Trigger;
                this.gameObject.parent.setVisibility(PropertyStatus.On);
                (this.gameObject.parent as Model).setCollision(CollisionStatus.On);
            })
            this.gameObject.localTransform.position = new Vector(0,0,57)

            let trigger = this.gameObject as Trigger;
            trigger.onEnter.add((other)=>{
                // console.log("被触发")
                if(other instanceof Character){
                    // 隐藏方块
                    // console.log("进入触发器")
                    setTimeout(() => {
                        this.gameObject.parent.setVisibility(PropertyStatus.Off);
                        (this.gameObject.parent as Model).setCollision(CollisionStatus.Off)
                    }, 10);
                    // setTimeout(() => {
                    //     this.gameObject.parent.setVisibility(PropertyStatus.On);
                    //     (this.gameObject.parent as Model).setCollision(CollisionStatus.On);
                    // }, 6*1000);
                }
            })
        }
    }
}

 

 
