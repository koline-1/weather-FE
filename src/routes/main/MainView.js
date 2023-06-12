import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import squareMainTab from '../../images/squareMainTab.png';
import styles from '../../styles/main/Main.module.css';
import shortTermLocations from '../../json/shortTermLocations.json';
import useGet from '../../hooks/useGet';
import RealTimeStatus from '../../components/RealTimeStatus';
import disconnected from '../../images/main/disconnected.png';

export default function MainView () {

    useEffect(() => {
        document.title='기상청 중·단기 예보 조회 서비스';
    }, [])

    const [location, setLocation] = useState([60,127])
    const { data, isLoading } = useGet("main", "extra", location);

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
                {!data || isLoading ? (
                    <>
                        <img src={disconnected} alt="disconnected"/>
                        <p>날씨정보를 찾을 수 없습니다.</p>
                    </>
                ) : (
                    <>
                        <RealTimeStatus horizontalWind={getValue('UUU')} verticalWind={getValue('VVV')} rainType={getValue('PTY')} skyStatus={getValue('SKY')} />
                        <p>{getValue('T1H')}℃</p>
                    </>
                )}
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