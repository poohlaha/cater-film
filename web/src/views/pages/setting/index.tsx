/**
 * @fileOverview 设置
 * @date 2024-01-04
 * @author poohlaha
 */
import React, { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import RouterUrls from '@route/router.url.toml'
import { useStore } from '@stores/index'
import {List} from 'antd-mobile'
import Loading from '@views/components/loading/loading'

const Setting: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const { homeStore } = useStore()

  const render = () => {
    return (
      <div className="setting-page wh100">
        <List>
          <List.Item onClick={() => {}}>
            深色模式
          </List.Item>

          <List.Item extra='v1.0.0' onClick={() => {}}>
            版本检测
          </List.Item>

          <List.Item extra='102.M' onClick={() => {}}>
            清除缓存
          </List.Item>

          <List.Item onClick={() => {}}>
            联系我们
          </List.Item>
        </List>
      </div>
    )
  }

  return render()
}

export default observer(Setting)
