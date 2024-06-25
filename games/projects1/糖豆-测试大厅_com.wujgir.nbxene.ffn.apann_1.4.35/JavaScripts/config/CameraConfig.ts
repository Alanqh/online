import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","cameraRelativeLocation","cameraRelativeRotation","targetArmlength"],["","tag","tag",""],[1,new mw.Vector(0,0,100),new mw.Vector(0,0,0),750]];
export interface ICameraConfigElement extends IElementBase{
 	/**undefined*/
	id:number
	/**摄像机相对位置*/
	cameraRelativeLocation:mw.Vector
	/**摄像机相对旋转*/
	cameraRelativeRotation:mw.Vector
	/**摄像机臂长*/
	targetArmlength:number
 } 
export class CameraConfigConfig extends ConfigBase<ICameraConfigElement>{
	constructor(){
		super(EXCELDATA);
	}

}