import AnimatedSection from '../AnimatedSection';

export default function PageHeader({ eyebrow, title, description, centered = true }) {
  return (
    <AnimatedSection className={centered ? 'text-center' : ''}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1 className="font-display mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      {description && (
        <p
          className={`mt-5 text-lg leading-relaxed text-slate-600 ${
            centered ? 'mx-auto max-w-2xl' : 'max-w-3xl'
          }`}
        >
          {description}
        </p>
      )}
    </AnimatedSection>
  );
}
