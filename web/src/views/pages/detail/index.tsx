/**
 * @fileOverview 详情页面
 * @date 2024-01-04
 * @author poohlaha
 */
import React, { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import RouterUrls from '@route/router.url.toml'
import { useStore } from '@stores/index'
import Loading from '@views/components/loading/loading'
import useMount from '@hooks/useMount'

const Detail: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const { homeStore } = useStore()

  const render = () => {
    return (
      <div className="detail-page wh100">
        hello
      </div>
    )
  }

  return render()
}

export default observer(Detail)
