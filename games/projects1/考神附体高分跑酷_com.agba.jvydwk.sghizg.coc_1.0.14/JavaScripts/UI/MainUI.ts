import { modC } from "../modC";
import mydata from "../mydata";
import BagItemUI_Generate from "../ui-generate/BagItemUI_generate";
import MainUI_Generate from "../ui-generate/MainUI_generate";

export default class UIs extends MainUI_Generate {
	maxpro = 165
	protected async onStart() {
		await DataCenterC.ready()//等待数据加载
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerMiddle;
		//----------左下角测试面板------------------------
		// this.test.visibility = mw.SlateVisibility.Visible//显示
		//-----------------生成商店内容------------------------------
		//换装面板
		const info = ModuleService.getModule(modC).DressIcon;
		for (let k in info) {
			const item = this.bagspawn(this.dressc);
			item.uiObject.size = new mw.Vector2(220, 220);
			item.setDress(parseInt(k));//整数
			this.dressGoods.push(item);//存到表里
			this.bagRefresh("换装", item)
		}
		this.dress.onClicked.add(() => {//点击
			if (this.dressp.visible) {
				ModuleService.getModule(modC).uiClose(this.dressp)//关闭UI
			} else {
				ModuleService.getModule(modC).uiShow(this.dressp)//显示UI
			}
		})
		this.dressclose.onClicked.add(() => {//点击
			ModuleService.getModule(modC).uiClose(this.dressp)//关闭UI
		})
		//拖尾面板
		const info2 = ModuleService.getModule(modC).TailIcon;
		for (let k in info2) {
			const item = this.bagspawn(this.tailc);
			item.uiObject.size = new mw.Vector2(220, 220);
			item.setTail(parseInt(k));//整数
			this.tailGoods.push(item);//存到表里
			this.bagRefresh("拖尾", item)
		}
		this.tail.onClicked.add(() => {//点击
			if (this.tailp.visible) {
				ModuleService.getModule(modC).uiClose(this.tailp)//关闭UI
			} else {
				ModuleService.getModule(modC).uiShow(this.tailp)//显示UI
			}
		})
		this.tailclose.onClicked.add(() => {//点击
			ModuleService.getModule(modC).uiClose(this.tailp)//关闭UI
		})
		//翅膀面板
		const info3 = ModuleService.getModule(modC).WingIcon;
		for (let k in info3) {
			const item = this.bagspawn(this.wingc);
			item.uiObject.size = new mw.Vector2(220, 220);
			item.setWing(parseInt(k));//整数
			this.wingGoods.push(item);//存到表里
			this.bagRefresh("翅膀", item)
		}
		this.wing.onClicked.add(() => {//点击
			if (this.wingp.visible) {
				ModuleService.getModule(modC).uiClose(this.wingp)//关闭UI
			} else {
				ModuleService.getModule(modC).uiShow(this.wingp)//显示UI
			}
		})
		this.wingclose.onClicked.add(() => {//点击
			ModuleService.getModule(modC).uiClose(this.wingp)//关闭UI
		})
		//变身面板
		const info5 = ModuleService.getModule(modC).AvaIcon;
		for (let k in info5) {
			const item = this.bagspawn(this.avac);
			item.uiObject.size = new mw.Vector2(220, 220);
			item.setAva(parseInt(k));//整数
			this.avaGoods.push(item);//存到表里
			this.bagRefresh("变身", item)
		}
		this.ava.onClicked.add(() => {//点击
			if (this.avap.visible) {
				ModuleService.getModule(modC).uiClose(this.avap)//关闭UI
			} else {
				ModuleService.getModule(modC).uiShow(this.avap)//显示UI
			}
		})
		this.avaclose.onClicked.add(() => {//点击
			ModuleService.getModule(modC).uiClose(this.avap)//关闭UI
		})
		//-----------------刷新商店------------------------------
		Event.addServerListener("刷新商店标签", (word: string, num: number) => {//服务器收到客户端发来的消息
			let Goods: UIBagItem[]
			if (word == "换装") {
				Goods = this.dressGoods
			} else if (word == "拖尾") {
				Goods = this.tailGoods
			} else if (word == "翅膀") {
				Goods = this.wingGoods
			} else if (word == "变身") {
				Goods = this.avaGoods
			}
			Goods[num].lock.visibility = mw.SlateVisibility.HitTestInvisible//可见不可交互
		})
		//-----------------刷新关卡------------------------------
		this.updatatxt()
		Event.dispatchToServer("客户端", "回城", "")//客户端给服务器发消息
		Event.addServerListener("刷新关卡", () => {//服务器收到客户端发来的消息
			this.updatatxt()
		})
		//-----------------浮动提示------------------------------
		let fdlist: string[] = []
		let fdact = true
		Event.addServerListener("浮动提示", async (word: string) => {//服务器收到客户端发来的消息
			fdlist.push(word);
			if (fdact) {
				fdact = false
				do {
					ModuleService.getModule(modC).fudongui(this.fudong, this.fdimg, this.fdtxt, fdlist[0])//浮动提示
					fdlist.splice(0, 1)//删除，第一个是位置，第二个是位置之后几项，第3,4,5是替换的内容
					await TimeUtil.delaySecond(2.1)//等待1秒后继续执行
				} while (fdlist.length > 0);
				fdact = true
			}
		})
		Event.addLocalListener("浮动提示", async (word: string) => {//服务器收到客户端发来的消息
			fdlist.push(word);
			if (fdact) {
				fdact = false
				do {
					ModuleService.getModule(modC).fudongui(this.fudong, this.fdimg, this.fdtxt, fdlist[0])//浮动提示
					fdlist.splice(0, 1)//删除，第一个是位置，第二个是位置之后几项，第3,4,5是替换的内容
					await TimeUtil.delaySecond(2.1)//等待1秒后继续执行
				} while (fdlist.length > 0);
				fdact = true
			}
		})
		//-----------------提示面板------------------------------
		let t1: string = ""
		let t2: string = ""
		let adshow = true
		this.tips.visibility = mw.SlateVisibility.Hidden//隐藏

		this.tipclose.onClicked.add(() => {//关闭按钮
			ModuleService.getModule(modC).uiClose(this.tips)//关闭UI
		})
		this.tipok.onClicked.add(() => {//确定
			ModuleService.getModule(modC).uiClose(this.tips)//关闭UI
			if (adshow) {
				ModuleService.getModule(modC).AdsForReward(t1, t2)//触发广告
			}

		})
		Event.addServerListener("提示面板", (word: string, w2: string) => {//服务器收到客户端发来的消息
			adshow = true
			if (word == "加跳跃") {
				this.tiptxt.text = "看广告后，跳跃+100。（可以重复观看，每次都会增加）"
			} else if (word == "花钱加跳跃") {
				this.tiptxt.text = "是否花费 10 奖杯，跳跃+100。（可以重复观看，每次都会增加）"
			} else if (word == "飞行") {
				this.tiptxt.text = "看广告后，可持续飞行10秒。"
			} else if (word == "花钱飞行") {
				this.tiptxt.text = "是否花费 10 奖杯，可持续飞行10秒。"
			} else if (word == "加速度") {
				this.tiptxt.text = "看广告后，移动速度+200。（可以重复观看，每次都会增加）"
			} else if (word == "花钱加速度") {
				this.tiptxt.text = "是否花费 10 奖杯，，移动速度+200。（可以重复观看，每次都会增加）"
			} else if (word == "换装") {
				this.tiptxt.text = "看广告后，就可以获得这个装扮！"
				ModuleService.getModule(modC).uiClose(this.dressp)//关闭UI
			} else if (word == "直接换装") {
				this.tiptxt.text = "点击确定，就可以使用这个装扮！"
				ModuleService.getModule(modC).uiClose(this.dressp)//关闭UI
			} else if (word == "花钱换装") {
				this.tiptxt.text = "是否花费 10 奖杯，购买这个装扮！"
				ModuleService.getModule(modC).uiClose(this.dressp)//关闭UI
			} else if (word == "拖尾") {
				this.tiptxt.text = "看广告后，就可以获得这个拖尾！"
				ModuleService.getModule(modC).uiClose(this.tailp)//关闭UI
			} else if (word == "直接拖尾") {
				this.tiptxt.text = "点击确定，就可以使用这个拖尾！"
				ModuleService.getModule(modC).uiClose(this.tailp)//关闭UI
			} else if (word == "花钱拖尾") {
				this.tiptxt.text = "是否花费 10 奖杯，购买这个拖尾！"
				ModuleService.getModule(modC).uiClose(this.tailp)//关闭UI
			} else if (word == "翅膀") {
				this.tiptxt.text = "看广告后，就可以获得这个翅膀！"
				ModuleService.getModule(modC).uiClose(this.wingp)//关闭UI
			} else if (word == "直接翅膀") {
				this.tiptxt.text = "点击确定，就可以使用这个翅膀！"
				ModuleService.getModule(modC).uiClose(this.wingp)//关闭UI
			} else if (word == "花钱翅膀") {
				this.tiptxt.text = "是否花费 10 奖杯，购买这个翅膀！"
				ModuleService.getModule(modC).uiClose(this.wingp)//关闭UI
			} else if (word == "变身") {
				this.tiptxt.text = "看广告后，就可以获得这个装扮！"
				ModuleService.getModule(modC).uiClose(this.avap)//关闭UI
			} else if (word == "直接变身") {
				this.tiptxt.text = "点击确定，就可以使用这个装扮！"
				ModuleService.getModule(modC).uiClose(this.avap)//关闭UI
			} else if (word == "花钱变身") {
				this.tiptxt.text = "是否花费 10 奖杯，购买这个装扮！"
				ModuleService.getModule(modC).uiClose(this.avap)//关闭UI
			} else if (word == "下一关") {
				this.tiptxt.text = "看广告后，就可以到达下一关！"
			} else if (word == "花钱下一关") {
				this.tiptxt.text = "是否花费 10 奖杯，到达下一关！"
			} else if (word == "重生") {
				this.tiptxt.text = "点击确定，重生+1，并回到初始点！"
			}
			t1 = word
			t2 = w2
			ModuleService.getModule(modC).uiShow(this.tips)//显示UI
		})
		//-----------------加跳跃按钮------------------------------
		this.addjump.onClicked.add(() => {
			Event.dispatchToServer("客户端", "加跳跃c", "")//客户端给服务器发消息
		})
		//-----------------飞行按钮------------------------------
		this.fly.onClicked.add(() => {
			if (this.flytxt.text == "") {
				Event.dispatchToServer("客户端", "飞行c", "")//客户端给服务器发消息
			}
		})
		Event.addServerListener("飞行倒计时", (num: number) => {//服务器收到客户端发来的消息
			if (num < 1) {
				this.flytxt.text = ""
			} else {
				this.flytxt.text = "飞行倒计时 " + String(num)
			}
		})
		//-----------------加速度按钮------------------------------
		this.addspeed.onClicked.add(() => {
			Event.dispatchToServer("客户端", "加速度c", "")//客户端给服务器发消息
		})
		//-----------------跳关------------------------------
		this.skip.onClicked.add(() => {//点击
			Event.dispatchToServer("客户端", "下一关", "")//客户端给服务器发消息
		})
		//-----------------回城------------------------------
		this.home.onClicked.add(() => {//点击
			Event.dispatchToServer("客户端", "回城", "")//客户端给服务器发消息
		})
		//-----------------测试按钮------------------------------
		this.b1.onClicked.add(() => {
			Event.dispatchToServer("测试", "新手")//客户端给服务器发消息
		})
		this.b2.onClicked.add(() => {
			Event.dispatchToServer("测试", "下一关")//客户端给服务器发消息
		})
		this.b3.onClicked.add(() => {
			Event.dispatchToServer("测试", "上一关")//客户端给服务器发消息
		})
		this.b4.onClicked.add(() => {
			let nn = this.in1.text
			Event.dispatchToServer("测试", "跳关", nn)//客户端给服务器发消息
		})
		this.b5.onClicked.add(() => {
			Event.dispatchToServer("测试", "加成")//客户端给服务器发消息
			// ModuleService.getModule(modC).testbtnA()
		})
		this.b6.onClicked.add(() => {
			Event.dispatchToServer("测试", "B")//客户端给服务器发消息
			// ModuleService.getModule(modC).testbtnB()
		})
		//-----------------在线奖励------------------------------
		this.olbtn.onClicked.add(() => {
			if (this.olcanget) {
				Event.dispatchToServer("客户端", "在线奖励", "")//客户端给服务器发消息
				this.onlinetime()//在线奖励
			}
		})
		await TimeUtil.delaySecond(5)//等待1秒后继续执行
		this.onlinetime()//在线奖励

	}
	//-----------------在线奖励倒计时------------------------------
	olcanget = true
	async onlinetime() {
		this.olcanget = false
		for (let i = 60; i > -1; i--) {
			let zi = ModuleService.getModule(modC).TimeConversion(i)
			this.olbtxt.text = zi
			await TimeUtil.delaySecond(1)//等待1秒后继续执行
		}
		this.olbtxt.text = "领取"
		this.olcanget = true
	}
	private dressGoods: UIBagItem[] = []
	private tailGoods: UIBagItem[] = []
	private wingGoods: UIBagItem[] = []
	private avaGoods: UIBagItem[] = []
	//生成背包物品
	public bagspawn(scroll: mw.Canvas): UIBagItem {
		let item: UIBagItem;
		item = mw.UIService.create(UIBagItem);
		scroll.addChild(item.uiObject);
		return item;
	}
	//刷新背包物品解锁标签
	public bagRefresh(word: string, item: UIBagItem) {
		let Pdata = DataCenterC.getData(mydata)
		let unlock: number[]
		let Goods: UIBagItem[]
		if (word == "换装") {
			unlock = Pdata.dressunlock
			Goods = this.dressGoods
		} else if (word == "拖尾") {
			unlock = Pdata.tailunlock
			Goods = this.tailGoods
		} else if (word == "翅膀") {
			unlock = Pdata.wingunlock
			Goods = this.wingGoods
		} else if (word == "变身") {
			unlock = Pdata.avaunlock
			Goods = this.avaGoods
		}
		if (unlock && unlock.length > 0) {
			Goods.forEach((v, i, a) => {
				let lok = unlock.indexOf(i);
				if (lok == -1) {
					//未解锁 
					item.lock.visibility = mw.SlateVisibility.Collapsed//折叠
				} else {
					item.lock.visibility = mw.SlateVisibility.HitTestInvisible//可见不可交互
				}
			})
		}
	}
	//--刷新文字----
	public updatatxt() {
		let Pdata = DataCenterC.getData(mydata)
		this.protxt.text = Pdata.pro + ' (' + Math.floor(Pdata.pro / this.maxpro * 100) + '%) 分数：' + Pdata.score + ' 重生：' + Pdata.reborn
		let sx = Pdata.pro * 1000 / this.maxpro
		if (sx > 1000) {
			sx = 1000
		}
		this.pro.size = new mw.Vector2(sx, 25)//尺寸
		this.cuptxt.text = ModuleService.getModule(modC).NumCon(Pdata.cup)//奖杯数量
	}
	public random(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

class UIBagItem extends BagItemUI_Generate {

	/**
	 * 设置数据
	 * @param icon 图片
	 * @param count 数量
	 */
	public setDress(goodsID: number) {
		const info = ModuleService.getModule(modC).DressIcon;
		this.icon.imageGuid = info[goodsID];
		this.btn.onClicked.add(() => {//点击
			Event.dispatchToServer("客户端", "换装c", goodsID.toString())//客户端给服务器发消息
		})
	}
	public setTail(goodsID: number) {
		const info = ModuleService.getModule(modC).TailIcon;
		const info2 = ModuleService.getModule(modC).TailTxt
		this.icon.imageGuid = info[goodsID];
		this.txt.text = info2[goodsID];
		this.btn.onClicked.add(() => {//点击
			Event.dispatchToServer("客户端", "拖尾c", goodsID.toString())//客户端给服务器发消息
		})
	}
	public setWing(goodsID: number) {
		const info = ModuleService.getModule(modC).WingIcon;
		const info2 = ModuleService.getModule(modC).WingTxt
		this.icon.imageGuid = info[goodsID];
		this.txt.text = info2[goodsID];
		this.btn.onClicked.add(() => {//点击
			Event.dispatchToServer("客户端", "翅膀c", goodsID.toString())//客户端给服务器发消息
		})
	}
	public setAva(goodsID: number) {
		const info = ModuleService.getModule(modC).AvaIcon;
		const info2 = ModuleService.getModule(modC).AvaTxt
		this.icon.imageGuid = info[goodsID];
		this.txt.text = info2[goodsID];
		this.btn.onClicked.add(() => {//点击
			Event.dispatchToServer("客户端", "变身c", goodsID.toString())//客户端给服务器发消息
		})
	}

}