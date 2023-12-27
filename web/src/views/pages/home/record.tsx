/**
 * @fileOverview 记录
 * @date 2023-12-27
 * @author poohlaha
 */
import React, { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@stores/index'
import useMount from '@hooks/useMount'

const Record: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const { homeStore } = useStore()

  useMount(async () => {})

  const render = () => {
    return <div className="record"></div>
  }

  return render()
}

export default observer(Record)
