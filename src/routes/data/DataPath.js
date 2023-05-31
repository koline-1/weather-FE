import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import ButtonLink from '../../components/ButtonLink';
import layout from '../../styles/layout/Layout.module.css';
import Title from '../../components/Title';
import styles from '../../styles/common/Common.module.css';

export default function DataPath() {
    useEffect(() => {
        document.title = '저장 데이터 조회';
    }, [])

    return (
        <>
            <Title title='저장 데이터 조회' />
            <div className={layout.sub_content}>
                <div className={styles.tabs}>
                    <Link to="/data/mid" >중기 예보 저장 데이터 조회</Link>
                    <Link to="/data/short" >단기 예보 저장 데이터 조회</Link>
                </div>
            </div>
            <div className={layout.sub_button}>
                <ButtonLink to={"/"} text={"뒤로"} />
            </div>
        </>
    );
}