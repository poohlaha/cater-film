/**
 * @fileOverview 少儿
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
    if (homeStore.activeTabIndex === 5) {
      const fetchData = async () => {
        homeStore.setDefaultNormalSort()
        homeStore.normalSort.name = homeStore.tabsList[5].key || ''
        await homeStore.getList(homeStore.normalSort || {})
      }

      if (homeStore.children.list.length === 0) {
        fetchData()
      }
    }
  }, [homeStore.activeTabIndex])

  const render = () => {
    return (
      <List
        obj={homeStore.children || {}}
        tabsList={['useDefaultHotTab', 'useDefaultClassTab', 'useDefaultAreaTab', 'useDefaultYearTab']}
        classTab={homeStore.srTabs}
        loading={homeStore.loading}
        className="children"
      />
    )
  }

  return render()
}

export default observer(Index)
