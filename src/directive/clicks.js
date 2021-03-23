import Vue from 'vue';
import store from '../store';
import { Message } from 'element-ui';

Vue.directive('click1', {
  inserted: function(el, binding, vnode) {
    let cb_name = binding.expression,
      cb = vnode.context[cb_name];

    el.addEventListener('click', async () => {
      if (store.state.account == '') {
        Message({
          message: 'Please connect to a wallet ',
          type: 'error',
          duration: 2000,
        });
      } else {
        cb();
      }
    });
  },
  unbind: function(el) {
    el.removeEventListener('click', () => {});
  },
});
