const { useParams } = require('react-router-dom');
const { useEffect } = require('react');
const ServiceList = require('../../components/ServiceList').default;

export default function ShortTermService() {

    const { nxValue, nyValue } = useParams();

    const links = [
        {
            'link': `/short/expectation/${nxValue}/${nyValue}`,
            'text': '단기 예보 조회'
        },
        {
            'link': `/short/extraExpectation/${nxValue}/${nyValue}`,
            'text': '초단기 예보 조회'
        },
        {
            'link': `/short/status/${nxValue}/${nyValue}`,
            'text': '초단기 실황 조회'
        },
    ];
    
    useEffect(() => {
        document.title='기상청 단기 예보 목록';
    }, [])

    return <ServiceList title="기상청 단기 예보 목록" links={links} />;

}