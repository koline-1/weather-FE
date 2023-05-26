const { useEffect, useState } =  require('react');
const { useParams } =  require('react-router-dom');
const ButtonLink = require('../../components/ButtonLink').default;

export default function MidTermData() {
    const [data, setData] = useState();
    const [keySet, setKeySet] = useState([]);
    const { serviceId, dataId } = useParams();

    useEffect(() => {
        const getData = async() => {
            const response = await (await fetch(`http://localhost:8080/mid-term/${serviceId}/${dataId}`)).json();
            setData(response);
            if (response !== null) {
                setKeySet(Object.keys(response));
            }
        }
        getData();
    }, [serviceId, dataId])

    return (
        <>
            {data === null ? <h1>데이터가 없습니다.</h1> : (
                <ul>
                    {keySet.map((key) => {
                        if (key === "stnId") {
                            switch(data.stnId) {
                                case "105": return <li>예보구역 : 강원도</li>
                                case "108": return <li>예보구역 : 전국</li>
                                case "109": return <li>예보구역 : 서울, 인천, 경기도</li>
                                case "131": return <li>예보구역 : 충청북도</li>
                                case "133": return <li>예보구역 : 대전, 세종, 충청남도</li>
                                case "146": return <li>예보구역 : 전라북도</li>
                                case "156": return <li>예보구역 : 광주, 전라남도</li>
                                case "143": return <li>예보구역 : 대구, 경상북도</li>
                                case "159": return <li>예보구역 : 부산, 울산, 경상남도</li>
                                case "184": return <li>예보구역 : 제주도</li>
                                default : return null;
                            }
                        }

                        if (key === "regId") {
                            switch(data.regId) {
                                case "11B00000" : return <li>예보구역 : 서울, 인천, 경기도</li>
                                case "11D10000" : return <li>예보구역 : 강원도영서</li>
                                case "11D20000" : return <li>예보구역 : 강원도영동</li>
                                case "11C20000" : return <li>예보구역 : 대전, 세종, 충청남도</li>
                                case "11C10000" : return <li>예보구역 : 충청북도</li>
                                case "11F20000" : return <li>예보구역 : 광주, 전라남도</li>
                                case "11F10000" : return <li>예보구역 : 전라북도</li>
                                case "11H10000" : return <li>예보구역 : 대구, 경상북도</li>
                                case "11H20000" : return <li>예보구역 : 부산, 울산, 경상남도</li>
                                case "11G00000" : return <li>예보구역 : 제주도</li>
                                case "12A20000" : return <li>예보구역 : 서해중부</li>
                                case "12A30000" : return <li>예보구역 : 서해남부</li>
                                case "12B10000" : return <li>예보구역 : 남해서부</li>
                                case "12B20000" : return <li>예보구역 : 남해동부</li>
                                case "12C10000" : return <li>예보구역 : 동해남부</li>
                                case "12C20000" : return <li>예보구역 : 동해중부</li>
                                case "12C30000" : return <li>예보구역 : 동해북부</li>
                                case "12A10000" : return <li>예보구역 : 서해북부</li>
                                case "12B10500" : return <li>예보구역 : 제주도</li>
                                case "12D00000" : return <li>예보구역 : 대화퇴</li>
                                case "12E00000" : return <li>예보구역 : 동중국해</li>
                                case "12F00000" : return <li>예보구역 : 규슈</li>
                                case "12G00000" : return <li>예보구역 : 연해주</li>
                                case "11B10101" : return <li>예보구역 : 서울</li>
                                case "11G00401" : return <li>예보구역 : 서귀포</li>
                                case "11B20201" : return <li>예보구역 : 인천</li>
                                case "11F20501" : return <li>예보구역 : 광주</li>
                                case "11B20601" : return <li>예보구역 : 수원</li>
                                case "21F20801" : return <li>예보구역 : 목포</li>
                                case "11B20305" : return <li>예보구역 : 파주</li>
                                case "11F20401" : return <li>예보구역 : 여수</li>
                                case "11D10301" : return <li>예보구역 : 춘천</li>
                                case "11F10201" : return <li>예보구역 : 전주</li>
                                case "11D10401" : return <li>예보구역 : 원주</li>
                                case "21F10501" : return <li>예보구역 : 군산</li>
                                case "11D20501" : return <li>예보구역 : 강릉</li>
                                case "11H20201" : return <li>예보구역 : 부산</li>
                                case "11C20401" : return <li>예보구역 : 대전</li>
                                case "11H20101" : return <li>예보구역 : 울산</li>
                                case "11C20101" : return <li>예보구역 : 서산</li>
                                case "11H20301" : return <li>예보구역 : 창원</li>
                                case "11C20404" : return <li>예보구역 : 세종</li>
                                case "11H10701" : return <li>예보구역 : 대구</li>
                                case "11C10301" : return <li>예보구역 : 청주</li>
                                case "11H10501" : return <li>예보구역 : 안동</li>
                                case "11G00201" : return <li>예보구역 : 제주</li>
                                case "11H10201" : return <li>예보구역 : 포항</li>
                                default : return null;
                            }
                        }

                        return <li>{key+ ": "+ data[key]}</li>
                    })}
                </ul>
            )}
            <ButtonLink to={`/mid/${serviceId}/location`} text={"실시간 조회"} />
        </>
    );
}