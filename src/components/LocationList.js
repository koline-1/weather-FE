import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import services from '../services.json';
import shortTermLocations from '../shortTermLocations.json';
import styles from '../styles/common/Common.module.css';

export default function LocationList({ path, serviceId, isViaData }) {

    const [groups, setGroups] = useState();
    let group = [];
    useEffect(() => {
        const mock = path === 'mid' ? Object.keys(services.midTerm[serviceId].locations) : shortTermLocations;
        const length = mock.length;
        const denom = Math.floor(length/5);
        const div = length%5;

        let tmpGroup = new Array(div === 0 ? denom:denom+1);
        
        for (let i = 0; i < tmpGroup.length; i++) {
            if (i === tmpGroup.length-1) {
                tmpGroup[i] = new Array(div);
            } else {
                tmpGroup[i] = new Array(5)
            }
        }

        [].forEach.call(mock, (each, index) => {
            group.push(each);
            if (index%5===4 || index === mock.length-1) {
                tmpGroup[Math.ceil((index+1)/5)-1] = group;
                group = []
            }
        })
        setGroups(tmpGroup);
    }, []);

    return (
        <>
            {groups === undefined ? <></> : (
                <div className={styles.tabs_vertical}>
                    {groups.map((each, index) => {
                        return (
                            <div key={index}>
                                {each.map((element, idx) => {
                                    return (
                                        <Link 
                                            key={`${index}_${idx}`} 
                                            to={((isViaData ? '/data' : '') + `/${path}/${serviceId}`) + (isViaData ? '/location' : '')
                                                + (path === 'mid' ? `/${element}` : `/${element.nxValue}/${element.nyValue}`)} 
                                        >
                                            {path === 'mid' ? services.midTerm[serviceId].locations[element] : element.region}
                                        </Link>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            )}
        </>
    );
}

LocationList.propTypes = {
    path: PropTypes.string.isRequired,
    serviceId: PropTypes.string.isRequired,
    isViaData: PropTypes.bool.isRequired
}