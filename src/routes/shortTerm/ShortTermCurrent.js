import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ButtonLink from '../../components/ButtonLink';
import services from '../../services.json';
import layout from '../../styles/layout/Layout.module.css';
import Title from '../../components/Title';
import DataView from '../../components/DataView';


export default function ShortTermCurrent() {

    const { serviceId, nxValue, nyValue } = useParams();
    const [data, setData] = useState();
    const [keySet, setKeySet] = useState([]);
    const [loading, setLoading] = useState(true);

    

    useEffect(() => {
        let title = "";
        switch(serviceId) {
            case "expectation" : title="단기 예보 조회";
                break;
            case "extraExpectation" : title="초단기 예보 조회";
                break;
            case "status" : title="초단기 실황 조회";
                break;
            default: title="";
        }
        document.title=title;

        const getData = async() => {
            const response = await (await fetch(`http://localhost:8080/short-term/${serviceId}/current?nxValue=${nxValue}&nyValue=${nyValue}`)).json();
            setData(response);
            if (serviceId === "status") {
                setKeySet(Object.keys(response))
            } else {
                setKeySet(Object.keys(response[0]));
            }
            setLoading(false);
        }

        getData()
    }, [serviceId, nxValue, nyValue])

    const saveData = async() => {
        const response = await (await fetch(`http://localhost:8080/short-term/${serviceId}/current`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
              data : data
            }),
        })).json()
        .catch((error) => console.log("error:", error));

        if (serviceId === "status") {
            if (response.baseDate !== "") {
                alert("데이터를 성공적으로 저장하였습니다.");
            } else if (response.baseDate === "") {
                alert("이미 저장한 데이터 입니다.");
            } else {
                alert("알 수 없는 오류가 발생했습니다.");
            }
        } else {
            if (Number(response.count) === 0) {
                alert("이미 저장한 데이터 입니다.");
            } else if (response.count > 0) {
                alert(response.count+"개의 데이터를 성공적으로 저장하였습니다.");
            } else {
                alert("알 수 없는 오류가 발생했습니다.");
            }
        }
    }

    
    return (
        <>
            <Title title={services.shortTerm[serviceId].title} />
            <div className={layout.sub_content}>
                {loading ? <></> : serviceId === "status" ?
                    <DataView path='short' serviceId={serviceId} data={data} isViaData={false} />
                    :
                    <div>
                        {data.map((each, index) => {
                            return <DataView key={index} path='short' serviceId={serviceId} data={each} isViaData={false} />
                        })}
                    </div>
                }
            </div>
            <div className={layout.sub_button}>
                <ButtonLink to={`/short/${serviceId}/location/`} text="뒤로" />
                <button onClick={saveData}>저장</button>
                <ButtonLink to={`/data/short/${serviceId}/location/${nxValue}/${nyValue}?page=1`} text="저장데이터 조회" />
            </div>
        </>
    );
    
}