/**
 * @fileOverview 剧集
 * @date 2023-12-27
 * @author poohlaha
 */
import React, { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@stores/index'
import List from '@pages/home/list'
import Utils from '@utils/utils'

const DramaSeries: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const { homeStore } = useStore()

  const render = () => {
    return (
      <List
        obj={homeStore.dramaSeries || {}}
        select={homeStore.getSelectObj(homeStore.dramaSeries.normalSort || {}) || {}}
        loading={homeStore.loading}
        className="drama-series"
        name={homeStore.tabsList[1].key || ''}
        activeTabIndex={homeStore.activeTabIndex || 0}
      />
    )
  }

  return render()
}

export default observer(DramaSeries)
