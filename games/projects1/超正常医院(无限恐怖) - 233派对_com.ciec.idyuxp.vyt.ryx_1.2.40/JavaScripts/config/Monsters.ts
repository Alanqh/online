import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","GUID","Icon","Name","DayDressAsset","NightDressAsset","ChangeDressAnima","BirthPosition","SkillID","PatrolPosArr","WalkSpeed","PursueSpeed","TrackDis","Active","walk","TrackAudio","patrol","atkAni","discover","pick"],["","","","","","","","","","","","","","","","","","","",""],[2010,"3E8A22B5","323101","小狼","0E5179A241CE21426A077FBEF82383E9","CE0130774DF034664CD620B475BD5BBF","6001",new mw.Vector(-247.68,-3217.74,553),null,[new mw.Vector(-165.93,-1631.15,574.49),new mw.Vector(1067.93,-1560.14,574.49),new mw.Vector(1081.88,-1029.62,574.49),new mw.Vector(-844.05,-1977.62,574.49),new mw.Vector(-2156.25,-1934.77,574.49),new mw.Vector(-224.04,-3400.23,574.49),new mw.Vector(-174.02,-5242.28,574.49),new mw.Vector(-166.70,-4380.55,574.49)],100,500,800,62,61,0,40,57,58,60],[2011,"3E8A22B5","323102","狐狸","2BA7B1C849851E665B75528783855CFD","9ADAE07F4E6AF3CFFDEE06999FD474CC","6001",new mw.Vector(3967.19,-3787.36,653.80),null,[new mw.Vector(2880.27,-1589.89,574.49),new mw.Vector(2842.11,-1018.90,574.49),new mw.Vector(4054.26,-1620.62,574.49),new mw.Vector(3990.03,-2995.62,574.49),new mw.Vector(4016.99,-4418.73,574.49),new mw.Vector(4707.45,-4910.06,574.49),new mw.Vector(4702.81,-5378.32,574.49),new mw.Vector(5603.36,-5440.12,574.49),new mw.Vector(6282.40,-5421.89,574.49),new mw.Vector(5562.85,-4433.71,574.49),new mw.Vector(4727.67,-4460.24,574.49),new mw.Vector(4719.08,-1947.24,574.49),new mw.Vector(4672.49,-1546.87,574.49),new mw.Vector(6171.32,-1560.71,574.49),new mw.Vector(6105.25,-2269.25,574.49),new mw.Vector(4686.97,-2349.21,574.49)],100,500,800,62,61,0,40,57,58,60],[2009,"3E8A22B5","316512","花缠","A7A71E9C439979B26B77BCB782DBC342","F4411CC844B97CFC3AE8A394B83B3BE7","6001",new mw.Vector(1953.47,-2564.61,82.80),null,[new mw.Vector(1883.81,-2639.96,100.51),new mw.Vector(3266.31,-2636.97,378.49),new mw.Vector(3262.31,-1660.97,574.49),new mw.Vector(2675.31,-1229.97,574.49),new mw.Vector(1978.31,-1229.97,574.49),new mw.Vector(1111.32,-1233.42,574.49),new mw.Vector(483.97,-1755.26,574.49),new mw.Vector(537.25,-2623.44,373.94)],100,500,800,62,61,26,40,57,58,60],[2002,"34703903","316187","面具男","1545F2394C160F2708C9C180BB1F42E8","6E5A26BD488467ADB0FCE0B7A7E58B3F","6001",new mw.Vector(-148.96,2059.5,-456.51),null,[new mw.Vector(-148.96,2641.5,-456.51),new mw.Vector(3883.04,2641.5,-456.51),new mw.Vector(3883.04,1297.5,-456.51),new mw.Vector()],100,500,800,47,55,20,40,57,58,60],[2003,"329CCE6B","316198","玩具熊","3A6EE3E849333846714DFDAB696F9824","9502A4A74E982EC142AFC6BA0F8B2879","6001",new mw.Vector(4003.61,-3618.20,237.80),null,[new mw.Vector(4072.44,-2382.14,100),new mw.Vector(4036.13,-3570.16,100),new mw.Vector(4035.01,-4844.26,100),new mw.Vector(4859.61,-3027.33,100),new mw.Vector(4868.82,-2458.63,100),new mw.Vector(4844.21,-3611.38,100),new mw.Vector(5529.57,-3119.97,100),new mw.Vector(6117.05,-3085.31,100),new mw.Vector(5628.60,-2528.42,100),new mw.Vector(4924.02,-4488.86,100),new mw.Vector(5716.48,-4490.21,100),new mw.Vector(5707.65,-5252.07,100)],100,500,800,41,49,21,40,57,58,60],[2004,"1D0753A5","316199","僵尸女","987B97D546DD24B88C90B8A0D4D052EB","0003F4BA40465760163F2D86626C7B33","6001",new mw.Vector(-247.68,-2817.74,553.80),null,[new mw.Vector(-281.86,-2318.51,100),new mw.Vector(-842.99,-2725.18,100),new mw.Vector(-1176.83,-2484.55,100),new mw.Vector(-2004.36,-2419.13,100),new mw.Vector(-289.62,-3939.86,100),new mw.Vector(-826.33,-4460.95,100),new mw.Vector(-1231.01,-4947.78,100),new mw.Vector(-2039.87,-4967.56,100),new mw.Vector(-267.07,-5041.05,100)],100,500,800,42,50,22,40,57,58,60],[2005,"0E6F9DC1","316195","无头骑士","73219B3645911ACC85D782ABE09E68BF","7249DA4E4B0AD5245ECBE598E1C8F002","6001",new mw.Vector(1868.43,-3270.33,162.80),null,[new mw.Vector(433.86,-3483.88,100),new mw.Vector(1333.00,-3466.17,100),new mw.Vector(1287.76,-4198.50,100),new mw.Vector(1266.50,-4929.05,100),new mw.Vector(2224.80,-4923.45,100),new mw.Vector(1591.16,-2692.28,100),new mw.Vector(1213.19,-2097.15,100)],100,500,800,46,54,23,40,57,58,60],[2006,"313BE0ED","316191","裂口女","FA92E1784FD8AE3FB6053FAD7224E63C","2E6A9ADA46ADF8EFCBA79F8171FBAD21","6001",new mw.Vector(10.79,389.62,-290.20),null,[new mw.Vector(-58.53,-1125.16,-519.51),new mw.Vector(-62.51,-134.68,-519.51),new mw.Vector(-65.95,909.98,-519.51),new mw.Vector(-104.86,2567.38,-519.51),new mw.Vector(747.51,2646.26,-519.51),new mw.Vector(1535.16,2631.15,-519.51),new mw.Vector(2713.99,2636.51,-519.51)],100,500,800,48,56,24,40,57,58,60],[2007,"05381DE9","316196","玩具兔","B3DBE5E64FD60D654A4993B3ADA37410","26BD301E41E59D649B7814B74545441C","6001",new mw.Vector(3962.72,1260.03,-305.20),null,[new mw.Vector(4057.83,2613.99,-519.51),new mw.Vector(4000.48,1219.57,-519.51),new mw.Vector(3938.76,204.46,-519.51),new mw.Vector(3851.07,-1118.43,-519.51),new mw.Vector(2742.65,-814.94,-519.51),new mw.Vector(1561.25,-794.15,-519.51),new mw.Vector(3111.91,1908.82,-519.51),new mw.Vector(2307.55,1901.88,-519.51),new mw.Vector(2338.07,1419.63,-519.51),new mw.Vector(2158.33,569.26,-519.51),new mw.Vector(2492.03,-177.28,-519.51),new mw.Vector(3132.38,-857.95,-519.51)],100,500,800,44,52,25,40,57,58,60],[2008,"11FC83BB","316181","萝莉","9C6252654000902312A1E199EE2B7F36","E46A405047A202434323098F7EEA8EA6","6001",new mw.Vector(1925.29,-4930.36,167.56),null,[new mw.Vector(2405.64,-4923.69,100),new mw.Vector(2424.86,-4098.93,100),new mw.Vector(2358.52,-3494.01,100),new mw.Vector(2000.72,-2673.42,100),new mw.Vector(2377.19,-2123.43,100),new mw.Vector(3042.60,-3523.84,100)],100,500,800,49,56,26,40,57,58,60],[2001,"2C449049","316184","屠夫","C6A420EB44244A4862DAE9A0A85ACD51","58147B004EA80B9B9CD72AAAEB86FA86","6001",new mw.Vector(3894.42,1923.58,-443.51),null,[new mw.Vector(2587.42,1923.58,-443.51),new mw.Vector(2587.42,1133.58,-443.51),new mw.Vector(2187.42,853.58,-443.51),new mw.Vector(2408.42,192.58,-443.51),new mw.Vector(2630.42,-254.42,-443.51),new mw.Vector(3173.42,-492.42,-443.51),new mw.Vector(3173.42,-1051.42,-443.51)],100,500,800,45,53,19,40,57,58,60]];
export interface IMonstersElement extends IElementBase{
 	/**id*/
	ID:number
	/**角色GUID*/
	GUID:string
	/**图片*/
	Icon:string
	/**名称*/
	Name:string
	/**白天角色形象*/
	DayDressAsset:string
	/**夜晚角色形象*/
	NightDressAsset:string
	/**变身动画*/
	ChangeDressAnima:string
	/**出生位置*/
	BirthPosition:mw.Vector
	/**技能ID*/
	SkillID:string
	/**巡逻路径点数组*/
	PatrolPosArr:mw.Vector[]
	/**巡逻速度*/
	WalkSpeed:number
	/**追击速度*/
	PursueSpeed:number
	/**追击直线距离*/
	TrackDis:number
	/**追击动作*/
	Active:number
	/**正常寻路动作*/
	walk:number
	/**追击音效（音效表id）*/
	TrackAudio:number
	/**巡视动作*/
	patrol:number
	/**攻击*/
	atkAni:number
	/**发现玩家*/
	discover:number
	/**举起玩家*/
	pick:number
 } 
export class MonstersConfig extends ConfigBase<IMonstersElement>{
	constructor(){
		super(EXCELDATA);
	}

}