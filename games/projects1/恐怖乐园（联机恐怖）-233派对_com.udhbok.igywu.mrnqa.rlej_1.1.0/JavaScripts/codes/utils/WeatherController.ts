/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-03-05 10:53:40
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-12 19:43:39
 * @FilePath     : \hauntedparadise\JavaScripts\codes\utils\WeatherController.ts
 * @Description  : 
 */
import { GameConfig } from "../../config/GameConfig";
import { ColorUtils } from "./Color";

export class WeatherCtrl {
    /**
     * 根据天空ID设置天空
     * @param weatherId 
     */
    static async setWeather(cfgId: number) {
        let cfg = GameConfig.HomeWeather.getElement(cfgId);
        if (!cfg) return

        // if (cfg.skyBoxPre != null) Skybox.preset = cfg.skyBoxPre;//天空球预设
        // if (cfg.fogPreset != null) Fog.setPreset(cfg.fogPreset);//雾效预设
        //设置光参数
        if (cfg.pitchAngle != null) Lighting.pitchAngle = cfg.pitchAngle //俯仰角度
        if (cfg.yawAngle != null) Lighting.yawAngle = cfg.yawAngle//朝向角度
        if (cfg.directionalLightIntensity != null) Lighting.directionalLightIntensity = cfg.directionalLightIntensity//平行光强度
        if (cfg.directionalLightColor != null) Lighting.directionalLightColor = ColorUtils.colorHexToLinearColor("#" + cfg.directionalLightColor)  //平行光颜色
        // if (cfg.temperatureEnabled != null) Lighting.temperatureEnabled = cfg.temperatureEnabled//是否开启色温
        // if (cfg.temperature != null) Lighting.temperature = cfg.temperature//色温
        if (cfg.skyLightIntensity != null) Lighting.skyLightIntensity = cfg.skyLightIntensity//天光强度
        if (cfg.skyLightColor != null) Lighting.skyLightColor = ColorUtils.colorHexToLinearColor("#" + cfg.skyLightColor)//天光颜色
        // if (cfg.ev100 != null) Lighting.ev100 = cfg.ev100//曝光补偿
        // if (cfg.castShadowsEnabled != null) Lighting.castShadowsEnabled = cfg.castShadowsEnabled//投射阴影
        // if (cfg.shadowsDistance != null) Lighting.shadowsDistance = cfg.shadowsDistance//阴影距离
        // if (cfg.lightColor != null) Lighting.lightColor = ColorUtils.colorHexToLinearColor("#" + cfg.lightColor)//偏色值

        //设置天空球参数

        // if (cfg.skyDomeTextureID != null) Skybox.skyDomeTextureID = cfg.skyDomeTextureID//天空盒贴图
        // if (cfg.skyDomeIntensity != null) Skybox.skyDomeIntensity = cfg.skyDomeIntensity//天空盒亮度
        // if (cfg.SkyYawAngle != null) Skybox.yawAngle = cfg.SkyYawAngle //天空盒贴图旋转
        // if (cfg.skyDomeTopColor != null) Skybox.skyDomeTopColor = ColorUtils.colorHexToLinearColor("#" + cfg.skyDomeTopColor)//天空球顶层颜色
        // if (cfg.skyDomeMiddleColor != null) Skybox.skyDomeMiddleColor = ColorUtils.colorHexToLinearColor("#" + cfg.skyDomeMiddleColor)//天空球上层颜色
        // if (cfg.skyDomeHorizontalFallOff != null) Skybox.skyDomeHorizontalFallOff = cfg.skyDomeHorizontalFallOff //地平线渐出
        // if (cfg.starVisible != null) Skybox.starVisible = cfg.starVisible //是否开启星星
        // if (cfg.starTextureID != null) Skybox.starTextureID = cfg.starTextureID//星星贴图
        // if (cfg.starIntensity != null) Skybox.starIntensity = cfg.starIntensity//星星亮度
        // if (cfg.starDensity != null) Skybox.starDensity = cfg.starDensity //星星密度
        // if (cfg.sunVisible != null) Skybox.sunVisible = cfg.sunVisible//是否开启太阳
        // if (cfg.sunTextureID != null) Skybox.sunTextureID = cfg.sunTextureID//太阳贴图
        // if (cfg.sunIntensity != null) Skybox.sunIntensity = cfg.sunIntensity//太阳亮度
        // if (cfg.sunColor != null) Skybox.sunColor = ColorUtils.colorHexToLinearColor("#" + cfg.sunColor)//太阳颜色
        // if (cfg.sunSize != null) Skybox.sunSize = cfg.sunSize//太阳大小
        // if (cfg.moonVisible != null) Skybox.moonVisible = cfg.moonVisible//是否开启月亮
        // if (cfg.moonTextureID != null) Skybox.moonTextureID = cfg.moonTextureID//月亮贴图
        // if (cfg.moonIntensity != null) Skybox.moonIntensity = cfg.moonIntensity //月亮亮度
        // if (cfg.moonColor != null) Skybox.moonColor = ColorUtils.colorHexToLinearColor("#" + cfg.moonColor) //月亮颜色
        // if (cfg.cloudVisible != null) Skybox.cloudVisible = cfg.cloudVisible//是否开启云
        // if (cfg.cloudTextureID != null) Skybox.cloudTextureID = cfg.cloudTextureID//云贴图
        // if (cfg.cloudOpacity != null) Skybox.cloudOpacity = cfg.cloudOpacity //云透明度
        // if (cfg.cloudColor != null) Skybox.cloudColor = ColorUtils.colorHexToLinearColor("#" + cfg.cloudColor) //云颜色
        // if (cfg.cloudDensity != null) Skybox.cloudDensity = cfg.cloudDensity //云密度
        // if (cfg.cloudSpeed != null) Skybox.cloudSpeed = cfg.cloudSpeed//云速度

        //设置雾
        // if (cfg.Enabled != null) Fog.enabled = cfg.Enabled //是否启用
        // if (cfg.density != null) Fog.density = cfg.density//雾密度
        // if (cfg.heightFalloff != null) Fog.heightFalloff = cfg.heightFalloff//雾高度衰弱
        // if (cfg.height != null) Fog.height = cfg.height//雾高度
        // if (cfg.inscatteringColor != null) Fog.inscatteringColor = ColorUtils.colorHexToLinearColor("#" + cfg.inscatteringColor)//雾散射颜色
        // if (cfg.maxOpacity != null) Fog.maxOpacity = cfg.maxOpacity //最大透明度
        // if (cfg.startDistance != null) Fog.startDistance = cfg.startDistance//起始距离
        // if (cfg.directionalInscatteringExponent != null) Fog.directionalInscatteringExponent = cfg.directionalInscatteringExponent //太阳光散射指数
        // if (cfg.directionalInscatteringStartDistance != null) Fog.directionalInscatteringStartDistance = cfg.directionalInscatteringStartDistance//太阳光散射初始距离
        // if (cfg.directionalInscatteringColor != null) Fog.directionalInscatteringColor = ColorUtils.colorHexToLinearColor("#" + cfg.directionalInscatteringColor) //太阳光散射颜色

    }
}