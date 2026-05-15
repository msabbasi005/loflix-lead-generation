import {
  Target,
  Mail,
  Search,
  Share2,
  BarChart3,
  Megaphone,
  Zap,
  TrendingUp,
  Users,
  Rocket,
  LineChart,
  Globe,
  Sparkles,
  Heart,
  Shield,
  Lightbulb,
} from 'lucide-react';

const iconMap = {
  Target,
  Mail,
  Search,
  Share2,
  BarChart3,
  Megaphone,
  Zap,
  TrendingUp,
  Users,
  Rocket,
  LineChart,
  Globe,
  Sparkles,
  Heart,
  Shield,
  Lightbulb,
};

export const getIcon = (name, props = {}) => {
  const Icon = iconMap[name] || Zap;
  return <Icon {...props} />;
};

export const iconNames = Object.keys(iconMap);
