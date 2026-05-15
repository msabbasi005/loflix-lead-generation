import { useEffect, useState } from 'react';
import api from '../../api/client';
import SaveBar from '../../components/admin/SaveBar';

export default function AdminAbout() {
  const [about, setAbout] = useState({ story: '', mission: '', values: [] });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    api.get('/content/about').then((r) => setAbout(r.data));
  }, []);

  const updateValue = (i, field, value) => {
    const values = [...(about.values || [])];
    values[i] = { ...values[i], [field]: value };
    setAbout({ ...about, values });
  };

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const { data } = await api.put('/content/about', about);
      setAbout(data);
      setMessage({ type: 'success', text: 'About content saved.' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to save.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">About Page</h1>
      <p className="mt-1 text-slate-600">Edit company story, mission, and values</p>

      <div className="mt-8 space-y-6 rounded-xl border border-slate-200 bg-white p-6">
        <div>
          <label className="text-sm font-medium text-slate-700">Company Story</label>
          <textarea
            value={about.story || ''}
            onChange={(e) => setAbout({ ...about, story: e.target.value })}
            rows={4}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Mission</label>
          <textarea
            value={about.mission || ''}
            onChange={(e) => setAbout({ ...about, mission: e.target.value })}
            rows={3}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-700">Values / Why Choose Us</p>
          {(about.values || []).map((v, i) => (
            <div key={i} className="mt-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
              <input
                value={v.title}
                onChange={(e) => updateValue(i, 'title', e.target.value)}
                placeholder="Title"
                className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
              />
              <textarea
                value={v.description}
                onChange={(e) => updateValue(i, 'description', e.target.value)}
                placeholder="Description"
                rows={2}
                className="mt-2 w-full rounded border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setAbout({
                ...about,
                values: [...(about.values || []), { title: '', description: '' }],
              })
            }
            className="mt-2 text-sm text-blue-600"
          >
            + Add value
          </button>
        </div>
      </div>

      <SaveBar onSave={save} saving={saving} message={message} />
    </div>
  );
}
