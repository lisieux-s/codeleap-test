import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './reset.css'
import './App.scss';

import {SignUp, Main} from './pages';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<div className='modal' />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/' element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
