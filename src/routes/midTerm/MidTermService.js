const { useEffect } = require('react');
const ServiceList = require('../../components/ServiceList').default;

const links = [
    {
        'link': '/mid/expectation/location',
        'text': '중기 전망 조회'
    },
    {
        'link': '/mid/ocean/location',
        'text': '중기 해상 예보 조회'
    },
    {
        'link': '/mid/land/location',
        'text': '중기 육상 예보 조회'
    },
    {
        'link': '/mid/temperature/location',
        'text': '중기 기온 조회'
    },
]

export default function MidTermService() {

    useEffect(() => {
        document.title='기상청 중기 예보 목록';
    }, [])

    return <ServiceList title="기상청 중기 예보 목록" links={links} />
}