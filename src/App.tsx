import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { FullCheckResultPage } from './pages/FullCheckResultPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ScanResultPage } from './pages/ScanResultPage';
import { ServiceDetailsPage } from './pages/ServiceDetailsPage';
import { VerifyFormPage } from './pages/VerifyFormPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<VerifyFormPage />} />
          <Route path="/verify/scan/:token" element={<ScanResultPage />} />
          <Route path="/verify/result/:token" element={<FullCheckResultPage />} />
          <Route path="/service-details" element={<ServiceDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
