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
import {Image} from 'antd-mobile'

interface IMSwiperBarProps {
  list: Array<{ [K: string]: any }>
}

const MList: React.FC<IMSwiperBarProps> = (props: IMSwiperBarProps): ReactElement | null => {

  const getFailedHtml = () => {
    return (
        <div className="svg-box">
          <svg className="svg-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M19.233 6.233 17.42 9.08l-10.817.001a.665.665 0 0 0-.647.562l-.007.096V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.415 2.415 0 0 1 1.807.625l.126.127 4.182 4.525 2.267-3.292 5.461 7.841-4.065 7.375H6.604c-1.86 0-3.382-1.47-3.482-3.317l-.005-.192V9.744c0-1.872 1.461-3.405 3.296-3.505l.19-.005h12.63Zm22.163 0c1.86 0 3.382 1.472 3.482 3.314l.005.192v29.14a3.507 3.507 0 0 1-3.3 3.505l-.191.006H27.789l3.63-6.587.06-.119a1.87 1.87 0 0 0-.163-1.853l-6.928-9.949 3.047-4.422a2.374 2.374 0 0 1 1.96-1.01 2.4 2.4 0 0 1 1.86.87l.106.14L42.05 34.89V9.74a.664.664 0 0 0-.654-.658H21.855l1.812-2.848h17.73Zm-28.305 5.611c.794 0 1.52.298 2.07.788l-.843 1.325-.067.114a1.87 1.87 0 0 0 .11 1.959l.848 1.217c-.556.515-1.3.83-2.118.83a3.122 3.122 0 0 1-3.117-3.116 3.119 3.119 0 0 1 3.117-3.117Z"
                fill="#DBDBDB" fillRule="nonzero"></path>
          </svg>
        </div>
    )
  }

  const render = () => {
    if (!props.list || props.list.length === 0) return null

    return (
        <div className="page-top-margin list flex w100">
          {(props.list || []).map((item: { [K: string]: any } = {}, index: number) => {
            return (
                <div className="card flex-direction-column card-no-padding" key={index + '_' + item}>
                  <div className="card-top w100">
                    <Image
                        src={item.vod_pic || ''}
                        className="wh100"
                        lazy={true}
                    />
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
