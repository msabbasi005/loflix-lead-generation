import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Quote, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import api from '../api/client';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCounter from '../components/AnimatedCounter';
import LeadForm from '../components/LeadForm';
import SectionHeader from '../components/ui/SectionHeader';
import CTABanner from '../components/CTABanner';
import { getIcon } from '../utils/icons';

const testimonials = [
  {
    name: 'Alex Turner',
    role: 'CEO, TechStart',
    text: 'LeadFlow doubled our qualified leads in 90 days. Their team is strategic, responsive, and truly invested in our growth.',
  },
  {
    name: 'Maria Santos',
    role: 'Marketing Director, Bloom Co',
    text: 'From SEO to paid ads, they handle everything with clarity and measurable ROI. Best marketing partner we have worked with.',
  },
  {
    name: 'David Kim',
    role: 'Founder, Nexus Labs',
    text: 'The reporting alone is worth it. We finally understand which channels drive revenue, not just clicks.',
  },
];

const trustPoints = ['No long-term contracts', 'Dedicated strategist', 'Transparent reporting'];

export default function Home() {
  const [services, setServices] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    api.get('/content/services').then((r) => setServices(r.data.slice(0, 4))).catch(() => {});
    api.get('/content/stats').then((r) => setStats(r.data)).catch(() => {});
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero">
        <div className="absolute inset-0 bg-grid-hero opacity-70" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#fafbfc] to-transparent" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="eyebrow">Lead generation experts</span>
              <h1 className="font-display mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
                Turn attention into{' '}
                <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  qualified leads
                </span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                We design marketing systems that attract your ideal customers, nurture them with
                precision, and convert at scale—so you can focus on closing deals.
              </p>
              <ul className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
                {trustPoints.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="text-blue-600" size={18} />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary">
                  Get Started <ArrowRight size={16} className="ml-1" />
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Request a Quote
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="card-elevated lg:ml-auto lg:max-w-md"
            >
              <p className="text-sm font-semibold text-slate-900">Free growth consultation</p>
              <p className="mt-1 text-sm text-slate-500">We respond within 24 business hours.</p>
              <div className="mt-6">
                <LeadForm compact />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="What we do"
            title="Marketing that moves the needle"
            description="End-to-end services built for B2B growth and measurable pipeline impact."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <AnimatedSection key={s._id || i} delay={i * 0.08}>
                <div className="group card h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/25 transition group-hover:scale-105">
                    {getIcon(s.icon, { size: 22 })}
                  </div>
                  <h3 className="mt-5 font-display font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {s.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Explore all services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      {stats.length > 0 && (
        <section className="relative overflow-hidden bg-slate-900 py-20">
          <div className="absolute inset-0 bg-grid opacity-10" aria-hidden />
          <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
            {stats.map((s, i) => (
              <AnimatedSection key={s._id || i} delay={i * 0.08} className="text-center">
                <p className="font-display text-4xl font-bold text-white sm:text-5xl">
                  <span className="text-blue-400">
                    <AnimatedCounter value={s.value} />
                  </span>
                </p>
                <p className="mt-2 text-sm font-medium uppercase tracking-wide text-slate-400">
                  {s.label}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Testimonials"
            title="Trusted by growth-focused teams"
            description="See why companies choose LeadFlow as their long-term marketing partner."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1}>
                <div className="card-elevated flex h-full flex-col">
                  <Quote className="text-blue-200" size={36} strokeWidth={1.5} />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-5 flex gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <div className="mt-5 border-t border-slate-100 pt-5">
                    <p className="font-semibold text-slate-900">{t.name}</p>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
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
