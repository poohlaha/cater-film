/**
 * @fileOverview base store, all store muse extends this store
 * @date 2023-04-12
 * @author poohlaha
 */
import { action, observable } from 'mobx'
import Utils from '@utils/utils'
import { COMMON, TOAST } from '@utils/base'

export default class BaseStore {
  @observable currentPage: number = 1
  @observable pageSize: number = 20
  @observable loading: boolean = false
  @observable activeTabBarIndex: string = '0' // 激活的 tabBar

  /**
   * 设置属性
   */
  @action
  setProperty = (property: any, value: any) => {
    // @ts-ignore
    this[property] = value
  }

  /**
   * 获取属性
   */
  @action
  getProperty = (property: any) => {
    // @ts-ignore
    return this[property]
  }

  @action
  analysisResult = (result: { [K: string]: any } = {}, errMsg: string = '', type: string = 'json') => {
    if (Utils.isObjectNull(result)) {
      TOAST.show({ message: errMsg || COMMON.getLanguageText('ERROR_MESSAGE'), type: 3 })
      return
    }

    let error = result.error || ''
    if (!Utils.isBlank(error) || result.code !== 200) {
      TOAST.show({ message: errMsg || error || COMMON.getLanguageText('ERROR_MESSAGE'), type: 3 })
      return
    }

    // json
    if (type === 'json') {
      let body = result.body || {}
      if (body.code !== 1) {
        TOAST.show({ message: '获取视频数据失败', type: 3 })
        return
      }

      return body.data || []
    }

    return result.body
  }
}
