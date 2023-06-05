import { useParams } from 'react-router-dom';
import ButtonLink from '../../components/ButtonLink';
import services from '../../json/services.json';
import layout from '../../styles/layout/Layout.module.css';
import Title from '../../components/Title';
import DataView from '../../components/DataView';
import useGet from '../../hooks/useGet';


export default function ShortTermCurrent() {

    const { serviceId, nxValue, nyValue } = useParams();
    const location = [nxValue, nyValue];
    const data = useGet('short', serviceId, location);

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
            } else if (Number(response.count) > 0) {
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
                {!data ? <></> : serviceId === "status" ?
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