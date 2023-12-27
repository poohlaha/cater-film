/**
 * @fileOverview 电影
 * @date 2023-12-27
 * @author poohlaha
 */
import React, { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@stores/index'
import useMount from '@hooks/useMount'

const Movie: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const { homeStore } = useStore()

  useMount(async () => {})

  const render = () => {
    return <div className="movie"></div>
  }

  return render()
}

export default observer(Movie)
