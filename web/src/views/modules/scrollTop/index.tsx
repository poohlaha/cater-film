import React, { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'

/**
 * @fileOverview 列表
 * @date 2023-12-27
 * @author poohlaha
 */
interface IScrollTopProps {
  className?: string
  currentPage: number
  only: string
  onScroll?: () => void
}

const MScrollTop: React.FC<IScrollTopProps> = (props: IScrollTopProps): ReactElement | null => {
  const render = () => {
    if (props.currentPage < 3) return null

    return (
      <div
        className={`svg-box flex-center position-fixed scroll-top ${props.className || ''}`}
        onClick={() => {
          let callback = props.onScroll
          if (!callback) {
            // @ts-ignore
            let dom = document.querySelector(`.swiper-${props.only}`)
            console.log('scroll Dom', dom)
            // @ts-ignore
            dom?.scrollTo?.(0, 0)
            return
          }

          callback?.()
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24">
          <defs>
            <clipPath id="master_svg0_480_00701">
              <rect x="0" y="0" width="24" height="24" rx="0" />
            </clipPath>
          </defs>
          <g clipPath="url(#master_svg0_480_00701)">
            <g>
              <path
                d="M18,4.5L6,4.5C5.447715,4.5,5,4.05228,5,3.5C5,2.947715,5.447715,2.5,6,2.5L18,2.5C18.552300000000002,2.5,19,2.947715,19,3.5C19,4.05228,18.552300000000002,4.5,18,4.5ZM17.2929,14.2071L13.00415,9.91836L13.00415,21.4C13.00415,21.9523,12.55644,22.4,12.00415,22.4C11.45187,22.4,11.00415,21.9523,11.00415,21.4L11.00415,9.91006L6.70711,14.2071C6.51957,14.3946,6.26522,14.5,6,14.5C5.734783,14.5,5.48043,14.3946,5.292893,14.2071C5.117104,14.0313,5.0130964,13.7964,5.00115448,13.548C5.000384938,13.532,5,13.516,5,13.5C5,13.2348,5.105357,12.9804,5.292893,12.7929L5.292893,12.7929L11.29289,6.79289C11.48043,6.60536,11.73478,6.5,12,6.5L12.00207,6.5L12.00415,6.5C12.29603,6.5,12.57334,6.62752,12.76332,6.8491L18.7071,12.7929C18.8946,12.9804,19,13.2348,19,13.5C19,13.7652,18.8946,14.0196,18.7071,14.2071C18.5196,14.3946,18.2652,14.5,18,14.5C17.7348,14.5,17.4804,14.3946,17.2929,14.2071Z"
                fillRule="evenodd"
                fill="currentColor"
                fillOpacity="0.6499999761581421"
              />
            </g>
          </g>
        </svg>
      </div>
    )
  }

  return render()
}

export default observer(MScrollTop)
