
export class UIShowHideEffect {

    public static inOutEffect() {

        var uiShowTime = 0.2;
        var minOpa = 0.5;
        var uiTimer = new Map();
        var uiEnableUpdate = new Map();
        var uiHideFunc = new Map();
        var uiHiding = new Map();

        UIService.hideUI = (panel) => {
            if (panel == null)
                return;

            for (const [key, uiLayer] of UIService.instance["layerMap"]) {
                const index = uiLayer.panels.indexOf(panel);
                if (index != -1) {
                    uiLayer.panels.splice(index, 1);
                    if (panel.uiObject != null) {
                        try {


                            if (uiEnableUpdate.has(panel) == false) {
                                uiEnableUpdate.set(panel, panel.canUpdate);
                            }
                            if (uiHideFunc.has(panel) == false && panel["onHide"] != null) {
                                uiHideFunc.set(panel, panel["onHide"]);
                                panel["onHide"]();
                                panel["onHide"] = null;
                            } else {

                                if (uiHideFunc.has(panel)) {
                                    panel["onHide"]();
                                    panel["onHide"] = null;
                                }

                            }

                            panel.canUpdate = false;


                        } catch (e) {
                            return false;
                        }
                    }
                    break;
                }
            }


            if (panel.visible) {

                if (uiHiding.has(panel)) {
                    return false;
                }

                uiHiding.set(panel, true);


                let opaDt = 0;
                let opa = 1;

                if (uiTimer.has(panel)) {
                    clearInterval(uiTimer.get(panel));
                }
                panel.rootCanvas.renderOpacity = 1;

                if (!panel["excludeHideEffect"]) {


                    let timer = setInterval(() => {

                        if (panel.uiObject != null) {
                            try {

                                if (panel.visible == false) {
                                    clearInterval(timer);
                                    panel.uiObject.visibility = SlateVisibility.Collapsed;
                                    panel.canUpdate = uiEnableUpdate.get(panel);
                                    if (panel == UIService.instance["uniquePanel"]) {
                                        UIService.setAllMiddleAndBottomPanelVisible(true);
                                        UIService.instance["uniquePanel"] = null;
                                    }
                                    uiHiding.delete(panel);
                                    return;
                                }

                                if (opaDt >= uiShowTime) {
                                    clearInterval(timer);
                                    panel.uiObject.visibility = SlateVisibility.Collapsed;
                                    panel.canUpdate = uiEnableUpdate.get(panel);
                                    if (panel == UIService.instance["uniquePanel"]) {
                                        UIService.setAllMiddleAndBottomPanelVisible(true);
                                        UIService.instance["uniquePanel"] = null;
                                    }
                                    uiHiding.delete(panel);
                                    return;
                                }

                                opaDt += TimeUtil.deltatime();
                                opa = MathUtil.lerp(1, 0, opaDt / uiShowTime);
                                panel.rootCanvas.renderOpacity = opa;

                            } catch (e) {

                            }
                        }



                    }, 1);

                    uiTimer.set(panel, timer);
                }
            } else {


                if (panel.uiObject != null) {
                    try {

                        panel.uiObject.visibility = SlateVisibility.Collapsed;
                        panel.canUpdate = uiEnableUpdate.get(panel);

                    } catch (e) {

                    }
                }

                if (panel == UIService.instance["uniquePanel"]) {
                    UIService.setAllMiddleAndBottomPanelVisible(true);
                    UIService.instance["uniquePanel"] = null;
                }


            }

            return true;
        }

        UIService.showUI = (panel, layer = mw.UILayerMiddle, ...params) => {
            if (panel == null || !panel.uiObject)
                return;
            if (!panel.uiObject.parent || !panel.uiObject.parent.equal(UIService.canvas)) {
                UIService.canvas.addChild(panel.uiObject);
                panel.uiObject["slot"].size = UIService.canvas["slot"].size;
                const constraints = new UIConstraintAnchors(UIConstraintHorizontal.LeftRight, UIConstraintVertical.TopBottom);
                panel.uiObject["slot"].constraints = constraints;
            }
            const beforLayerType = UIService.getUILayer(panel);
            if (layer == mw.UILayerOwn) {
                const panels = UIService.instance["layerMap"].get(mw.UILayerOwn).panels;
                if (panels.length > 0) {
                    UIService.instance["uniquePanel"] = null;
                    UIService.hideUI(panels[0]);
                }
                UIService.instance["uniquePanel"] = panel;
                UIService.setAllMiddleAndBottomPanelVisible(false);
            }
            if (beforLayerType != -1 && beforLayerType != layer) {
                const beforLayer = UIService.instance["layerMap"].get(beforLayerType);
                const index = beforLayer.panels.indexOf(panel);
                beforLayer.panels.splice(index, 1);
            }
            const currentLayer = UIService.instance["layerMap"].get(layer);
            if (currentLayer != null && !currentLayer.panels.includes(panel)) {
                currentLayer.panels.push(panel);
            } else if (currentLayer == null) {
                console.error("showUI currentLayer Error: ", layer, panel.constructor.name);
            }
            const z = currentLayer.startZ + currentLayer.z++;
            panel.uiObject["slot"].zOrder = z;
            panel["__params"] = params;
            if (uiEnableUpdate.has(panel)) {
                panel.canUpdate = uiEnableUpdate.get(panel);
            }
            let isAni = panel.visible;
            panel.visible = true;

            if (uiTimer.has(panel)) {
                clearInterval(uiTimer.get(panel));
            }

            if (uiHideFunc.has(panel)) {
                panel["onHide"] = uiHideFunc.get(panel);
            }

            if (uiHiding.has(panel)) {
                uiHiding.delete(panel);
            }

            if (!isAni && !panel["excludeShowEffect"]) {
                let opaDt = 0;
                let opa = 0;
                panel.rootCanvas.renderOpacity = 0;

                let timer = setInterval(() => {
                    if (panel.visible == false || panel.rootCanvas.visible == false) {
                        clearInterval(timer);
                        return;
                    }

                    if (opaDt >= uiShowTime) {
                        clearInterval(timer);
                        return;
                    }

                    opaDt += TimeUtil.deltatime();
                    opa = MathUtil.lerp(minOpa, 1, opaDt / uiShowTime);
                    panel.rootCanvas.renderOpacity = opa;


                }, 1);

                uiTimer.set(panel, timer);

            }

            return panel;
        }
    }

}