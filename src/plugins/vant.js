import Vue from 'vue';
import { tag, button, Card, checkbox, SubmitBar, Loading , Tabbar, TabbarItem, Search, Lazyload, Swipe, SwipeItem, Icon, Notify, Grid, GridItem, Image, Sidebar, SidebarItem } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { ActionSheet } from 'vant';
import { Field } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Dialog } from 'vant';

// 全局注册
Vue.use(Dialog);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Field);
Vue.use(ActionSheet);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Card).use(button).use(tag);
Vue.use(SubmitBar).use(checkbox);
Vue.use(Image).use(Sidebar).use(SidebarItem);
Vue.use(Loading);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Notify);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Search);
Vue.use(Icon);
Vue.use(Grid).use(GridItem);