import { isRef, onMounted, onUnmounted, ref, watch, type Ref } from 'vue';

interface TabScroll {
    key: string | number;
    value: HTMLElement | Ref<HTMLElement | null> | null;
}

function getDom(target: Ref<HTMLElement | null> | HTMLElement | null): HTMLElement | null {
    if (isRef(target)) {
        return target.value;
    }else if(typeof target === 'string') {
        return document.getElementById(target);
    }else {
        return target;
    }
}
// 获取元素距离滚动容器顶部的距离
function getOffsetTop(element, parent) {
    const pTop = parent instanceof Window ? 0 : parent.offsetTop;
    return element.offsetTop - pTop;
}

function debounce(func: ()=>void, wait:number) {
    let timeout;
    return ()=>{
        if(timeout) {
            return;
        }
        timeout = setTimeout(()=>{
            func();
            timeout = null;
            clearTimeout(timeout);
        }, wait);
    };
}

export function useTabScroll(target: TabScroll[], scrollContainer: Ref<HTMLElement | null> | string | HTMLElement | Window = window, targetTop = 20) {
    const tabActive = ref<string | number>();

    let changeTab: (key: string | number) => void | any;

    // 监听tabActive变化
    function watchHandler(val) {
        const element = getDom(target.find((item) => item.key === val)!.value);
        if (element) {
            // 先移除滚动事件监听
            scrollBox?.removeEventListener('scroll', handleScroll);
            scrollBox?.scrollTo({
                top: getOffsetTop(element, scrollBox) - targetTop,
                behavior: 'smooth'
            });
            changeTab(val);
            // 滚动到指定位置后再监听滚动事件
            setTimeout(() => {
                scrollBox?.addEventListener('scroll', handleScroll);
            }, 300);
        }
    }
    let unwatch = watch(tabActive, watchHandler);

    // 滚动容器
    let scrollBox: HTMLElement | Window | null = window;
    const handleScroll = debounce(() => {
        // 获取跟滚动容器顶部的距离
        const top = (scrollBox instanceof Window ? scrollBox.pageYOffset : scrollBox!.scrollTop) + targetTop;

        for(let i = 0;i < target.length - 1;i++) {
            const tabDom = target[i];
            const nextTabDom = target[i + 1];
            const element = getDom(tabDom.value);
            const nextElement = getDom(nextTabDom.value);
            if (element && nextElement) {
                // 获取当前tab距离滚动容器顶部的距离
                const tabTop = getOffsetTop(element, scrollBox);
                const nextTabTop = getOffsetTop(nextElement, scrollBox);
                if (top >= tabTop && top < nextTabTop) {
                    // 防止重复触发
                    unwatch();
                    const flag = tabActive.value !== tabDom.key;
                    tabActive.value = tabDom.key;
                    changeTab && flag && changeTab(tabDom.key);
                    unwatch = watch(tabActive, watchHandler);
                    break;
                }
                // 如果滚动到最后一个tab
                if(i === target.length - 2 && top >= nextTabTop) {
                    unwatch();
                    const flag = tabActive.value !== nextTabDom.key;
                    tabActive.value = nextTabDom.key;
                    changeTab && flag && changeTab(nextTabDom.key);
                    unwatch = watch(tabActive, watchHandler);
                }
            }
        }
    }, 200);

    onMounted(() => {
        if (typeof scrollContainer === 'string') {
            scrollBox = document.getElementById(scrollContainer);
        }
        handleScroll();
        scrollBox?.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
        scrollBox?.removeEventListener('scroll', handleScroll);
    });

    function onChange(func: (key: string | number) => void | any) {
        changeTab = (key: string | number) => {
            if (key) {
                func(key);
            }
        };
    }

    return {
        tabActive,
        onChange
    };
}