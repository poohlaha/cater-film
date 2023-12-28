/**
 * @fileOverview 记录
 * @date 2023-12-27
 * @author poohlaha
 */
import React, {ReactElement, useEffect} from 'react'
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

      if (homeStore.recordList.length === 0) {
        fetchData()
      }
    }
  }, [homeStore.activeTabIndex])

  const render = () => {
    return (
        <List
            list={homeStore.recordList || []}
            tabsList={['useDefaultHotTab', 'useDefaultClassTab', 'useDefaultAreaTab', 'useDefaultYearTab']}
            classTab={homeStore.jlTabs}
            loading={homeStore.loading}
            className="record"
        />
    )
  }

  return render()
}

export default observer(Record)
