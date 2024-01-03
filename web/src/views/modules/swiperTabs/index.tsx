/**
 * @fileOverview 滑动 Tabs
 * @date 2023-12-26
 * @author poohlaha
 */
import React, { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { Swiper, Tabs } from 'antd-mobile'
import { SwiperRef } from 'antd-mobile/es/components/swiper'
import Utils from '@utils/utils'

interface IMSwiperTabsProps {
  className: string
  tabs: Array<{ [K: string]: any }>
  activeTabIndex: number
  onTabChange: (index: number) => void
  getSwiperComponent: (key: string) => React.ReactNode
  isSearch?: boolean
}

const MSwiperTabs: React.FC<IMSwiperTabsProps> = (props: IMSwiperTabsProps): ReactElement | null => {
  const swiperRef = useRef<SwiperRef>(null)

  const render = () => {
    if (!props.tabs || props.tabs.length === 0) return null

    let isSearch = props.isSearch
    if (isSearch === undefined || isSearch === null) {
      isSearch = false
    }

    return (
      <div className={`${props.className || ''} m-swiper-tabs swiper-box`}>
        <Tabs
          activeKey={props.tabs[props.activeTabIndex || 0].key}
          onChange={(key: string) => {
            const index =
              props.tabs.findIndex(
                (
                  item: {
                    [K: string]: any
                  } = {}
                ) => item.key === key
              ) || 0
            props.onTabChange?.(index)
            swiperRef.current?.swipeTo(index)
          }}
        >
          {props.tabs.map((item: { [K: string]: any }) => {
            return <Tabs.Tab title={item.title} key={item.key} />
          })}
        </Tabs>

        <Swiper
          className="swiper-tab-content-box flex-1"
          direction="horizontal"
          loop
          indicator={() => null}
          ref={swiperRef}
          defaultIndex={props.activeTabIndex || 0}
          onIndexChange={(index: number) => {
            props.onTabChange?.(index)
          }}
        >
          {props.tabs.map((item: { [K: string]: any }) => {
            return (
              <Swiper.Item key={item.key} className={`swiper-box swiper-${isSearch ? 'search-' : ''}${item.key}`}>
                {props.getSwiperComponent?.(item.key)}
              </Swiper.Item>
            )
          })}
        </Swiper>
      </div>
    )
  }

  return render()
}

export default observer(MSwiperTabs)
