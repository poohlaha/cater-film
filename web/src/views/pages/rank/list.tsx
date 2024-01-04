/**
 * @fileOverview 列表
 * @date 2023-12-27
 * @author poohlaha
 */
import React, { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import Refresh from '@views/components/refresh'
import { useStore } from '@views/stores'
import NoData from '@views/components/noData'
import { Image } from 'antd-mobile'
import MCard from '@views/modules/card'

interface IListProps extends IRouterProps {
  name: string
  className?: string
  obj: { [K: string]: any }
}

const List: React.FC<IListProps> = (props: IListProps): ReactElement | null => {
  const { rankStore } = useStore()

  const render = () => {
    return (
      <Refresh
        onRefresh={async () => {
          await rankStore.getList({ name: props.name || '' }, true)
        }}
      >
        <div className={`page-box wh100 flex-direction-column ${props.className || ''}`}>
          <div className="page-content page-top-margin flex-1 flex">
            <MCard loading={rankStore.loading} className="rank-list-box" obj={props.obj || {}} only={'rank'} needInfiniteScroll={false} />
          </div>
        </div>
      </Refresh>
    )
  }
  return render()
}

export default observer(List)
