
export class PollingUtils {

    static add(fun: () => any, maxTime: number = 8000, intervalTime: number = 200, isNext = false) {
        return new Promise((resolve, reject) => {
            if (!isNext) {
                const ret = fun();
                if (ret) {
                    resolve(ret);
                    return;
                };
            }
            const intervalId = setInterval(() => {
                const timer = setTimeout(() => {
                    clearInterval(intervalId);
                    reject();
                }, maxTime);
                const ret = fun();
                if (!ret) return;
                clearInterval(intervalId);
                clearTimeout(timer);
                resolve(ret);
            }, intervalTime)
        });
    }

}