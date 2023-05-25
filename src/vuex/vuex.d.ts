import { ComponentCustomProperties } from 'vue'
import store from 'vuex';
import { State } from './interfaces';

declare module '@vue/runtime-core' {

  interface ComponentCustomProperties {
    $store: store<State>
  }
}