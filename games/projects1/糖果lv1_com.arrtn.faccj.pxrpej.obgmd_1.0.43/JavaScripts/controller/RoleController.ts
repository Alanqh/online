import { SpeedComponent } from "./SpeedComponent";

export class RoleController {
    private speed: SpeedComponent;
    constructor(private character: Character) {
        this.speed = new SpeedComponent(character);
    }

    /**
     *更新入口
     */
    public onUpdate(dt: number) {
        this.speed.onUpdate(dt);
    }
}