/**
 * @fileOverview 少儿
 * @date 2023-12-27
 * @author poohlaha
 */
import React, { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@stores/index'
import useMount from '@hooks/useMount'

const Children: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const { homeStore } = useStore()

  useMount(async () => {})

  const render = () => {
    return <div className="children"></div>
  }

  return render()
}

export default observer(Children)
