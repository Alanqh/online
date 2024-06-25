import { AnimAssets, EffectAssets } from "./TypeDefine";

export const jetPackAsset = "131208";
export const tailFrameEffect = "27393";

export const animMap : Map<SomatotypeV2, AnimAssets> = new Map([
	[SomatotypeV2.AnimeMale,            { sprint: "270580", emergencyStop: "270596", multiJump: "270574" }],
	[SomatotypeV2.AnimeFemale,          { sprint: "270589", emergencyStop: "270591", multiJump: "270578" }],
	[SomatotypeV2.LowpolyAdultMale,     { sprint: "270595", emergencyStop: "270583", multiJump: "270576" }],
	[SomatotypeV2.LowpolyAdultFemale,   { sprint: "270585", emergencyStop: "270590", multiJump: "270587" }],
	[SomatotypeV2.RealisticAdultMale,   { sprint: "270584", emergencyStop: "270586", multiJump: "270573" }],
	[SomatotypeV2.RealisticAdultFemale, { sprint: "270594", emergencyStop: "270582", multiJump: "270577" }],
	[SomatotypeV2.CartoonyMale,         { sprint: "270575", emergencyStop: "270581", multiJump: "270579" }],
	[SomatotypeV2.CartoonyFemale,       { sprint: "270593", emergencyStop: "270592", multiJump: "270588" }],
])

export const effectMap: Map<SomatotypeV2, EffectAssets> = new Map([
    [SomatotypeV2.AnimeMale,            { run: "219369", sprint: "219369", multiJump: "219368", landed: "151535", velocityLine: "219370" }],
	[SomatotypeV2.AnimeFemale,          { run: "219369", sprint: "219369", multiJump: "219368", landed: "151535", velocityLine: "219370" }],
	[SomatotypeV2.LowpolyAdultMale,     { run: "219369", sprint: "219369", multiJump: "219368", landed: "151535", velocityLine: "219370" }],
	[SomatotypeV2.LowpolyAdultFemale,   { run: "219369", sprint: "219369", multiJump: "219368", landed: "151535", velocityLine: "219370" }],
	[SomatotypeV2.RealisticAdultMale,   { run: "219369", sprint: "219369", multiJump: "219368", landed: "151535", velocityLine: "219370" }],
	[SomatotypeV2.RealisticAdultFemale, { run: "219369", sprint: "219369", multiJump: "219368", landed: "151535", velocityLine: "219370" }],
	[SomatotypeV2.CartoonyMale,         { run: "219369", sprint: "219369", multiJump: "219368", landed: "151535", velocityLine: "219370" }],
	[SomatotypeV2.CartoonyFemale,       { run: "219369", sprint: "219369", multiJump: "219368", landed: "151535", velocityLine: "219370" }],
])

export const iconList =  {
	runImage:"158379",
	flyImage:"158400",
	standImage:"158379",
	crouchImage:"114090",
}

export const movementSetting = {
    sprintSpeed: 1000,
    emergencyStopSpeed: 900,
    multiJumpHeight: 360,
	emergencyStopTime: 1.5
}