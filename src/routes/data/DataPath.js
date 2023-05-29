const { Link } = require('react-router-dom');
const ButtonLink = require('../../components/ButtonLink').default;

export default function DataPath() {

    return (
        <>
            <div>
                <Link to="/data/mid" >중기 예보 저장 데이터 조회</Link>
                <Link to="/data/short" >단기 예보 저장 데이터 조회</Link>
            </div>
            <ButtonLink to={"/"} text={"뒤로"} />
        </>
    );
}