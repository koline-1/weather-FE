export default function RealTimeStatus({ horizontalWind, verticalWind, rainType, skyStatus }) {
    let status;
    let text;
    switch(rainType){
        case "0": switch(skyStatus) {
            case "1":
                if ((horizontalWind > 7 && horizontalWind < 900) || (verticalWind > 7 && verticalWind < 900)) {
                    status = 'windy';
                    text = '바람';
                } else {
                    status = 'sunny';
                    text = '맑음';
                }
                break;
            case "3": 
                status = 'cloudy'
                text = '구름많음';
                break;
            case "4": 
                status = 'cloudy'
                text = '흐림';
                break;
            default: 
                status = 'disconnected'
                text = '날씨정보를 찾을 수 없습니다.';
                break;
        }
        break;
        case "3": 
            status = 'snowy';
            text = '눈';
            break;
        case "7": 
            status = 'snowy';
            text = '눈날림';
            break;
        case "1": 
            status = 'rainy';
            text = '비';
            break;
        case "2": 
            status = 'rainy';
            text = '비/눈';
            break;
        case "5": 
            status = 'rainy';
            text = '빗방울';
            break;
        case "6": 
            status = 'rainy';
            text = '빗방울눈날림';
            break;
        default: 
            status = 'disconnected';
            text = '날씨정보를 찾을 수 없습니다.';
            break;
    }

    return (
        <>
            <img src={require(`../images/main/${status}.png`)} alt={status} />
            <p>{text}</p>
        </>
    );
}