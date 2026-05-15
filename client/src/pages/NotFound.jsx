import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-8xl font-bold text-slate-200">404</p>
      <h1 className="font-display mt-4 text-2xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-3 max-w-md text-slate-600">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to="/" className="btn-primary gap-2">
          <Home size={16} /> Back to Home
        </Link>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="btn-secondary gap-2"
        >
          <ArrowLeft size={16} /> Go back
        </button>
      </div>
    </div>
  );
}
