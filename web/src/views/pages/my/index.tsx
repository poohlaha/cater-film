/**
 * @fileOverview 排行榜
 * @date 2023-12-26
 * @author poohlaha
 */
import React, { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@stores/index'
import Loading from '@views/components/loading/loading'
import useMount from '@hooks/useMount'

const My: React.FC<IRouterProps> = (props: IRouterProps): ReactElement => {
  /**
   * 获取头像
   */
  const getActorHtml = () => {
    return (
      <div className="svg-box">
        <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M510.919389 63.950498c247.345388 0 447.860191 200.514803 447.86019 447.861214 0 247.348458-200.514803 447.861214-447.86019 447.861214-247.348458 0-447.863261-200.51378-447.863261-447.861214 0-247.345388 200.514803-447.861214 447.863261-447.861214z"
            fill="#EEEEEE"
          ></path>
          <path
            d="M510.919389 515.965312c79.150688 0 143.314033-64.425312 143.314033-143.899365 0-79.473029-64.163345-143.898341-143.314033-143.898341-79.151711 0-143.317103 64.425312-143.317103 143.898341-0.001023 79.475076 64.164369 143.899364 143.317103 143.899365z m221.060744 175.867449l1.068332-0.402159c-35.032888-88.682785-121.280204-151.399175-222.129076-151.399175-99.597369 0-184.944176 61.173245-220.793662 148.112316l0.494257 0.200568a35.121915 35.121915 0 0 0-2.565429 13.20065c0 19.475564 15.798824 35.266202 35.291784 35.266201 14.758122 0 27.392884-9.05626 32.661887-21.906939l0.575099 0.233314c25.224498-60.507072 84.822874-103.028515 154.336064-103.028515 70.109778 0 130.129756 43.259246 154.97256 104.59622l0.252757-0.095168c5.65479 11.939937 17.815761 20.201088 31.912827 20.201088 19.48989 0 35.289738-15.789615 35.289738-35.266201a35.281551 35.281551 0 0 0-1.367138-9.7122z"
            fill="#CCCCCC"
          ></path>
        </svg>
      </div>
    )
  }

  const render = () => {
    return (
      <div className="my flex-direction-column wh100">
        <div className="page-wrapper wh100 flex-direction-column">
          {/* 头像 */}
          <div className="actor page-padding flex">
            <div className="actor-left flex-1 flex-align-center h100">
              {getActorHtml()}
              <p className="name font-bold">Welcome</p>
            </div>

            <div className="actor-right">
              <div className="svg-box">
                <svg className="svg-icon" viewBox="0 0 1084 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="currentColor"
                    d="M1072.147851 406.226367c-6.331285-33.456782-26.762037-55.073399-52.047135-55.073399-0.323417 0-0.651455 0.003081-0.830105 0.009241l-4.655674 0c-73.124722 0-132.618162-59.491899-132.618162-132.618162 0-23.731152 11.447443-50.336101 11.546009-50.565574 13.104573-29.498767 3.023185-65.672257-23.427755-84.127081l-1.601687-1.127342-134.400039-74.661726-1.700252-0.745401c-8.753836-3.805547-18.334698-5.735272-28.479231-5.735272-20.789593 0-41.235746 8.344174-54.683758 22.306575-14.741683 15.216028-65.622973 58.649474-104.721083 58.649474-39.450789 0-90.633935-44.286652-105.438762-59.784516-13.518857-14.247316-34.128258-22.753199-55.127302-22.753199-9.945862 0-19.354234 1.861961-27.958682 5.531982l-1.746455 0.74078-139.141957 76.431283-1.643269 1.139662c-26.537186 18.437884-36.675557 54.579032-23.584845 84.062398 0.115506 0.264895 11.579891 26.725075 11.579891 50.634877 0 73.126262-59.491899 132.618162-132.618162 132.618162l-4.581749 0c-0.318797-0.00616-0.636055-0.01078-0.951772-0.01078-25.260456 0-45.672728 21.618157-52.002472 55.0811-0.462025 2.453354-11.313456 60.622322-11.313456 106.117939 0 45.494078 10.85143 103.659965 11.314996 106.119479 6.334365 33.458322 26.758957 55.076479 52.036353 55.076479 0.320337 0 0.651455-0.00616 0.842426-0.012321l4.655674 0c73.126262 0 132.618162 59.491899 132.618162 132.616622 0 23.760413-11.444363 50.333021-11.546009 50.565574-13.093793 29.474125-3.041666 65.646075 23.395414 84.151722l1.569346 1.093459 131.838879 73.726895 1.675611 0.7377c8.750757 3.84251 18.305437 5.790715 28.397607 5.790715 21.082208 0 41.676209-8.706094 55.0888-23.290689 18.724339-20.347588 69.527086-62.362616 107.04815-62.362616 40.625872 0 92.72537 47.100385 107.759669 63.583903 13.441852 14.831008 34.176001 23.689571 55.470741 23.695731l0.00616 0c9.895039 0 19.27877-1.883523 27.893999-5.598205l1.711034-0.73924 136.659342-75.531873 1.617088-1.128882c26.492523-18.456365 36.601633-54.600594 23.538642-84.016195-0.115506-0.267974-11.595291-27.082374-11.595291-50.67646 0-73.124722 59.49344-132.616622 132.618162-132.616622l4.517066-0.00154c0.300316 0.00616 0.599092 0.009241 0.899409 0.009241 25.331299-0.00154 45.785153-21.619697 52.107197-55.054918 0.112426-0.589852 11.325776-59.507301 11.325776-106.14104C1083.464388 466.640776 1072.609877 408.67356 1072.147851 406.226367zM377.486862 945.656142l-115.32764-64.487932c5.082277-13.052211 15.437801-43.51815 15.437801-75.017486 0-109.382917-84.176364-199.816642-192.587488-208.134635-2.647404-15.427021-8.873963-54.967133-8.873963-85.667166 0-30.65691 6.223479-70.232445 8.869343-85.671786 108.415744-8.311832 192.592108-98.745557 192.592108-208.134635 0-31.416171-10.300081-61.797405-15.371577-74.854236l122.721583-67.40331c0.003081 0 0.00462 0.00154 0.007701 0.00154 4.423121 4.518606 22.121764 22.080182 46.558275 39.493911 39.929754 28.46229 77.952885 42.894416 113.014434 42.894416 34.716571 0 72.437845-14.151831 112.115025-42.06431 24.282503-17.07953 41.896442-34.302288 46.308782-38.74543 0.009241-0.00154 0.018481-0.00462 0.026182-0.00616l118.301542 65.726159c-5.077657 13.055291-15.416239 43.499669-15.416239 74.958962 0 109.389077 84.174824 199.822802 192.590568 208.134635 2.645865 15.462442 8.872423 55.107281 8.872423 85.671786 0 30.687711-6.223479 70.241685-8.869343 85.673326C890.042174 606.334084 805.86427 696.767809 805.86427 806.158426c0 31.450053 10.317022 61.851309 15.393138 74.903519l-119.783103 66.198965c-5.168521-5.490399-22.603811-23.363073-46.740005-41.288109-40.701336-30.224145-79.662378-45.549521-115.800446-45.549521-35.79155 0-74.458435 15.038919-114.927219 44.694774C400.22004 922.554885 382.666163 940.255068 377.486862 945.656142zM731.271848 511.646647c0-105.803762-86.081448-191.88059-191.888289-191.88059-105.803762 0-191.88059 86.076827-191.88059 191.88059 0 105.803762 86.076827 191.882129 191.88059 191.882129C645.19194 703.528777 731.271848 617.450409 731.271848 511.646647zM539.383558 395.903184c63.825696 0 115.751164 51.922387 115.751164 115.743463 0 63.825696-51.925468 115.751164-115.751164 115.751164-63.821076 0-115.743463-51.925468-115.743463-115.751164C423.640095 447.824031 475.562482 395.903184 539.383558 395.903184z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          {/* 观看历史 */}
          <div className="card card-radius history">
            <div className="card-title flex-align-center">
              <p className="flex-1 font-bold">观看历史</p>
              <div className="more flex-center">
                <p className="card-desc">更多</p>
                <div className="svg-box flex-center card-desc">
                  <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M761.6 489.6l-432-435.2c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l416 416-416 425.6c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l432-441.6C771.2 515.2 771.2 499.2 761.6 489.6z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="card-content flex">
              <div className="item flex-1 h100">
                <img className="w100" src="https://wx3.sinaimg.cn/large/002do8ZNly1hin0dveutyj60zk1khts502.jpg" />
                <div className="card-desc desc flex-center">
                  <p>一念关山</p>
                  <p>第一集</p>
                </div>
              </div>

              <div className="item flex-1 h100">
                <img className="w100" src="https://wx3.sinaimg.cn/large/002do8ZNly1hin0dveutyj60zk1khts502.jpg" />
                <div className="card-desc desc flex-center">
                  <p>一念关山</p>
                  <p>第一集</p>
                </div>
              </div>

              <div className="item flex-1 h100">
                <img className="w100" src="https://wx3.sinaimg.cn/large/002do8ZNly1hin0dveutyj60zk1khts502.jpg" />
                <div className="card-desc desc flex-center">
                  <p>一念关山</p>
                  <p>第一集</p>
                </div>
              </div>
            </div>
          </div>

          {/* 常用功能 */}
          <div className="card card-radius normal card-no-top-margin">
            <div className="card-title flex-align-center">
              <p className="flex-1 font-bold">常用功能</p>
            </div>

            <div className="card-content flex">
              <div className="item h100 flex-center flex-direction-column">
                <div className="svg-box">
                  <svg className="svg-icon" viewBox="0 0 1163 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M848.7444667 788.64051114l-113.30952891-47.49182755a29.73863848 29.73863848 0 0 0-24.13452041 0.57268301l-109.62799277 53.54591133c-18.81674473 9.08112481-41.60136885-4.17240878-38.5334209-22.70281201l17.50775449-107.70541172a21.23019668 21.23019668 0 0 0-8.09938213-19.63486407l-92.93835674-73.2625875c-15.9942331-12.68084971-8.34481758-35.58819112 12.92628516-38.77885635l124.06779844-18.93946289a25.68894698 25.68894698 0 0 0 19.06218105-12.88537997L687.86129815 402.40636895c8.99931269-16.85325849 36.40631045-17.58956572 46.6737082-1.30899112l59.19093457 95.92449345a26.38434902 26.38434902 0 0 0 19.96211162 11.74001221l125.17226016 12.27179005c21.47563301 2.0862044 30.6794751 24.42086279 15.74879678 37.87892578l-87.45695772 78.33492685a20.4529834 20.4529834 0 0 0-6.79039014 20.04392461l25.1980752 106.56004395c4.41784424 18.32587295-17.30322422 32.92930372-36.81537012 24.78901641z"
                      fill="#FC8A04"
                    ></path>
                    <path
                      d="M703.42509125 799.01110062l-201.45370687-91.19303624a49.26169313 49.26169313 0 0 0-42.84763782 1.04719312L264.2586275 811.79557906c-33.51016875 17.4532125-74.04525469-7.984845-68.59112531-43.63303125l31.19761687-206.82057a42.41130656 42.41130656 0 0 0-14.39890031-37.78620562L47.14066156 382.839245C18.73555813 358.44838062 32.34906406 314.5099175 70.17890281 308.27039375l220.56497531-36.34631531a45.81468281 45.81468281 0 0 0 33.902865-24.73992844L417.41056906 57.16229656c15.96969-32.37570937 64.6641525-33.81559969 82.99002563-2.57434875l105.2428725 184.30592531c6.981285 12.34814812 20.63842406 21.07475438 35.43002156 22.51464469l222.52846125 23.64910313c38.17890281 3.97060594 54.54129 46.86187594 28.05603937 72.69263062l-155.46449156 150.49032656a41.18958188 41.18958188 0 0 0-12.08634937 38.52796688l44.81112281 204.63891844c7.76667938 35.25549-30.80492062 63.26789625-65.44954688 47.60363718z"
                      fill="#6981FD"
                      fillOpacity=".22"
                    ></path>
                  </svg>
                </div>
                <div className="card-desc desc flex-center">
                  <p>我的收藏</p>
                </div>
              </div>

              <div className="item h100 flex-center flex-direction-column">
                <div className="svg-box">
                  <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M667.8016 729.4464c-19.8656-20.1216-52.2752-20.2752-72.3968-0.4096l-28.5696 28.2624v-200.9088c0-28.2624-22.9376-51.2-51.2-51.2s-51.2 22.9376-51.2 51.2v201.0112l-28.5184-28.3136c-20.0704-19.9168-52.48-19.8144-72.3968 0.256-19.9168 20.0704-19.8144 52.48 0.256 72.3968L479.2832 916.48c9.984 9.9328 23.04 14.848 36.096 14.848 13.0048 0 26.0096-4.9152 35.9936-14.7968l116.0192-114.7392c20.1216-19.8144 20.2752-52.2752 0.4096-72.3456z"
                      fill="#FFE37B"
                    ></path>
                    <path
                      d="M819.6096 470.1184h-5.3248c-3.072-162.5088-135.68-293.3248-298.9056-293.3248S219.4944 307.6096 216.4736 470.1184h-5.3248c-100.1984 0-181.4016 81.2032-181.4016 181.4016s81.2032 181.4016 181.4016 181.4016H344.3712l-5.8368-5.7856c-34.048-33.792-34.2528-89.0368-0.4608-123.0848 24.3712-24.5248 59.8528-31.488 90.5216-20.8384v-126.9248c0-47.9744 39.0656-87.04 87.04-87.04s87.04 39.0656 87.04 87.04v126.9248c30.72-10.7008 66.2528-3.6864 90.624 20.9408 33.7408 34.1504 33.4336 89.344-0.7168 123.0848l-5.7344 5.632h132.7616c100.1984 0 181.4016-81.2032 181.4016-181.4016 0-100.096-81.2032-181.3504-181.4016-181.3504z"
                      fill="#8C7BFD"
                    ></path>
                  </svg>
                </div>
                <div className="card-desc desc flex-center">
                  <p>我的下载</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return render()
}

export default observer(My)
