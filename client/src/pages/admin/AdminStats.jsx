import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import api from '../../api/client';
import SaveBar from '../../components/admin/SaveBar';

const empty = () => ({ label: '', value: '' });

export default function AdminStats() {
  const [stats, setStats] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    api.get('/content/stats').then((r) => setStats(r.data.length ? r.data : [empty()]));
  }, []);

  const update = (i, field, value) => {
    const next = [...stats];
    next[i] = { ...next[i], [field]: value };
    setStats(next);
  };

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const { data } = await api.put('/content/stats', { stats });
      setStats(data);
      setMessage({ type: 'success', text: 'Stats saved.' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to save.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Stats / Infographics</h1>
      <p className="mt-1 text-slate-600">Numbers shown on the home page (e.g. 500+ Clients)</p>

      <div className="mt-8 space-y-4">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-wrap items-end gap-4 rounded-xl border border-slate-200 bg-white p-4">
            <div className="min-w-[140px] flex-1">
              <label className="text-xs text-slate-500">Label</label>
              <input
                value={s.label}
                onChange={(e) => update(i, 'label', e.target.value)}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="min-w-[100px] flex-1">
              <label className="text-xs text-slate-500">Value</label>
              <input
                value={s.value}
                onChange={(e) => update(i, 'value', e.target.value)}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                placeholder="500+"
              />
            </div>
            <button
              type="button"
              onClick={() => setStats(stats.filter((_, j) => j !== i))}
              className="pb-2 text-red-500"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setStats([...stats, empty()])}
        className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600"
      >
        <Plus size={16} /> Add stat
      </button>

      <SaveBar onSave={save} saving={saving} message={message} />
    </div>
  );
}
