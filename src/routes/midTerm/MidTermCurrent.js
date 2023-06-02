import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonLink from "../../components/ButtonLink";
import services from '../../services.json';
import Region from '../../components/Region';
import layout from '../../styles/layout/Layout.module.css';
import Title from "../../components/Title";
import DataView from "../../components/DataView";

export default function MidTermCurrent () {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [keySet, setKeySet] = useState([]);
    const { serviceId, location } = useParams();

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

        const getData = async() => {
            const response = await(await fetch(`http://localhost:8080/mid-term/${serviceId}/current?location=${location}`)).json();
            setData(response);
            setKeySet(Object.keys(response));
            setLoading(false);
        }

        getData();
    }, [location, serviceId]);

    const saveData = async() => {
        const response = await (await fetch(`http://localhost:8080/mid-term/${serviceId}/current`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
              data : data
            }),
        })).json()
        .catch((error) => console.log("error:", error));
        if (Number(response.stnId) > 0 || response.regId !== "") {
            alert("데이터를 성공적으로 저장하였습니다.");
        } else if (Number(response.stnId) === 0 || response.regId === "") {
            alert("이미 저장한 데이터 입니다.");
        } else {
            alert("알 수 없는 오류가 발생했습니다.");
        }
    }

    return (
        <>
            <Title title={services.midTerm[serviceId].title} />
            <div className={layout.sub_content}>
                {loading ? <></> : (
                    <DataView path='mid' serviceId={serviceId} data={data} isViaData={false} />
                )}
            </div>
            <div className={layout.sub_button}>
                <ButtonLink to={"/mid/"+serviceId+"/location"} text="뒤로" />
                <button onClick={saveData}>저장</button>
                <ButtonLink to={`/data/mid/${serviceId}/location/${locationCode}?page=1`} text="저장데이터 조회" />
            </div>
        </>
    );
}