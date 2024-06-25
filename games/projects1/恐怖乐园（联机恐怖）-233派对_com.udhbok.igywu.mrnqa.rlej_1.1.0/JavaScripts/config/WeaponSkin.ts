import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","mark","itemID","icon","quality","skinLv","weaponLv","name","res","bulletID"],["","","","","","","","Language","",""],[1,"骨头棒2",2001,"353884",3,2,12,"进阶骨头棒","B6F4CA1649D80035394352A782C884BE",0],[2,"骨头棒3",2001,"353889",4,3,20,"黄金骨头棒","CD1C351E4ECA7EE9567D94ACD2FA87BA",0],[3,"骨头棒4",2001,"353935",5,4,24,"水晶骨头棒","BFDF238D4B00C1186338C3B25422C4D9",0],[4,"手枪2",1001,"353934",3,2,12,"进阶手枪","C6D7D2534391235CD51C079D3A454CC2",1],[5,"手枪3",1001,"353938",4,3,30,"黄金手枪","F7426FCB40A79634407286854F100924",1],[6,"手枪4",1001,"353885",5,4,36,"水晶手枪","C19B64824C7E6A0F53FC488522FB1DDA",1],[7,"霰弹枪2",2002,"353921",3,2,12,"进阶霰弹枪","D1AC64EA4D2F0834C27CCD9E4BE6D8E5",2],[8,"霰弹枪3",2002,"353882",4,3,30,"黄金霰弹枪","CCC83A034C2CD93A5EC6778E76A22374",2],[9,"霰弹枪4",2002,"353891",5,4,36,"水晶霰弹枪","E91D6B36430DB72A137B0A897771A89A",2],[10,"机枪2",2003,"353931",3,2,12,"进阶机枪","2B2E303840A1B01FE7903AAF8B2CCBBD",3],[11,"机枪3",2003,"353932",4,3,30,"黄金机枪","69B21C4B465AC82FDA7C9BB9E13D7C48",3],[12,"机枪4",2003,"353925",5,4,36,"水晶机枪","65FEC01B403AB40AFBA455BE0620CF49",3],[13,"步枪2",2004,"353937",3,2,12,"进阶步枪","DB2B4EF74938C0E02989A2AC1DDE83A2",4],[14,"步枪3",2004,"353922",4,3,30,"黄金步枪","A40CE4BA4CE2B624EB6FFC9C2CD1E2B5",4],[15,"步枪4",2004,"353933",5,4,36,"水晶步枪","022D84EF4529D336EA76249E0318C977",4]];
export interface IWeaponSkinElement extends IElementBase{
 	/**ID*/
	id:number
	/**备注*/
	mark:string
	/**关联武器配置id*/
	itemID:number
	/**图标*/
	icon:string
	/**品质id*/
	quality:number
	/**皮肤等阶*/
	skinLv:number
	/**对应武器等级*/
	weaponLv:number
	/**枪械名称*/
	name:string
	/**武器皮肤预制体*/
	res:string
	/**对应子弹表id*/
	bulletID:number
 } 
export class WeaponSkinConfig extends ConfigBase<IWeaponSkinElement>{
	constructor(){
		super(EXCELDATA);
	}

}