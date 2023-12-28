/**
 * @fileOverview 推荐
 * @date 2023-12-28
 * @author poohlaha
 */
import React, { PropsWithChildren, ReactElement } from 'react'
import { PullToRefresh } from 'antd-mobile'
import Loading from '@views/components/loading/loading'

interface IRefreshProps extends PropsWithChildren {
  onRefresh: () => void
}

const Refresh: React.FC<IRefreshProps> = (props: IRefreshProps): ReactElement | null => {
  const getRefreshIcon = () => {
    return <Loading show={true} />
  }

  const render = () => {
    return (
      <PullToRefresh onRefresh={async () => props.onRefresh?.()} refreshingText={getRefreshIcon()} headHeight={60}>
        {props.children || null}
      </PullToRefresh>
    )
  }

  return render()
}

export default Refresh
