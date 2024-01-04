/**
 * @fileOverview detail store
 * @date 2023-12-26
 * @author poohlaha
 */
import { observable, action } from 'mobx'
import BaseStore from '../base/base.store'
import { invoke } from '@tauri-apps/api/primitives'
import { info, error } from '@tauri-apps/plugin-log'
import { TOAST } from '@utils/base'
import Utils from '@utils/utils'

class DetailStore extends BaseStore {
  @observable detailInfo: {[K: string]: any} = {}

  /**
   * 获取列表
   */
  @action
  async getDetailInfo() {
    try {

    } catch (e) {

      console.error('get detail info error !', e)
      TOAST.show({ message: '获取视频详情失败', type: 3 })
      await error(`get detail info error: ${e.toString()}`)
    }
  }

}

export default new DetailStore()
