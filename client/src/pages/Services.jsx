import { useEffect, useState } from 'react';
import api from '../api/client';
import AnimatedSection from '../components/AnimatedSection';
import PageHeader from '../components/ui/PageHeader';
import CTABanner from '../components/CTABanner';
import { getIcon } from '../utils/icons';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/content/services')
      .then((r) => setServices(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="border-b border-slate-200/80 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <PageHeader
            eyebrow="Services"
            title="What we offer"
            description="Full-stack marketing services designed to attract, engage, and convert your ideal customers at every stage of the funnel."
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <AnimatedSection key={s._id || i} delay={i * 0.06}>
                  <article className="group card h-full p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-lg transition group-hover:from-blue-600 group-hover:to-blue-500 group-hover:shadow-blue-600/25">
                      {getIcon(s.icon, { size: 26 })}
                    </div>
                    <h2 className="font-display mt-6 text-xl font-bold text-slate-900">{s.title}</h2>
                    <p className="mt-3 leading-relaxed text-slate-600">{s.description}</p>
                  </article>
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
