import { useEffect, useState } from 'react';
import api from '../../api/client';
import SaveBar from '../../components/admin/SaveBar';

export default function AdminContact() {
  const [form, setForm] = useState({ phone: '', email: '', address: '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    api.get('/content/contact-info').then((r) => setForm(r.data));
  }, []);

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const { data } = await api.put('/content/contact-info', form);
      setForm(data);
      setMessage({ type: 'success', text: 'Contact info saved.' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to save.' });
    } finally {
      setSaving(false);
    }
  };

  const field = (name, label) => (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        value={form[name] || ''}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        className="mt-1 w-full max-w-lg rounded-lg border border-slate-300 px-3 py-2 text-sm"
      />
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Contact Info</h1>
      <p className="mt-1 text-slate-600">Update details shown on the Contact page</p>
      <div className="mt-8 space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        {field('phone', 'Phone')}
        {field('email', 'Email')}
        <div>
          <label className="text-sm font-medium text-slate-700">Address</label>
          <textarea
            value={form.address || ''}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            rows={3}
            className="mt-1 w-full max-w-lg rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      </div>
      <SaveBar onSave={save} saving={saving} message={message} />
    </div>
  );
}
