/**
 * @fileOverview 滑动 Tab
 * @date 2023-12-26
 * @author poohlaha
 */
import React, { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import { Tabs } from 'antd-mobile'

interface IMSwiperBarProps {
  tabs: Array<{ [K: string]: any }>
  onChange: (value: { [K: string]: any }) => void
}

const MSwiperBar: React.FC<IMSwiperBarProps> = (props: IMSwiperBarProps): ReactElement | null => {
  const render = () => {
    if (!props.tabs || props.tabs.length === 0) return null

    return (
      <Tabs
        className="swiper-tabs"
        onChange={(key: string = '') => {
          let value =
            (props.tabs || []).find(
              (
                item: {
                  [K: string]: any
                } = {}
              ) => item.key === key
            ) || {}
          props.onChange?.(value)
        }}
      >
        {props.tabs.map((tab: { [K: string]: any } = {}) => {
          return <Tabs.Tab title={tab.title || ''} key={tab.key || ''} />
        })}
      </Tabs>
    )
  }

  return render()
}

export default observer(MSwiperBar)
