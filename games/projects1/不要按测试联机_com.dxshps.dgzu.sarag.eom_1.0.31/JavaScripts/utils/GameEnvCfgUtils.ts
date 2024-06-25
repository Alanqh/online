import { GameConfig } from "../config/GameConfig";
import { ILightElement } from "../config/Light";

/**
 * 游戏整体环境配置工具类
 */
export default class GameEnvCfgUtils {

    private static lastLightConfig: ILightElement = null;

    public static changeSkyBox(lightID: number) {
        let cfg = GameConfig.Light.getElement(lightID);
        if (!cfg) return;

        if (this.lastLightConfig != null && this.lastLightConfig.id == lightID) return;
        //----------------天空球----------------
        this.changeSkybox(cfg);

        //----------------光照----------------
        this.changeLight(cfg);

        //----------------后期处理----------------
        this.changePostProcess(cfg);

        //----------------雾----------------
        this.changeFog(cfg);
        // 记录上一次的配置
        this.lastLightConfig = cfg;
    }

    /**
     * 天空盒
     * @param cfg 
     */
    private static changeSkybox(cfg: ILightElement) {
        //天空盒贴图
        Skybox.skyDomeTextureID = cfg.SkyGUID;
        //天空盒亮度
        Skybox.skyDomeIntensity = cfg.SkyBright;
        //天空盒颜色
        if (!StringUtil.isEmpty(cfg.SkyColor)) {
            Skybox.skyDomeBaseColor = mw.LinearColor.colorHexToLinearColor(cfg.SkyColor);
        }
        //天空盒顶部颜色
        if (!StringUtil.isEmpty(cfg.SkyTopColor)) {
            Skybox.skyDomeTopColor = mw.LinearColor.colorHexToLinearColor(cfg.SkyTopColor);
        }
        //天空盒中层颜色
        if (!StringUtil.isEmpty(cfg.SkyUpColor)) {
            Skybox.skyDomeMiddleColor = mw.LinearColor.colorHexToLinearColor(cfg.SkyUpColor);
        }
        //天空盒底部颜色
        if (!StringUtil.isEmpty(cfg.SkyBottomColor)) {
            Skybox.skyDomeBottomColor = mw.LinearColor.colorHexToLinearColor(cfg.SkyBottomColor);
        }
        //地平线渐出
        Skybox.skyDomeHorizontalFallOff = cfg.Skyline;
        //是否开启星星
        Skybox.starVisible = cfg.IsStarsOpen;
        if (cfg.IsStarsOpen) {
            //星星贴图
            Skybox.starTextureID = cfg.StarsDUID;
            //星星密度
            Skybox.starDensity = cfg.StarsDensity;
            //星星亮度
            Skybox.starIntensity = cfg.StarsBright;
        }
        //是否开启太阳
        Skybox.sunVisible = cfg.IsSunOpen;
        if (cfg.IsSunOpen) {
            //太阳贴图
            Skybox.sunTextureID = cfg.SunGUID;
            //太阳亮度
            Skybox.sunIntensity = cfg.SunBright;
            //太阳颜色
            if (!StringUtil.isEmpty(cfg.SunColor)) {
                Skybox.sunColor = mw.LinearColor.colorHexToLinearColor(cfg.SunColor);
            }
            //太阳大小
            Skybox.sunSize = cfg.SunSize;
        }
        //是否开启月亮
        Skybox.moonVisible = cfg.IsMoonOpen;
        if (cfg.IsMoonOpen) {
            //月亮贴图
            Skybox.moonTextureID = cfg.MoonGUID;
            //月亮亮度
            Skybox.moonIntensity = cfg.MoonBright;
            //月亮颜色
            if (!StringUtil.isEmpty(cfg.MoonColor)) {
                Skybox.cloudColor = mw.LinearColor.colorHexToLinearColor(cfg.MoonColor);
            }
            //月亮大小
            Skybox.moonSize = cfg.MoonSize;
        }
        //是否开启云层
        Skybox.cloudVisible = cfg.IsCloudOpen;
        if (cfg.IsCloudOpen) {
            //云层贴图
            Skybox.cloudTextureID = cfg.CloudGUID;
            //云透明度
            Skybox.cloudOpacity = cfg.CloudTransparent;
            //云颜色
            if (!StringUtil.isEmpty(cfg.CloudColor)) {
                Skybox.cloudColor = mw.LinearColor.colorHexToLinearColor(cfg.CloudColor);
            }
            //云速度
            Skybox.cloudSpeed = cfg.CloudSpeed;
        }

    }

