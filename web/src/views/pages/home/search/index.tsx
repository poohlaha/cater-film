/**
 * @fileOverview 首页
 * @date 2024-01-02
 * @author poohlaha
 */
import React, { ReactElement, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { SearchBar } from 'antd-mobile'
import { SearchBarRef } from 'antd-mobile/es/components/search-bar'
import { useStore } from '@views/stores'
import Utils from '@utils/utils'
import Loading from '@views/components/loading/loading'
import List from './list'

const Search: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  const { homeStore } = useStore()
  const searchRef = useRef<SearchBarRef>(null)

  useEffect(() => {
    if (homeStore.search.show) {
      if (searchRef.current) {
        searchRef.current?.focus?.()
      }
    }
  }, [homeStore.search.show])

  const getHistoryList = () => {
    let list = homeStore.searchHistoryList || []
    return (
      <div className="history card card-no-margin">
        <div className="card-title flex-jsc-between">
          <p>历史记录</p>
          {list.length > 0 && (
            <div className="svg-box" onClick={() => homeStore.clearSearchHistory()}>
              <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M840 288H688v-56c0-40-32-72-72-72h-208C368 160 336 192 336 232V288h-152c-12.8 0-24 11.2-24 24s11.2 24 24 24h656c12.8 0 24-11.2 24-24s-11.2-24-24-24zM384 288v-56c0-12.8 11.2-24 24-24h208c12.8 0 24 11.2 24 24V288H384zM758.4 384c-12.8 0-24 11.2-24 24v363.2c0 24-19.2 44.8-44.8 44.8H332.8c-24 0-44.8-19.2-44.8-44.8V408c0-12.8-11.2-24-24-24s-24 11.2-24 24v363.2c0 51.2 41.6 92.8 92.8 92.8h358.4c51.2 0 92.8-41.6 92.8-92.8V408c-1.6-12.8-12.8-24-25.6-24z"
                  fill="#currentColor"
                ></path>
                <path
                  d="M444.8 744v-336c0-12.8-11.2-24-24-24s-24 11.2-24 24v336c0 12.8 11.2 24 24 24s24-11.2 24-24zM627.2 744v-336c0-12.8-11.2-24-24-24s-24 11.2-24 24v336c0 12.8 11.2 24 24 24s24-11.2 24-24z"
                  fill="#currentColor"
                ></path>
              </svg>
            </div>
          )}
        </div>

        <div className="card-content card-top-margin flex-align-center flex-wrap">
          {list.map((name: string, index: number) => {
            return (
              <p
                className="card-tag"
                key={index}
                onClick={async () => {
                  if (Utils.isBlank(name)) return
                  homeStore.search.text = (name || '').trim()
                  homeStore.search.showList = true
                  homeStore.setSearchHistory(name || '')
                  await homeStore.getSearchList(0, 1)
                }}
              >
                {name || ''}
              </p>
            )
          })}
        </div>
      </div>
    )
  }

  const render = () => {
    console.log('obj', homeStore.search)
    return (
      <div className="search-page flex-direction-column wh100 mark">
        <div className="page-wrapper wh100 flex-direction-column">
          <div className="search-box flex-align-center">
            {/*
            <div
              className="svg-box back flex-center cursor-pointer"
              onClick={() => {
                homeStore.search.show = false
                homeStore.search = Utils.deepCopy(homeStore.defaultSearch)
              }}
            >
              <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M393.390114 512.023536l347.948667-336.348468c20.50808-19.85828 20.50808-51.997258 0-71.792093-20.507056-19.826558-53.778834-19.826558-74.28589 0L281.990954 476.135164c-20.476357 19.826558-20.476357 51.981908 0 71.746044l385.061936 372.236839c10.285251 9.91379 23.728424 14.869662 37.173644 14.869662 13.446243 0 26.889417-4.956895 37.112246-14.901385 20.50808-19.826558 20.50808-51.919487 0-71.746044L393.390114 512.023536"></path>
              </svg>
            </div>
            */}

            {/* search */}
            <SearchBar
              ref={searchRef}
              className="flex-1"
              placeholder="请输入关键字"
              showCancelButton={() => true}
              value={homeStore.search.text || ''}
              onCancel={() => {
                homeStore.setDefaultSearch(false)
              }}
              onChange={(val: string) => {
                console.log('change val:', val)
                if (Utils.isBlank(val)) {
                  homeStore.search.text = ''
                  homeStore.setDefaultSearch(true)
                  return
                }

                homeStore.search.text = val || ''
              }}
              onClear={() => {
                homeStore.setDefaultSearch(true)
              }}
              onSearch={async (val: string = '') => {
                if (Utils.isBlank(val)) return
                homeStore.setSearchHistory(val)
                homeStore.search.showList = true
                homeStore.search.text = (val || '').trim()
                await homeStore.getSearchList(0, 1)
              }}
            />
          </div>

          {/* 列表 or 历史记录 */}
          {homeStore.search.showList ? <List /> : getHistoryList()}
        </div>

        <Loading show={homeStore.loading} />
      </div>
    )
  }

  return render()
}

export default observer(Search)
