import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';

export default function Dashboard() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    api.get('/leads').then((r) => setLeads(r.data)).catch(() => {});
  }, []);

  const recent = leads.slice(0, 5);

  const shortcuts = [
    { to: '/admin/leads', label: 'Manage Leads' },
    { to: '/admin/pricing', label: 'Edit Pricing' },
    { to: '/admin/services', label: 'Edit Services' },
    { to: '/admin/contact', label: 'Contact Info' },
    { to: '/admin/stats', label: 'Edit Stats' },
    { to: '/admin/team', label: 'Edit Team' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-slate-600">Overview of your lead generation site</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Leads</p>
          <p className="mt-2 text-4xl font-bold text-blue-600">{leads.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Contacted</p>
          <p className="mt-2 text-4xl font-bold text-slate-900">
            {leads.filter((l) => l.contacted).length}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">New (uncontacted)</p>
          <p className="mt-2 text-4xl font-bold text-slate-900">
            {leads.filter((l) => !l.contacted).length}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-semibold text-slate-900">Quick Edit</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {shortcuts.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="font-semibold text-slate-900">Recent Leads</h2>
          <Link to="/admin/leads" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No leads yet
                  </td>
                </tr>
              ) : (
                recent.map((l) => (
                  <tr key={l._id} className="border-t border-slate-100">
                    <td className="px-6 py-3">{l.name}</td>
                    <td className="px-6 py-3">{l.email}</td>
                    <td className="px-6 py-3">{new Date(l.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          l.contacted ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {l.contacted ? 'Contacted' : 'New'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
