/**
 * @fileOverview 列表
 * @date 2023-12-27
 * @author poohlaha
 */
import React, { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import { Image } from 'antd-mobile'
import Utils from '@utils/utils'
import NoData from '@views/components/noData'

interface IMCardProps {
  searchText?: string
  className?: string
  list: Array<{ [K: string]: any }>
  loading: boolean
}

const MCard: React.FC<IMCardProps> = (props: IMCardProps): ReactElement | null => {
  const render = () => {
    if (props.loading) return null

    if (props.list.length === 0) {
      return <NoData text="抱歉，没有找到相关影片~" />
    }

    let searchText = props.searchText || ''
    return (
      <div className="list-box w100 flex-1 page-top-margin flex">
        <div className={`page-top-margin list-item flex-direction-column w100 ${props.className || ''}`}>
          {props.list.map((item: { [K: string]: any }, index: number) => {
            let tags = (item.vod_actor || '').split(',') || []
            if (tags.length > 3) {
              tags = tags.slice(0, 3)
            }
            let name = item.vod_name || ''
            if (!Utils.isBlank(searchText)) {
              name = name.replaceAll(searchText || '', <span className="search-text">{searchText || ''}</span>)
            }
            return (
              <div className="item card card-no-margin-lr card-shadow card-radius flex w100" key={index}>
                <div className="item-left h100">
                  <Image src={item.vod_pic || ''} className="wh100" lazy={true} />
                </div>

                <div className="item-right h100 flex-1 overflow-hidden">
                  <p className="card-title" dangerouslySetInnerHTML={{ __html: name || '' }} />
                  <div className="card-desc card-top-margin over-ellipsis">
                    {item.vod_year}/{item.vod_area}/{item.vod_class}
                  </div>
                  {!Utils.isBlank(item.vod_blurb) && (
                    <div className="card-desc card-top-margin over-two-ellipsis">{item.vod_blurb || ''}</div>
                  )}

                  {tags.length > 0 && (
                    <div className="card-footer flex-wrap card-top-margin flex-align-center">
                      {tags.map((tag: string = '', i: number) => {
                        return (
                          <div className="card-tag" key={i}>
                            {tag || ''}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return render()
}

export default observer(MCard)