    /**
     * 光照
     * @param cfg 
    */
    private static changeLight(cfg: ILightElement) {
        //----------------天光----------------
        //天光强度
        Lighting.skyLightIntensity = cfg.SLBrightness;
        //天光颜色
        if (!StringUtil.isEmpty(cfg.SLColor)) {
            Lighting.skyLightColor = mw.LinearColor.colorHexToLinearColor(cfg.SLColor);
        }

        //曝光补偿
        Lighting.ev100 = cfg.ExposureCompensation;
        // 偏色值
        if (!StringUtil.isEmpty(cfg.ColorDeviationValue)) {
            Lighting.lightColor = mw.LinearColor.colorHexToLinearColor(cfg.ColorDeviationValue);
        }

        //----------------平行光----------------
        //朝向角度
        Lighting.yawAngle = cfg.OrientationAngle;
        //俯仰角度
        Lighting.pitchAngle = cfg.PitchingAngle;
        //光强
        Lighting.directionalLightIntensity = cfg.DirectionaIntensity;
        //光颜色
        if (!StringUtil.isEmpty(cfg.DirectionaColor)) {
            Lighting.directionalLightColor = mw.LinearColor.colorHexToLinearColor(cfg.DirectionaColor);
        }
        //是否产生阴影
        Lighting.castShadowsEnabled = Boolean(cfg.IsShadow);
        if (cfg.IsShadow) {
            //阴影距离
            Lighting.shadowsDistance = cfg.ShadowDistance;
        }

        // 是否开启色温
        Lighting.temperatureEnabled = Boolean(cfg.IsColorTempOpen);
        if (cfg.IsColorTempOpen) {
            //光温度
            Lighting.temperature = cfg.ColorTemp;
        }
    }

    /**
     * 后期处理
     * @param cfg 
     */
    private static changePostProcess(cfg: ILightElement) {
        //泛光
        PostProcess.bloom = cfg.Bloom;
        //全局饱和度
        PostProcess.saturation = cfg.GlobalSaturation;
        //全局对比度
        PostProcess.contrast = cfg.GlobalContrast;
    }

    /**
     * 修改雾
     * @param cfg 
     */
    private static changeFog(cfg: ILightElement) {
        // 先修改开关
        Fog.enabled = cfg.FogEnable;
        if (!cfg.FogEnable) {
            return
        }
        //雾密度
        Fog.density = cfg.FogDensity;
        //雾衰弱高度
        Fog.heightFalloff = cfg.FogHeightDebility;
        //雾高度
        Fog.height = cfg.FogHeight;
        //雾散射颜色
        if (!StringUtil.isEmpty(cfg.FogColor)) {
            Fog.inscatteringColor = mw.LinearColor.colorHexToLinearColor(cfg.FogColor);
        }
        //雾最大透明度
        Fog.maxOpacity = cfg.FogDiaphaneity;
        //雾起始距离
        Fog.startDistance = cfg.StartDistance;
        //太阳光散射指数
        Fog.directionalInscatteringExponent = cfg.SunLightScattering;
        //太阳光散射距离
        Fog.directionalInscatteringStartDistance = cfg.SunLightScatteringDistance;
        //太阳光散射颜色
        if (!StringUtil.isEmpty(cfg.SunLightScatteringColor)) {
            Fog.directionalInscatteringColor = mw.LinearColor.colorHexToLinearColor(cfg.SunLightScatteringColor);
        }
    }
}