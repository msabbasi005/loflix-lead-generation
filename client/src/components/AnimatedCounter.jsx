import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

function parseValue(val) {
  const match = String(val).match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: val };
  return { num: parseInt(match[1], 10), suffix: match[2] || '' };
}

export default function AnimatedCounter({ value, duration = 2000 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { num, suffix } = parseValue(value);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || num === 0) return;
    let start = 0;
    const step = num / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) {
        setCount(num);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, num, duration]);

  if (num === 0) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
