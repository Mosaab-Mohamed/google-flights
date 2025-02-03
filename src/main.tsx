import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from '@components/Layout';
import Flights from '@pages/Flights';
import Hotels from '@pages/Hotels';
import Explore from '@pages/Explore';
import Rentals from '@pages/Rentals';


import urls from '@utils/urls';
import "@styles/global.scss";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path={urls.flights} element={<Flights />} />
        <Route path={urls.hotels} element={<Hotels />} />
        <Route path={urls.explore} element={<Explore />} />
        <Route path={urls.rentals} element={<Rentals />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
