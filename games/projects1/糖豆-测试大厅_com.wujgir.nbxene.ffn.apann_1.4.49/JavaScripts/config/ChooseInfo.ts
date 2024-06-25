import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","picList","picNameList"],["","",""],[1,[265963,290947,215601,213342,210491,198500,194954,194912,194195,151653,191944,157089,157085,212523,157090,157087,157092,157086,157093,157091,157088,157094,169149,174263,174161,182885,180471,194195,217619,221814,287525,221309,265962,266286,270878],["Level_035","Level_033","Level_032","Level_022","Level_021","Level_027","Level_017","Level_025","Level_024","Level_023","Level_020","Level_001","Level_002","Level_031","Level_003","Level_004","Level_005","Level_006","Level_007","Level_011","Level_012","Level_013","Level_014","Level_015","Level_016","Level_018","Level_019","Level_024","Level_026","Level_010","Level_030","Level_028","Level_036","Level_029","Level_037"]]];
export interface IChooseInfoElement extends IElementBase{
 	/**id*/
	id:number
	/**所有图片*/
	picList:Array<number>
	/**所有名字*/
	picNameList:Array<string>
 } 
export class ChooseInfoConfig extends ConfigBase<IChooseInfoElement>{
	constructor(){
		super(EXCELDATA);
	}

}