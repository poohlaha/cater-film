/**
 * @fileOverview 列表
 * @date 2023-12-27
 * @author poohlaha
 */
import React, {ReactElement} from 'react'
import {observer} from 'mobx-react-lite'
import Refresh from '@views/components/refresh'
import {useStore} from '@views/stores'
import Utils from "@utils/utils";
import NoData from "@views/components/noData";

interface IListProps extends IRouterProps {
    name: string
    className?: string
    list: Array<{[K: string]: any}>
}

const List: React.FC<IListProps> = (props: IListProps): ReactElement | null => {

    const { rankStore } = useStore()

    const getListHtml = () => {
        if (rankStore.loading) return null

        if (props.list.length === 0) {
            return <NoData text="抱歉，没有找到相关影片~" />
        }

        return (
            <div className="page-top-margin list flex-direction-column w100">
                {
                    props.list.map((item: {[K: string]: any}, index: number) => {
                        let tags = (item.vod_actor || '').split(',') || []
                        if (tags.length > 3) {
                            tags = tags.slice(0, 3)
                        }
                        return (
                            <div className="item card card-no-margin-lr card-shadow card-radius flex w100" key={index}>
                                <div className="item-left h100">
                                    <img src={item.vod_pic || ''} className="wh100" />
                                </div>

                                <div className="item-right h100 flex-1 overflow-hidden">
                                    <p className="card-title">{item.vod_name || ''}</p>
                                    <div className="desc card-top-margin over-ellipsis">{item.vod_year}/{item.vod_area}/{item.vod_class}</div>
                                    <div className="desc card-top-margin over-two-ellipsis">{item.vod_blurb || ''}</div>
                                    {
                                        tags.length > 0 && (
                                            <div className="card-footer flex-wrap card-top-margin flex-align-center">
                                                {
                                                    tags.map((tag: string = '', i: number) => {
                                                        return (
                                                            <div className="card-tag" key={i}>{tag ||''}</div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const render = () => {
        return (
            <Refresh
                onRefresh={async () => {
                    await rankStore.getList({name: props.name || ''}, true)
                }}
            >
                <div className={`page-box wh100 flex-direction-column ${props.className || ''}`}>
                    <div className="page-content page-top-margin flex-1 flex">
                        <div className="list-box w100 flex-1 page-top-margin flex">{getListHtml()}</div>
                    </div>
                </div>
            </Refresh>
        )
    }
    return render()
}

export default observer(List)