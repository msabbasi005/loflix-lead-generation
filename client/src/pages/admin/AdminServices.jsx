import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import api from '../../api/client';
import SaveBar from '../../components/admin/SaveBar';
import { iconNames } from '../../utils/icons';

const empty = () => ({ title: '', description: '', icon: 'Zap' });

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    api.get('/content/services').then((r) => setServices(r.data.length ? r.data : [empty()]));
  }, []);

  const update = (i, field, value) => {
    const next = [...services];
    next[i] = { ...next[i], [field]: value };
    setServices(next);
  };

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const { data } = await api.put('/content/services', {
        services: services.map(({ title, description, icon }) => ({ title, description, icon })),
      });
      setServices(data);
      setMessage({ type: 'success', text: 'Services saved.' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to save.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Services</h1>
      <p className="mt-1 text-slate-600">Manage service cards on the public site</p>

      <div className="mt-8 space-y-4">
        {services.map((s, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex justify-end">
              <button type="button" onClick={() => setServices(services.filter((_, j) => j !== i))} className="text-red-500">
                <Trash2 size={18} />
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-slate-500">Title</label>
                <input value={s.title} onChange={(e) => update(i, 'title', e.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Icon</label>
                <select value={s.icon} onChange={(e) => update(i, 'icon', e.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
                  {iconNames.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs font-medium text-slate-500">Description</label>
              <textarea value={s.description} onChange={(e) => update(i, 'description', e.target.value)} rows={3} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
            </div>
          </div>
        ))}
      </div>

      <button type="button" onClick={() => setServices([...services, empty()])} className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600">
        <Plus size={16} /> Add service
      </button>

      <SaveBar onSave={save} saving={saving} message={message} />
    </div>
  );
}
