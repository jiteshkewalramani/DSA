import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2.5 rounded-lg bg-slate-700 dark:bg-slate-700 hover:bg-slate-600 dark:hover:bg-slate-600 
                 border border-slate-600 dark:border-slate-600 transition-all duration-300 
                 shadow-md hover:shadow-lg group"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <div className="relative w-5 h-5">
                {/* Sun Icon */}
                <Sun
                    size={20}
                    className={`absolute inset-0 text-yellow-400 transition-all duration-300 transform
            ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
                />
                {/* Moon Icon */}
                <Moon
                    size={20}
                    className={`absolute inset-0 text-blue-300 transition-all duration-300 transform
            ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}
                />
            </div>
        </button>
    );
}
