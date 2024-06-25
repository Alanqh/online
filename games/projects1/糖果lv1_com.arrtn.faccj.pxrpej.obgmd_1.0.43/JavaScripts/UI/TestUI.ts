import TestCamera_Generate from "../ui-generate/TestCamera_generate";

export class TestUI extends TestCamera_Generate {
    onStart() {
        this.mInputBox.onTextChanged.add((text) => {
            let x = parseFloat(text);
            Event.dispatchToLocal("x", x);
        });

        this.mInputBox_1.onTextChanged.add((text) => {
            let y = parseFloat(text);
            Event.dispatchToLocal("y", y);
        });

        this.mInputBox_2.onTextChanged.add((text) => {
            let z = parseFloat(text);
            Event.dispatchToLocal("z", z);
        });

        this.mInputBox_3.onTextChanged.add((text) => {
            let x = parseFloat(text);
            Event.dispatchToLocal("rx", x);
        });

        this.mInputBox_4.onTextChanged.add((text) => {
            let y = parseFloat(text);
            Event.dispatchToLocal("ry", y);
        });

        this.mInputBox_5.onTextChanged.add((text) => {
            let z = parseFloat(text);
            Event.dispatchToLocal("rz", z);
        });
    }
}