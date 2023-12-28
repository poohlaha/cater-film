/**
 * @fileOverview dashboard store
 * @date 2023-12-26
 * @author poohlaha
 */
import { observable, action } from 'mobx'
import BaseStore from '../base/base.store'
import { invoke } from '@tauri-apps/api/primitives'
import { info, error } from '@tauri-apps/plugin-log'
import { TOAST } from '@utils/base'
import Utils from '@utils/utils'

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

  readonly tabsList: Array<{ [K: string]: any }> = [
    {
      key: 'recommend',
      title: '推荐',
    },
    {
      key: 'dramaSeries',
      title: '剧集',
    },
    {
      key: 'movie',
      title: '电影',
    },
    {
      key: 'cartoon',
      title: '动漫',
    },
    {
      key: 'variety',
      title: '综艺',
    },
    {
      key: 'children',
      title: '少儿',
    },
    {
      key: 'record',
      title: '记录',
    },
  ]

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

  @action
  setDefaultNormalSort() {
    this.normalSort = Utils.deepCopy(this.defaultSort)
  }

  /**
   * 获取首页推荐列表
   */
  @action
  async getList(params: { [K: string]: any } = {}, refresh = false) {
    try {
      console.info('', params)
      await info(`send params: ${JSON.stringify(params || {})}`)
      if (!refresh) {
        this.loading = true
      }
      let queryParams: { [K: string]: any } = {}
      queryParams.name = params.name || ''
      queryParams.class = params.class || ''
      queryParams.area = params.area || ''
      queryParams.lang = params.lang || ''
      queryParams.year = params.year || ''
      queryParams.sort = params.sort || ''
      queryParams.page = params.page || 1

      if (params.page === 1) {
        // @ts-ignore
        this[`${params.name}`]['list'] = []
      }

      let results: Array<{ [K: string]: any }> = await invoke('handle', { name: 'HOME', order: queryParams })
      if (!refresh) {
        this.loading = false
      }

      this.handleResponse(results, params.name)
    } catch (e) {
      if (!refresh) {
        this.loading = false
      }
      console.error('get recommend error !', e)
      TOAST.show({ message: '获取推荐列表失败', type: 3 })
      await error(`get recommend error: ${e.toString()}`)
    }
  }

  /**
   * 处理结果
   */
  @action
  handleResponse(result: Array<{ [K: string]: any }> = [], name: string = '') {
    console.info('result:', result)
    // analysis results
    result.forEach((item: { [K: string]: any } = {}) => {
      if (item.name === 'banner') {
        this.bannerList = this.analysisResult(item, '获取视频数据失败') || []
      } else if (item.name === 'recommend') {
        this.recommendList = this.analysisResult(item, '获取视频数据失败') || []
      } else {
        // @ts-ignore
        this[`${name}`]['total'] = item.total || 0
        // @ts-ignore
        this[`${name}`]['totalPage'] = item.pagecount || 0
        // @ts-ignore
        this[`${name}`]['list'] = this[`${name}`]['list'].concat(this.analysisResult(item, '获取视频数据失败') || [])
      }
    })

    console.log('dramaSeries', this.dramaSeries)
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
}

export default new HomeStore()
