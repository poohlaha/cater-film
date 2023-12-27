/**
 * @fileOverview 列表
 * @date 2023-12-27
 * @author poohlaha
 */
import React, {Fragment, ReactElement} from 'react'
import { observer } from 'mobx-react-lite'
import MSwiperBar from '@views/modules/swiperTab'
import MList from '@views/modules/list'

interface IListProps {
    tabList: Array<{ [K: string]: any }>
    list: Array<any>
}

const List: React.FC<IListProps> = (props: IListProps): ReactElement | null => {

    const render = () => {
        if (!props.tabList || props.tabList.length === 0) return null

        return (
            <Fragment>
                <div className="page-top">
                    {
                        (props.tabList || []).map((item: { [K: string]: any } = {}, index: number) => {
                            return (
                                <MSwiperBar
                                    key={index}
                                    tabs={item.tabs}
                                    onChange={(obj: { [K: string]: any } = {}) => item.onChange?.(obj)}
                                />
                            )
                        })
                    }
                </div>

                <div className="page-content page-top-margin">
                    <div className="list-box page-top-margin">
                        <MList list={props.list || []}/>
                    </div>
                </div>
            </Fragment>
        )
    }

    return render()
}

export default observer(List)