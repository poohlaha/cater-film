/**
 * @fileOverview 首页
 * @date 2023-12-26
 * @author poohlaha
 */
import React, { lazy, ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@stores/index'
import Loading from '@views/components/loading/loading'
import { SwiperRef } from 'antd-mobile/es/components/swiper'
import Recommend from '@pages/home/recommend'
import Search from '@pages/home/search'
import MSwiperTabs from '@views/modules/swiperTabs'
import { getCurrent } from '@tauri-apps/api/window'
import useMount from '@hooks/useMount'

// dynamic components
const DramaSeries = lazy(() => import(/* webpackChunkName:'dramaSeries' */ '@pages/home/dramaSeries'))
const Movie = lazy(() => import(/* webpackChunkName:'movie' */ '@pages/home/movie'))
const Cartoon = lazy(() => import(/* webpackChunkName:'cartoon' */ '@pages/home/cartoon'))
const Variety = lazy(() => import(/* webpackChunkName:'variety' */ '@pages/home/variety'))
const Children = lazy(() => import(/* webpackChunkName:'children' */ '@pages/home/children'))
const Record = lazy(() => import(/* webpackChunkName:'record' */ '@pages/home/record'))

const Home: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const swiperRef = useRef<SwiperRef>(null)
  const { homeStore } = useStore()

  useMount(() => {
    // const appWindow = getCurrent()
  })
  const getSearchBoxHtml = () => {
    return (
      <div className="search-box flex-align-center card card-no-margin">
        <div className="search-left flex-1 h100">
          <div className="search-bar h100 cursor-pointer" onClick={() => (homeStore.search.show = true)}>
            <div className="search-bar-input-box h100 flex-align-center">
              <div className="svg-box flex-center">
                <svg className="svg-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <g id="SearchOutline-SearchOutline" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g>
                      <rect fill="currentColor" opacity="0" x="0" y="0" width="48" height="48"></rect>
                      <path
                        d="M10.2434135,10.1505371 C17.2346315,3.28315429 28.5696354,3.28315429 35.5608534,10.1505371 C42.3159331,16.7859644 42.5440954,27.4048667 36.2453405,34.3093889 L43.7095294,41.6422249 C43.8671196,41.7970419 43.8693677,42.0502979 43.7145508,42.2078881 C43.7128864,42.2095822 43.7112069,42.2112616 43.7095126,42.2129259 L42.1705322,43.7246464 C42.014915,43.8775072 41.7655181,43.8775006 41.6099089,43.7246316 L34.0775268,36.3248916 L34.0775268,36.3248916 C27.0485579,41.8551751 16.7593545,41.4200547 10.2434135,35.0195303 C3.25219551,28.1521474 3.25219551,17.0179199 10.2434135,10.1505371 Z M12.3532001,12.2229532 C6.52718516,17.9457722 6.52718516,27.2242951 12.3532001,32.9471142 C18.1792151,38.6699332 27.6250517,38.6699332 33.4510667,32.9471142 C39.2770817,27.2242951 39.2770817,17.9457722 33.4510667,12.2229532 C27.6250517,6.50013419 18.1792151,6.50013419 12.3532001,12.2229532 Z"
                        fill="currentColor"
                        fillRule="nonzero"
                      ></path>
                    </g>
                  </g>
                </svg>
              </div>
              <div className="search-bar-input h100" aria-label="搜索框">
                <input
                  className="h100"
                  readOnly={true}
                  placeholder="请输入关键字"
                  type="search"
                  aria-label="搜索框"
                  value=""
                  enterKeyHint="search"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="search-right h100 flex-align-center">
          {/* 下载 */}
          <div className="svg-box flex-center">
            <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M341.333333 640a42.666667 42.666667 0 0 1-42.666666 42.666667H256a170.666667 170.666667 0 0 1-40.277333-336.554667 298.709333 298.709333 0 0 1 570.154666-81.408A213.333333 213.333333 0 0 1 725.333333 682.666667a42.666667 42.666667 0 0 1 0.042667-85.333334 128 128 0 0 0 36.394667-250.794666l-38.144-11.264-15.914667-36.437334a213.376 213.376 0 0 0-407.296 58.026667l-7.381333 58.368-57.173334 13.824A85.418667 85.418667 0 0 0 256 597.333333h42.666667a42.666667 42.666667 0 0 1 42.666666 42.666667z m321.706667 87.338667a42.666667 42.666667 0 0 1 0 60.330666l-120.917333 120.832c-16.682667 16.64-43.690667 16.64-60.373334 0l-120.917333-120.832a42.666667 42.666667 0 0 1 60.330667-60.330666L469.333333 775.509333V426.666667a42.666667 42.666667 0 0 1 85.333334 0v348.714666l48.042666-48.042666a42.666667 42.666667 0 0 1 60.330667 0z"
                fill="currentColor"
              ></path>
            </svg>
          </div>

          {/* 历史记录 */}
          <div className="svg-box flex-center">
            <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M537.6 25.6c-179.2 0-339.2 96-419.2 246.4L0 153.6v332.8h332.8l-144-144C256 214.4 384 128 537.6 128c211.2 0 384 172.8 384 384s-172.8 384-384 384c-169.6 0-307.2-108.8-364.8-256H67.2c57.6 204.8 246.4 358.4 470.4 358.4C809.6 998.4 1024 777.6 1024 512S803.2 25.6 537.6 25.6z m-76.8 256V544l240 144 41.6-67.2-204.8-121.6V284.8h-76.8z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    )
  }

  /**
   * 获取组件列表
   */
  const getComponentsHtml = (key: string = '') => {
    // recommend
    if (key === homeStore.tabsList[0].key) {
      return <Recommend />
    }

    // dramaSeries
    if (key === homeStore.tabsList[1].key) {
      return <DramaSeries />
    }

    // movie
    if (key === homeStore.tabsList[2].key) {
      return <Movie />
    }

    // cartoon
    if (key === homeStore.tabsList[3].key) {
      return <Cartoon />
    }

    // variety
    if (key === homeStore.tabsList[4].key) {
      return <Variety />
    }

    // children
    if (key === homeStore.tabsList[5].key) {
      return <Children />
    }

    // record
    if (key === homeStore.tabsList[6].key) {
      return <Record />
    }

    return null
  }

  const render = () => {
    return (
      <div className="home flex-direction-column wh100">
        <div className="page-wrapper wh100 flex-direction-column">
          {/* search */}
          {getSearchBoxHtml()}

          {/* tabs */}
          <MSwiperTabs
            className="content flex-1 overflow-hidden"
            tabs={homeStore.tabsList || []}
            activeTabIndex={homeStore.activeTabIndex || 0}
            onTabChange={(index: number) => {
              homeStore.setProperty('activeTabIndex', index)
            }}
            getSwiperComponent={(key: string) => {
              return getComponentsHtml(key)
            }}
          />
        </div>

        {/* loading */}
        <Loading show={homeStore.loading} />

        {/* search */}
        {homeStore.search.show && <Search />}
      </div>
    )
  }

  return render()
}

export default observer(Home)
