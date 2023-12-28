/**
 * @fileOverview no chat for left
 * @date 2023-04-14
 * @author poohlaha
 */
import React, { ReactElement } from 'react'
import Utils from '@utils/utils'

interface INoChatProps {
  text?: string
}

const NoData: React.FC<INoChatProps> = (props: INoChatProps): ReactElement | null => {

  const render = () => {
    let text = props.text || '暂无数据'
    return (
        <div className="no-data-box flex-center">
            <div className="no-data flex-center flex-direction-column">
                <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                     viewBox="0 0 121.26318359375 99.4921875">
                    <g>
                        <g>
                            <g>
                                <g>
                                    <path
                                        d="M60.6033,99.49207706298827C85.237,99.49207706298827,105.2066,95.76077706298828,105.2066,91.15788706298828C105.2066,86.55502706298829,85.237,82.82367706298828,60.6033,82.82367706298828C35.9696,82.82367706298828,16,86.55502706298829,16,91.15788706298828C16,95.76077706298828,35.9696,99.49207706298827,60.6033,99.49207706298827C60.6033,99.49207706298827,60.6033,99.49207706298827,60.6033,99.49207706298827Z"
                                        fill="#F5F5F5" fillOpacity="1"/>
                                </g>
                                <g>
                                    <path
                                        d="M96.28555579376221,66.67365765380859C96.28555579376221,66.67365765380859,80.54535579376221,47.301967653808596,80.54535579376221,47.301967653808596C79.79015579376221,46.39013065380859,78.6861557937622,45.838157653808594,77.5236557937622,45.838157653808594C77.5236557937622,45.838157653808594,43.68155579376221,45.838157653808594,43.68155579376221,45.838157653808594C42.51975579376221,45.838157653808594,41.41575579376221,46.39013065380859,40.66055579376221,47.301967653808596C40.66055579376221,47.301967653808596,24.921055793762207,66.67365765380859,24.921055793762207,66.67365765380859C24.921055793762207,66.67365765380859,24.921055793762207,76.7940576538086,24.921055793762207,76.7940576538086C24.921055793762207,76.7940576538086,96.2861557937622,76.7940576538086,96.2861557937622,76.7940576538086C96.2861557937622,76.7940576538086,96.2861557937622,66.67365765380859,96.2861557937622,66.67365765380859C96.2861557937622,66.67365765380859,96.28555579376221,66.67365765380859,96.28555579376221,66.67365765380859C96.28555579376221,66.67365765380859,96.28555579376221,66.67365765380859,96.28555579376221,66.67365765380859Z"
                                        fillRule="evenodd" fill="#000000" fillOpacity="0.15000000596046448"/>
                                </g>
                                <g></g>
                                <g>
                                    <path
                                        d="M38.25657237060547,20.835521697998047C38.25657237060547,20.835521697998047,82.94929237060546,20.835521697998047,82.94929237060546,20.835521697998047C83.64729237060547,20.835521697998047,84.31659237060546,21.112776697998047,84.81019237060548,21.606293697998048C85.30369237060546,22.099811697998046,85.58089237060547,22.769161697998047,85.58089237060547,23.467101697998046C85.58089237060547,23.467101697998046,85.58089237060547,84.87762169799805,85.58089237060547,84.87762169799805C85.58089237060547,85.57552169799804,85.30369237060546,86.24492169799805,84.81019237060548,86.73842169799805C84.31659237060546,87.23192169799805,83.64729237060547,87.50922169799804,82.94929237060546,87.50922169799804C82.94929237060546,87.50922169799804,38.25657237060547,87.50922169799804,38.25657237060547,87.50922169799804C37.558632370605466,87.50922169799804,36.88928237060547,87.23192169799805,36.39576437060547,86.73842169799805C35.902247370605465,86.24492169799805,35.62499237060547,85.57552169799804,35.62499237060547,84.87762169799805C35.62499237060547,84.87762169799805,35.62499237060547,23.467101697998046,35.62499237060547,23.467101697998046C35.62499237060547,22.769161697998047,35.902247370605465,22.099811697998046,36.39576437060547,21.606293697998048C36.88928237060547,21.112776697998047,37.558632370605466,20.835521697998047,38.25657237060547,20.835521697998047C38.25657237060547,20.835521697998047,38.25657237060547,20.835521697998047,38.25657237060547,20.835521697998047C38.25657237060547,20.835521697998047,38.25657237060547,20.835521697998047,38.25657237060547,20.835521697998047Z"
                                        fillRule="evenodd" fill="#FAFAFA" fillOpacity="1"/>
                                </g>
                                <g>
                                    <path
                                        d="M44.07759012908936,27.383544921875C44.07759012908936,27.383544921875,77.12829012908935,27.383544921875,77.12829012908935,27.383544921875C77.47729012908935,27.383544921875,77.81189012908936,27.522172921875,78.05869012908936,27.768930921875C78.30549012908935,28.015688921875,78.44409012908935,28.350364921875,78.44409012908935,28.699334921875C78.44409012908935,28.699334921875,78.44409012908935,45.118444921874996,78.44409012908935,45.118444921874996C78.44409012908935,45.467344921875,78.30549012908935,45.802044921875,78.05869012908936,46.048844921875C77.81189012908936,46.295544921875,77.47729012908935,46.434244921875,77.12829012908935,46.434244921875C77.12829012908935,46.434244921875,44.07759012908936,46.434244921875,44.07759012908936,46.434244921875C43.72869012908936,46.434244921875,43.39399012908936,46.295544921875,43.14719012908935,46.048844921875C42.900490129089356,45.802044921875,42.761790129089356,45.467344921875,42.761790129089356,45.118444921874996C42.761790129089356,45.118444921874996,42.761790129089356,28.699334921875,42.761790129089356,28.699334921875C42.761790129089356,28.350364921875,42.900490129089356,28.015688921875,43.14719012908935,27.768930921875C43.39399012908936,27.522172921875,43.72869012908936,27.383544921875,44.07759012908936,27.383544921875C44.07759012908936,27.383544921875,44.07759012908936,27.383544921875,44.07759012908936,27.383544921875C44.07759012908936,27.383544921875,44.07759012908936,27.383544921875,44.07759012908936,27.383544921875ZM44.249990129089355,53.576944921875C44.249990129089355,53.576944921875,76.95589012908935,53.576944921875,76.95589012908935,53.576944921875C77.35059012908935,53.576944921875,77.72909012908936,53.733744921875,78.00819012908936,54.012844921875C78.28729012908936,54.291944921875,78.44409012908935,54.670444921875,78.44409012908935,55.065144921875C78.44409012908935,55.459844921875,78.28729012908936,55.838344921875,78.00819012908936,56.117444921875C77.72909012908936,56.396444921875,77.35059012908935,56.553244921875,76.95589012908935,56.553244921875C76.95589012908935,56.553244921875,44.249990129089355,56.553244921875,44.249990129089355,56.553244921875C43.855290129089354,56.553244921875,43.47679012908935,56.396444921875,43.19769012908935,56.117444921875C42.91859012908935,55.838344921875,42.761790129089356,55.459844921875,42.761790129089356,55.065144921875C42.761790129089356,54.670444921875,42.91859012908935,54.291944921875,43.19769012908935,54.012844921875C43.47679012908935,53.733744921875,43.855290129089354,53.576944921875,44.249990129089355,53.576944921875C44.249990129089355,53.576944921875,44.249990129089355,53.576944921875,44.249990129089355,53.576944921875C44.249990129089355,53.576944921875,44.249990129089355,53.576944921875,44.249990129089355,53.576944921875ZM44.249990129089355,61.315744921875C44.249990129089355,61.315744921875,76.95589012908935,61.315744921875,76.95589012908935,61.315744921875C77.35069012908936,61.315744921875,77.72929012908935,61.472644921875,78.00849012908935,61.751744921875C78.28759012908935,62.030944921875,78.44439012908936,62.409544921875,78.44439012908936,62.804244921875C78.44439012908936,63.199044921875,78.28759012908935,63.577644921875,78.00849012908935,63.856744921875C77.72929012908935,64.135944921875,77.35069012908936,64.292744921875,76.95589012908935,64.292744921875C76.95589012908935,64.292744921875,44.249990129089355,64.292744921875,44.249990129089355,64.292744921875C43.85519012908935,64.292744921875,43.47659012908936,64.135944921875,43.19749012908936,63.856744921875C42.91829012908936,63.577644921875,42.76149012908935,63.199044921875,42.76149012908935,62.804244921875C42.76149012908935,62.409544921875,42.91829012908936,62.030944921875,43.19749012908936,61.751744921875C43.47659012908936,61.472644921875,43.85519012908935,61.315744921875,44.249990129089355,61.315744921875C44.249990129089355,61.315744921875,44.249990129089355,61.315744921875,44.249990129089355,61.315744921875C44.249990129089355,61.315744921875,44.249990129089355,61.315744921875,44.249990129089355,61.315744921875ZM96.14009012908936,89.93554492187499C95.63029012908936,91.955944921875,93.83949012908936,93.461844921875,91.70919012908935,93.461844921875C91.70919012908935,93.461844921875,29.496710129089355,93.461844921875,29.496710129089355,93.461844921875C27.366440129089355,93.461844921875,25.575654129089354,91.955244921875,25.066443129089354,89.93554492187499C24.969323829089355,89.550544921875,24.920266110089354,89.154944921875,24.920390364529357,88.757844921875C24.920390364529357,88.757844921875,24.920390364529357,66.67434492187499,24.920390364529357,66.67434492187499C24.920390364529357,66.67434492187499,42.23489012908935,66.67434492187499,42.23489012908935,66.67434492187499C44.14739012908936,66.67434492187499,45.688790129089355,68.28484492187499,45.688790129089355,70.240144921875C45.688790129089355,70.240144921875,45.688790129089355,70.266444921875,45.688790129089355,70.266444921875C45.688790129089355,72.221044921875,47.24799012908936,73.79934492187499,49.160490129089354,73.79934492187499C49.160490129089354,73.79934492187499,72.04539012908936,73.79934492187499,72.04539012908936,73.79934492187499C73.95789012908935,73.79934492187499,75.51709012908935,72.20654492187501,75.51709012908935,70.251344921875C75.51709012908935,70.251344921875,75.51709012908935,70.24344492187501,75.51709012908935,70.24344492187501C75.51709012908935,68.288144921875,77.05859012908935,66.673644921875,78.97109012908936,66.673644921875C78.97109012908936,66.673644921875,96.28549012908935,66.673644921875,96.28549012908935,66.673644921875C96.28549012908935,66.673644921875,96.28549012908935,88.758544921875,96.28549012908935,88.758544921875C96.28549012908935,89.164444921875,96.23489012908935,89.558544921875,96.14009012908936,89.93554492187499C96.14009012908936,89.93554492187499,96.14009012908936,89.93554492187499,96.14009012908936,89.93554492187499C96.14009012908936,89.93554492187499,96.14009012908936,89.93554492187499,96.14009012908936,89.93554492187499Z"
                                        fillRule="evenodd" fill="#F0F0F0" fillOpacity="1"/>
                                </g>
                            </g>
                            <g>
                                <path
                                    d="M98.31645366699219,21.9026C98.31645366699219,21.9026,93.82302366699219,23.6461,93.82302366699219,23.6461C93.70759366699218,23.6909,93.58183366699218,23.7023,93.46021366699219,23.6789C93.33859366699218,23.6555,93.22605366699219,23.5982,93.13554366699219,23.5137C93.0450236669922,23.4292,92.98020366699218,23.3208,92.9485436669922,23.2011C92.91689366699218,23.0813,92.91967366699218,22.9551,92.95658366699219,22.8368C92.95658366699219,22.8368,94.23092366699218,18.7533,94.23092366699218,18.7533C92.52762966699218,16.8164,91.52763366699219,14.4546,91.52763366699219,11.9059C91.52763366699219,5.33026,98.18420366699219,0,106.39603366699218,0C114.60593366699219,0,121.26313366699219,5.33026,121.26313366699219,11.9059C121.26313366699219,18.4816,114.60653366699219,23.8118,106.39543366699219,23.8118C103.41643366699219,23.8118,100.64276366699218,23.1105,98.31645366699219,21.9026C98.31645366699219,21.9026,98.31645366699219,21.9026,98.31645366699219,21.9026Z"
                                    fillRule="evenodd" fill="#000000" fillOpacity="0.15000000596046448"/>
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M112.25262159332276,14.055929255676268C113.28779159332275,14.055929255676268,114.12696159332275,13.22676925567627,114.12696159332275,12.20394925567627C114.12696159332275,11.18113625567627,113.28779159332275,10.35197925567627,112.25262159332276,10.35197925567627C111.21745159332275,10.35197925567627,110.37828159332275,11.18113625567627,110.37828159332275,12.20394925567627C110.37828159332275,13.22676925567627,111.21745159332275,14.055929255676268,112.25262159332276,14.055929255676268C112.25262159332276,14.055929255676268,112.25262159332276,14.055929255676268,112.25262159332276,14.055929255676268Z"
                                        fill="#FFFFFF" fillOpacity="1"/>
                                </g>
                                <g>
                                    <path
                                        d="M102.41314922851562,13.824351897277833C102.41314922851562,13.824351897277833,98.66445922851562,13.824351897277833,98.66445922851562,13.824351897277833C98.66445922851562,13.824351897277833,100.57103922851563,10.583561897277832,100.57103922851563,10.583561897277832C100.57103922851563,10.583561897277832,102.41314922851562,13.824351897277833,102.41314922851562,13.824351897277833C102.41314922851562,13.824351897277833,102.41314922851562,13.824351897277833,102.41314922851562,13.824351897277833ZM104.75590922851562,10.583561897277832C104.75590922851562,10.583561897277832,108.03551922851562,10.583561897277832,108.03551922851562,10.583561897277832C108.03551922851562,10.583561897277832,108.03551922851562,13.824351897277833,108.03551922851562,13.824351897277833C108.03551922851562,13.824351897277833,104.75590922851562,13.824351897277833,104.75590922851562,13.824351897277833C104.75590922851562,13.824351897277833,104.75590922851562,10.583561897277832,104.75590922851562,10.583561897277832C104.75590922851562,10.583561897277832,104.75590922851562,10.583561897277832,104.75590922851562,10.583561897277832Z"
                                        fillRule="evenodd" fill="#FFFFFF" fillOpacity="1"/>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                {
                    !Utils.isBlank(text) && (<p>{text || ''}</p>)
                }
            </div>
        </div>
    )
  }

    return render()
}

export default NoData
