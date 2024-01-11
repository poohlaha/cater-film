/**
 * @fileOverview 排行榜
 * @date 2023-12-26
 * @author poohlaha
 */
import React, { ReactElement, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { Tabs, Swiper } from 'antd-mobile'
import { useStore } from '@stores/index'
import Loading from '@views/components/loading/loading'
import { SwiperRef } from 'antd-mobile/es/components/swiper'
import List from '@pages/rank/list'
import useMount from "@hooks/useMount";

const Rank: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const { rankStore, homeStore } = useStore()
  const swiperRef = useRef<SwiperRef>(null)

    useMount(() => {
        // @ts-ignore
        window.onHandleResultCallback = (results: Array<{[K: string]: any}> = []) => {
            rankStore.loading = false
            console.log(results)
            rankStore.handleResponse(results, rankStore.queryParams.name || '')
        }
    })

  const fetchData = async () => {
    await rankStore.getList({ name: rankStore.tabsList[rankStore.activeTabIndex || 0].key || '' })
  }

  const getData = async () => {
    if (rankStore.activeTabIndex === 0) {
      if (rankStore.hotJList.length === 0) {
        await fetchData()
      }
    } else if (rankStore.activeTabIndex === 1) {
      if (rankStore.hotMList.length === 0) {
        await fetchData()
      }
    } else if (rankStore.activeTabIndex === 2) {
      if (rankStore.hotCList.length === 0) {
        await fetchData()
      }
    }
  }

  useEffect(() => {
    getData()
  }, [rankStore.activeTabIndex])

  /**
   * 获取组件列表
   */
  const getComponentsHtml = (key: string = '') => {
    // 热播剧
    if (key === rankStore.tabsList[0].key) {
      return <List obj={{ list: rankStore.hotJList }} name={rankStore.tabsList[0].key} />
    }

    // 热播影
    if (key === rankStore.tabsList[1].key) {
      return <List obj={{ list: rankStore.hotMList }} name={rankStore.tabsList[1].key} />
    }

    // 热播漫
    if (key === rankStore.tabsList[2].key) {
      return <List obj={{ list: rankStore.hotCList }} name={rankStore.tabsList[2].key} />
    }

    return null
  }

  const getTabsHtml = () => {
    return (
      <div className="content flex-1 overflow-hidden">
        <Tabs
          activeKey={rankStore.tabsList[rankStore.activeTabIndex || 0].key}
          onChange={(key: string) => {
            const index =
              rankStore.tabsList.findIndex(
                (
                  item: {
                    [K: string]: any
                  } = {}
                ) => item.key === key
              ) || 0
            rankStore.setProperty('activeTabIndex', index)
            swiperRef.current?.swipeTo(index)
          }}
        >
          {rankStore.tabsList.map((item: { [K: string]: any }) => {
            return <Tabs.Tab title={item.title} key={item.key} />
          })}
        </Tabs>

        <Swiper
          className="swiper-tab-content-box flex-1"
          direction="horizontal"
          loop
          indicator={() => null}
          ref={swiperRef}
          defaultIndex={rankStore.activeTabIndex}
          onIndexChange={(index: number) => {
            rankStore.setProperty('activeTabIndex', index)
          }}
        >
          {rankStore.tabsList.map((item: { [K: string]: any }, index: number) => {
            return (
              <Swiper.Item key={item.key} className="swiper-box">
                {getComponentsHtml(item.key)}
              </Swiper.Item>
            )
          })}
        </Swiper>
      </div>
    )
  }

  const render = () => {
    return (
      <div className="rank flex-direction-column wh100" style={{
          paddingTop: homeStore.phoneHeight.topHeight
      }}>
        <div className="page-wrapper wh100 flex-direction-column">
          {/* tabs */}
          {getTabsHtml()}
        </div>

        {/* */}
        <Loading show={rankStore.loading} />
      </div>
    )
  }

  return render()
}

export default observer(Rank)
