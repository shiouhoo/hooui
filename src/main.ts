import { createApp } from 'vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue';
import Vant from 'vant';
// vant组件库样式
import 'vant/lib/index.css';
import 'virtual:uno.css';

import directives from './directive';

const app = createApp(App);

for(const directiveKey in directives) {
    const name = directives[directiveKey].default.name;
    const directive = directives[directiveKey].default.directive;
    app.directive(name, directive);
}

app.use(Vant);

app.mount('#app');