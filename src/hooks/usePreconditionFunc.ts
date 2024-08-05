import { type Ref, watch, isRef } from 'vue';

function shouldRunFunc(variable: (Ref<any> | (() => any))[]) {
    return variable.every(item => {
        const it: any = isRef(item) ? item.value : (<() => void>item)();
        if (Array.isArray(it) && it.length) {
            return true;
        } else if (Object.prototype.toString.call(it) === '[object Object]' && Object.keys(it).length) {
            return true;
        } else {
            return it !== null && it !== undefined;
        }
    });
}

export function usePreconditionFunc(variable: Ref | Ref[] | (() => any) | [() => any], func: () => void) {
    const arr = Array.isArray(variable) ? variable : [variable];
    return () => {
        if (shouldRunFunc(arr)) {
            func();
        } else {
            const unwatch = watch(arr, () => {
                if (shouldRunFunc(arr)) {
                    func();
                    unwatch();
                }
            });
        }
    };
}
