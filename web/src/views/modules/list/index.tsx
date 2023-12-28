/**
 * @fileOverview 列表
 * @date 2023-12-27
 * @author poohlaha
 */
/**
 * @fileOverview 滑动 Tab
 * @date 2023-12-26
 * @author poohlaha
 */
import React, { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import Utils from '@utils/utils'

interface IMSwiperBarProps {
  list: Array<{ [K: string]: any }>
}

const MList: React.FC<IMSwiperBarProps> = (props: IMSwiperBarProps): ReactElement | null => {

  const render = () => {
    if (!props.list || props.list.length === 0) return null
    console.log(props.list)

    return (
      <div className="page-top-margin list flex w100">
        {(props.list || []).map((item: { [K: string]: any } = {}, index: number) => {
          return (
              <div className="card flex-direction-column card-no-padding" key={index + '_' + item}>
                <div className="card-top w100">
                  <img src={item.vod_pic || ''} className="wh100"/>
                  <div className="name flex-center w100">
                    <p>{item.vod_remarks || ''}</p>
                  </div>
                </div>

                <div className="title flex-center">
                  <p className="over-ellipsis text-c">{item.vod_name || ''}</p>
                </div>
              </div>
          )
        })}
      </div>
    )
  }

  return render()
}

export default observer(MList)
