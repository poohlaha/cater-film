/**
 * @fileOverview 详情页面
 * @date 2024-01-04
 * @author poohlaha
 */
import React, {ReactElement, useState} from 'react'
import { observer } from 'mobx-react-lite'
import RouterUrls from '@route/router.url.toml'
import { useStore } from '@stores/index'
import Loading from '@views/components/loading/loading'
import useMount from '@hooks/useMount'
import Utils from '@utils/utils'
import {Tabs, Popup} from 'antd-mobile'
import MHeaderBar from '@views/components/headerBar'
import {useNavigate} from 'react-router-dom'

const Detail: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
    const { homeStore } = useStore()
    const [popupVisible, setPopupVisible] = useState(false)
    const [popupInfoVisible, setPopupInfoVisible] = useState(false)
    const navigate = useNavigate()

    const getMockData = () => {
      let arr = []
      for(let i = 1; i <= 40; i++) {
          arr.push(i)
      }

      return arr
    }

    // 右侧箭头
    const getRightArrowHtml = (callback?: Function) => {
      return (
          <div className="svg-box flex-center card-desc arrow" onClick={() => callback?.()}>
              <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M761.6 489.6l-432-435.2c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l416 416-416 425.6c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l432-441.6C771.2 515.2 771.2 499.2 761.6 489.6z"
                      fill="currentColor"
                  ></path>
              </svg>
          </div>
      )
    }

    const render = () => {
        return (
            <div className="detail-page wh100 flex-direction-column">
                {/*  header bar */}
                <MHeaderBar text="标题" onBack={() => {navigate(-1)}} />

                {/* video */}
                <div className="video">

                </div>

                {/* 详情 */}
                <div className="content flex-1">
                    <div className="card card-no-padding">
                        {/* 标题、简介 */}
                        <div className="card-title flex-align-center">
                            <p>一念关山</p>
                            <div className="card-title-right flex-center card-desc card-left-margin" onClick={() => setPopupInfoVisible(true)}>
                                <p>简介</p>
                                {getRightArrowHtml()}
                            </div>
                        </div>

                        {/* 介绍*/}
                        <div className="info w100 card-desc card-top-margin flex-align-center over-two-ellipsis">
                            大陆 普通话/古装/电视/大陆/国产/动作/内地/连续/战争/情/集
                        </div>

                        {/* 选集 */}
                        <div className="select-more flex-jsc-center w100 flex-direction-column">
                            <div className="select-info flex-align-center" onClick={() => setPopupVisible(true)}>
                                <p className="name font-medium">选集</p>
                                <div className="choose card-desc flex-align-center card-left-margin">
                                    <p>更新到40集</p>
                                    {getRightArrowHtml()}
                                </div>
                            </div>

                            <div className="card-top-margin selects">
                                <Tabs>
                                    {
                                        getMockData().map((i: number) => {
                                            return (<Tabs.Tab title={`${i}`} key={`${i}`} />)
                                        })
                                    }
                                </Tabs>
                            </div>
                        </div>
                    </div>

                    {/* 为你推荐 */}
                    <div className="card card-no-padding">
                        <div className="card-title">为你推荐</div>
                    </div>

               </div>

                {/* 选集 Popup */}
                <Popup
                    getContainer={() => document.querySelector('.detail-page') || document.body}
                    className="detail-select-more-popup" visible={popupVisible} onClose={() => setPopupVisible(false)}>
                    <div className="select-mores-popup card card-no-padding">
                        <div className="title flex-jsc-between flex-align-center">
                            <p className="font-medium">选集</p>
                            {getRightArrowHtml(() => setPopupVisible(false))}
                        </div>
                        <div className="card-desc card-top-margin">
                            会员每周四10:00更新, 12月21日10点大结局点映礼
                        </div>

                        <div className="more-info flex flex-wrap w100">

                            {
                                getMockData().map((i: number) => {
                                    return (<div className={`more-item flex-center ${i === 1 ? 'active' : ''}`} key={`${i}`}>{i}</div>)
                                })
                            }
                        </div>
                    </div>
                </Popup>

                {/* 简介 Popup */}
                <Popup
                    getContainer={() => document.querySelector('.detail-page') || document.body}
                    className="detail-select-more-popup detail-jianjie-popup" visible={popupInfoVisible} onClose={() => setPopupInfoVisible(false)}>
                    <div className="select-mores-popup card card-no-padding">
                        <div className="title flex-jsc-between flex-align-center">
                            <p className="font-medium">近战法师</p>
                            {getRightArrowHtml(() => setPopupInfoVisible(false))}
                        </div>
                        <div className="card-desc card-top-margin">
                            全40集
                        </div>
                        <div className="card-desc card-top-margin">
                            <div className="rendu card-right-margin">
                                {/*
                                <div className="svg-box">
                                    <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M512 935.253333C292.48 935.253333 161.493333 808.96 161.493333 597.333333c0-158.08 72.106667-226.133333 135.68-286.293333 55.466667-52.48 103.466667-97.706667 103.68-196.693333a24.32 24.32 0 0 1 10.666667-20.053334 24.746667 24.746667 0 0 1 23.04-2.56c112.853333 45.013333 210.346667 208.853333 215.893333 314.666667 27.52-21.333333 35.84-82.773333 42.666667-132.48l1.493333-10.88a24.533333 24.533333 0 0 1 16.426667-19.84 24.32 24.32 0 0 1 24.746667 6.186667c66.773333 68.906667 144.426667 198.4 144.426666 336.853333-0.213333 241.066667-184.96 349.013333-368.213333 349.013333zM442.24 143.146667c-8.96 98.133333-64 149.333333-115.626667 198.826666-64 59.52-122.453333 115.626667-122.453333 256 0 265.813333 215.253333 294.613333 307.84 294.613334 149.333333 0 325.333333-80.213333 325.333333-306.346667 0-107.946667-52.48-210.56-106.666666-277.333333-7.68 51.84-19.626667 104.533333-53.76 131.626666a42.666667 42.666667 0 0 1-43.946667 5.76 42.666667 42.666667 0 0 1-25.6-37.76c-4.266667-91.093333-85.333333-216.533333-165.12-265.386666z m294.613333 125.653333z"
                                            fill="currentColor"></path>
                                    </svg>
                                </div>
                                <p>1234</p>
                                */}
                            </div>

                            <div className="desc-item flex card-top-margin">
                                <p className="card-right-margin">导演:</p>
                                <p>周靖韬，邹曦</p>
                            </div>
                            <div className="desc-item flex card-top-margin">
                                <p className="card-right-margin">主演:</p>
                                <p>刘诗诗，刘宇宁，方逸伦，何蓝逗，陈昊宇，常华森，陈宥维，王一哲，陈都灵，陈小纭，黄梦莹，张芷溪</p>
                            </div>
                            <div className="desc-item flex card-top-margin">
                                <p className="card-right-margin">类型:</p>
                                <p>普通话，古装，电视，大陆，国产，动作，内地，连续，战争，情，集</p>
                            </div>
                            <div className="desc-item flex card-top-margin">
                                <p className="card-right-margin">地区:</p>
                                <p>大陆</p>
                            </div>
                            <div className="desc-item flex card-top-margin">
                                <p className="card-right-margin">年代:</p>
                                <p>2023</p>
                            </div>
                        </div>

                        <div className="video-info flex-direction-column">
                            <p className="card-top-margin">
                                新云洗绯色，黄沙漫漫红衣长。江湖行远舟，关山阵阵万重霜。柠萌影业出品，原创古装传奇剧《一念关山》讲述安国朱衣卫前左使任如意因机缘巧合成为梧国迎帝使小分队成员，和梧国六道堂堂主宁远舟、风流浪子于十三、公主杨盈、聪敏少年元禄、御前侍卫钱昭等人经历生死，共同成长的故事。
                            </p>
                        </div>
                    </div>
                </Popup>
            </div>
        )
    }

    return render()
}

export default observer(Detail)
