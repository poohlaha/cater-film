/**
 * @fileOverview home store
 * @date 2023-12-26
 * @author poohlaha
 */
import { observable, action } from 'mobx'
import BaseStore from '../base/base.store'
import { invoke } from '@tauri-apps/api/primitives'
import { info, error } from '@tauri-apps/plugin-log'
import { TOAST } from '@utils/base'
import Utils from '@utils/utils'
import {CONSTANT} from '@config/index'

class HomeStore extends BaseStore {
  @observable bannerList: Array<{ [K: string]: any }> = [] // banner列表
  @observable recommendList: Array<{ [K: string]: any }> = [] // 推荐列表
  readonly defaultObj: { [K: string]: any } = {
    // default
    currentPage: 1,
    totalCount: 0,
    totalPage: 0,
    list: [],
  }
  @observable dramaSeries: { [K: string]: any } = Utils.deepCopy(this.defaultObj) // 剧集
  @observable movie: { [K: string]: any } = Utils.deepCopy(this.defaultObj) // 电影
  @observable cartoon: { [K: string]: any } = Utils.deepCopy(this.defaultObj) // 动漫
  @observable variety: { [K: string]: any } = Utils.deepCopy(this.defaultObj) // 综艺
  @observable children: { [K: string]: any } = Utils.deepCopy(this.defaultObj) // 少儿
  @observable record: { [K: string]: any } = Utils.deepCopy(this.defaultObj) // 记录
  @observable activeTabIndex: number = 0 // 激活的 tab
  @observable searchHistoryList: Array<string> = [] // 搜索历史记录
  readonly MAX_SEARCH_HISTORY_COUNT = 10
  @observable scrollLoading: boolean = false // 滚动 loading 条

  // search
  readonly defaultSearch: { [K: string]: any } = {
    show: false,
    text: '',
    showList: false,
    activeTabIndex: 0,
    all: Utils.deepCopy(this.defaultObj),
    dramaSeries: Utils.deepCopy(this.defaultObj),
    movie: Utils.deepCopy(this.defaultObj),
    cartoon: Utils.deepCopy(this.defaultObj),
    variety: Utils.deepCopy(this.defaultObj),
    children: Utils.deepCopy(this.defaultObj),
    record: Utils.deepCopy(this.defaultObj),
  } // 搜索列表

  @observable search = Utils.deepCopy(this.defaultSearch) // 搜索列表

  readonly newTabs: Array<{ [K: string]: any }> = [
    {
      key: 'time',
      title: '最新',
    },
    {
      key: 'hits',
      title: '最热',
    },
    {
      key: 'score',
      title: '好评',
    },
  ]

  readonly classTabs: Array<{ [K: string]: any }> = [
    {
      key: 'all',
      title: '全部',
    },
    {
      key: 'xj',
      title: '喜剧',
    },
    {
      key: 'gz',
      title: '古装',
    },
    {
      key: 'jt',
      title: '家庭',
    },
    {
      key: 'fz',
      title: '犯罪',
    },
    {
      key: 'duozuo',
      title: '动作',
    },
    {
      key: 'qh',
      title: '奇幻',
    },
    {
      key: 'wx',
      title: '武侠',
    },
    {
      key: 'aq',
      title: '爱情',
    },
    {
      key: 'qc',
      title: '青春',
    },
    {
      key: 'xy',
      title: '悬疑',
    },
    {
      key: 'kh',
      title: '科幻',
    },
    {
      key: 'jf',
      title: '警匪',
    },
    {
      key: 'diezhan',
      title: '谍战',
    },
    {
      key: 'sz',
      title: '商战',
    },
    {
      key: 'ox',
      title: '偶像',
    },
    {
      key: 'js',
      title: '军事',
    },
    {
      key: 'sh',
      title: '神话',
    },
    {
      key: 'zz',
      title: '战争',
    },
    {
      key: 'ds',
      title: '都市',
    },
    {
      key: 'qcox',
      title: '青春偶像',
    },
    {
      key: 'jq',
      title: '剧情',
    },
    {
      key: 'ls',
      title: '历史',
    },
    {
      key: 'jd',
      title: '经典',
    },
    {
      key: 'xc',
      title: '乡村',
    },
    {
      key: 'qj',
      title: '情景',
    },
    {
      key: 'wj',
      title: '网剧',
    },
    {
      key: 'qt',
      title: '其他',
    },
  ]

