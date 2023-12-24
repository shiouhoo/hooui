// .vitepress/theme/index.js
import './antdv.css'
import Antd from 'ant-design-vue';
import DefaultTheme from 'vitepress/theme';
import coms from '../../../src/demo';

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.use(Antd);
    if (!import.meta.env.SSR) {
      Object.keys(coms).forEach((c) => {
        const component = coms[c].default;
        // 挂载全局控件
          ctx.app.component(component.__name, component);
      });
    }
  }
}