const { BrowserRouter: Router, Routes, Route } = require('react-router-dom');
const MainView = require('./routes/main/MainView').default;
const MidTermLocation = require('./routes/midTerm/MidTermLocation').default;
const MidTermService = require('./routes/midTerm/MidTermService').default;
const MidTermCurrent = require('./routes/midTerm/MidTermCurrent').default;
const ShortTermService = require('./routes/shortTerm/ShortTermService').default;
const ShortTermLocation = require('./routes/shortTerm/ShortTermLocation').default;
const ShortTermCurrent = require('./routes/shortTerm/ShortTermCurrent').default;

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainView />} />
        <Route path='/mid/service' element={<MidTermService />} />
        <Route path='/mid/:serviceId/location' element={<MidTermLocation />} />
        <Route path='/mid/:serviceId/:location/current' element={<MidTermCurrent />} />
        <Route path='/short/location' element={<ShortTermLocation />} />
        <Route path='/short/service/:nxValue/:nyValue' element={<ShortTermService />} />
        <Route path='/short/:serviceId/:nxValue/:nyValue' element={<ShortTermCurrent />} />
      </Routes>
    </Router>
  );
}

export default App;
