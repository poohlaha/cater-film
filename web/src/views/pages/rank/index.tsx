/**
 * @fileOverview 排行榜
 * @date 2023-12-26
 * @author poohlaha
 */
import React, { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@stores/index'
import Loading from '@views/components/loading/loading'
import useMount from '@hooks/useMount'

const Rank: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {

  const render = () => {
    return (
        <div className="page rank-page flex-direction-column wh100">
          <div className="page-wrapper wh100 flex-direction-column">

          </div>
        </div>
    )
  }

  return render()
}

export default observer(Rank)
