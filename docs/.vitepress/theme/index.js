import Antd from 'ant-design-vue';
import { useComponents } from './useComponents';
import directives from '../../../src/directive';

/** 样式写在后面，防止异常现象 */
import 'ant-design-vue/dist/antd.css';
import DefaultTheme from 'vitepress/theme';
import 'vitepress-theme-demoblock/dist/theme/styles/index.css';
import './index.css';
// 防止覆盖组件样式
import { installComponents } from '../../../src/package';

// import coms from '../../../src/demo';

export default {
    extends: DefaultTheme,
    enhanceApp(ctx) {
        installComponents(ctx.app);
        ctx.app.use(Antd);

        useComponents(ctx.app);
        if (!import.meta.env.SSR) {

            for (const directiveKey in directives) {
                const name = directives[directiveKey].default.name;
                const directive = directives[directiveKey].default.directive;
                ctx.app.directive(name, directive);
            }
            // Object.keys(coms).forEach((c) => {
            //     const component = coms[c].default;
            //     ctx.app.component(component.__name, component);
            // });
        }
    }
};