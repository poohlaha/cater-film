/**
 * @fileOverview 首页
 * @date 2023-12-26
 * @author poohlaha
 */
import React, { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@stores/index'
import Loading from '@views/components/loading/loading'
import Utils from '@utils/utils'
import useMount from '@hooks/useMount'
import { TabBar, SearchBar, Tabs, Swiper } from 'antd-mobile'
import { SwiperRef } from 'antd-mobile/es/components/swiper'

const Home: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
    const swiperRef = useRef<SwiperRef>(null)
  const { homeStore } = useStore()

    useMount(() => {
        homeStore.getBannerList()
        homeStore.getRecommendList()
    })

    /**
     * 解析banner列表
     */
   const analyzeBannerHtml = () => {
        if (homeStore.bannerList.length === 0) return null
        return (
            <Swiper loop autoplay onIndexChange={(i: number) => {}}>
                {
                    homeStore.bannerList.map((item: {[K: string]: any}, index: number) => {
                        return (
                            <Swiper.Item key={index}>
                                <img src={item.content || ''} className="wh100" />
                                <p className="name">{item.name || ''}</p>
                            </Swiper.Item>
                        )
                    })
                }
            </Swiper>
        )
   }

 /**
  * 解析列表
  */
  const analyzeListHtml = (list: Array<{[K: string]: any}> = []) => {
      if (list.length === 0) return null

     return (
         <div className="list-box page-top-margin">
             {
                list.map((item: {[K: string]:any} = {}, index: number) => {
                    return (
                        <div className="flex-direction-column" key={index}>
                            <p className="list-title">{item.name || ''}</p>
                            <div className="page-top-margin list flex w100">
                                {
                                    item.vlist.length > 0 && item.vlist.map((l: {[K: string]: any}, i: number) => {
                                        return (
                                            <div className="card flex-direction-column card-no-padding" key={index + '_' + i}>
                                                <div className="card-top w100">
                                                    <img src={l.vod_pic || ''} className="wh100"/>
                                                    <div className="name flex-center w100">
                                                        <p>{l.vod_remarks || ''}</p>
                                                    </div>
                                                </div>

                                                <p className="title flex-center">{l.vod_name || ''}</p>
                                            </div>
                                        )
                                    })
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
      <div className="page home-page flex-direction-column wh100">

        <div className="page-wrapper wh100 flex-direction-column">
            {/* search */}
            <div className="search-box flex-align-center card card-no-margin">
                <div className="search-left flex-1 h100">
                    <SearchBar placeholder='请输入关键字' />
                </div>

                <div className="search-right h100 flex-align-center">
                    {/* 下载 */}
                    <div className="svg-box flex-center">
                        <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M341.333333 640a42.666667 42.666667 0 0 1-42.666666 42.666667H256a170.666667 170.666667 0 0 1-40.277333-336.554667 298.709333 298.709333 0 0 1 570.154666-81.408A213.333333 213.333333 0 0 1 725.333333 682.666667a42.666667 42.666667 0 0 1 0.042667-85.333334 128 128 0 0 0 36.394667-250.794666l-38.144-11.264-15.914667-36.437334a213.376 213.376 0 0 0-407.296 58.026667l-7.381333 58.368-57.173334 13.824A85.418667 85.418667 0 0 0 256 597.333333h42.666667a42.666667 42.666667 0 0 1 42.666666 42.666667z m321.706667 87.338667a42.666667 42.666667 0 0 1 0 60.330666l-120.917333 120.832c-16.682667 16.64-43.690667 16.64-60.373334 0l-120.917333-120.832a42.666667 42.666667 0 0 1 60.330667-60.330666L469.333333 775.509333V426.666667a42.666667 42.666667 0 0 1 85.333334 0v348.714666l48.042666-48.042666a42.666667 42.666667 0 0 1 60.330667 0z"
                                fill="currentColor"></path>
                        </svg>
                    </div>

                    {/* 历史记录 */}
                    <div className="svg-box flex-center">
                        <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M537.6 25.6c-179.2 0-339.2 96-419.2 246.4L0 153.6v332.8h332.8l-144-144C256 214.4 384 128 537.6 128c211.2 0 384 172.8 384 384s-172.8 384-384 384c-169.6 0-307.2-108.8-364.8-256H67.2c57.6 204.8 246.4 358.4 470.4 358.4C809.6 998.4 1024 777.6 1024 512S803.2 25.6 537.6 25.6z m-76.8 256V544l240 144 41.6-67.2-204.8-121.6V284.8h-76.8z"
                                fill="currentColor"></path>
                        </svg>
                    </div>
                </div>
            </div>

            {/* tabs */}
            <div className="content flex-1 overflow-hidden">
                <Tabs
                    activeKey={homeStore.tabsList[homeStore.activeTabIndex || 0].key}
                    onChange={(key: string) => {
                        const index = homeStore.tabsList.findIndex((item: {[K: string]: any} = {}) => item.key === key) || 0
                        homeStore.setProperty('activeTabIndex', index)
                        swiperRef.current?.swipeTo(index)
                    }}
                >
                    {
                        homeStore.tabsList.map((item: {[K: string]: any}) => {
                            return (
                                <Tabs.Tab title={item.title} key={item.key} />
                            )
                        })
                    }
                </Tabs>

                <Swiper
                    className="swiper-tab-content-box flex-1 overflow-y-auto"
                    direction='horizontal'
                    loop
                    indicator={() => null}
                    ref={swiperRef}
                    defaultIndex={homeStore.activeTabIndex}
                    onIndexChange={(index: number) => {
                        homeStore.setProperty('activeTabIndex', index)
                    }}
                >
                    {
                        homeStore.tabsList.map((item: {[K: string]: any}, index: number) => {
                            return (
                                <Swiper.Item key={item.key} className="swiper-box">
                                    {analyzeBannerHtml()}
                                    {analyzeListHtml(homeStore.recommendList || [])}
                                </Swiper.Item>
                            )
                        })
                    }
                </Swiper>
            </div>

            {/* tabbar */}
            <TabBar className="w100">
                {homeStore.tabBarList.map((item: { [K: string]: any }) => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
                ))}
            </TabBar>
        </div>

          {/* */}
          <Loading show={homeStore.loading}/>
      </div>
    )
  }

    return render()
}

export default observer(Home)
