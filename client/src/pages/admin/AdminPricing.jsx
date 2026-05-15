import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import api from '../../api/client';
import SaveBar from '../../components/admin/SaveBar';

const emptyPlan = () => ({ tier: '', price: '', features: [''], highlighted: false });

export default function AdminPricing() {
  const [plans, setPlans] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    api.get('/content/pricing').then((r) => setPlans(r.data.length ? r.data : [emptyPlan()]));
  }, []);

  const updatePlan = (i, field, value) => {
    const next = [...plans];
    next[i] = { ...next[i], [field]: value };
    setPlans(next);
  };

  const updateFeature = (pi, fi, value) => {
    const next = [...plans];
    const features = [...(next[pi].features || [])];
    features[fi] = value;
    next[pi] = { ...next[pi], features };
    setPlans(next);
  };

  const addFeature = (pi) => {
    const next = [...plans];
    next[pi] = { ...next[pi], features: [...(next[pi].features || []), ''] };
    setPlans(next);
  };

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const payload = plans.map(({ tier, price, features, highlighted }) => ({
        tier,
        price,
        features: features.filter(Boolean),
        highlighted,
      }));
      const { data } = await api.put('/content/pricing', { plans: payload });
      setPlans(data);
      setMessage({ type: 'success', text: 'Pricing saved.' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to save.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Pricing</h1>
      <p className="mt-1 text-slate-600">Edit pricing tiers shown on the public site</p>

      <div className="mt-8 space-y-6">
        {plans.map((plan, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-slate-500">Tier name</label>
                <input
                  value={plan.tier}
                  onChange={(e) => updatePlan(i, 'tier', e.target.value)}
                  className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Price</label>
                <input
                  value={plan.price}
                  onChange={(e) => updatePlan(i, 'price', e.target.value)}
                  className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <label className="mt-4 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={plan.highlighted}
                onChange={(e) => updatePlan(i, 'highlighted', e.target.checked)}
              />
              Most Popular badge
            </label>
            <p className="mt-4 text-xs font-medium text-slate-500">Features</p>
            {(plan.features || []).map((f, fi) => (
              <input
                key={fi}
                value={f}
                onChange={(e) => updateFeature(i, fi, e.target.value)}
                className="mt-2 w-full rounded border border-slate-300 px-3 py-2 text-sm"
              />
            ))}
            <button type="button" onClick={() => addFeature(i)} className="mt-2 text-sm text-blue-600">
              + Add feature
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setPlans([...plans, emptyPlan()])}
        className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600"
      >
        <Plus size={16} /> Add plan
      </button>

      <SaveBar onSave={save} saving={saving} message={message} />
    </div>
  );
}
