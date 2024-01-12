/**
 * @fileOverview 首页
 * @date 2023-12-26
 * @author poohlaha
 */
import React, {lazy, ReactElement, useEffect, useRef} from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@stores/index'
import Loading from '@views/components/loading/loading'
import { SwiperRef } from 'antd-mobile/es/components/swiper'
import Recommend from '@pages/home/recommend'
import Search from '@pages/home/search'
import MSwiperTabs from '@views/modules/swiperTabs'
import { getCurrent } from '@tauri-apps/api/window'
import useMount from '@hooks/useMount'
import Utils from '@utils/utils'

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

  useMount(async () => {
    await homeStore.getHomeList()
    // @ts-ignore
    window.onHandleResultCallback = (results: Array<{[K: string]: any}> = []) => {
      homeStore.loading = false
      homeStore.scrollLoading = false
      console.log(results)
      homeStore.handleResponse(results, homeStore.queryParams.name, homeStore.queryParams.index)
    }
  })

  // 防抖
  const debounce = (fn: Function, delay: number = 300) => {
    let timer: any = null
    let handler = function () {
      if (timer) {
        clearTimeout(timer)
      }

      // @ts-ignore
      let that = this
      let args = arguments
      timer = setTimeout(() => {
        fn.apply(that, args)
      }, delay)
    }

    // @ts-ignore
    handler.cancel = () => {
      if (timer) clearTimeout(timer)
    }

    return handler
  }

  useEffect(() => {
    let tabDomList =
        document.querySelectorAll('.swiper-tab-content-box .adm-swiper-slide-active .adm-swiper-item') || null
    if (!tabDomList || tabDomList.length === 0) return

    let tabDom: Element | null = null
    for (let i = 0; i < tabDomList.length; i++) {
      let dom = tabDomList[i]
      if (!dom) continue

      let classList = dom.classList || []
      if (classList.contains('swiper-recommend') || classList.contains('swiper-banner')) {
        continue
      }

      tabDom = dom
    }

    let topDom = tabDom?.querySelector('.page-top') || null
    if (!topDom) return

    let selectBoxDom = tabDom?.querySelector('.page-content .select-box') || null
    if (!selectBoxDom) return

    let topRect = topDom.getBoundingClientRect() || {}
    tabDom?.addEventListener(
        'scroll',
        debounce(() => {
          onScroll(topRect.height, tabDom?.scrollTop, selectBoxDom)
        }, 20)
    )

    return () => {
      tabDom?.removeEventListener(
          'scroll',
          debounce(() => {
            onScroll(topRect.height, tabDom?.scrollTop, selectBoxDom)
          }, 20)
      )
    }
  }, [homeStore.activeTabIndex])

  const onScroll = (topHeight: number = 0, scrollTop: number = 0, selectBoxDom: null | Element = null) => {
    let classList = selectBoxDom?.classList || []
    if (scrollTop < topHeight) {
      if (classList.length > 0) {
        // @ts-ignore
        classList.remove('show')
      }
    } else {
      if (classList.length > 0) {
        // @ts-ignore
        if (!classList.contains('show')) {
          // @ts-ignore
          classList.add('show')
        }
      }
    }
  }

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

        <div className="search-right h100 flex-center">
          <div className="zhui-ju flex-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon" version="1.1" viewBox="0 0 24 24">
              <defs>
                <clipPath>
                  <rect x="0" y="0" width="24" height="24" rx="0" />
                </clipPath>
              </defs>
              <g clipPath="url(#master_svg0_827_8125)">
                <g className="gou">
                  <path
                    d="M21.5685601953125,16.111254287109375L21.5685601953125,16.111254287109375L16.2352201953125,21.444584287109375C16.047690195312498,21.632124287109374,15.7933301953125,21.737474287109375,15.5281201953125,21.737474287109375C15.2629001953125,21.737474287109375,15.0085501953125,21.632124287109374,14.8210101953125,21.444584287109375L12.1543431953125,18.777914287109375C11.9668071953125,18.590384287109373,11.8614501953125,18.336024287109375,11.8614501953125,18.070814287109375C11.8614501953125,17.805594287109376,11.9668071953125,17.551244287109377,12.1543431953125,17.363704287109375C12.3418801953125,17.176164287109376,12.5962341953125,17.070814287109375,12.8614501953125,17.070814287109375C13.1266701953125,17.070814287109375,13.3810201953125,17.176164287109376,13.5685601953125,17.363704287109375L15.5281201953125,19.323264287109374L20.1543401953125,14.697037287109374C20.3418801953125,14.509501287109375,20.5962301953125,14.404144287109375,20.8614501953125,14.404144287109375C21.122180195312502,14.404144287109375,21.3726101953125,14.505979287109374,21.5593501953125,14.687944287109374L21.5593501953125,14.687944287109374C21.5599201953125,14.688509287109374,21.5679801953125,14.696465287109374,21.5679801953125,14.696465287109374L21.5679801953125,14.696465287109374C21.756090195312503,14.884574287109375,21.8614501953125,15.138928287109374,21.8614501953125,15.404144287109375C21.8614501953125,15.669364287109374,21.756090195312503,15.923714287109375,21.5685601953125,16.111254287109375Z"
                    fillRule="evenodd"
                    fill="#333333"
                    fillOpacity="1"
                  />
                </g>
                <g className="xian">
                  <path
                    d="M19,3.5L3,3.5C2.447715,3.5,2,3.947715,2,4.5C2,5.05228,2.447715,5.5,3,5.5L19,5.5C19.5523,5.5,20,5.05228,20,4.5C20,3.947715,19.5523,3.5,19,3.5ZM13,11.5L3,11.5C2.447715,11.5,2,11.94771,2,12.5C2,13.05228,2.447715,13.5,3,13.5L13,13.5C13.5523,13.5,14,13.05228,14,12.5C14,11.94771,13.5523,11.5,13,11.5ZM9,18.5L3,18.5C2.447715,18.5,2,18.947699999999998,2,19.5C2,20.0523,2.447715,20.5,3,20.5L9,20.5C9.55228,20.5,10,20.0523,10,19.5C10,18.947699999999998,9.55228,18.5,9,18.5Z"
                    fillRule="evenodd"
                    fill="#333333"
                    fillOpacity="1"
                  />
                </g>
              </g>
            </svg>

            <span>追</span>
          </div>
          {/* 下载
          <div className="svg-box flex-center">
            <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M341.333333 640a42.666667 42.666667 0 0 1-42.666666 42.666667H256a170.666667 170.666667 0 0 1-40.277333-336.554667 298.709333 298.709333 0 0 1 570.154666-81.408A213.333333 213.333333 0 0 1 725.333333 682.666667a42.666667 42.666667 0 0 1 0.042667-85.333334 128 128 0 0 0 36.394667-250.794666l-38.144-11.264-15.914667-36.437334a213.376 213.376 0 0 0-407.296 58.026667l-7.381333 58.368-57.173334 13.824A85.418667 85.418667 0 0 0 256 597.333333h42.666667a42.666667 42.666667 0 0 1 42.666666 42.666667z m321.706667 87.338667a42.666667 42.666667 0 0 1 0 60.330666l-120.917333 120.832c-16.682667 16.64-43.690667 16.64-60.373334 0l-120.917333-120.832a42.666667 42.666667 0 0 1 60.330667-60.330666L469.333333 775.509333V426.666667a42.666667 42.666667 0 0 1 85.333334 0v348.714666l48.042666-48.042666a42.666667 42.666667 0 0 1 60.330667 0z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
           */}

          {/* 历史记录
          <div className="svg-box flex-center">
            <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M537.6 25.6c-179.2 0-339.2 96-419.2 246.4L0 153.6v332.8h332.8l-144-144C256 214.4 384 128 537.6 128c211.2 0 384 172.8 384 384s-172.8 384-384 384c-169.6 0-307.2-108.8-364.8-256H67.2c57.6 204.8 246.4 358.4 470.4 358.4C809.6 998.4 1024 777.6 1024 512S803.2 25.6 537.6 25.6z m-76.8 256V544l240 144 41.6-67.2-204.8-121.6V284.8h-76.8z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
           */}
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
      <div className="home flex-direction-column wh100" style={{
        paddingTop: homeStore.phoneHeight.topHeight,
      }}>
        <div className="page-wrapper wh100 flex-direction-column">
          {/* search */}
          {getSearchBoxHtml()}

          {/* tabs */}
          <MSwiperTabs
            className="content flex-1 overflow-hidden"
            tabs={homeStore.tabsList || []}
            activeTabIndex={homeStore.activeTabIndex || 0}
            onTabChange={async (index: number) => {
              await homeStore.onTabChange(index)
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
