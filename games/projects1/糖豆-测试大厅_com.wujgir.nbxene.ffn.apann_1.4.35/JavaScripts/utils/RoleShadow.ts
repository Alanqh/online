declare const UE;
declare const puerts;
const end = new UE.Vector(0, 0, 0);
const V2 = new mw.Vector2();
const OutHitsRef = puerts.$ref(new UE.HitResult());
const pool: mw.UIWidget[] = [];
/**
 * 模拟角色影子
 */
export class RoleShadow {

    private shadowWidget: mw.UIWidget;
    private imageShadow: mw.Image;
    private renderOpacity: number = 0.6;
    /**
     * @param character 角色
     * @param size 影子大小
     * @param checkHeight 检测高度
     */
    constructor(private character: mw.Character, size: number = 80, private checkHeight: number = 500) {
        const gpuLevel = GraphicsSettings.getDefaultGPULevel();
        if (gpuLevel < GraphicsLevel.Medium2) {
            if (pool.length > 0) {
                this.shadowWidget = pool.pop();
                this.shadowWidget.setVisibility(true);
                this.ready();
            } else {
                mw.GameObject.asyncSpawn("UIWidget").then((uiWidget: mw.UIWidget) => {
                    this.shadowWidget = uiWidget;
                    this.shadowWidget.setCollision(mw.PropertyStatus.Off, true);
                    uiWidget.occlusionEnable = false;
                    uiWidget.hideByDistanceEnable = false;
                    uiWidget.drawSize = V2.set(size, size);
                    uiWidget.interaction = true;
                    const userWidget = mw.UserWidget.newObject();
                    userWidget.rootContent = mw.Canvas.newObject();
                    userWidget.rootContent.size = V2.set(size, size);
                    const image = mw.Image.newObject(userWidget.rootContent);
                    image.imageGuid = "224375";
                    image.imageColor = mw.LinearColor.black;
                    image.size = V2.set(size, size);
                    uiWidget.setTargetUIWidget(userWidget);
                    this.ready();
                });
            }
        }
    }
    private ready() {
        this.imageShadow = this.shadowWidget.getTargetUIWidget().rootContent.getChildAt(0) as mw.Image;
        this.imageShadow.renderOpacity = 1;
        this.renderOpacity = 1;
    }
    public onUpdate(dt: number) {
        if (this.imageShadow) {
            if (this.character.getVisibility() == false) {
                this.imageShadow.visibility = mw.SlateVisibility.Hidden;
            } else {
                this.imageShadow.visibility = mw.SlateVisibility.Visible;
            }
            const actor = this.character["actor"];
            if (!actor) { return; }
            const start = actor.K2_GetActorLocation();
            const startZ = start.Z;
            end.X = start.X;
            end.Y = start.Y;
            end.Z = start.Z - 60 - this.checkHeight;
            start.Z = end.z + this.checkHeight;
            let isSucc = UE.KismetSystemLibrary.LineTraceSingle(actor, start, end, UE.ETraceTypeQuery.Visibility, false, null, UE.EDrawDebugTrace.None/*UE.EDrawDebugTrace.ForDuration*/, OutHitsRef, true);
            if (isSucc && OutHitsRef[0]) {
                const distance = MathUtil.clamp((startZ - OutHitsRef[0].ImpactPoint.Z), 10, this.checkHeight);

                end.Z = OutHitsRef[0].ImpactPoint.Z + 1;
                this.shadowWidget["actor"].K2_SetActorLocation(end, false, null, false);
                this.shadowWidget["actor"].K2_SetActorRotation(OutHitsRef[0].ImpactNormal.Rotation(), false);
                let renderOpacity = (this.checkHeight - distance) / this.checkHeight;
                if (this.renderOpacity != renderOpacity) {
                    this.renderOpacity = renderOpacity;
                    this.imageShadow.renderOpacity = renderOpacity;
                }
            } else {
                if (this.renderOpacity != 0) {
                    this.renderOpacity = 0;
                    this.imageShadow.renderOpacity = 0;
                }
            }
        }
    }

    destroy() {
        if (this.shadowWidget) {
            this.shadowWidget.setVisibility(false);
            pool.push(this.shadowWidget);
        }
        this.imageShadow = null;
    }
}