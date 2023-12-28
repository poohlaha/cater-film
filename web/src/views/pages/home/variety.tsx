/**
 * @fileOverview 综艺
 * @date 2023-12-27
 * @author poohlaha
 */
import React, { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@stores/index'
import List from '@pages/home/list'
import NoData from '@views/components/noData'

const Variety: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const { homeStore } = useStore()

  useEffect(() => {
    if (homeStore.activeTabIndex === 4) {
      const fetchData = async () => {
        homeStore.setDefaultNormalSort()
        homeStore.normalSort.name = homeStore.tabsList[4].key || ''
        await homeStore.getList(homeStore.normalSort || {})
      }

      if (homeStore.variety.list.length === 0) {
        fetchData()
      }
    }
  }, [homeStore.activeTabIndex])

  const render = () => {
    return (
      <List
        obj={homeStore.variety || {}}
        tabsList={['useDefaultHotTab', 'useDefaultClassTab', 'useDefaultAreaTab', 'useDefaultYearTab']}
        classTab={homeStore.zyTabs}
        loading={homeStore.loading}
        className="variety"
      />
    )
  }

  return render()
}

export default observer(Variety)
