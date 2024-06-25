import createUI_Generate from "./ui-generate/AnimationEditor/createUI_generate";


export class CreateUI extends createUI_Generate {

    public createUIAction: Action2<string, number> = new Action2<string, number>();


    onStart() {
        this.closeButton.onClicked.add(() => {
            this.hide();
        })
        this.createButton.onClicked.add(() => {
            let name = this.nameInput.text;
            let count = parseInt(this.frameInput.text);
            this.createUIAction.call(name, count);
        })
    }
}