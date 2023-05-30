import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ButtonLink from '../../components/ButtonLink';
import layout from '../../styles/layout/Layout.module.css';
import Title from '../../components/Title';

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

    useEffect(() => {
        document.title='기상청 단기 예보 위치 설정';
    }, [])

    return (
        <>
            <Title title={'위치 설정'} />
            <div className={layout.sub_content}>
                {locations.map((location, index) => {
                    return (
                        <div>
                            <Link key={index} to={`/short/service/${location.nx}/${location.ny}`}>{location.city} {location.county} {location.town}</Link>
                        </div>
                    )
                })}
            </div>
            <div className={layout.sub_button}>
                <ButtonLink to="/" text="뒤로" />
            </div>
        </>
    );
}