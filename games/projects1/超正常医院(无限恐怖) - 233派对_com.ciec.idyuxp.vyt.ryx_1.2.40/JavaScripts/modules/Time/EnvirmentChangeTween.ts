import { GameConfig } from "../../config/GameConfig";


export default class EnvirmentChangeTween {

    private static tween: mw.Tween<{}>;

    /**
     * 雾效出现，最浓时切换环境
     */
    // public static fogAppear(curTime): void {

    //     let timeMC = ModuleService.getModule(TimeModuleC);

    //     let switchDuration = GlobalData.Time.switchEnvTime;
    //     let envConf = GlobalData.Environment;
    //     // 雾密度
    //     let maxFogDensity = envConf.maxfogDensity;
    //     // 雾颜色(不动态变)
    //     Fog.inscatteringColor = mw.LinearColor.colorHexToLinearColor(envConf.fogColor);
    //     // 雾高度
    //     Fog.height = envConf.fogHeight;
    //     // 雾起始距离
    //     Fog.startDistance = envConf.fogBeginDistance;

    //     /** 每多少帧更新一次 */
    //     let updateDelay = 1;
    //     /** 计时器 */
    //     let timer = 0;
    //     // Tween 启动！
    //     if (this.tween) this.tween.stop();
    //     Fog.enabled = true;

    //     this.tween = new mw.Tween({
    //         fogDensity: 0,
    //     }).to({
    //         fogDensity: maxFogDensity,
    //     }, switchDuration * 1000 / 2)
    //         .onUpdate((obj) => {
    //             // 每 updateDelay帧更新一次;
    //             // if (timer % updateDelay == 0) {
    //             Fog.density = obj.fogDensity;
    //             // }
    //             // timer++;
    //         })
    //         .onComplete(() => {
    //             // this.tween = null;
    //             this.tween = fogFadeTween;
    //             fogFadeTween.start();
    //         })
    //     // .start();
    //     // 在雾效达到最大值时切换天空盒
    //     setTimeout(() => {
    //         let timeConf = GlobalData.Time;
    //         // 白天切夜晚
    //         if (curTime == timeConf.dayTime - timeConf.switchEnvTime) {
    //             this.setEnv(ModuleService.getModule(TimeModuleC).mode);
    //         }
    //         // 夜晚切白天
    //         else if (curTime == timeMC.dayTime + timeMC.nightTime - timeConf.switchEnvTime) {
    //             this.setEnv(1);
    //         } else {
    //             console.error("lmn error 当前时间参数有误: " + curTime);
    //         }
    //     }, switchDuration / 2 * 1000);

    //     let fogFadeTween = new mw.Tween({ density: maxFogDensity }).to({ density: envConf.nightFogDensity }, switchDuration / 2 * 1000)
    //         .onUpdate((obj) => {
    //             Fog.density = obj.density;
    //             // console.log("夜晚雾密度" + obj.density);
    //         })
    //         .onComplete(() => {
    //             this.tween = null;
    //         })
    // }

