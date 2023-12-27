/**
 * @fileOverview 电影
 * @date 2023-12-27
 * @author poohlaha
 */
import React, {ReactElement, useEffect} from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@stores/index'
import useMount from '@hooks/useMount'
import List from "@pages/home/list";

const Movie: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const { homeStore } = useStore()

  useEffect(() => {
    if (homeStore.activeTabIndex === 2) {
      const fetchData = async () => {
        homeStore.normalSort.name = homeStore.tabsList[2].key || ''
        await homeStore.getList(homeStore.normalSort || {})
      }

      fetchData()
    }
  }, [homeStore.activeTabIndex])


  const render = () => {
    return (
        <div className="movie overflow-y-auto">
          <List
              tabList={[
                {
                  tabs: homeStore.newTabs || [],
                  onChange: async (obj: { [K: string]: any } = {}) => {
                    homeStore.normalSort.sort = obj.key || ''
                    await homeStore.getList(homeStore.normalSort || {})
                  }
                },
                {
                  tabs: homeStore.classTabs || [],
                  onChange: async (obj: { [K: string]: any } = {}) => {
                    homeStore.normalSort.class = encodeURIComponent(obj.title) || ''
                    await homeStore.getList(homeStore.normalSort || {})
                  }
                },
                {
                  tabs: homeStore.areaTabs || [],
                  onChange: async (obj: { [K: string]: any } = {}) => {
                    homeStore.normalSort.area = encodeURIComponent(obj.title) || ''
                    await homeStore.getList(homeStore.normalSort || {})
                  }
                },
                {
                  tabs: homeStore.getYearsTabs(),
                  onChange: async (obj: { [K: string]: any } = {}) => {
                    homeStore.normalSort.year = obj.key || ''
                    await homeStore.getList(homeStore.normalSort || {})
                  }
                }
              ]}
              list={homeStore.movieList || []}
          />
        </div>
    )
  }

  return render()
}

export default observer(Movie)
