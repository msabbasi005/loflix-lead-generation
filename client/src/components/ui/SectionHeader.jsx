import AnimatedSection from '../AnimatedSection';

export default function SectionHeader({ eyebrow, title, description, centered = true }) {
  return (
    <AnimatedSection className={centered ? 'text-center' : ''}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className={`mt-3 text-slate-600 ${centered ? 'mx-auto max-w-xl' : ''}`}>{description}</p>
      )}
    </AnimatedSection>
  );
}
