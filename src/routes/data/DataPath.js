const { Link, useParams } = require('react-router-dom')
const ButtonLink = require('../../components/ButtonLink').default;
const services = require('../../services.json');

export default function DataPath() {
    console.log(services.midTerm);

    const midKeySet = Object.keys(services.midTerm);
    const shortKeySet = Object.keys(services.shortTerm);

    const { path } = useParams();

    return (
        <>
            {path === "mid" ? (
                <div>
                    {midKeySet.map((key) => {
                        return <Link to={`/data/mid/${key}`}>{services.midTerm[key].title}</Link>
                    })}
                </div>
            ):(
                <div>
                    {shortKeySet.map((key) => {
                        return <Link to={`/data/mid/${key}`}>{services.shortTerm[key].title}</Link>
                    })}
                </div>
            )}
            <ButtonLink to='/data' text={"뒤로"} />
        </>
    )
}