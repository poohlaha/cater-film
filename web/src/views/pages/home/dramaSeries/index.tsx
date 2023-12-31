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

  useEffect(() => {
    if (homeStore.activeTabIndex === 1) {
      const fetchData = async () => {
        homeStore.dramaSeries = Utils.deepCopy(homeStore.defaultObj)
        homeStore.dramaSeries.normalSort.name = homeStore.tabsList[1].key || ''
        await homeStore.getList(homeStore.dramaSeries.normalSort || {})
      }

      if (homeStore.dramaSeries.list.length === 0) {
        fetchData()
      }
    }
  }, [homeStore.activeTabIndex])

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
