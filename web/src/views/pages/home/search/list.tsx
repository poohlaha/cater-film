/**
 * @fileOverview 首页
 * @date 2024-01-02
 * @author poohlaha
 */

import React, { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@views/stores'
import MSwiperTabs from '@views/modules/swiperTabs'
import MCard from '@views/modules/card'
import Refresh from '@views/components/refresh'
import Utils from '@utils/utils'

const List: React.FC<IRouterProps> = (props: IRouterProps): ReactElement | null => {
  const { homeStore } = useStore()

  const getKey = () => {
    let searchTabsList = homeStore.searchTabsList || []
    if (searchTabsList.length === 0) return ''
    let obj =
      searchTabsList.find((item: { [K: string]: any }, index: number) => index === homeStore.search.activeTabIndex) ||
      {}
    if (Utils.isObjectNull(obj)) return
    return 'search-' + obj.key || ''
  }

  const getComponentsHtml = (key: string = '') => {
    let obj = homeStore.search[key] || {}

    return (
      <Refresh
        onRefresh={() => {
            setTimeout(async () => {
                let obj =
                    homeStore.searchTabsList.find(
                        (item: { [K: string]: any }, i: number) => homeStore.search.activeTabIndex === i
                    ) || {}
                await homeStore.getSearchList(1, 1, obj.tid || '0')
            }, 300)
        }}
      >
        <div className="search-item-list h100 flex page-content page-top-margin flex-1">
          <MCard
            loading={homeStore.loading}
            className="search-list-box"
            obj={obj || {}}
            only={getKey() || ''}
            loadMore={async () => {
              if (homeStore.loading || Utils.isObjectNull(obj || {})) return
              console.log('搜索上拉刷新, loading: ', homeStore.scrollLoading)

              if (homeStore.scrollLoading) return
              homeStore.scrollLoading = true

              let list = obj.list || []
              if (list.length === 0) return

              let search =
                homeStore.searchTabsList.find(
                  (item: { [K: string]: any }, i: number) => homeStore.search.activeTabIndex === i
                ) || {}
              return await homeStore.getSearchList(2, obj.currentPage + 1, search.tid || '')
            }}
          />
        </div>
      </Refresh>
    )
  }

  const render = () => {
    return (
      <MSwiperTabs
        isSearch={true}
        className="search-tabs content flex-1 overflow-hidden m-swiper-tabs"
        tabs={homeStore.searchTabsList || []}
        activeTabIndex={homeStore.search.activeTabIndex || 0}
        onTabChange={async (index: number) => {
          homeStore.search.activeTabIndex = index || 0
          let obj = homeStore.searchTabsList.find((item: { [K: string]: any }, i: number) => index === i) || {}
          await homeStore.getSearchList(0, 1, obj.tid || '0')
        }}
        getSwiperComponent={(key: string) => {
          return getComponentsHtml(key)
        }}
      />
    )
  }

  return render()
}

export default observer(List)
