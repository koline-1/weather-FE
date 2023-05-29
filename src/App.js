const { BrowserRouter: Router, Routes, Route } = require('react-router-dom');
const MainView = require('./routes/main/MainView').default;
const MidTermLocation = require('./routes/midTerm/MidTermLocation').default;
const MidTermService = require('./routes/midTerm/MidTermService').default;
const MidTermCurrent = require('./routes/midTerm/MidTermCurrent').default;
const ShortTermService = require('./routes/shortTerm/ShortTermService').default;
const ShortTermLocation = require('./routes/shortTerm/ShortTermLocation').default;
const ShortTermCurrent = require('./routes/shortTerm/ShortTermCurrent').default;
const DataPath = require('./routes/data/DataPath').default;
const DataService = require('./routes/data/DataService').default;
const DataLocation = require('./routes/data/DataLocation').default;
const DataList = require('./routes/data/DataList').default;
const DataRead = require('./routes/data/DataRead').default;
const DataListByLocationMid = require('./routes/data/DataListByLocationMid').default;
const DataListByLocationShort = require('./routes/data/DataListByLocationShort').default;

function App() {
  return (
    <Router>
      <Routes>
        {/* 메인화면 */}
        <Route path='/' element={<MainView />} />
        {/* 중기예보 */}
        <Route path='/mid/service' element={<MidTermService />} />
        <Route path='/mid/:serviceId/location' element={<MidTermLocation />} />
        <Route path='/mid/:serviceId/:locationCode' element={<MidTermCurrent />} />
        {/* 단기예보 */}
        <Route path='/short/location' element={<ShortTermLocation />} />
        <Route path='/short/service/:nxValue/:nyValue' element={<ShortTermService />} />
        <Route path='/short/:serviceId/:nxValue/:nyValue' element={<ShortTermCurrent />} />
        {/* 저장데이터조회 */}
        <Route path='/data' element={<DataPath />} />
        <Route path='/data/:path' element={<DataService />} />
        <Route path='/data/:path/:serviceId/' element={<DataList />} />
        <Route path='/data/:path/:serviceId/:dataId' element={<DataRead />} />
        <Route path='/data/:path/:serviceId/location' element={<DataLocation />} />
        <Route path='/data/:path/:serviceId/location/:locationCode' element={<DataListByLocationMid />} />
        <Route path='/data/:path/:serviceId/location/:nxValue/:nyValue' element={<DataListByLocationShort />} />
      </Routes>
    </Router>
  );
}

export default App;
