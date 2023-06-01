import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import disconnected from '../../images/main/disconnected.png';
import sunny from '../../images/main/sunny.png';
import snowy from '../../images/main/snowy.png';
import rainy from '../../images/main/rainy.png';
import squareMainTab from '../../images/squareMainTab.png';
import styles from '../../styles/main/Main.module.css';
import apiInfo from '../../apiInfo.json';

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

    // const onGeoOkay = (position) => {
    //     console.log(position)
    //     const lat = Math.floor(position.coords.latitude);
    //     const lon = Math.floor(position.coords.longitude);
    //     setPosition({lat: lat, lon: lon});
    //     setLoading(false);
    // }
      
    // const onGeoError = () => {
    //     alert("I can't find you. No weather for you.");
    // }
    
    // const getPosition = () => {
    //     navigator.geolocation.getCurrentPosition(onGeoOkay, onGeoError);
    // }

    const getData = async() => {
        const date = new Date();
        const min = date.getMinutes();

        if (min < 40) {
            date.setHours(date.getHours() - 1);
        }

        const month = date.getMonth()+1;
        const day = date.getDate();
        const hour = date.getHours();

        const baseDate = `${date.getFullYear()}${month < 10 ? '0'+month : month}${day < 10 ? '0'+day : day}`;
        const baseTime = `${hour < 10 ? '0'+hour : hour}${min < 10 ? '0'+min : min}`;

        const url = `${apiInfo.url}&nx=58&ny=125&base_date=${baseDate}&base_time=${baseTime}`;
        const json = await(await fetch(url)).json();
        console.log(json);
        setData(json);
        setLoading(false);
    }

    // useEffect(() => {
    //     getPosition();
    // }, [])

    const getValue = (target) => {
        const items = data.response.body.items.item;
        let result;
        [].forEach.call(items, (item) => {
            if (item.category === target) {
                result = item.obsrValue;
                return false;
            }
        })
        return result;
    }
    
    const realTimeStatus = () => {switch(getValue('PTY')){
        case "0": return (<>
            <img src={sunny} alt="sunny"/>
            <p>맑음</p>
        </>)
        case "3": case "7": return (<>
            <img src={snowy} alt="snowy"/>
            <p>눈</p>
        </>)
        case "1": case "2": case "5": case "6": return (<>
            <img src={rainy} alt="rainy"/>
            <p>비</p>
        </>)
        default: return (<>
            <img src={disconnected} alt="disconnected"/>
            <p>날씨정보를 찾을 수 없습니다.</p>
        </>)
    }};

    return (
        <>
            <div className={styles.real_time_status}>
                <h1>기상 실황</h1>
                {loading ? <>
                    <img src={disconnected} alt="disconnected"/>
                    <p>날씨정보를 찾을 수 없습니다.</p>
                </> : <>
                    {realTimeStatus()}
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