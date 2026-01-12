import { Link } from 'react-router-dom';
import SEOHead from '../SEO/SEOHead';
import { TOPIC_ROUTES } from '../../config/routes';
import { SEO_DATA, ROUTES } from '../../config/routes';
import ThemeToggle from '../Shared/ThemeToggle';
import { ArrowRight, Sparkles, Code2, Cpu } from 'lucide-react';

export default function HomePage({ topics }) {
  return (
    <>
      <SEOHead {...SEO_DATA[ROUTES.HOME]} canonicalUrl={ROUTES.HOME} />

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        {/* Animated background grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(139,92,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.08)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Gradient orbs for artistic effect */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-pink-500/15 dark:bg-pink-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Compact Header Bar */}
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Code2 className="text-white" size={22} />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 dark:from-purple-400 dark:via-pink-400 dark:to-purple-400 bg-clip-text text-transparent">
                  DSA Visualizer
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">v2.0 | learn • visualize • master</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">10 Topics</span>
              </div>
              <ThemeToggle />
            </div>
          </header>

          {/* Hero Section - Compact */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
              <Sparkles className="text-purple-600 dark:text-purple-400" size={14} />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Interactive Learning Platform</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-3 tracking-tight">
              Master <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">Algorithms</span> Visually
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
              Step-by-step animations, pseudocode breakdowns, and interactive operations for every data structure
            </p>
          </div>

          {/* Topic Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
            {topics.map((topic, index) => (
              <Link
                key={topic.id}
                to={TOPIC_ROUTES[topic.id]}
                className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 border border-slate-200/80 dark:border-slate-700/80 hover:border-purple-400 dark:hover:border-purple-500 shadow-sm hover:shadow-xl hover:shadow-purple-500/10"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300" />

                <div className="relative">
                  <div className={`w-12 h-12 bg-gradient-to-br ${topic.color} rounded-xl flex items-center justify-center text-2xl mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {topic.icon}
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-1 text-sm sm:text-base">{topic.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">{topic.description}</p>

                  <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explore</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom Info Bar - Compact */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-center py-6 border-t border-slate-200/50 dark:border-slate-800/50">
            <div className="flex items-center gap-2">
              <Cpu className="text-purple-500" size={18} />
              <span className="text-sm text-slate-600 dark:text-slate-400">Interactive visualizations</span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="text-pink-500" size={18} />
              <span className="text-sm text-slate-600 dark:text-slate-400">Pseudocode & complexity</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="text-orange-500" size={18} />
              <span className="text-sm text-slate-600 dark:text-slate-400">Step-by-step animations</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
