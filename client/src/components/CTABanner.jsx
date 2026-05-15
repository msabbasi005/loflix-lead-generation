import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';

export default function CTABanner() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-14 text-center sm:px-16 sm:py-16">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.15]" aria-hidden />
            <div className="relative">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Ready to grow your pipeline?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-slate-300">
                Book a free strategy call and see how we can turn your marketing into a predictable
                lead engine.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn-primary">
                  Get Started Today
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
