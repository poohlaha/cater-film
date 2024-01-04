/**
 * @fileOverview 设置
 * @date 2024-01-04
 * @author poohlaha
 */
import React, { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import RouterUrls from '@route/router.url.toml'
import { useStore } from '@stores/index'
import Loading from '@views/components/loading/loading'

const Setting: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const { homeStore } = useStore()

  const render = () => {
    return (
      <div className="setting-page wh100">
        setting
      </div>
    )
  }

  return render()
}

export default observer(Setting)
