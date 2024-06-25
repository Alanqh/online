@Component
export default class Launch extends Script {
    // 填写触发器的 GameObjectId
    triggerGameObjectId = "1EDB92B0";
    // 填写交互物的 GameObjectId
    interactiveGameObjectId = "31DA03FB";

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart() {
        // 因为是坐下是个动作，我们只需要在客户端表现，这里就在客户端运行
        if (SystemUtil.isClient()) {
            // 下载并加载 35400 资源
            await AssetUtil.asyncDownloadAsset("35400");
            // 获取交互物
            const interactive = (await GameObject.asyncFindGameObjectById(this.interactiveGameObjectId)) as Interactor;
            // 获取触发器
            const trigger = (await GameObject.asyncFindGameObjectById(this.triggerGameObjectId)) as Trigger;
            // 触发器事件绑定
            trigger.onEnter.add(go => {
                // 判断进入碰撞区域的对象是否为角色
                if (!(go instanceof Character)) {
                    // 不是角色，停止执行
                    return;
                }
                // 让该角色进入交互
                interactive.enter(go);
                // 3000 毫秒后离开交互，并移动到(0,0,200)
                setTimeout(() => {
                    interactive.leave(new Vector(-7729.02, -1591.63, 3.00));
                }, 3000);
            })
        }
    }
}