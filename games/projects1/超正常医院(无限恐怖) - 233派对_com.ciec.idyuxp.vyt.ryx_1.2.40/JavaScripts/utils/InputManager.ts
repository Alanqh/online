
export class InputManager {
	private static _instance = null;
	private static _isDestroy: boolean;

	private constructor() {
		this.init();
	}

	public static get instance(): InputManager {
		if (this._instance == null && !this._isDestroy) {
			this._instance = new InputManager();
		}
		return this._instance;
	}

	public onPressTouch: mw.Action1<TouchData> = new mw.Action1<TouchData>();
	public onReleaseTouch: mw.Action1<TouchData> = new mw.Action1<TouchData>();

	private beginMulFun: () => void;

	private init() {
		if (mw.SystemUtil.isClient()) {
			this.beginMulFun = this.touchControl.bind(this);
			InputUtil.onTouchBegin(this.beginMulFun);
			InputUtil.onTouchEnd(this.beginMulFun);
			InputUtil.onTouch(this.beginMulFun);
		}
	}

	private touchControl(index: number, loc: mw.Vector, touchType: mw.TouchInputType): void {
		let touchArr = TouchInputUtil.getInstance().getTouchVectorArray();
		if (touchType == mw.TouchInputType.TouchEnd) {
			this.onReleaseTouch.call(new TouchData(touchType, loc.x, loc.y));
		} else {
			for (let i = 0; i < touchArr.length; i++) {
				if (touchArr[i].z > 0) {
					this.onPressTouch.call(new TouchData(touchType, touchArr[i].x, touchArr[i].y));
				}
			}
		}
	}

	public clearTouch() {
		this.onReleaseTouch.clear();
		this.onPressTouch.clear();
	}

	public static destroy() {
		this._isDestroy = true;
		InputManager._instance = null;
	}
}

export class TouchData {
	event: mw.TouchInputType;
	x: number;
	y: number;

	constructor(event: mw.TouchInputType, x: number, y: number) {
		this.event = event;
		this.x = x;
		this.y = y;
	}
}