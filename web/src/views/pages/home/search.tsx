import React, {ReactElement} from 'react'
import {observer} from 'mobx-react-lite'
import {SearchBar} from 'antd-mobile'
import {useStore} from '@views/stores'

/**
 * @fileOverview 首页
 * @date 2024-01-02
 * @author poohlaha
 */
const Search: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {

    const { homeStore } = useStore()

    const render = () => {
        return (
            <div className="search-page flex-direction-column wh100 mark">
                <div className="page-wrapper wh100 flex-direction-column">
                    <div className="search-box flex-align-center">
                        <div className="svg-box back flex-center cursor-pointer" onClick={() => homeStore.setProperty('showSearch', false)}>
                            <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M393.390114 512.023536l347.948667-336.348468c20.50808-19.85828 20.50808-51.997258 0-71.792093-20.507056-19.826558-53.778834-19.826558-74.28589 0L281.990954 476.135164c-20.476357 19.826558-20.476357 51.981908 0 71.746044l385.061936 372.236839c10.285251 9.91379 23.728424 14.869662 37.173644 14.869662 13.446243 0 26.889417-4.956895 37.112246-14.901385 20.50808-19.826558 20.50808-51.919487 0-71.746044L393.390114 512.023536"
                                   ></path>
                            </svg>
                        </div>

                        {/* search */}
                        <SearchBar
                            className="flex-1"
                            placeholder='请输入关键字'
                            showCancelButton={() => true}
                            onCancel={() => homeStore.setProperty('showSearch', false)}
                        />
                    </div>

                    {/* 历史记录 */}
                    <div className="history card card-no-margin card-no-padding-lr">
                        <div className="card-title flex-jsc-between">
                            <p>历史记录</p>
                            <div className="svg-box">
                                <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M840 288H688v-56c0-40-32-72-72-72h-208C368 160 336 192 336 232V288h-152c-12.8 0-24 11.2-24 24s11.2 24 24 24h656c12.8 0 24-11.2 24-24s-11.2-24-24-24zM384 288v-56c0-12.8 11.2-24 24-24h208c12.8 0 24 11.2 24 24V288H384zM758.4 384c-12.8 0-24 11.2-24 24v363.2c0 24-19.2 44.8-44.8 44.8H332.8c-24 0-44.8-19.2-44.8-44.8V408c0-12.8-11.2-24-24-24s-24 11.2-24 24v363.2c0 51.2 41.6 92.8 92.8 92.8h358.4c51.2 0 92.8-41.6 92.8-92.8V408c-1.6-12.8-12.8-24-25.6-24z"
                                         fill="#currentColor"></path>
                                     <path
                                         d="M444.8 744v-336c0-12.8-11.2-24-24-24s-24 11.2-24 24v336c0 12.8 11.2 24 24 24s24-11.2 24-24zM627.2 744v-336c0-12.8-11.2-24-24-24s-24 11.2-24 24v336c0 12.8 11.2 24 24 24s24-11.2 24-24z"
                                         fill="#currentColor"></path>
                                 </svg>
                             </div>
                         </div>

                        <div className="card-content card-top-margin flex-align-center flex-wrap">
                            <p className="card-tag">好汉两个半</p>
                            <p className="card-tag">好汉两个半</p>
                            <p className="card-tag">火之女</p>
                            <p className="card-tag">好汉两个半</p>
                            <p className="card-tag">好汉两个半</p>
                            <p className="card-tag">火之女</p>
                            <p className="card-tag">好汉两个半</p>
                            <p className="card-tag">火之女</p>
                            <p className="card-tag">火之女</p>
                            <p className="card-tag">火之女</p>
                            <p className="card-tag">火之女</p>
                        </div>
                    </div>
                </div>


            </div>
        )
    }

    return render()
}

export default observer(Search)