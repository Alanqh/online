

/**
* 模板埋点注解(仅客户端生效)
* @param reportId 模板id
* @returns 
*/
export function PrefabReport(reportId: number = null) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        descriptor.value = function (...args: any[]) {
            if (SystemUtil.isClient() && reportId) {
                console.log("模板", target.constructor.name, "埋点", reportId);
                mw.RoomService.reportLogInfo("ts_action_firstdo", "模板埋点", JSON.stringify({ record: "TemplatePrefab", lifetime: reportId }));
            }
            const result = method.apply(this, args);
            return result;
        }
    }
}