import { Link } from 'react-router-dom';
import { Sparkles, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Sparkles size={18} />
              </span>
              <span className="font-display text-lg font-bold text-white">
                Lead<span className="text-blue-400">Flow</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Premium lead generation and digital marketing for brands that want measurable growth—not
              vanity metrics.
            </p>
            <a
              href="mailto:hello@leadflow.com"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300"
            >
              <Mail size={16} />
              hello@leadflow.com
            </a>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Company</p>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                { to: '/services', label: 'Services' },
                { to: '/pricing', label: 'Pricing' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex items-center gap-1 transition hover:text-white"
                  >
                    {item.label}
                    <ArrowUpRight size={14} className="opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Start growing
            </p>
            <p className="mt-4 text-sm text-slate-400">
              Tell us about your goals—we typically respond within one business day.
            </p>
            <Link
              to="/contact"
              className="btn-primary mt-5 inline-flex !text-sm"
            >
              Request a Quote
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} LeadFlow. All rights reserved.
          </p>
          <Link to="/admin/login" className="text-xs text-slate-500 transition hover:text-slate-300">
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
