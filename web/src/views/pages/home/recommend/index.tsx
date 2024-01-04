/**
 * @fileOverview 推荐
 * @date 2023-12-26
 * @author poohlaha
 */
import React, { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@stores/index'
import { Swiper } from 'antd-mobile'
import MList from '@views/modules/list'
import Utils from '@utils/utils'
import NoData from '@views/components/noData'
import Refresh from '@views/components/refresh'

const Recommend: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const { homeStore } = useStore()

  useEffect(() => {
    if (homeStore.activeTabIndex === 0) {
      const fetchData = async () => {
        homeStore.setDefaultNormalSort()
        homeStore.normalSort.name = homeStore.tabsList[0].key || ''
        await homeStore.getList(homeStore.normalSort || {})
      }

      if (homeStore.recommendList.length === 0) {
        fetchData()
      }
    }
  }, [homeStore.activeTabIndex])

  /**
   * 解析banner列表
   */
  const analyzeBannerHtml = () => {
    if (homeStore.bannerList.length === 0) return null

    // 过滤没有名字的banner， 应该就是广告了
    let list: Array<{ [K: string]: any }> = []
    homeStore.bannerList.forEach((item: { [K: string]: any } = {}) => {
      let name = (item.name || '').trim()
      if (!Utils.isBlank(name) && item.name !== '.') {
        list.push(item)
      }
    })

    return (
      <Swiper className="banner" loop autoplay onIndexChange={() => {}}>
        {list.map((item: { [K: string]: any } = {}, index: number) => {
          return (
            <Swiper.Item key={index} className="swiper-banner">
              <img src={item.content || ''} className="wh100" />
              <p className="name">{item.name || ''}</p>
            </Swiper.Item>
          )
        })}
      </Swiper>
    )
  }

  /**
   * 解析列表
   */
  const analyzeListHtml = (list: Array<{ [K: string]: any }> = []) => {
    if (homeStore.loading) return null
    if (list.length === 0) {
      return <NoData text="抱歉，没有找到相关影片~" />
    }

    return (
      <div className="list-box page-top-margin">
        {list.map((item: { [K: string]: any } = {}, index: number) => {
          return (
            <div className="flex-direction-column item" key={index}>
              {!Utils.isBlank(item.name) && <p className="list-title">{item.name || ''}</p>}

              <MList list={item.vlist || []} currentPage={1} only={homeStore.tabsList[0].key || ''} />
            </div>
          )
        })}
      </div>
    )
  }

  const render = () => {
    return (
      <div className="recommend wh100 page-swiper">
        <Refresh
          onRefresh={async () => {
            await homeStore.getList(homeStore.normalSort || {}, 1)
          }}
        >
          {analyzeBannerHtml()}
          {analyzeListHtml(homeStore.recommendList || [])}
        </Refresh>
      </div>
    )
  }

  return render()
}

export default observer(Recommend)
