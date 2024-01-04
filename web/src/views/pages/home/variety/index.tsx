/**
 * @fileOverview 综艺
 * @date 2023-12-27
 * @author poohlaha
 */
import React, { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@stores/index'
import List from '@pages/home/list'
import Utils from '@utils/utils'

const Variety: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const { homeStore } = useStore()

  useEffect(() => {
    if (homeStore.activeTabIndex === 4) {
      const fetchData = async () => {
        homeStore.variety = Utils.deepCopy(homeStore.defaultObj)
        homeStore.variety.normalSort.name = homeStore.tabsList[4].key || ''
        await homeStore.getList(homeStore.variety.normalSort || {})
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
        select={homeStore.getSelectObj(homeStore.variety.normalSort || {}) || {}}
        tabsList={['useDefaultHotTab', 'useDefaultClassTab', 'useDefaultAreaTab', 'useDefaultYearTab']}
        classTab={homeStore.zyTabs}
        loading={homeStore.loading}
        className="variety"
        name={homeStore.tabsList[4].key || ''}
        activeTabIndex={homeStore.activeTabIndex || 0}
      />
    )
  }

  return render()
}

export default observer(Variety)
