import React from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme, type ThemePreference } from '../theme';

const LABELS: Record<ThemePreference, string> = {
  system: 'Theme: follows system setting',
  light: 'Theme: light',
  dark: 'Theme: dark',
};

const ICONS: Record<ThemePreference, React.ReactNode> = {
  system: <Monitor size={17} aria-hidden />,
  light: <Sun size={17} aria-hidden />,
  dark: <Moon size={17} aria-hidden />,
};

/** Cycles system → light → dark. The choice is saved in localStorage when it is not "system". */
export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { preference, cycle } = useTheme();
  return (
    <button
      type="button"
      onClick={cycle}
      title={`${LABELS[preference]} (click to change)`}
      aria-label={`${LABELS[preference]}. Activate to change.`}
      className={`inline-flex items-center justify-center rounded-sm p-2 text-ink-700 hover:bg-ink-100 hover:text-ink-900 focus:outline-none focus:ring-2 focus:ring-ink-400 transition-colors ${className}`}
    >
      {ICONS[preference]}
    </button>
  );
};
