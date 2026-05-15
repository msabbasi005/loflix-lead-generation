import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import api from '../api/client';
import AnimatedSection from '../components/AnimatedSection';
import PageHeader from '../components/ui/PageHeader';
import CTABanner from '../components/CTABanner';

export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/content/pricing')
      .then((r) => setPlans(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="border-b border-slate-200/80 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <PageHeader
            eyebrow="Pricing"
            title="Plans that scale with you"
            description="Transparent packages with no hidden fees. Upgrade or adjust as your business grows."
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3 lg:items-stretch">
              {plans.map((plan, i) => (
                <AnimatedSection key={plan._id || i} delay={i * 0.08} className="h-full">
                  <div
                    className={`relative flex h-full flex-col rounded-2xl p-8 transition ${
                      plan.highlighted
                        ? 'border-2 border-blue-600 bg-white shadow-xl shadow-blue-600/10 ring-1 ring-blue-600/20 lg:scale-[1.02]'
                        : 'card border-slate-200/80 p-8'
                    }`}
                  >
                    {plan.highlighted && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                        Most Popular
                      </span>
                    )}
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      {plan.tier}
                    </p>
                    <p className="font-display mt-2 text-4xl font-bold text-slate-900">
                      {plan.price}
                    </p>
                    <ul className="mt-8 flex-1 space-y-3.5 border-t border-slate-100 pt-8">
                      {(plan.features || []).map((f, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-slate-600">
                          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-50">
                            <Check className="text-blue-600" size={14} strokeWidth={2.5} />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/contact"
                      className={`mt-8 block rounded-xl py-3.5 text-center text-sm font-semibold transition ${
                        plan.highlighted
                          ? 'btn-primary w-full'
                          : 'border border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      Get Started
                    </Link>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
