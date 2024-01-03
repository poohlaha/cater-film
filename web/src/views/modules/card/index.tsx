/**
 * @fileOverview 列表
 * @date 2023-12-27
 * @author poohlaha
 */
import React, { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import { Image, InfiniteScroll } from 'antd-mobile'
import Utils from '@utils/utils'
import NoData from '@views/components/noData'
import MScrollTop from '@views/modules/scrollTop'

interface IMCardProps {
  only: string
  searchText?: string
  className?: string
  obj: { [K: string]: any }
  loading: boolean
  loadMore: () => Promise<any>
}

const MCard: React.FC<IMCardProps> = (props: IMCardProps): ReactElement | null => {
  const hasMore = () => {
    if (Utils.isObjectNull(props.obj || {})) return false

    let list = props.obj.list || []
    if (list.length === 0 || props.obj.totalPage === 0) return false
    return props.obj.currentPage < props.obj.totalPage
  }

  const hasScroll = () => {
    if (Utils.isObjectNull(props.obj || {}) || props.loading) return false
    let list = props.obj.list || []
    if (list.length === 0) return false
    return true
  }

  const render = () => {
    if (props.loading) return null

    if (Utils.isObjectNull(props.obj || {})) {
      return <NoData text="抱歉，没有找到相关影片~" />
    }

    if (props.obj.list.length === 0) {
      return <NoData text="抱歉，没有找到相关影片~" />
    }

    let searchText = props.searchText || ''
    return (
      <div className="list-box w100 flex-1 flex-direction-column">
        <div className={`page-top-margin list-item flex-direction-column w100 ${props.className || ''}`}>
          {props.obj.list.map((item: { [K: string]: any }, index: number) => {
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

          {/* 回到顶部 */}
          <MScrollTop currentPage={props.obj?.currentPage || 1} only={props.only || ''} />
        </div>

        {/* 上拉刷新 */}
        {hasScroll() && (
          <InfiniteScroll
            loadMore={async () => {
              return props.loadMore?.()
            }}
            threshold={150}
            hasMore={hasMore()}
          />
        )}
      </div>
    )
  }

  return render()
}

export default observer(MCard)
