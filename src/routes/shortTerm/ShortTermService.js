const { useParams } = require('react-router-dom');
const { useEffect } = require('react');
const ServiceList = require('../../components/ServiceList').default;
const services = require('../../services.json');

export default function ShortTermService() {

    const { nxValue, nyValue } = useParams();
    
    useEffect(() => {
        document.title='기상청 단기 예보 목록';
    }, [])

    return <ServiceList path="short" title="기상청 단기 예보 목록" services={services.shortTerm} nxValue={nxValue} nyValue={nyValue} />;

}