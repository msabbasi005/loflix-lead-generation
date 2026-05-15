import { useEffect, useState } from 'react';
import { Search, Download, Trash2, Check } from 'lucide-react';
import api from '../../api/client';
import { exportLeadsToCsv } from '../../utils/exportCsv';

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const fetchLeads = () => {
    const params = {};
    if (search) params.search = search;
    if (from) params.from = from;
    if (to) params.to = to;
    api.get('/leads', { params }).then((r) => setLeads(r.data)).catch(() => {});
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLeads();
  };

  const markContacted = async (id) => {
    await api.patch(`/leads/${id}`);
    fetchLeads();
  };

  const deleteLead = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    await api.delete(`/leads/${id}`);
    fetchLeads();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Lead Management</h1>
          <p className="mt-1 text-slate-600">{leads.length} leads total</p>
        </div>
        <button
          type="button"
          onClick={() => exportLeadsToCsv(leads)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      <form onSubmit={handleSearch} className="mt-6 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-3 text-sm"
          />
        </div>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
          Filter
        </button>
      </form>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Message</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l._id} className="border-t border-slate-100">
                <td className="px-4 py-3">{l.name}</td>
                <td className="px-4 py-3">{l.email}</td>
                <td className="px-4 py-3">{l.phone || '—'}</td>
                <td className="px-4 py-3">{l.company || '—'}</td>
                <td className="max-w-xs truncate px-4 py-3">{l.message || '—'}</td>
                <td className="px-4 py-3 whitespace-nowrap">{new Date(l.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {!l.contacted && (
                      <button
                        type="button"
                        onClick={() => markContacted(l._id)}
                        title="Mark contacted"
                        className="rounded p-1 text-green-600 hover:bg-green-50"
                      >
                        <Check size={18} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => deleteLead(l._id)}
                      title="Delete"
                      className="rounded p-1 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
