/**
 * @fileOverview 列表
 * @date 2023-12-27
 * @author poohlaha
 */
import React, { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import MSwiperBar from '@views/modules/swiperTab'
import MList from '@views/modules/list'
import { useStore } from '@views/stores'
import NoData from '@views/components/noData'
import Refresh from '@views/components/refresh'
import { InfiniteScroll } from 'antd-mobile'
import Utils from '@utils/utils'

interface IListProps extends IRouterProps {
  loading: boolean
  tabsList?: Array<string>
  obj: { [K: string]: any }
  langTab?: Array<{ [K: string]: any }>
  classTab?: Array<{ [K: string]: any }>
  className?: string
}

const List: React.FC<IListProps> = (props: IListProps): ReactElement | null => {
  const { homeStore } = useStore()

  const getDefaultHotTab = () => {
    return {
      tabs: homeStore.newTabs || [],
      onChange: async (obj: { [K: string]: any } = {}) => {
        homeStore.normalSort.page = 1
        homeStore.normalSort.sort = obj.key || ''
        await homeStore.getList(homeStore.normalSort || {})
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
        homeStore.normalSort.page = 1
        homeStore.normalSort.area = encodeURIComponent(text) || ''
        await homeStore.getList(homeStore.normalSort || {})
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
        homeStore.normalSort.page = 1
        homeStore.normalSort.class = encodeURIComponent(text) || ''
        await homeStore.getList(homeStore.normalSort || {})
      },
    }
  }

  const getDefaultYearTab = () => {
    return {
      tabs: homeStore.getYearsTabs(),
      onChange: async (obj: { [K: string]: any } = {}) => {
        homeStore.normalSort.page = 1
        homeStore.normalSort.year = obj.key || ''
        await homeStore.getList(homeStore.normalSort || {})
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
        homeStore.normalSort.page = 1
        homeStore.normalSort.lang = encodeURIComponent(text) || ''
        await homeStore.getList(homeStore.normalSort || {})
      },
    }
  }

  /**
   *  useDefaultHotTab?: boolean
   *  useDefaultAreaTab?: boolean
   *  useDefaultClassTab?: boolean
   *  useDefaultLangTab?: boolean
   *  useDefaultYearTab?: boolean
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
    if (props.loading || Utils.isObjectNull(props.obj || {})) return null

    if (props.obj.list.length === 0) {
      return <NoData text="抱歉，没有找到相关影片~" />
    }

    return <MList list={props.obj.list || []} />
  }

  const hasMore = () => {
    if (Utils.isObjectNull(props.obj || {})) return false
    let list = props.obj.list || []
    if (list.length === 0) return false
    return props.obj.currentPage > props.obj.totalPage
  }

  const hasScroll = () => {
    if (Utils.isObjectNull(props.obj || {}) || props.loading) return false
    let list = props.obj.list || []
    if (list.length === 0) return false
    return true
  }

  const render = () => {
    let tabsList = getTabsList() || []

    return (
        <Refresh
            onRefresh={async () => {
              await homeStore.getList(homeStore.normalSort || {}, 1)
            }}
        >
          <div className={`page-box wh100 flex-direction-column ${props.className || ''}`}>
            <div className="page-top">
              {(tabsList || []).map((item: { [K: string]: any } = {}, index: number) => {
                return (
                    <MSwiperBar
                        key={index}
                        tabs={item.tabs}
                        onChange={(obj: { [K: string]: any } = {}) => item.onChange?.(obj)}
                    />
                )
              })}
            </div>

            <div className="page-content page-top-margin flex-1 flex">
              <div className="list-box flex-1 page-top-margin flex-direction-column w100">
                {getListHtml()}

                {hasScroll() && (
                    <InfiniteScroll
                        loadMore={async () => {
                          console.log('上拉刷新')
                          if (Utils.isObjectNull(props.obj || {})) return

                          let list = props.obj.list || []
                          if (list.length === 0) return
                          homeStore.normalSort.page += 1
                          await homeStore.getList(homeStore.normalSort || {}, 2)
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
