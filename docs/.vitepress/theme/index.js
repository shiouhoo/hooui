// .vitepress/theme/index.js
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import DefaultTheme from 'vitepress/theme';
import coms from '../../../src/demo';
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import { useComponents } from './useComponents'
import directives from '../../../src/directive';
import { installComponents } from '../../../src/package';
import './index.css'

export default {
    extends: DefaultTheme,
    enhanceApp(ctx) {
        installComponents(ctx.app);
        ctx.app.use(Antd);

        for (const directiveKey in directives) {
            const name = directives[directiveKey].default.name;
            const directive = directives[directiveKey].default.directive;
            ctx.app.directive(name, directive);
        }

        useComponents(ctx.app);
        if (!import.meta.env.SSR) {
            Object.keys(coms).forEach((c) => {
                const component = coms[c].default;
                // 挂载全局控件
                ctx.app.component(component.__name, component);
            });
        }
    }
}