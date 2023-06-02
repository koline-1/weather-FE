import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import disconnected from '../../images/main/disconnected.png';
import sunny from '../../images/main/sunny.png';
import snowy from '../../images/main/snowy.png';
import rainy from '../../images/main/rainy.png';
import cloudy from '../../images/main/cloudy.png';
import windy from '../../images/main/windy.png';
import squareMainTab from '../../images/squareMainTab.png';
import styles from '../../styles/main/Main.module.css';
import apiInfo from '../../apiInfo.json';
import shortTermLocations from '../../shortTermLocations.json';

// @TODO: 추후에 DB에 기상청 단기예보 excel 데이터 업로드 후 위치기반 서비스 추가
// @TODO: 초단기 실황 > 초단기 예보로 서비스 변경
export default function MainView () {

    useEffect(() => {
        document.title='기상청 중·단기 예보 조회 서비스';
        getData();
    }, [])

    // const [position, setPosition] = useState({lat: "", lon: ""});
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();

    const getData = async(nx, ny) => {
        const date = new Date();
        const min = date.getMinutes();

        if (min < 45) {
            date.setHours(date.getHours() - 1);
        }

        const month = date.getMonth()+1;
        const day = date.getDate();
        const hour = date.getHours();

        const baseDate = `${date.getFullYear()}${month < 10 ? '0'+month : month}${day < 10 ? '0'+day : day}`;
        const baseTime = `${hour < 10 ? '0'+hour : hour}${min < 10 ? '0'+min : min}`;

        const url = `${apiInfo.url}&nx=${nx}&ny=${ny}&base_date=${baseDate}&base_time=${baseTime}`;
        const json = await(await fetch(url)).json();

        const allData = json.response.body.items.item;
        const currentData = [];
        const firstHour = date.getHours()+1+'00';

        [].forEach.call(allData, (each) => {
            if (each.fcstTime == firstHour) {
                currentData.push(each);
            }
        })

        setData(currentData);
        setLoading(false);
    }

    const getValue = (target) => {
        let result;
        [].forEach.call(data, (item) => {
            if (item.category === target) {
                console.log(item)
                result = item.fcstValue;
                return false;
            }
        })
        return result;
    }
    
    const realTimeStatus = () => {
        const horizontalWind = getValue('UUU');
        const verticalWind = getValue('VVV');
        switch(getValue('PTY')){
            case "0": switch(getValue('SKY')) {
                case "1":  return (
                    <>
                        {(horizontalWind > 7 && horizontalWind < 900) || (verticalWind > 7 && verticalWind < 900) ? (
                            <>
                                <img src={windy} alt="windy"/>
                                <p>바람</p>
                            </>
                        ) : (
                            <>
                                <img src={sunny} alt="sunny"/>
                                <p>맑음</p>
                            </>
                        )}
                    </>
                )
                case "3": return (
                    <>
                        <img src={cloudy} alt="cloudy"/>
                        <p>구름많음</p>
                    </>
                )
                case "4": return (
                    <>
                        <img src={cloudy} alt="cloudy"/>
                        <p>흐림</p>
                    </>
                )
            }
            case "3": return (
                <>
                    <img src={snowy} alt="snowy"/>
                    <p>눈</p>
                </>
            )
            case "7": return (
                <>
                    <img src={snowy} alt="snowy"/>
                    <p>눈날림</p>
                </>
            )
            case "1": return (
                <>
                    <img src={rainy} alt="rainy"/>
                    <p>비</p>
                </>
            )
            case "2": return (
                <>
                    <img src={rainy} alt="rainy"/>
                    <p>비/눈</p>
                </>
            )
            case "5": return (
                <>
                    <img src={rainy} alt="rainy"/>
                    <p>빗방울</p>
                </>
            )
            case "6": return (
                <>
                    <img src={rainy} alt="rainy"/>
                    <p>빗방울눈날림</p>
                </>
            )
            default: return (
                <>
                    <img src={disconnected} alt="disconnected"/>
                    <p>날씨정보를 찾을 수 없습니다.</p>
                </>
            )
        }
    };

    return (
        <>
            <div className={styles.real_time_status}>
                <h1>기상 실황</h1>
                {loading ? <>
                    <img src={disconnected} alt="disconnected"/>
                    <p>날씨정보를 찾을 수 없습니다.</p>
                </> : <>
                    {realTimeStatus()}
                    <p>{data.temperature}℃</p>
                </>}
            </div>

            <div className={styles.container_main}>
                <div>
                    <img src={squareMainTab} alt="squareMainTab" />
                    <Link to="/short/location">기상청 단기 예보</Link>
                </div>
                <div>
                    <img src={squareMainTab} alt="squareMainTab" />
                    <Link to="/mid/service">기상청 중기 예보</Link>
                </div>
                <div>
                    <img src={squareMainTab} alt="squareMainTab" />
                    <Link to="">추가 예정</Link>
                </div>
            </div>
        </>
    );
}