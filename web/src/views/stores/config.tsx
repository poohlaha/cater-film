/**
 * @fileOverview store
 * @date 2023-04-12
 * @author poohlaha
 */
import commonStore from './base/common.store'
import homeStore from './modules/home.store'
import rankStore from './modules/rank.store'

export function createStore() {
  return {
    commonStore,
    homeStore,
    rankStore
  }
}

export const store = createStore()
export type Stores = ReturnType<typeof createStore>
