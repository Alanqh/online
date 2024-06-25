import btnCanvasItem_Generate from "./ui-generate/AnimationEditor/btnCanvasItem_generate";
import inputItem_Generate from "./ui-generate/AnimationEditor/inputItem_generate";
import vectorItem_Generate from "./ui-generate/AnimationEditor/vectorItem_generate";

export class InputItem extends inputItem_Generate {
    private onChange: (str: string) => void;

    init(fun: (str: string) => void, str: string | number, tip: string) {
        this.onChange = fun;
        this.mTips.text = tip;
        this.inputBox.text = str + "";
        this.inputBox.onTextChanged.add(txt => {
            this.onChange(txt);
        })
    }
}

export class BtnItem extends btnCanvasItem_Generate {
    private isChange: boolean = false;
    init(fun: (isChange: boolean) => void, isDefault: boolean, tip: string) {
        this.isChange = isDefault;
        this.mTextBlock.text = tip;
        this.mStaleButton.onClicked.add(() => {
            this.changeState(!this.isChange);
            fun(this.isChange);
        })
    }
    private changeState(isChange: boolean): void {
        this.isChange = isChange;
        this.mStaleButton.text = isChange ? "▶" : "||";
    }
}

export class VectorItem extends vectorItem_Generate {
    private onChange: (pos: Vector) => void;
    private action: Action = new Action();
    private xNum: VectorNum;
    private yNum: VectorNum;
    private zNum: VectorNum;

    init(fun: (pos: Vector) => void, pos: Vector, tip: string) {
        this.onChange = fun;
        this.mTip.text = tip;
        this.action.add(this.changePos.bind(this));
        this.xNum = new VectorNum(this.xInputBox, this.xAddButton, this.xSubButton, this.action, pos.x);
        this.yNum = new VectorNum(this.yInputBox, this.yAddButton, this.ySubButton, this.action, pos.y);
        this.zNum = new VectorNum(this.zInputBox, this.zAddButton, this.zSubButton, this.action, pos.z);
    }

    private changePos(): void {
        this.onChange(new Vector(this.xNum.currentNum, this.yNum.currentNum, this.zNum.currentNum));
    }
}


class VectorNum {

    private input: InputBox;
    private add: Button;
    private reduce: Button;
    private action: Action;
    public currentNum: number = 0;

    constructor(input: InputBox, add: Button, reduce: Button, action: Action, defaultNum: number) {
        this.input = input;
        this.add = add;
        this.reduce = reduce;
        this.action = action;
        this.currentNum = defaultNum;
        this.input.text = defaultNum + "";
        let inter = null;
        this.add.onPressed.add(() => {
            inter = setInterval(() => {
                this.addNum();
            }, 100);
        })
        this.add.onReleased.add(() => {
            clearInterval(inter);
        })
        this.reduce.onPressed.add(() => {
            inter = setInterval(() => {
                this.reduceNum();
            }, 100);
        })
        this.reduce.onReleased.add(() => {
            clearInterval(inter);
        })

        this.input.onTextChanged.add(this.changeNum.bind(this));
    }

    private changeNum(text: string): void {
        let num = parseFloat(text);
        if (isNaN(num)) {
            num = 0;
        }
        this.currentNum = num;
        this.action.call();
    }

    private addNum(num: number = 1): void {
        this.currentNum += num;
        this.input.text = Math.ceil(this.currentNum) + "";
        this.action.call();
    }

    private reduceNum(num: number = 1): void {
        this.currentNum -= num;
        this.input.text = Math.ceil(this.currentNum) + "";
        this.action.call();
    }
}