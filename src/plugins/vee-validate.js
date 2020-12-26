import Vue from 'vue';
import { 
  ValidationObserver, 
  ValidationProvider,  
  setInteractionMode,
  localize,
  extend } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN.json'
import * as rules from 'vee-validate/dist/rules';

// Install all rules
for (let [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation
  });
}

localize('zh_CN', zhCN)
setInteractionMode("passive")
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)