  readonly areaTabs: Array<{ [K: string]: any }> = [
    {
      key: 'all',
      title: '全部',
    },
    {
      key: 'dl',
      title: '大陆',
    },
    {
      key: 'xg',
      title: '香港',
    },
    {
      key: 'tw',
      title: '台湾',
    },
    {
      key: 'mg',
      title: '美国',
    },
    {
      key: 'hg',
      title: '韩国',
    },
    {
      key: 'rb',
      title: '日本',
    },
    {
      key: 'fg',
      title: '法国',
    },
    {
      key: 'yg',
      title: '英国',
    },
    {
      key: 'dg',
      title: '德国',
    },
    {
      key: 'tg',
      title: '泰国',
    },
    {
      key: 'yd',
      title: '印度',
    },
    {
      key: 'qt',
      title: '其他',
    },
  ]

  // 动漫
  readonly dmTabs: Array<{ [K: string]: any }> = [
    {
      key: 'all',
      title: '全部',
    },
    {
      key: 'qg',
      title: '情感',
    },
    {
      key: 'kh',
      title: '科幻',
    },
    {
      key: 'rx',
      title: '热血',
    },
    {
      key: 'tl',
      title: '推理',
    },
    {
      key: 'gaoxiao',
      title: '搞笑',
    },
    {
      key: 'sm',
      title: '神魔',
    },
    {
      key: 'zr',
      title: '真人',
    },
    {
      key: 'qc',
      title: '青春',
    },
    {
      key: 'mf',
      title: '魔法',
    },
    {
      key: 'shenhua',
      title: '神话',
    },
    {
      key: 'mx',
      title: '冒险',
    },
    {
      key: 'jq',
      title: '剧情',
    },
    {
      key: 'ls',
      title: '历史',
    },
    {
      key: 'll',
      title: '萝莉',
    },
    {
      key: 'xy',
      title: '校园',
    },
    {
      key: 'dz',
      title: '动作',
    },
    {
      key: 'jz',
      title: '机战',
    },
    {
      key: 'yd',
      title: '运动',
    },
    {
      key: 'zz',
      title: '战争',
    },
    {
      key: 'sn',
      title: '少年',
    },
    {
      key: 'snv',
      title: '少女',
    },
    {
      key: 'shehui',
      title: '社会',
    },
    {
      key: 'yc',
      title: '原创',
    },
    {
      key: 'qz',
      title: '亲子',
    },
    {
      key: 'yz',
      title: '益智',
    },
    {
      key: 'lz',
      title: '励志',
    },
    {
      key: 'gd',
      title: '格斗',
    },
    {
      key: 'la',
      title: '恋爱',
    },
    {
      key: 'msn',
      title: '美少女',
    },
    {
      key: 'LOLI',
      title: 'LOLI',
    },
    {
      key: 'jj',
      title: '竞技',
    },
    {
      key: 'th',
      title: '童话',
    },
    {
      key: 'jy',
      title: '教育',
    },
    {
      key: 'qt',
      title: '其他',
    },
  ]

