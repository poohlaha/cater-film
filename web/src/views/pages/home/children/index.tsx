/**
 * @fileOverview 少儿
 * @date 2023-12-27
 * @author poohlaha
 */
import React, { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@stores/index'
import List from '@pages/home/list'
import Utils from '@utils/utils'

const Children: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const { homeStore } = useStore()

  const render = () => {
    return (
      <List
        obj={homeStore.children || {}}
        select={homeStore.getSelectObj(homeStore.children.normalSort || {}) || {}}
        tabsList={['useDefaultHotTab', 'useDefaultClassTab', 'useDefaultAreaTab', 'useDefaultYearTab']}
        classTab={homeStore.srTabs}
        loading={homeStore.loading}
        className="children"
        name={homeStore.tabsList[5].key || ''}
        activeTabIndex={homeStore.activeTabIndex || 0}
      />
    )
  }

  return render()
}

export default observer(Children)
