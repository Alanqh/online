/** 
 * @Author       : lei.zhao
 * @Date         : 2023-10-09 16:02:00
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-10-09 16:05:00
 * @FilePath     : \stumbleguys\JavaScripts\tool\CGraphics.ts
 * @Description  : 修改描述
 */
export namespace CGrapics {
    let fpsTime = 1;
    let isSetting = false;
    let fps = 0;
    let lowFpsCount = 0;
    let highFpsCount = 0;
    let isInit = false;
    let _gpuLevel = 0;

    export function init(light: mw.Lighting) {
        return;
        UE.KismetSystemLibrary.ExecuteConsoleCommand(null, "r.DynamicRes.OperationMode 2");
        let gpuLevel = GraphicsSettings.getDefaultGPULevel();
        let currentGpuLevel = GraphicsSettings.getGPULevel();
        if (currentGpuLevel > gpuLevel) {
            //已经设置过了,跳过
            if (gpuLevel < GraphicsLevel.Medium2) {
                mw.Lighting.castShadowsEnabled = false;
                // light.baseShadowEnable = true;
            }
            return;
        }

        if (gpuLevel < GraphicsLevel.Medium2) {
            mw.Lighting.castShadowsEnabled = false;

            // light.baseShadowEnable = true;
            //影子降低强行提高一级画质
            gpuLevel++;
        }

        if (GraphicsSettings.getCPULevel() >= GraphicsLevel.High1) {
            //CPU强大强行提高一级画质
            gpuLevel++;
        }
        if (gpuLevel > mw.GraphicsLevel.Cinematic2) {
            gpuLevel = mw.GraphicsLevel.Cinematic2;
        }
        _gpuLevel = gpuLevel;
        if (gpuLevel > currentGpuLevel) {
            //增加了再设置
            GraphicsSettings.setGraphicsGPULevel(gpuLevel);
        }
        isInit = GraphicsSettings.getDefaultGPULevel() >= GraphicsLevel.High1//高端机才给动态帧率机会;
    }
    export function onUpdate(dt: number) {
        return;
        if (!isInit || isSetting) return;
        if (fpsTime > 0) {
            fps++;
            fpsTime -= dt;
        } else {
            fpsTime = 1;
            if (fps <= 25) {
                lowFpsCount++;
                if (lowFpsCount > 10) {
                    //不再尝试，无提高空间
                    isSetting = true;
                }
            } else {
                lowFpsCount = 0;
            }
            if (fps >= 29) {
                highFpsCount++;
                if (highFpsCount > 10) {
                    //稳定30帧,帧数有提高空间
                    let _currentLevel = _gpuLevel + 1;
                    if (_currentLevel <= mw.GraphicsLevel.Cinematic2) {
                        GraphicsSettings.setGraphicsGPULevel(_currentLevel);
                    }
                    isSetting = true;
                }
            } else {
                highFpsCount = 0;
            }
            fps = 0;
        }
    }
}