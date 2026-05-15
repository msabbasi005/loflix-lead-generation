import { useEffect, useState } from 'react';
import api from '../api/client';
import AnimatedSection from '../components/AnimatedSection';
import PageHeader from '../components/ui/PageHeader';
import SectionHeader from '../components/ui/SectionHeader';
import CTABanner from '../components/CTABanner';

export default function About() {
  const [about, setAbout] = useState(null);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get('/content/about'), api.get('/content/team')])
      .then(([a, t]) => {
        setAbout(a.data);
        setTeam(t.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <section className="border-b border-slate-200/80 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <PageHeader
            eyebrow="About us"
            title="Built for brands that want real growth"
            description={about?.story}
            centered={false}
          />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <AnimatedSection>
            <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-8 md:p-12">
              <span className="eyebrow">Our mission</span>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">{about?.mission}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding border-t border-slate-200/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Why choose us"
            title="Values that drive every campaign"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {(about?.values || []).map((v, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="card h-full border-l-4 border-l-blue-600 p-8">
                  <span className="font-display text-3xl font-bold text-blue-100">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Our team"
            title="Meet the people behind LeadFlow"
            description="A dedicated team of strategists, creatives, and analysts."
            centered
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <AnimatedSection key={m._id || i} delay={i * 0.08}>
                <div className="group text-center">
                  <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-2xl ring-2 ring-slate-700 transition group-hover:ring-blue-500">
                    <img
                      src={m.photo || 'https://via.placeholder.com/200'}
                      alt={m.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-5 font-display font-semibold text-white">{m.name}</h3>
                  <p className="mt-1 text-sm font-medium text-blue-400">{m.role}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
