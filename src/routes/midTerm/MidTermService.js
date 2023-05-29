import { useParams } from 'react-router-dom';

const { useEffect } = require('react');
const ServiceList = require('../../components/ServiceList').default;
const services = require('../../services.json');

export default function MidTermService() {
    const { locationCode } = useParams();

    useEffect(() => {
        document.title='기상청 중기 예보 목록';
    }, [])

    return <ServiceList path="mid" title="기상청 중기 예보 목록" services={services.midTerm} locationCode={locationCode} />
}