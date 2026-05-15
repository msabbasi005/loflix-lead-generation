import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import api from '../api/client';
import AnimatedSection from '../components/AnimatedSection';
import PageHeader from '../components/ui/PageHeader';
import LeadForm from '../components/LeadForm';

export default function Contact() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    api.get('/content/contact-info').then((r) => setInfo(r.data)).catch(() => {});
  }, []);

  const contactItems = info
    ? [
        { icon: Phone, label: 'Phone', value: info.phone, href: `tel:${info.phone?.replace(/\D/g, '')}` },
        { icon: Mail, label: 'Email', value: info.email, href: `mailto:${info.email}` },
        { icon: MapPin, label: 'Office', value: info.address },
        { icon: Clock, label: 'Hours', value: 'Mon–Fri, 9am–6pm EST' },
      ]
    : [];

  return (
    <>
      <section className="border-b border-slate-200/80 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <PageHeader
            eyebrow="Contact"
            title="Let's start a conversation"
            description="Have a question or ready to grow? Share your goals and we'll respond within one business day."
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
            <AnimatedSection className="lg:col-span-3">
              <div className="card-elevated">
                <h2 className="font-display text-xl font-bold text-slate-900">Send a message</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Fill out the form and our team will get back to you shortly.
                </p>
                <div className="mt-8">
                  <LeadForm />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="lg:col-span-2">
              <div className="space-y-6">
                <h2 className="font-display text-xl font-bold text-slate-900">Get in touch</h2>
                <ul className="space-y-4">
                  {contactItems.map(({ icon: Icon, label, value, href }) => (
                    <li key={label} className="flex gap-4 rounded-xl border border-slate-200/80 bg-white p-4">
                      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Icon size={20} />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="mt-0.5 block text-sm font-medium text-slate-800 hover:text-blue-600"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="mt-0.5 text-sm font-medium text-slate-800">{value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                  <iframe
                    title="Office location"
                    src="https://maps.google.com/maps?q=New+York+NY&output=embed"
                    className="h-56 w-full grayscale-[20%] transition hover:grayscale-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
