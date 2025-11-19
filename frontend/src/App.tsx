import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { CarrosPage } from './pages/CarrosPage';
import { ViajesPage } from './pages/ViajesPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MainLayout } from './components/templates/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {}
          <Route path="/login" element={<LoginPage />} />

          {}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/carros" element={<CarrosPage />} />
              <Route path="/viajes" element={<ViajesPage />} />
            </Route>
          </Route>

          {}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;