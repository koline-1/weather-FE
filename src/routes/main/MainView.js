const { useEffect, useState } =  require('react');
const { Link } = require('react-router-dom');
const disconnected = require('../../images/main/disconnected.png');
const sunny = require('../../images/main/sunny.png');
const snowy = require('../../images/main/snowy.png');
const rainy = require('../../images/main/rainy.png');
const squareMainTab = require('../../images/squareMainTab.png');
const styles = require('../../styles/main/Main.module.css').default;

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
        const json = await(await fetch(`http://localhost:8080/mainView?nxValue=58&nyValue=125`)).json();
        console.log(json);
        setData(json);
        setLoading(false);
    }

    // useEffect(() => {
    //     getPosition();
    // }, [])

    const realTimeStatus = () => {switch(data.rainType){
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