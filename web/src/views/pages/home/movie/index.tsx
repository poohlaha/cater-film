/**
 * @fileOverview 电影
 * @date 2023-12-27
 * @author poohlaha
 */
import React, { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@stores/index'
import List from '@pages/home/list'
import Utils from '@utils/utils'

const Movie: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const { homeStore } = useStore()

  useEffect(() => {
    if (homeStore.activeTabIndex === 2) {
      const fetchData = async () => {
        homeStore.movie = Utils.deepCopy(homeStore.defaultObj)
        homeStore.movie.normalSort.name = homeStore.tabsList[2].key || ''
        await homeStore.getList(homeStore.movie.normalSort || {})
      }

      if (homeStore.movie.list.length === 0) {
        fetchData()
      }
    }
  }, [homeStore.activeTabIndex])

  const render = () => {
    return (
      <List
        obj={homeStore.movie || {}}
        select={homeStore.getSelectObj(homeStore.movie.normalSort || {}) || {}}
        loading={homeStore.loading}
        className="movie"
        name={homeStore.tabsList[2].key || ''}
        activeTabIndex={homeStore.activeTabIndex || 0}
      />
    )
  }

  return render()
}

export default observer(Movie)
