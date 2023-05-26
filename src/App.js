const { BrowserRouter: Router, Routes, Route } = require('react-router-dom');
const MainView = require('./routes/main/MainView').default;
const MidTermLocation = require('./routes/midTerm/MidTermLocation').default;
const MidTermService = require('./routes/midTerm/MidTermService').default;
const MidTermCurrent = require('./routes/midTerm/MidTermCurrent').default;
const MidTermData = require('./routes/data/MidTermData').default;
const MidTermDataService = require('./routes/data/MidTermDataService').default;
const ShortTermService = require('./routes/shortTerm/ShortTermService').default;
const ShortTermLocation = require('./routes/shortTerm/ShortTermLocation').default;
const ShortTermCurrent = require('./routes/shortTerm/ShortTermCurrent').default;
const ShortTermData = require('./routes/data/ShortTermData').default;
const DataMain = require('./routes/data/DataMain').default;
const DataPath = require('./routes/data/DataPath').default

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainView />} />
        <Route path='/mid/service' element={<MidTermService />} />
        <Route path='/mid/:serviceId/location' element={<MidTermLocation />} />
        <Route path='/mid/:serviceId/:location/current' element={<MidTermCurrent />} />
        <Route path='/mid/:serviceId/:dataId' element={<MidTermData />} />
        <Route path='/short/location' element={<ShortTermLocation />} />
        <Route path='/short/service/:nxValue/:nyValue' element={<ShortTermService />} />
        <Route path='/short/:serviceId/:nxValue/:nyValue' element={<ShortTermCurrent />} />
        <Route path='/short/:serviceId/:dataId' element={<ShortTermData />} />
        <Route path='/data' element={<DataMain />} />
        <Route path='/data/:path' element={<DataPath />} />
        <Route path='/data/:path/:serviceId/' element={<MidTermDataService />} />
      </Routes>
    </Router>
  );
}

export default App;
