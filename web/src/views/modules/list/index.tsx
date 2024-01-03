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
import { Image } from 'antd-mobile'
import MScrollTop from '@views/modules/scrollTop'

interface IMSwiperBarProps {
  list: Array<{ [K: string]: any }>
  currentPage: number
  only: string
}

const MList: React.FC<IMSwiperBarProps> = (props: IMSwiperBarProps): ReactElement | null => {

  const render = () => {
    if (!props.list || props.list.length === 0) return null
    return (
      <div className="page-top-margin list flex w100">
        {(props.list || []).map((item: { [K: string]: any } = {}, index: number) => {
          return (
            <div className="card flex-direction-column card-no-padding" key={index + '_' + item}>
              <div className="card-top w100">
                <Image src={item.vod_pic || ''} className="wh100" lazy={true} />
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

        {/* 回到顶部 */}
        <MScrollTop currentPage={props.currentPage || 1} only={props.only || ''} />
      </div>
    )
  }

  return render()
}

export default observer(MList)
