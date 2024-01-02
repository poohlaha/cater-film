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

const List: React.FC<IRouterProps> = (props: IRouterProps): ReactElement | null => {
  const { homeStore } = useStore()

  const getComponentsHtml = (key: string = '') => {
    let obj = homeStore.search[key] || {}
    let list = obj.list || []

    return (
      <Refresh
        onRefresh={async () => {
          await homeStore.getSearchList(1)
        }}
      >
        <div className="search-item-list flex page-content page-top-margin flex-1">
          <MCard loading={homeStore.loading} className="search-list-box" list={list || []} />
        </div>
      </Refresh>
    )
  }

  const render = () => {
    return (
      <MSwiperTabs
        className="search-tabs content flex-1 overflow-hidden m-swiper-tabs"
        tabs={homeStore.searchTabsList || []}
        activeTabIndex={homeStore.search.activeTabIndex || 0}
        onTabChange={async (index: number) => {
          homeStore.search.activeTabIndex = index || 0
          await homeStore.getSearchList(0)
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
