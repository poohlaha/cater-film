/**
 * @fileOverview headers
 * @date 2023-01-05
 * @author poohlaha
 */

import React, {PropsWithChildren, ReactElement} from 'react'
import {observer} from 'mobx-react-lite'

interface IMHeaderBarProps {
    text: string
    onBack?: () => void
}

const MHeaderBar: React.FC<IMHeaderBarProps> = (props: PropsWithChildren<IMHeaderBarProps>): ReactElement | null => {

    const render = () => {
        return (
            <div className="header-bar flex-align-center">
                <div className="svg-box back flex-center" onClick={() => props.onBack?.()}>
                    <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M532.526499 904.817574L139.506311 511.797385 532.526499 118.777197c12.258185-12.258185 12.432147-32.892131-0.187265-45.51052-12.707416-12.707416-32.995485-12.703323-45.511543-0.187265L75.166957 484.739123c-7.120165 7.120165-10.163477 17.065677-8.990768 26.624381-1.500167 9.755178 1.5104 20.010753 8.990768 27.491121l411.660734 411.660734c12.258185 12.258185 32.892131 12.432147 45.511543-0.187265 12.707416-12.707416 12.7023-32.995485 0.187265-45.51052z"></path>
                    </svg>
                </div>

                <div className="center flex-center wh100">
                    <p className="over-ellipsis font-medium">{props.text || ''}</p>
                </div>

                <div className="header-right">
                    {props.children}
                </div>
            </div>
        )
    }

    return render()
}

export default observer(MHeaderBar)