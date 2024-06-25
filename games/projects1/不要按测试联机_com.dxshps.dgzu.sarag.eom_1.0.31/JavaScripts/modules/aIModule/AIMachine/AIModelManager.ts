import { GameConfig } from "../../../config/GameConfig";

export class AIModelManager {

    private static _instance: AIModelManager;

    public static get Instance(): AIModelManager {
        if (this._instance == null) {
            this._instance = new AIModelManager();
            this._instance.initAIPool();
        }
        return this._instance;
    }

    private _modelUnUseArr: Character[] = [];
    private _modelUseArr: Character[] = [];
    /**未使用AI的数组 */
    public get ModelUnUseArr() {
        return Array.from(this._modelUnUseArr);
    }
    /**正在使用的AI的数组 */
    public get ModelUseArr() {
        return Array.from(this._modelUseArr);
    }

    public initAIPool() {
        this._modelUnUseArr.length = 0;
        this._modelUseArr.length = 0;

        // 开始先造8个备用
        for (let i = 0; i < 8; i++) {
            this.createModel().then((go) => {
                this._modelUnUseArr.push(go);
            })
        }
    }
    /**创建AI对象 */
    private async createModel(): Promise<Character> {
        let m = await GameObject.asyncSpawn("Character") as Character;
        m.switchToFlying();
        m.collisionWithOtherCharacterEnabled = false;
        let cfg = GameConfig.RuleGame.getElement(10036)
        m.maxWalkSpeed = cfg.intArray_Value[0];
        m.maxJumpHeight = cfg.intArray_Value[1];
        return m;
    }

    public async getModel() {
        if (this._modelUnUseArr.length == 0) {
            return await this.createModel();
        }
        let model = this._modelUnUseArr.pop();
        this._modelUseArr.push(model);
        return model;
    }

    public rebackModel(model: Character) {
        this._modelUnUseArr.push(model);
        let index = this._modelUseArr.indexOf(model);
        if (index == -1) return;
        this._modelUseArr.splice(index, 1);
    }

    public findModelByObj(model: Character) {
        let index = this.ModelUseArr.indexOf(model);
        if (index == -1) return false;
    }

    public onDestroy() {
        this._modelUnUseArr.forEach((model) => {
            model.destroy();
        })
        this._modelUseArr.forEach((model) => {
            model.destroy();
        })
        this._modelUnUseArr.length = 0;
        this._modelUnUseArr.length = 0;
    }
}