    /**直接设置环境参数 */
    public static setEnv(toTimeId: number) {
        let conf = GameConfig.TimeTurn.getElement(toTimeId);

        if (conf.Picture) {
            Skybox.skyDomeTextureID = conf.Picture;
        }
        if (conf.skyDomeIntensity) {
            Skybox.skyDomeIntensity = conf.skyDomeIntensity;
        }
        if (conf.SkyDomeColor) {
            Skybox.skyDomeBaseColor = mw.LinearColor.colorHexToLinearColor(conf.SkyDomeColor);
        }
        if (conf.skyDomeTopTint) {
            Skybox.skyDomeTopColor = mw.LinearColor.colorHexToLinearColor(conf.skyDomeTopTint);
        }
        if (conf.skyDomeHorizontalTint) {
            Skybox.skyDomeMiddleColor = mw.LinearColor.colorHexToLinearColor(conf.skyDomeHorizontalTint);
        }
        if (conf.skyDomeBotTint) {
            Skybox.skyDomeBottomColor = mw.LinearColor.colorHexToLinearColor(conf.skyDomeBotTint);
        }
        if (conf.cloudTint) {
            Skybox.cloudColor = mw.LinearColor.colorHexToLinearColor(conf.cloudTint);
        }
        if (conf.starIntensity) {
            Skybox.starIntensity = conf.starIntensity;
        }
        Skybox.moonVisible = true;
        if (conf.moonIntensity) {
            Skybox.moonIntensity = conf.moonIntensity;
        }
        if (conf.moonColor) {
            Skybox.moonColor = mw.LinearColor.colorHexToLinearColor(conf.moonColor);
        }
        if (conf.moonPicture) {
            Skybox.moonTextureID = conf.moonPicture;
        }
        if (conf.moonSize) {
            Skybox.moonSize = conf.moonSize;
        }

        Skybox.refresh();


        if (conf.Orientation) {
            mw.Lighting.yawAngle = conf.Orientation;
        }
        if (conf.Pitching) {
            mw.Lighting.pitchAngle = conf.Pitching;
        }
        if (conf.ParallelLight) {
            mw.Lighting.directionalLightIntensity = conf.ParallelLight;
        }
        if (conf.ParallelLightColor) {
            mw.Lighting.directionalLightColor = mw.LinearColor.colorHexToLinearColor(conf.ParallelLightColor);
        }
        // bug?  #FFFFFF00 黑屏  #FFFFFF 正常
        if (conf.lightColor) {
            mw.Lighting.lightColor = mw.LinearColor.colorHexToLinearColor(conf.lightColor);
        }
        if (conf.lightIntensity) {
            mw.Lighting.skyLightIntensity = conf.lightIntensity;
        }
        if (conf.ColorTemperature) {
            mw.Lighting.temperature = conf.ColorTemperature;
        }
        if (conf.ExposureCompensation) {
            mw.Lighting.ev100 = conf.ExposureCompensation;
        }
        if (conf.ShadowDistance) {
            mw.Lighting.shadowsDistance = conf.ShadowDistance;
        }

        Fog.height = 2000;
        if (conf.fog) {
            Fog.enabled = conf.fog == 1 ? true : false;
            if (Fog.enabled) {
                if (conf.fogDensity) {
                    Fog.density = conf.fogDensity;
                }
                if (conf.fogAbate) {
                    Fog.heightFalloff = conf.fogAbate;
                }
                if (conf.fogColor) {
                    Fog.inscatteringColor = mw.LinearColor.colorHexToLinearColor(conf.fogColor);
                }
                if (conf.fogBeginDistance) {
                    Fog.startDistance = conf.fogBeginDistance;
                }
                if (conf.fogHeight) {
                    Fog.height = conf.fogHeight;
                }
            }
        } else {
            mw.Fog.enabled = false;
        }


        if (conf.PostPorssesPreinstall) {
            PostProcess.preset = conf.PostPorssesPreinstall;
        }
        if (conf.Floodlight) {
            PostProcess.bloom = conf.Floodlight;
        }
        if (conf.Saturability) {
            PostProcess.saturation = conf.Saturability;
        }
        if (conf.Contrast) {
            PostProcess.contrast = conf.Contrast;
        }

    }

    /**获得两种颜色的中间颜色 */
    public static getMiddleColor(startColor: LinearColor, endColor: LinearColor, percent: number): LinearColor {
        let r = startColor.r + (endColor.r - startColor.r) * percent;
        let g = startColor.g + (endColor.g - startColor.g) * percent;
        let b = startColor.b + (endColor.b - startColor.b) * percent;
        return new LinearColor(r, g, b);
    }

    /**获取当前后处理参数*/
    public getPossProcess(): mw.PostProcessConfig {
        return PostProcess.config;
    }

    /**后处理动画 */
    public static postProcessTween(start: PostProcessConfig, end: PostProcessConfig, duration: number) {

    }

    /**设置后处理
     * @param x 泛光
     * @param y 饱和度
     * @param z 对比度
     */
    public static setPostProcess(x?: number, y?: number, z?: number) {
        if (x) {
            PostProcess.bloom = x;
        }
        if (y) {
            PostProcess.saturation = y;
        }
        if (z) {
            PostProcess.contrast = z;
        }
    }


}