  // 综艺
  readonly zyTabs: Array<{ [K: string]: any }> = [
    {
      key: 'all',
      title: '全部',
    },
    {
      key: 'tkx',
      title: '脱口秀',
    },
    {
      key: 'zrx',
      title: '真人秀',
    },
    {
      key: 'gx',
      title: '搞笑',
    },
    {
      key: 'ft',
      title: '访谈',
    },
    {
      key: 'shenghuo',
      title: '生活',
    },
    {
      key: 'waihui',
      title: '晚会',
    },
    {
      key: 'ms',
      title: '美食',
    },
    {
      key: 'yx',
      title: '游戏',
    },
    {
      key: 'qz',
      title: '亲子',
    },
    {
      key: 'ly',
      title: '旅游',
    },
    {
      key: 'wenhua',
      title: '文化',
    },
    {
      key: 'ty',
      title: '体育',
    },
    {
      key: 'ss',
      title: '时尚',
    },
    {
      key: 'js',
      title: '纪实',
    },
    {
      key: 'yz',
      title: '益智',
    },
    {
      key: 'yy',
      title: '演艺',
    },
    {
      key: 'gw',
      title: '歌舞',
    },
    {
      key: 'yinyue',
      title: '音乐',
    },
    {
      key: 'bb',
      title: '播报',
    },
    {
      key: 'qt',
      title: '其他',
    },
  ]

  // 少儿
  readonly srTabs: Array<{ [K: string]: any }> = [
    {
      key: 'all',
      title: '全部',
    },
    {
      key: 'eg',
      title: '儿歌',
    },
    {
      key: 'yz',
      title: '益智',
    },
    {
      key: 'sghh',
      title: '手工·绘画',
    },
    {
      key: 'wj',
      title: '玩具',
    },
    {
      key: 'gx',
      title: '搞笑',
    },
    {
      key: 'yy',
      title: '英语',
    },
    {
      key: 'zj',
      title: '早教',
    },
    {
      key: 'dh',
      title: '动画',
    },
    {
      key: 'sx',
      title: '数字',
    },
    {
      key: 'guoxue',
      title: '国学',
    },
    {
      key: 'mx',
      title: '冒险',
    },
    {
      key: 'jtgj',
      title: '交通工具',
    },
    {
      key: 'mhkh',
      title: '魔幻・科幻',
    },
    {
      key: 'dw',
      title: '动物',
    },
    {
      key: 'zrts',
      title: '真人特摄',
    },
    {
      key: 'ts',
      title: '探索',
    },
    {
      key: 'qt',
      title: '其他',
    },
  ]

  // 记录
  readonly jlTabs: Array<{ [K: string]: any }> = [
    {
      key: 'all',
      title: '全部',
    },
    {
      key: 'rw',
      title: '人物',
    },
    {
      key: 'js',
      title: '军事',
    },
    {
      key: 'ls',
      title: '历史',
    },
    {
      key: 'zr',
      title: '自然',
    },
    {
      key: 'tx',
      title: '探险',
    },
    {
      key: 'kj',
      title: '科技',
    },
    {
      key: 'wenhua',
      title: '文化',
    },
    {
      key: 'xz',
      title: '刑侦',
    },
    {
      key: 'shehui',
      title: '社会',
    },
    {
      key: '旅游',
      title: '社会',
    },
    {
      key: 'qt',
      title: '其他',
    },
  ]

  readonly tabsDefaultList: Array<{ [K: string]: any }> = [
    {
      key: 'recommend',
      title: '推荐',
      tid: '',
    },
    {
      key: 'dramaSeries',
      title: '剧集',
      tid: '20',
    },
    {
      key: 'movie',
      title: '电影',
      tid: '21',
    },
    {
      key: 'cartoon',
      title: '动漫',
      tid: '22',
    },
    {
      key: 'variety',
      title: '综艺',
      tid: '23',
    },
    {
      key: 'children',
      title: '少儿',
      tid: '24',
    },
    {
      key: 'record',
      title: '记录',
      tid: '25',
    },
  ]

  readonly tabsList = Utils.deepCopy(this.tabsDefaultList)

  readonly defaultSort: { [K: string]: any } = {
    name: '',
    class: '',
    area: '',
    lang: '',
    year: '',
    sort: '',
    page: 1,
  }

  // 剧集 tabs 选择
  @observable normalSort: { [K: string]: any } = Utils.deepCopy(this.defaultSort)

