import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/display.css';
import './App.less';
import './directive';
import vuePlugin from './utils/vuePlugin';
import { Skeleton } from 'vant';
import './utils/date';
// import Vconsole from 'vconsole';

Vue.use(Skeleton);
Vue.use(ElementUI);
Vue.use(vuePlugin);

Vue.config.productionTip = false;

// new Vconsole();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
