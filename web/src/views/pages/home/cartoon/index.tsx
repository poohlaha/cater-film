/**
 * @fileOverview 动漫
 * @date 2023-12-27
 * @author poohlaha
 */
import React, { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@stores/index'
import List from '@pages/home/list'
import Utils from '@utils/utils'

const Cartoon: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const { homeStore } = useStore()

  const render = () => {
    return (
      <List
        obj={homeStore.cartoon || {}}
        select={homeStore.getSelectObj(homeStore.cartoon.normalSort || {}) || {}}
        tabsList={['useDefaultHotTab', 'useDefaultClassTab', 'useDefaultAreaTab', 'useDefaultYearTab']}
        classTab={homeStore.dmTabs}
        loading={homeStore.loading}
        className="cartoon"
        name={homeStore.tabsList[3].key || ''}
        activeTabIndex={homeStore.activeTabIndex || 0}
      />
    )
  }

  return render()
}

export default observer(Cartoon)
