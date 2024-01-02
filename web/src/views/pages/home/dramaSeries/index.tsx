/**
 * @fileOverview 剧集
 * @date 2023-12-27
 * @author poohlaha
 */
import React, { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@stores/index'
import List from '@pages/home/list'

const Index: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const { homeStore } = useStore()

  useEffect(() => {
    if (homeStore.activeTabIndex === 1) {
      const fetchData = async () => {
        homeStore.setDefaultNormalSort()
        homeStore.normalSort.name = homeStore.tabsList[1].key || ''
        await homeStore.getList(homeStore.normalSort || {})
      }

      if (homeStore.dramaSeries.list.length === 0) {
        fetchData()
      }
    }
  }, [homeStore.activeTabIndex])

  const render = () => {
    return <List obj={homeStore.dramaSeries || {}} loading={homeStore.loading} className="drama-series" />
  }

  return render()
}

export default observer(Index)
