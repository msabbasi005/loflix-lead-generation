import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import api from '../../api/client';
import SaveBar from '../../components/admin/SaveBar';

const empty = () => ({ name: '', role: '', photo: '' });

export default function AdminTeam() {
  const [members, setMembers] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    api.get('/content/team').then((r) => setMembers(r.data.length ? r.data : [empty()]));
  }, []);

  const update = (i, field, value) => {
    const next = [...members];
    next[i] = { ...next[i], [field]: value };
    setMembers(next);
  };

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const { data } = await api.put('/content/team', { members });
      setMembers(data);
      setMessage({ type: 'success', text: 'Team saved.' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to save.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Team Members</h1>
      <p className="mt-1 text-slate-600">Manage team cards on the About page</p>

      <div className="mt-8 space-y-4">
        {members.map((m, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-4 flex justify-end">
              <button type="button" onClick={() => setMembers(members.filter((_, j) => j !== i))} className="text-red-500">
                <Trash2 size={18} />
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs text-slate-500">Name</label>
                <input value={m.name} onChange={(e) => update(i, 'name', e.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs text-slate-500">Role</label>
                <input value={m.role} onChange={(e) => update(i, 'role', e.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs text-slate-500">Photo URL</label>
              <input value={m.photo} onChange={(e) => update(i, 'photo', e.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" placeholder="https://..." />
            </div>
          </div>
        ))}
      </div>

      <button type="button" onClick={() => setMembers([...members, empty()])} className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600">
        <Plus size={16} /> Add member
      </button>

      <SaveBar onSave={save} saving={saving} message={message} />
    </div>
  );
}
