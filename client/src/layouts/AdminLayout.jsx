import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, DollarSign, Briefcase, Phone, BarChart2, UserCircle, FileText, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const nav = [
  { to: '/admin', end: true, icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/leads', icon: Users, label: 'Leads' },
  { to: '/admin/pricing', icon: DollarSign, label: 'Pricing' },
  { to: '/admin/services', icon: Briefcase, label: 'Services' },
  { to: '/admin/contact', icon: Phone, label: 'Contact Info' },
  { to: '/admin/stats', icon: BarChart2, label: 'Stats' },
  { to: '/admin/team', icon: UserCircle, label: 'Team' },
  { to: '/admin/about', icon: FileText, label: 'About' },
];

export default function AdminLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-slate-200 bg-slate-900 text-white lg:flex">
        <div className="border-b border-slate-700 px-6 py-5">
          <p className="text-lg font-bold">
            Lead<span className="text-blue-400">Flow</span>
          </p>
          <p className="mt-1 text-xs text-slate-400">Admin Portal</p>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {nav.map(({ to, end, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-slate-700 p-4">
          <p className="truncate text-xs text-slate-400">{user?.email}</p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-2 flex items-center gap-2 text-sm text-slate-300 hover:text-white"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <p className="font-bold text-slate-900">Admin</p>
          <button type="button" onClick={handleLogout} className="text-sm text-slate-600">
            Logout
          </button>
        </header>
        <div className="overflow-x-auto border-b border-slate-200 bg-white lg:hidden">
          <nav className="flex gap-2 px-4 py-2">
            {nav.map(({ to, end, label }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
