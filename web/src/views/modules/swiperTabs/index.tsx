/**
 * @fileOverview 滑动 Tabs
 * @date 2023-12-26
 * @author poohlaha
 */
import React, {ReactElement, useEffect, useRef} from 'react'
import { observer } from 'mobx-react-lite'
import { Swiper, Tabs } from 'antd-mobile'
import { SwiperRef } from 'antd-mobile/es/components/swiper'

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

    useEffect(() => {
        let tabDomList = document.querySelectorAll('.swiper-tab-content-box .adm-swiper-slide-active .adm-swiper-item') || null
        if (!tabDomList || tabDomList.length === 0) return
        console.log(tabDomList)

        let tabDom: Element | null = null
        for(let i = 0; i < tabDomList.length; i++) {
            let dom = tabDomList[i]
            if (!dom) continue

            let classList = dom.classList || []
            if (classList.contains('swiper-recommend') || classList.contains('swiper-banner')) {
                continue
            }

            tabDom = dom
        }

        console.log(tabDom)
        let topDom = tabDom?.querySelector('.page-top') || null
        if (!topDom) return

        let selectBoxDom = tabDom?.querySelector('.page-content .select-box') || null
        if (!selectBoxDom) return

        let topRect = topDom.getBoundingClientRect() || {}
        tabDom?.addEventListener('scroll', () => {
            onScroll(topRect.height, tabDom?.scrollTop, selectBoxDom)
        })

        return () => {
            tabDom?.removeEventListener('scroll', () => {
                onScroll(topRect.height, tabDom?.scrollTop, selectBoxDom)
            })
        }
    }, [props.activeTabIndex])


    const onScroll = (topHeight: number = 0, scrollTop: number = 0, selectBoxDom: null | Element = null) => {
        console.log('scrollTop: ', scrollTop, 'topHeight: ', topHeight)
        let classList = selectBoxDom?.classList || []
        if (scrollTop < topHeight) {
            if (classList.length > 0) {
                // @ts-ignore
                classList.remove('show')
            }
        } else {
            if (classList.length > 0) {
                // @ts-ignore
                if (!classList.contains('show')) {
                    // @ts-ignore
                    classList.add('show')
                }
            }
        }
    }

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
              <Swiper.Item key={item.key} className={`swiper-box swiper-${isSearch ? 'search-' : ''}${item.key}`} >
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
