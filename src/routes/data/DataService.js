const { Link, useParams } = require('react-router-dom')
const ButtonLink = require('../../components/ButtonLink').default;
const services = require('../../services.json');

export default function DataService() {

    const { path } = useParams();

    const midKeySet = Object.keys(services.midTerm);
    const shortKeySet = Object.keys(services.shortTerm);

    return (
        <>
            {path === "mid" ? (
                <div>
                    {midKeySet.map((key, index) => {
                        return <div key={index}><Link to={`/data/mid/${key}?page=1`}>{services.midTerm[key].title}</Link></div>
                    })}
                </div>
            ):(
                <div>
                    {shortKeySet.map((key, index) => {
                        return <div key={index}><Link to={`/data/short/${key}?page=1`}>{services.shortTerm[key].title}</Link></div>
                    })}
                </div>
            )}
            <ButtonLink to='/data' text={"뒤로"} />
        </>
    )
}