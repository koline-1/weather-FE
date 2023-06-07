import { Routes, Route, useLocation } from 'react-router-dom';
import styles from './App.module.css';
import MainView from './routes/main/MainView';
import MidTermLocation from './routes/midTerm/MidTermLocation';
import MidTermService from './routes/midTerm/MidTermService';
import MidTermCurrent from './routes/midTerm/MidTermCurrent';
import ShortTermService from './routes/shortTerm/ShortTermService';
import ShortTermLocation from './routes/shortTerm/ShortTermLocation';
import ShortTermCurrent from './routes/shortTerm/ShortTermCurrent';
import DataPath from './routes/data/DataPath';
import DataService from './routes/data/DataService';
import DataLocation from './routes/data/DataLocation';
import DataList from './routes/data/DataList';
import DataRead from './routes/data/DataRead';
import DataUpdate from './routes/data/DataUpdate';
import DataListByLocationMid from './routes/data/DataListByLocationMid';
import DataListByLocationShort from './routes/data/DataListByLocationShort';

function App() {

  const location = useLocation();

  if (location.pathname === '/') {
    return (
      <Routes>
        {/* 메인화면 */}
        <Route path='/' element={<MainView />} />
      </Routes>
    )
  }

  return (
    <>
      <div className={styles.app_container}>
        <Routes>
          {/* 중기예보 */}
          <Route path='/mid/service' element={<MidTermService />} />
          <Route path='/mid/:serviceId/location' element={<MidTermLocation />} />
          <Route path='/mid/:serviceId/:locationCode' element={<MidTermCurrent />} />
          {/* 단기예보 */}
          <Route path='/short/service' element={<ShortTermService />} />
          <Route path='/short/:serviceId/location' element={<ShortTermLocation />} />
          <Route path='/short/:serviceId/:nxValue/:nyValue' element={<ShortTermCurrent />} />
          {/* 저장데이터조회 */}
          <Route path='/data' element={<DataPath />} />
          <Route path='/data/:path' element={<DataService />} />
          <Route path='/data/:path/:serviceId/' element={<DataList />} />
          <Route path='/data/:path/:serviceId/:dataId' element={<DataRead />} />
          <Route path='/data/:path/:serviceId/:dataId/update' element={<DataUpdate />} />
          <Route path='/data/:path/:serviceId/location' element={<DataLocation />} />
          <Route path='/data/:path/:serviceId/location/:locationCode' element={<DataListByLocationMid />} />
          <Route path='/data/:path/:serviceId/location/:nxValue/:nyValue' element={<DataListByLocationShort />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
