/* eslint-disable no-console */
import { isRef, onMounted, onUnmounted, ref, watch, nextTick, type Ref } from 'vue';

type TabValue = HTMLElement | Ref<HTMLElement> | string;

interface TabScroll {
    key: string | number;
    value: HTMLElement | Ref<HTMLElement> | string;
}

function getDom(target: TabValue): HTMLElement {
    if (isRef(target)) {
        return target.value;
    }else if(typeof target === 'string') {
        if(!document.querySelector(target)) {
            console.error(`useTabScroll: 节点目标错误，没有找到${target}的元素`);
        }
        return document.querySelector(target)!;
    }else {
        return target;
    }
}
// 获取元素距离滚动容器顶部的距离
function getOffsetTop(element: HTMLElement, parent: HTMLElement | Window) {
    return parent instanceof Window ? element.getBoundingClientRect().top - document.body.getBoundingClientRect().top : element.getBoundingClientRect().top - parent.getBoundingClientRect().top + parent.scrollTop;
}

function throttle(func: ()=>void, wait:number) {
    let timeout: number | null = null;
    return ()=>{
        if(timeout) {
            return;
        }
        timeout = setTimeout(()=>{
            func();
            timeout && clearTimeout(timeout);
            timeout = null;
        }, wait);
    };
}

export function useTabScroll(
    target: TabScroll[],
    scrollContainer: Ref<HTMLElement | null> | string | HTMLElement | Window = window,
    targetTop = 20,
    trigger?: Ref<Boolean>
) {
    const tabActive = ref<string | number>();

    let changeTab: (key: string | number) => void | any;

    // 监听tabActive变化
    function watchHandler(val: string | number | undefined) {
        const tab = target.find((item) => item.key === val);
        if (!tab) {
            console.error('useTabScroll: tabActive值错误，未找到对应的tab');
            return;
        }
        const element = getDom(tab!.value);
        if (element) {
            // 先移除滚动事件监听
            scrollBox?.removeEventListener('scroll', handleScroll);
            scrollBox?.scrollTo({
                top: getOffsetTop(element, scrollBox) - targetTop,
                behavior: 'smooth'
            });
            changeTab && val && changeTab(val);
            const scrollHandler = ()=>{
                scrollBox?.addEventListener('scroll', handleScroll);
                scrollBox?.removeEventListener('wheel', scrollHandler);
            };
            scrollBox?.addEventListener('wheel', scrollHandler);
        }
    }
    let unwatch = watch(tabActive, watchHandler);

    // 滚动容器
    let scrollBox: HTMLElement | Window = window;
    function updateTab(key: string | number) {
        unwatch();
        const flag = tabActive.value !== key;
        tabActive.value = key;
        changeTab && flag && changeTab(key);
        unwatch = watch(tabActive, watchHandler);
    }
    const handleScroll = throttle(() => {
        // 获取滚动容器
        scrollBox = getDom(scrollContainer as TabValue);
        if (!scrollBox) {
            console.error(`useTabScroll: 容器目标错误，没有找到${scrollContainer}的元素`);
        }
        // 获取当前位置到滚动容器顶部的距离
        const top = (scrollBox instanceof Window ? scrollBox.scrollY : scrollBox!.scrollTop) + targetTop;

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
                    updateTab(tabDom.key);
                    break;
                }
                // 最后一个tab高度过大，需要特殊处理
                if(i === target.length - 2 && top >= nextTabTop) {
                    updateTab(nextTabDom.key);
                }
            }
        }
    }, 200);

    onMounted(() => {
        if(!trigger) {
            scrollBox = getDom(scrollContainer as TabValue);
            // 一开始会触发一次滚动事件，根据实际情况判断是否需要
            handleScroll();
            scrollBox?.addEventListener('scroll', handleScroll);
        }
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

    if(trigger) {
        watch(trigger, (val) => {
            nextTick(()=>{
                scrollBox = getDom(scrollContainer as TabValue);
                if(val) {
                    handleScroll();
                    scrollBox?.addEventListener('scroll', handleScroll);
                }else{
                    scrollBox?.removeEventListener('scroll', handleScroll);
                }
            });
        });
    }

    return {
        tabActive,
        onChange
    };
}