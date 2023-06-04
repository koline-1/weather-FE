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
import shortTermLocations from '../../shortTermLocations.json';
import useRead from '../../hooks/api/useRead';

export default function MainView () {

    useEffect(() => {
        document.title='기상청 중·단기 예보 조회 서비스';
    }, [])

    const [location, setLocation] = useState([60,127])
    const data = useRead("short", "extra", location);

    const getValue = (target) => {
        let result;
        [].forEach.call(data, (item) => {
            if (item.category === target) {
                result = item.fcstValue;
                return false;
            }
        })
        return result;
    }
    
    const getRealTimeStatus = () => {
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
                default: return (
                    <>
                        <img src={sunny} alt="sunny"/>
                        <p>맑음</p>
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
                <h4>
                    <select
                        onChange={(e) => {
                            const target = e.target.selectedOptions[0];
                            const arr = new Array(2);
                            arr[0] = target.getAttribute("nxvalue");
                            arr[1] = target.getAttribute("nyvalue");
                            setLocation(arr);
                        }}
                        className={styles.select_box}
                    >
                        {shortTermLocations.map((loc, index) => {
                            return (
                                <option
                                    key={index}
                                    nxvalue={loc.nxValue}
                                    nyvalue={loc.nyValue}
                                >
                                    {loc.region}
                                </option>
                            )
                        })}
                    </select>
                </h4>
                {data === undefined ? <>
                    <img src={disconnected} alt="disconnected"/>
                    <p>날씨정보를 찾을 수 없습니다.</p>
                </> : <>
                    {getRealTimeStatus()}
                    <p>{getValue('T1H')}℃</p>
                </>}
            </div>

            <div className={styles.container_main}>
                <div>
                    <img src={squareMainTab} alt="squareMainTab" />
                    <Link to="/short/service">기상청 단기 예보</Link>
                </div>
                <div>
                    <img src={squareMainTab} alt="squareMainTab" />
                    <Link to="/mid/service">기상청 중기 예보</Link>
                </div>
                <div>
                    <img src={squareMainTab} alt="squareMainTab" />
                    <Link to="/data">저장 데이터 조회</Link>
                </div>
            </div>
        </>
    );
}