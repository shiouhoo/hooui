import ExpandContainer from './expandcontainer/Index.vue';
import SearchScopeInput from './searchscopeinput/Index.vue';
import BottomPopup from './popup/BottomPopup.vue';
import CascaderRadio from './cascader/radio/RadioCascader.vue';
import CascaderMultiple from './cascader/multiple/MultipleCascader.vue';
import ScopeList from './scope-list/Index.vue';

export function installComponents(app: any) {
    app.component('ExpandContainer', ExpandContainer);
    app.component('SearchScopeInput', SearchScopeInput);
    app.component('BottomPopup', BottomPopup);
    app.component('CascaderRadio', CascaderRadio);
    app.component('CascaderMultiple', CascaderMultiple);
    app.component('ScopeList', ScopeList);
}