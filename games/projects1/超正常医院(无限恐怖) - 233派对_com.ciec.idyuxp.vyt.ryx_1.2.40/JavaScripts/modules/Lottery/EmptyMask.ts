import EmptyMask_generate from "../../ui-generate/Lottery/EmptyMask_generate";


export class EmptyMask extends EmptyMask_generate {
    protected onAwake(): void {
        this.layer = UILayerTop
    }
    protected onStart(): void {
    }
}