const { useEffect, useState } = require('react');
const { useParams } = require('react-router-dom');
const ButtonLink = require('../../components/ButtonLink').default;


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
            {loading ? <></> : serviceId === "status" ?
                <ul>
                    {keySet.map((key) => {
                        if (key === "id" || key === "date") {
                            return <></>;
                        }
                        return <li key={`${key}`}>{key+ ": "+ data[key]}</li>
                    })}
                </ul>
                :
                <div>
                    {data.map((each, index) => {
                        return <div key={index}>
                            <ul key={index}>
                                {keySet.map((key) => {
                                    if (key === "id" || key === "date") {
                                        return <></>;
                                    }
                                    return <li key={`${index}_${key}`}>{key+ ": "+ each[key]}</li>
                                })}
                            </ul>
                        </div>
                    })}
                </div>
            }
            <ButtonLink to={`/short/service/${nxValue}/${nyValue}`} text="뒤로" />
            <button onClick={saveData}>저장</button>
        </>
    );
    
}