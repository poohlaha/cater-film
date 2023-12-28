/**
 * @fileOverview 动漫
 * @date 2023-12-27
 * @author poohlaha
 */
import React, {ReactElement, useEffect} from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@stores/index'
import useMount from '@hooks/useMount'
import List from "@pages/home/list";

const Cartoon: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const { homeStore } = useStore()

  useEffect(() => {
    if (homeStore.activeTabIndex === 3) {
      const fetchData = async () => {
          homeStore.setDefaultNormalSort()
        homeStore.normalSort.name = homeStore.tabsList[3].key || ''
        await homeStore.getList(homeStore.normalSort || {})
      }

        if (homeStore.cartoonList.length === 0) {
            fetchData()
        }
    }
  }, [homeStore.activeTabIndex])


  const render = () => {
    return (
        <List
            list={homeStore.cartoonList || []}
            tabsList={['useDefaultHotTab', 'useDefaultClassTab', 'useDefaultAreaTab', 'useDefaultYearTab']}
            classTab={homeStore.dmTabs}
            loading={homeStore.loading}
            className="cartoon"
        />
    )
  }

  return render()
}

export default observer(Cartoon)
