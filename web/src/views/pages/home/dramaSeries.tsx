/**
 * @fileOverview 剧集
 * @date 2023-12-27
 * @author poohlaha
 */
import React, {ReactElement, useEffect} from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@stores/index'
import useMount from '@hooks/useMount'
import MSwiperBar from '@views/modules/swiperTab'
import MList from '@views/modules/list'
import Utils from "@utils/utils";

const DramaSeries: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const { homeStore } = useStore()

  const newTabs: Array<{ [K: string]: any }> = [
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

  const classTabs: Array<{ [K: string]: any }> = [
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

  const areaTabs: Array<{ [K: string]: any }> = [
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

  const getYearsTabs = () => {
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

  useEffect(() => {
    if (homeStore.activeTabIndex === 1) {
      const fetchData = async () => {
        await homeStore.getList(homeStore.dramaSeriesSort || {})
      }

      fetchData()
    }
  }, [homeStore.activeTabIndex])

  const render = () => {
    return (
      <div className="drama-series overflow-y-auto">
        <div className="page-top">
          <MSwiperBar
              tabs={newTabs}
              onChange={async (obj: {[K: string]: any} = {}) => {
                homeStore.dramaSeriesSort.sort = obj.key || ''
                await homeStore.getList(homeStore.dramaSeriesSort || {})
              }}
           />
          <MSwiperBar
              tabs={classTabs}
              onChange={async (obj: {[K: string]: any} = {}) => {
                homeStore.dramaSeriesSort.class = encodeURIComponent(obj.title) || ''
                await homeStore.getList(homeStore.dramaSeriesSort || {})
              }} />
          <MSwiperBar
              tabs={areaTabs}
              onChange={async (obj: {[K: string]: any} = {}) => {
                homeStore.dramaSeriesSort.area = encodeURIComponent(obj.title) || ''
                await homeStore.getList(homeStore.dramaSeriesSort || {})
              }} />
          <MSwiperBar
              tabs={getYearsTabs()}
              onChange={async (obj: {[K: string]: any} = {}) => {
                homeStore.dramaSeriesSort.year = obj.key || ''
                await homeStore.getList(homeStore.dramaSeriesSort || {})
              }} />
        </div>

        <div className="page-content page-top-margin">
          <div className="list-box page-top-margin">
            <MList list={homeStore.dramaSeriesList || []}/>
          </div>
        </div>
      </div>
    )
  }

  return render()
}

export default observer(DramaSeries)
