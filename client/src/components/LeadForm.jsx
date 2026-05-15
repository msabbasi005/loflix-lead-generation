import { useState } from 'react';
import { Send } from 'lucide-react';
import api from '../api/client';

const initial = { name: '', email: '', phone: '', company: '', message: '' };

export default function LeadForm({ compact = false, onSuccess }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      await api.post('/leads', form);
      setForm(initial);
      setStatus('success');
      onSuccess?.();
    } catch {
      setStatus('error');
    }
  };

  const field = (name, label, type = 'text', rows) => (
    <div key={name}>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      {rows ? (
        <textarea
          rows={rows}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className="input-field resize-none"
        />
      ) : (
        <input
          type={type}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className="input-field"
        />
      )}
      {errors[name] && <p className="mt-1.5 text-xs font-medium text-red-600">{errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${compact ? '' : 'max-w-lg'}`}>
      <div className={compact ? 'grid gap-5 sm:grid-cols-2' : 'space-y-5'}>
        {field('name', 'Full name *')}
        {field('email', 'Work email *', 'email')}
        {field('phone', 'Phone number')}
        {field('company', 'Company')}
      </div>
      {field('message', 'How can we help?', 'text', 4)}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full gap-2 sm:w-auto"
      >
        {status === 'loading' ? 'Sending...' : (
          <>
            Submit inquiry <Send size={16} />
          </>
        )}
      </button>
      {status === 'success' && (
        <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          Thank you! We&apos;ll be in touch within 24 hours.
        </p>
      )}
      {status === 'error' && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
