/**
 * @fileOverview 路由
 * @date 2023-12-26
 * @author poohlaha
 */
import React, { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import { MemoryRouter as Router, Route, useNavigate } from 'react-router-dom'
import RouterUrls from '@route/router.url.toml'
import Home from '@pages/home'
import Rank from '@pages/rank'
import My from '@pages/my'
import MTabBar from '@views/modules/tabBar'
import { useStore } from '@views/stores'
import commonStore from '@stores/base/common.store'

const Dashboard: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const navigate = useNavigate()
  const { homeStore } = useStore()

  const setRouteActive = (value: string) => {
    navigate(value)
  }

  const render = () => {
    return (
      <div className="main-page page wh100 flex-direction-column" style={{
          paddingBottom: homeStore.phoneHeight.bottomHeight,
      }}>
        <div className="main-content overflow-hidden flex-1">
          {commonStore.activeTabBarIndex === '0' && <Home />}

          {commonStore.activeTabBarIndex === '1' && <Rank />}

          {commonStore.activeTabBarIndex === '2' && <My />}
        </div>

        {/* tabBar */}
        <MTabBar />
      </div>
    )
  }

  return render()
}

export default observer(Dashboard)
