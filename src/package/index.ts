import ExpandContainer from './expandcontainer/Index.vue';
import SearchScopeInput from './searchscopeinput/Index.vue';
import BottomPopup from './popup/BottomPopup.vue';

export function installComponents(app: any) {
    app.component('ExpandContainer', ExpandContainer);
    app.component('SearchScopeInput', SearchScopeInput);
    app.component('BottomPopup', BottomPopup);
}