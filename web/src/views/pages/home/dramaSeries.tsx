/**
 * @fileOverview 剧集
 * @date 2023-12-27
 * @author poohlaha
 */
import React, {ReactElement, useEffect} from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@stores/index'
import List from '@pages/home/list'
import NoData from '@views/components/noData'

const DramaSeries: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const { homeStore } = useStore()

  useEffect(() => {
    if (homeStore.activeTabIndex === 1) {
      const fetchData = async () => {
        homeStore.setDefaultNormalSort()
        homeStore.normalSort.name = homeStore.tabsList[1].key || ''
        await homeStore.getList(homeStore.normalSort || {})
      }

      if (homeStore.dramaSeriesList.length === 0) {
          fetchData()
      }
    }
  }, [homeStore.activeTabIndex])

  const render = () => {
    return (<List list={homeStore.dramaSeriesList || []} loading={homeStore.loading} className="drama-series"/>)
  }

  return render()
}

export default observer(DramaSeries)
