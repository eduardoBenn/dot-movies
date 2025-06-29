import 'vue'
import { Store } from 'vuex'
import { RootState } from './store' // Import your RootState interface

declare module 'vue' {
  interface ComponentCustomProperties {
    $store: Store<RootState>
  }
}
