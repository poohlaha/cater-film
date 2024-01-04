/**
 * @fileOverview 列表
 * @date 2023-12-27
 * @author poohlaha
 */
import React, { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import MTab from '@views/modules/tab'
import MList from '@views/modules/list'
import { useStore } from '@views/stores'
import NoData from '@views/components/noData'
import Refresh from '@views/components/refresh'
import { InfiniteScroll } from 'antd-mobile'
import Utils from '@utils/utils'

interface IListProps extends IRouterProps {
  name: string
  loading: boolean
  tabsList?: Array<string>
  obj: { [K: string]: any }
  select?: { [K: string]: any }
  langTab?: Array<{ [K: string]: any }>
  classTab?: Array<{ [K: string]: any }>
  className?: string
  activeTabIndex: number
}

const List: React.FC<IListProps> = (props: IListProps): ReactElement | null => {
  const { homeStore } = useStore()

  const getDefaultHotTab = () => {
    return {
      tabs: homeStore.newTabs || [],
      onChange: async (obj: { [K: string]: any } = {}) => {
        // @ts-ignore
        homeStore[props.name || ''].normalSort.page = 1
        // @ts-ignore
        homeStore[props.name || ''].normalSort.sort = obj.key || ''
        // @ts-ignore
        await homeStore.getList(homeStore[props.name || ''].normalSort || {})
      },
    }
  }

  const getDefaultAreaTab = () => {
    return {
      tabs: homeStore.areaTabs || [],
      onChange: async (obj: { [K: string]: any } = {}) => {
        let text = obj.title || ''
        if (obj.key === 'all') {
          text = ''
        }
        // @ts-ignore
        homeStore[props.name || ''].normalSort.page = 1
        // @ts-ignore
        homeStore[props.name || ''].normalSort.area = encodeURIComponent(text) || ''
        // @ts-ignore
        await homeStore.getList(homeStore[props.name || ''].normalSort || {})
      },
    }
  }

  const getDefaultClassTab = () => {
    let tabs = props.classTab || []
    if (tabs.length === 0) {
      tabs = homeStore.classTabs || []
    }
    return {
      tabs: tabs || [],
      onChange: async (obj: { [K: string]: any } = {}) => {
        let text = obj.title || ''
        if (obj.key === 'all') {
          text = ''
        }

        // @ts-ignore
        homeStore[props.name || ''].normalSort.page = 1
        // @ts-ignore
        homeStore[props.name || ''].normalSort.class = encodeURIComponent(text) || ''
        // @ts-ignore
        await homeStore.getList(homeStore[props.name || ''].normalSort || {})
      },
    }
  }

  const getDefaultYearTab = () => {
    return {
      tabs: homeStore.getYearsTabs(),
      onChange: async (obj: { [K: string]: any } = {}) => {
        let text = obj.key || ''
        if (obj.key === 'all') {
          text = ''
        }

        // @ts-ignore
        homeStore[props.name || ''].normalSort.page = 1
        // @ts-ignore
        homeStore[props.name || ''].normalSort.year = text || ''
        // @ts-ignore
        await homeStore.getList(homeStore[props.name || ''].normalSort || {})
      },
    }
  }

  const getDefaultLangTab = () => {
    let tabs = props.langTab || []
    if (tabs.length === 0) {
      tabs = homeStore.srTabs || []
    }
    return {
      tabs: tabs,
      onChange: async (obj: { [K: string]: any } = {}) => {
        let text = obj.title || ''
        if (obj.key === 'all') {
          text = ''
        }

        // @ts-ignore
        homeStore[props.name || ''].normalSort.page = 1
        // @ts-ignore
        homeStore[props.name || ''].normalSort.lang = encodeURIComponent(text) || ''
        // @ts-ignore
        await homeStore.getList(homeStore[props.name || ''].normalSort || {})
      },
    }
  }

  /**
   *  useDefaultHotTab: boolean
   *  useDefaultAreaTab: boolean
   *  useDefaultClassTab: boolean
   *  useDefaultLangTab: boolean
   *  useDefaultYearTab: boolean
   */
  const getTabsList = () => {
    let tabsList = props.tabsList || []
    if (tabsList.length === 0) {
      return [getDefaultHotTab(), getDefaultClassTab(), getDefaultAreaTab(), getDefaultYearTab()]
    }

    let list: Array<{ [K: string]: any }> = []

    tabsList.forEach((flag: string) => {
      if (flag === 'useDefaultHotTab') {
        list.push(getDefaultHotTab())
      } else if (flag === 'useDefaultClassTab') {
        list.push(getDefaultClassTab())
      } else if (flag === 'useDefaultLangTab') {
        list.push(getDefaultLangTab())
      } else if (flag === 'useDefaultAreaTab') {
        list.push(getDefaultAreaTab())
      } else if (flag === 'useDefaultYearTab') {
        list.push(getDefaultYearTab())
      }
    })

    return list
  }

  const getListHtml = () => {
    if (props.loading) return null
    if (Utils.isObjectNull(props.obj || {})) {
      return <NoData text="抱歉，没有找到相关影片~" />
    }

    if (props.obj.list.length === 0) {
      return <NoData text="抱歉，没有找到相关影片~" />
    }

    return <MList list={props.obj.list || []} currentPage={props.obj.currentPage || 1} only={props.name || ''} />
  }

  const hasMore = () => {
    if (Utils.isObjectNull(props.obj || {})) return false
    let list = props.obj.list || []
    if (list.length === 0 || props.obj.totalPage === 0) return false
    return props.obj.currentPage < props.obj.totalPage
  }

  const hasScroll = () => {
    if (Utils.isObjectNull(props.obj || {}) || props.loading) return false
    let list = props.obj.list || []
    if (list.length === 0) return false
    return true
  }

  const render = () => {
    let tabsList = getTabsList() || []
    let select = props.select || {}

    return (
      <Refresh
        onRefresh={async () => {
          // @ts-ignore
          await homeStore.getList(homeStore[props.name || ''].normalSort || {}, 1)
        }}
      >
        <div className={`page-swiper page-box wh100 flex-direction-column ${props.className || ''}`}>
          <div className="page-top">
            {(tabsList || []).map((item: { [K: string]: any } = {}, index: number) => {
              return (
                <MTab
                  key={index}
                  tabs={item.tabs}
                  onChange={(obj: { [K: string]: any } = {}) => item.onChange?.(obj)}
                />
              )
            })}
          </div>

          <div className="page-content page-top-margin flex-1 flex">
            {!Utils.isObjectNull(select) && (
              <div
                className="select-box flex-center"
                onClick={() => {
                  let dom = document.querySelector(`.swiper-${props.name}`)
                  console.log('scroll Dom', dom)
                  // @ts-ignore
                  dom?.scrollTo?.(0, 0)
                }}
              >
                <p>{select.name || ''} ・ </p>
                <p>{select.sort || ''}</p>
                {!Utils.isBlank(select.class || '') && <p> ・ {select.class || ''}</p>}
                {!Utils.isBlank(select.area || '') && <p> ・ {select.area || ''}</p>}
                {!Utils.isBlank(select.year || '') && <p> ・ {select.year || ''}</p>}
              </div>
            )}
            <div className="list-box flex-1 flex-direction-column w100">
              {getListHtml()}

              {hasScroll() && (
                <InfiniteScroll
                  loadMore={async () => {
                    if (props.loading || Utils.isObjectNull(props.obj || {})) return
                    console.log('上拉刷新, loading: ', homeStore.scrollLoading)

                    if (homeStore.scrollLoading) return
                    homeStore.scrollLoading = true

                    let list = props.obj.list || []
                    if (list.length === 0) return

                    // @ts-ignore
                    homeStore[props.name || ''].normalSort.page += 1
                    // @ts-ignore
                    homeStore[props.name || ''].normalSort.name = props.name
                    // @ts-ignore
                    await homeStore.getList(homeStore[props.name || ''].normalSort || {}, 2)
                  }}
                  threshold={150}
                  hasMore={hasMore()}
                />
              )}
            </div>
          </div>
        </div>
      </Refresh>
    )
  }

  return render()
}

export default observer(List)
