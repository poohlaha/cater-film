/**
 * @fileOverview 记录
 * @date 2023-12-27
 * @author poohlaha
 */
import React, { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@stores/index'
import List from '@pages/home/list'

const Record: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const { homeStore } = useStore()

  useEffect(() => {
    if (homeStore.activeTabIndex === 6) {
      const fetchData = async () => {
        homeStore.setDefaultNormalSort()
        homeStore.normalSort.name = homeStore.tabsList[6].key || ''
        await homeStore.getList(homeStore.normalSort || {})
      }

      if (homeStore.record.list.length === 0) {
        fetchData()
      }
    }
  }, [homeStore.activeTabIndex])

  const render = () => {
    return (
      <List
        obj={homeStore.record || {}}
        select={homeStore.getSelectObj() || {}}
        tabsList={['useDefaultHotTab', 'useDefaultClassTab', 'useDefaultAreaTab', 'useDefaultYearTab']}
        classTab={homeStore.jlTabs}
        loading={homeStore.loading}
        className="record wh100"
        name={homeStore.tabsList[6].key || ''}
        activeTabIndex={homeStore.activeTabIndex || 0}
      />
    )
  }

  return render()
}

export default observer(Record)
