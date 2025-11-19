

import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../atoms/Button';
import { Car, MapPin, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../utils/cn';

export const MainLayout = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {}
      <nav className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {}
            <Link
              to="/carros"
              className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-80 transition-opacity"
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                <Car className="w-6 h-6 text-primary" />
              </div>
              <span className="hidden sm:inline">TransportApp</span>
            </Link>

            {}
            <div className="hidden md:flex items-center gap-1">
              <NavLink
                to="/carros"
                icon={<Car className="w-4 h-4" />}
                label="Carros"
                isActive={isActive('/carros')}
              />
              <NavLink
                to="/viajes"
                icon={<MapPin className="w-4 h-4" />}
                label="Viajes"
                isActive={isActive('/viajes')}
              />
            </div>

            {}
            <div className="hidden md:flex">
              <Button
                onClick={logout}
                variant="destructive"
                size="sm"
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </Button>
            </div>

            {}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2 animate-slide-down">
              <MobileNavLink
                to="/carros"
                icon={<Car className="w-4 h-4" />}
                label="Carros"
                isActive={isActive('/carros')}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <MobileNavLink
                to="/viajes"
                icon={<MapPin className="w-4 h-4" />}
                label="Viajes"
                isActive={isActive('/viajes')}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <Button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                variant="destructive"
                size="sm"
                fullWidth
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </Button>
            </div>
          )}
        </div>
      </nav>

      {}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {}
      <footer className="border-t border-border bg-card py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 TransportApp. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavLink = ({ to, icon, label, isActive }: NavLinkProps) => (
  <Link
    to={to}
    className={cn(
      'flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium',
      isActive
        ? 'bg-primary/10 text-primary'
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    )}
  >
    {icon}
    {label}
  </Link>
);

interface MobileNavLinkProps extends NavLinkProps {
  onClick?: () => void;
}

const MobileNavLink = ({
  to,
  icon,
  label,
  isActive,
  onClick,
}: MobileNavLinkProps) => (
  <Link
    to={to}
    onClick={onClick}
    className={cn(
      'flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium w-full',
      isActive
        ? 'bg-primary/10 text-primary'
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    )}
  >
    {icon}
    {label}
  </Link>
);