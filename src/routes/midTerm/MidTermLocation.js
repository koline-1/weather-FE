import { useEffect } from 'react';
import ButtonLink from '../../components/ButtonLink';

const { useParams } = require('react-router-dom');

export default function MidTermLocation() {
    const { serviceId } = useParams();
    
    useEffect(() => {
      let title = "";
      switch(serviceId) {
        case "expectation" : title="중기 전망 조회";
            break;
        case "land" : title="중기 육상 예보 조회";
            break;
        case "ocean" : title="중기 해상 예보 조회";
            break;
        case "temperature" : title="중기 기온 조회";
            break;
        default: title="";
      }
      document.title=title;  
    }, [serviceId]);
    
    
    switch(serviceId){
        case "expectation":
            return (
                <>
                    <div>
                        <div>
                            <a href="/mid/expectation/108/current">전국</a>
                        </div>
                        <div>
                            <a href="/mid/expectation/105/current">강원도</a>
                        </div>
                        <div>
                            <a href="/mid/expectation/109/current">서울, 인천, 경기도</a>
                        </div>
                        <div>
                            <a href="/mid/expectation/131/current">충청북도</a>
                        </div>
                        <div>
                            <a href="/mid/expectation/133/current">대전, 세종, 충청남도</a>
                        </div>
                        <div>
                            <a href="/mid/expectation/146/current">전라북도</a>
                        </div>
                        <div>
                            <a href="/mid/expectation/156/current">광주, 전라남도</a>
                        </div>
                        <div>
                            <a href="/mid/expectation/143/current">대구, 경상북도</a>
                        </div>
                        <div>
                            <a href="/mid/expectation/159/current">부산, 울산, 경상남도</a>
                        </div>
                        <div>
                            <a href="/mid/expectation/184/current">제주도</a>
                        </div>
                    </div>
                    <ButtonLink to='/mid/service' text='뒤로' />
                </>
            );
        case "ocean":
            return (
                <>
                    <div>
                        <div>
                            <a href="/mid/ocean/12A20000/current">서해중부</a>
                            <a href="/mid/ocean/12A30000/current">서해남부</a>
                        </div>
                        <div>
                            <a href="/mid/ocean/12B10000/current">남해서부</a>
                            <a href="/mid/ocean/12B20000/current">남해동부</a>
                        </div>
                        <div>
                            <a href="/mid/ocean/12C10000/current">동해남부</a>
                            <a href="/mid/ocean/12C20000/current">동해중부</a>
                        </div>
                        <div>
                            <a href="/mid/ocean/12C30000/current">동해북부</a>
                            <a href="/mid/ocean/12A10000/current">서해북부</a>
                        </div>
                        <div>
                            <a href="/mid/ocean/12B10500/current">제주도</a>
                            <a href="/mid/ocean/12D00000/current">대화퇴</a>
                        </div>
                        <div>
                            <a href="/mid/ocean/12E00000/current">동중국해</a>
                            <a href="/mid/ocean/12F00000/current">규슈</a>
                        </div>
                        <div>
                            <a href="/mid/ocean/12G00000/current">연해주</a>
                        </div>
                    </div>
                    <ButtonLink to='/mid/service' text='뒤로' />
                </>
            );
        case "land":
            return (
                <>
                    <div>
                        <div>
                            <a href="/mid/land/11B00000/current">서울, 인천, 경기도</a>
                        </div>
                        <div>
                            <a href="/mid/land/11D10000/current">강원도영서</a>
                        </div>
                        <div>
                            <a href="/mid/land/11D20000/current">강원도영동</a>
                        </div>
                        <div>
                            <a href="/mid/land/11C20000/current">대전, 세종, 충청남도</a>
                        </div>
                        <div>
                            <a href="/mid/land/11C10000/current">충청북도</a>
                        </div>
                        <div>
                            <a href="/mid/land/11F20000/current">광주, 전라남도</a>
                        </div>
                        <div>
                            <a href="/mid/land/11F10000/current">전라북도</a>
                        </div>
                        <div>
                            <a href="/mid/land/11H10000/current">대구, 경상북도</a>
                        </div>
                        <div>
                            <a href="/mid/land/11H20000/current">부산, 울산, 경상남도</a>
                        </div>
                        <div>
                            <a href="/mid/land/11G00000/current">제주도</a>
                        </div>
                    </div>
                    <ButtonLink to='/mid/service' text='뒤로' />
                </>
            );
        case "temperature" :
            return (
                <>
                    <div>
                        <div>
                            <a href="/mid/temperature/11B10101/current">서울</a>
                            <a href="/mid/temperature/11G00401/current">서귀포</a>
                        </div>
                        <div>
                            <a href="/mid/temperature/11B20201/current">인천</a>
                            <a href="/mid/temperature/11F20501/current">광주</a>
                        </div>
                        <div>
                            <a href="/mid/temperature/11B20601/current">수원</a>
                            <a href="/mid/temperature/21F20801/current">목포</a>
                        </div>
                        <div>
                            <a href="/mid/temperature/11B20305/current">파주</a>
                            <a href="/mid/temperature/11F20401/current">여수</a>
                        </div>
                        <div>
                            <a href="/mid/temperature/11D10301/current">춘천</a>
                            <a href="/mid/temperature/11F10201/current">전주</a>
                        </div>
                        <div>
                            <a href="/mid/temperature/11D10401/current">원주</a>
                            <a href="/mid/temperature/21F10501/current">군산</a>
                        </div>
                        <div>
                            <a href="/mid/temperature/11D20501/current">강릉</a>
                            <a href="/mid/temperature/11H20201/current">부산</a>
                        </div>
                        <div>
                            <a href="/mid/temperature/11C20401/current">대전</a>
                            <a href="/mid/temperature/11H20101/current">울산</a>
                        </div>
                        <div>
                            <a href="/mid/temperature/11C20101/current">서산</a>
                            <a href="/mid/temperature/11H20301/current">창원</a>
                        </div>
                        <div>
                            <a href="/mid/temperature/11C20404/current">세종</a>
                            <a href="/mid/temperature/11H10701/current">대구</a>
                        </div>
                        <div>
                            <a href="/mid/temperature/11C10301/current">청주</a>
                            <a href="/mid/temperature/11H10501/current">안동</a>
                        </div>
                        <div>
                            <a href="/mid/temperature/11G00201/current">제주</a>
                            <a href="/mid/temperature/11H10201/current">포항</a>
                        </div>
                    </div>
                    <ButtonLink to='/mid/service' text='뒤로' />
                </>
            )
        default:
            return <ButtonLink to='/mid/service' text='뒤로' />;
    }

}