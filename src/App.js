import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './reset.css'
import './App.scss';

import { SignUp, Main } from './pages';
import { UserProvider } from './contexts/userContext';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<div className='modal' />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/' element={<Main />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
