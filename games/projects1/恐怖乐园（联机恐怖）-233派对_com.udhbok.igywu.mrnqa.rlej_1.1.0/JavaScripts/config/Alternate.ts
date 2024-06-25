import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","normalAppearance","probability","monsterAppearance","atlasKey","states","mark","stateWeights","stateDuration","attackPower","attackAni","dazeAni","observeAni","decryptAni","flowDistance","waitLockTime","aloneDistance"],["","","","","","","","","","","","","","","","",""],[1,["0A5BC1C243639596B1F6A8B35629E894","DDA2E7BB4C2C565B88E4CCAC98A3B325","E4A4BDA54E5A43D839625998EE2BB796","B562DF7D4B54ACCB896B41B39772D7B7","37BA456D4BF798B38833488ADF52C833","571BFEF6418B99485CDD78970B43C3DC","53FAD6BA4FFC149D7780838411C3D6C6"],0.5,["020C3E87437795CC63434E919CB3F5E0","0F7701DE4BE6A47125A2EF9951BDBC2F","6E50CA3745BB26559B534AA2F55CA848","E1935A0346564B2F39AB6E94C204F323"],["Faker1","Faker2","Faker3","Faker4"],[1,2,3,4],"发呆|解谜|观察|攻击",[1,3,1,1],[10,10,10,10],0,"121609",null,null,"8357",150,12,1000]];
export interface IAlternateElement extends IElementBase{
 	/**ID*/
	id:number
	/**外观数组*/
	normalAppearance:Array<string>
	/**外表会有畸变的概率*/
	probability:number
	/**变身后外观*/
	monsterAppearance:Array<string>
	/**不同外形对应的图鉴key*/
	atlasKey:Array<string>
	/**状态*/
	states:Array<number>
	/**状态注释*/
	mark:string
	/**状态切换权重*/
	stateWeights:Array<number>
	/**状态持续时间（秒）*/
	stateDuration:Array<number>
	/**攻击力*/
	attackPower:number
	/**偷袭攻击动画*/
	attackAni:string
	/**发呆动画*/
	dazeAni:string
	/**观察动画*/
	observeAni:string
	/**假装解密动画*/
	decryptAni:string
	/**站在玩家背后的距离*/
	flowDistance:number
	/**等待锁定时间*/
	waitLockTime:number
	/**落单距离判断*/
	aloneDistance:number
 } 
export class AlternateConfig extends ConfigBase<IAlternateElement>{
	constructor(){
		super(EXCELDATA);
	}

}