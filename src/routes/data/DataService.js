import { Link, useParams } from 'react-router-dom';
import Title from '../../components/Title';
import ButtonLink from '../../components/ButtonLink';
import services from '../../services.json';
import layout from '../../styles/layout/Layout.module.css';
import styles from '../../styles/common/Common.module.css';
import { useEffect } from 'react';

export default function DataService() {
    
    const { path } = useParams();

    const title = path === 'mid' ? '중기 예보 저장 데이터 조회' : '단기 예보 저장 데이터 조회';

    useEffect(() => {
        document.title = title;
    }, [title])

    const midKeySet = Object.keys(services.midTerm);
    const shortKeySet = Object.keys(services.shortTerm);

    return (
        <>
            <Title title={title} />
            <div className={layout.sub_content}>
                {path === "mid" ? (
                    <div className={styles.tabs}>
                        {midKeySet.map((key, index) => {
                            return <Link key={index} to={`/data/mid/${key}?page=1`}>{services.midTerm[key].title}</Link>
                        })}
                    </div>
                ):(
                    <div className={styles.tabs}>
                        {shortKeySet.map((key, index) => {
                            return <Link key={index} to={`/data/short/${key}?page=1`}>{services.shortTerm[key].title}</Link>
                        })}
                    </div>
                )}
            </div>
            <div className={layout.sub_button}>
                <ButtonLink to='/data' text={"뒤로"} />
            </div>
        </>
    )
}