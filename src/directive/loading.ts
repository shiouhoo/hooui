import { createApp } from 'vue';
import type { Directive, DirectiveBinding } from 'vue';
import LoadingComponent from './components/LoadingComponent.vue';

// 插入节点
function append(el: any) {
    const position = getComputedStyle(el).getPropertyValue('position');
    if (position === 'static') {
        el.style.position = 'relative';
        el.isPosition = true;
    }
    if (el.getAttribute('h-loading-text')) {
        el.instance.setLoadingText(el.getAttribute('h-loading-text'));
    }
    el.appendChild(el.instance.$el);
}
// 移除节点
function remove(el: any) {
    if (el.isPosition) {
        el.style.position = '';
    }
    el.removeChild(el.instance.$el);
}

const loading: Directive = {
    mounted(el, binding: DirectiveBinding) {
        const app = createApp(LoadingComponent);
        const instance = app.mount(document.createElement('div'));
        el.instance = instance;
        if (binding.value) {
            append(el);
        }
    },
    updated(el, binding: DirectiveBinding) {
        if (binding.value !== binding.oldValue) {
            binding.value ? append(el) : remove(el);
        }
    },
};

export const loadingDirective = {
    name: 'h-loading',
    directive: loading
};