import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonLink from "../../components/ButtonLink";
import services from '../../services.json';
import Region from '../../components/Region';
import layout from '../../styles/layout/Layout.module.css';
import Title from "../../components/Title";

export default function MidTermCurrent () {
    const [data, setData] = useState();
    const [keySet, setKeySet] = useState([]);
    const [loading, setLoading] = useState(true);
    const { serviceId, locationCode } = useParams();
    const title = services.midTerm[serviceId].title

    useEffect(() => {
        document.title= title;
        const getData = async() => {
            const response = await(await fetch(`http://localhost:8080/mid-term/${serviceId}/current/${locationCode}`)).json();
            setData(response);
            setKeySet(Object.keys(response));
            setLoading(false);
        }
        getData();
    }, [locationCode, serviceId, title]);

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
        if (Number(response.stnId) === 0 || response.regId === "") {
            alert("이미 저장한 데이터 입니다.");
        } else if (Number(response.stnId) > 0 || response.regId !== "") {
            alert("데이터를 성공적으로 저장하였습니다.");
        } else {
            alert("알 수 없는 오류가 발생했습니다.");
        }
    }

    return (
        <>
            <Title title={title} />
            <div className={layout.sub_content}>
                {loading ? <></> : (
                    <ul>
                        {keySet.map((key) => {
                            if (key === "id" || key === "date") {
                                return "";
                            }

                            if (key === "stnId"){
                                return <Region path="midTerm" serviceId={serviceId} code={data.stnId} />
                            }

                            if (key === "regId") {
                                return <Region path="midTerm" serviceId={serviceId} code={data.regId} />
                            }

                            return <li>{key+ ": "+ data[key]}</li>
                        })}
                    </ul>
                )}
            </div>
            <div className={layout.sub_button}>
                <ButtonLink to={"/mid/"+serviceId+"/location"} text="뒤로" />
                <button onClick={saveData}>저장</button>
            </div>
        </>
    );
}