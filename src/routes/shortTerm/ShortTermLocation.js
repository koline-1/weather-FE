const { useEffect, useState } = require('react');
const ButtonLink = require('../../components/ButtonLink').default;
const styles = require('../../styles/shortTerm/Location.module.css').default;

const locations = [
    {
        "city": "수원시",
        "county": "ㅇㅇ구",
        "town": "ㅇㅇ동",
        "nx": "61",
        "ny": "120"
    },
    {
        "city": "부산시",
        "county": "ㅇㅇ구",
        "town": "ㅇㅇ동",
        "nx": "55",
        "ny": "127"
    }
];

export default function ShortTermLocation() {

    const [position, setPosition] = useState({nxValue: "", nyValue: ""})

    useEffect(() => {
        document.title='기상청 단기 예보 위치 설정';
    }, [])

    const selectLocation = (event) => {
        if (event.target.getAttribute("nxvalue") === position.nxValue && event.target.getAttribute("nyvalue") === position.nyValue) {
            setPosition({nxValue: "", nyValue: ""});
        } else {
            setPosition({nxValue: event.target.getAttribute("nxvalue"), nyValue: event.target.getAttribute("nyvalue")})
        }
    }

    const positionNullCheck = (event) => {
        if (position.nxValue === "" || position.nyValue === "") {
            event.preventDefault();
            alert("위치를 선택하여 주세요.");
        }
    }

    return (
        <>
            <Title title={'단기 예보 위치 설정'} />
            <div className={layout.sub_content}>
                <LocationList path='short' serviceId={serviceId} isViaData={false} />
            </div>
            <ButtonLink to={`/short/service/${position.nxValue}/${position.nyValue}`} text="조회" onclick={positionNullCheck} />
            <ButtonLink to="/" text="뒤로" />
        </>
    );
}