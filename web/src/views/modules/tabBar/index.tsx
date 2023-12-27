/**
 * @fileOverview 路由
 * @date 2023-12-26
 * @author poohlaha
 */
import React, { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import { TabBar } from 'antd-mobile'
import { useStore } from '@views/stores'

const MTabBar: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const { commonStore } = useStore()

  const render = () => {
    return (
      <TabBar
        className="w100"
        activeKey={commonStore.activeTabBarIndex}
        onChange={(index: string) => {
          commonStore.setProperty('activeTabBarIndex', index)
        }}
      >
        {commonStore.tabBarList.map((item: { [K: string]: any }) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    )
  }

  return render()
}

export default observer(MTabBar)