  @observable searchTabsList = Utils.deepCopy(this.tabsDefaultList)
  constructor() {
    super()

    this.init()
    this.searchTabsList.shift()
    this.searchTabsList.unshift({
      key: 'all',
      title: '全部',
      tid: '0',
    })
  }

  /**
   * 初始化
   */
  init() {
    try {
      let historyList = Utils.getLocal(CONSTANT.HISTORY_TOKEN)
      if (typeof historyList === 'string') {
        this.searchHistoryList = JSON.parse(historyList) || []
      } else {
        this.searchHistoryList = historyList || []
      }
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * 设置默认值
   */
  @action
  setDefaultSearch(show: boolean = false) {
    let search = Utils.deepCopy(this.defaultSearch) || {}
    search.show = show
    this.search = search
  }

  /**
   * 添加搜索历史
   */
  @action
  setSearchHistory(name: string = '') {
    if (Utils.isBlank(name)) return
    // 判断名字是不是存在

    let historyList: Array<string> = []
    for (let str of this.searchHistoryList) {
      let s = (str || '').trim()
      if (s !== name.trim() && !Utils.isBlank(s) && (historyList.length < this.MAX_SEARCH_HISTORY_COUNT - 1)) {
        historyList.push(s)
      }
    }

    historyList.unshift(name.trim())
    this.searchHistoryList = historyList || []
    Utils.setLocal(CONSTANT.HISTORY_TOKEN, this.searchHistoryList)
  }

  /**
   * 清除搜索历史
   */
  @action
  clearSearchHistory() {
    Utils.removeLocal(CONSTANT.HISTORY_TOKEN)
    this.searchHistoryList = []
  }

  @action
  setDefaultNormalSort() {
    this.normalSort = Utils.deepCopy(this.defaultSort)
  }

  /**
   * 获取列表
   * 0: 加载数据 1: 下拉刷新 2: 上拉刷新
   */
  @action
  async getList(params: { [K: string]: any } = {}, index = 0) {
    try {
      console.info('send params', params)
      if (Utils.isBlank(params.name) || this.loading) return
      if (params.page > 1) {
        if (params.name === 'search') {
          let obj = this.getSearchObj() || {}
          if (obj.list.length === 0 || obj.totalCount === 0 || obj.totalPage === 0) {
            return
          }
        } else {
          if (
              // @ts-ignore
              this[`${params.name}`]['list'].length === 0 ||
              // @ts-ignore
              this[`${params.name}`].totalCount === 0 ||
              // @ts-ignore
              this[`${params.name}`].totalPage === 0
          ) {
            return
          }
        }
      }

      await info(`send params: ${JSON.stringify(params || {})}`)

      let currentPage = params.page || 1
      if (index !== 2) {
        currentPage = 1
      }

      if (params.name !== 'recommend') {
        // @ts-ignore
        this[`${params.name}`].currentPage = currentPage
      }

      if (index === 0) {
        this.loading = true
      }

      let queryParams: { [K: string]: any } = {}
      queryParams.name = params.name || ''
      queryParams.class = params.class || ''
      queryParams.area = params.area || ''
      queryParams.lang = params.lang || ''
      queryParams.year = params.year || ''
      queryParams.sort = params.sort || ''
      queryParams.page = currentPage || 1
      queryParams.tid = params.tid || ''
      queryParams.text = params.text || ''

      console.log('query params:', queryParams)
      let results: Array<{ [K: string]: any }> = await invoke('handle', { name: 'HOME', order: queryParams })
      if (index === 0) {
        this.loading = false
      }

      if (this.scrollLoading) {
        this.scrollLoading = false
      }

      this.handleResponse(results, params.name, index)
    } catch (e) {
      if (index === 0) {
        this.loading = false
      }
      if (this.scrollLoading) {
        this.scrollLoading = false
      }
      console.error('get recommend error !', e)
      TOAST.show({ message: '获取推荐列表失败', type: 3 })
      await error(`get recommend error: ${e.toString()}`)
      throw new Error('get recommend error !')
    }
  }

  /**
   * 处理结果
   */
  @action
  handleResponse(result: Array<{ [K: string]: any }> = [], name: string = '', index: number) {
    console.info('name: ', name, ' result: ', result)
    if (Utils.isBlank(name)) return
    for (let item of result) {
      let body = this.analysisResult(item, '获取视频数据失败', 'data') || {}
      if (Utils.isObjectNull(body)) {
        throw new Error('获取视频数据失败 !')
      }

      if (body.code !== 1) {
        TOAST.show({ message: '获取视频数据失败', type: 3 })
        if (item.name === 'banner' || item.name === 'recommend') {
          continue;
        } else {
          throw new Error('获取视频数据失败 !')
        }
      }

      let data = body.data || []
      if (item.name === 'banner') {
        this.bannerList = data
        continue
      } else if (item.name === 'recommend') {
        this.recommendList = data
        continue
      }

      let totalPage = body.pagecount || 0
      if (totalPage === 0) {
        totalPage = Math.ceil(body.total / this.pageSize) || 0
      }

      if (item.name === 'search') {
        let obj =
            this.searchTabsList.find(
                (item: { [K: string]: any } = {}, index: number) => index === this.search.activeTabIndex
            ) || {}

        // 上拉刷新
        if (index === 2) {
          this.search[`${obj.key}`]['list'] = (this.search[`${obj.key}`]['list'] || []).concat(data)
        } else {
          this.search[`${obj.key}`]['list'] = data
        }

        this.search[`${obj.key}`]['totalCount'] = body.total || 0
        // @ts-ignore
        this.search[`${obj.key}`]['totalPage'] = totalPage
        continue
      }

      if (index === 2) {
        // @ts-ignore
        this[`${name}`]['list'] = (this[`${name}`]['list'] || []).concat(data)
      } else {
        // @ts-ignore
        this[`${name}`]['list'] = data
      }

      // @ts-ignore
      this[`${name}`]['totalCount'] = body.total || 0

      // @ts-ignore
      this[`${name}`]['totalPage'] = totalPage || 0
    }
  }

  /**
   * 获取 年限tabs
   */
  @action
  getYearsTabs() {
    const currentYear = new Date().getFullYear()
    const startYear = 2000
    let years: Array<string> = []
    for (let year = startYear; year <= currentYear; year++) {
      years.push('' + year)
    }

    years.reverse()

    let tabs: Array<{ [K: string]: any }> = []
    tabs.push({
      key: 'all',
      title: '全部',
    })

    years.forEach(year => {
      tabs.push({
        key: year,
        title: year,
      })
    })

    return tabs
  }

  @action
  getSearchObj() {
    if (this.search.activeTabIndex === 0) {
      return this.search.all || {}
    }

    if (this.search.activeTabIndex === 1) {
      return this.search.dramaSeries || {}
    }

    if (this.search.activeTabIndex === 2) {
      return this.search.movie || {}
    }

    if (this.search.activeTabIndex === 3) {
      return this.search.cartoon || {}
    }

    if (this.search.activeTabIndex === 4) {
      return this.search.variety || {}
    }

    if (this.search.activeTabIndex === 5) {
      return this.search.children || {}
    }

    if (this.search.activeTabIndex === 6) {
      return this.search.record || {}
    }

    return {}
  }

  @action
  async getSearchList(refreshIndex: number = 0, page: number = 1) {
    let obj = this.getSearchObj() || {}
    if (Utils.isObjectNull(obj)) {
      return
    }

    let list = obj.list || []
    if (refreshIndex === 0 && list.length > 0) {
      return
    }

    let currentPage = page || 1
    obj.currentPage = currentPage
    await this.getList(
      {
        name: 'search',
        page: currentPage,
        tid: obj.tid || '0',
        text: encodeURIComponent(this.search.text || ''),
      },
      refreshIndex
    )
  }
}

export default new HomeStore()
