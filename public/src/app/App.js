import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { EventDetails } from '../pages/EventDetails';

export function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/eventos/:id' element={<EventDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

/* export App; */
