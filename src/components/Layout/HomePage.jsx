import { Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../SEO/SEOHead';
import { TOPIC_ROUTES } from '../../config/routes';
import { SEO_DATA, ROUTES } from '../../config/routes';

export default function HomePage({ topics }) {
  return (
    <>
      <SEOHead {...SEO_DATA[ROUTES.HOME]} canonicalUrl={ROUTES.HOME} />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold text-white mb-4">DSA Visualizer</h1>
            <p className="text-xl text-purple-200">Interactive Data Structures & Algorithms Platform</p>
            <p className="text-slate-400 mt-2">Learn through visualization, pseudo code, and explanations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <Link
                key={topic.id}
                to={TOPIC_ROUTES[topic.id]}
                className="bg-slate-800 rounded-xl p-6 cursor-pointer transform transition hover:scale-105 hover:shadow-2xl border border-slate-700 hover:border-purple-500 block"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${topic.color} rounded-lg flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                  {topic.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{topic.name}</h3>
                <p className="text-slate-400 mb-4">{topic.description}</p>
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition">
                  Explore →
                </button>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-slate-800 rounded-xl p-8 border border-slate-700">
            <div className="flex items-start gap-4">
              <Info className="text-blue-400 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">How to Use</h3>
                <ul className="text-slate-300 space-y-2">
                  <li>• Click on any topic card to start learning</li>
                  <li>• Each topic includes interactive visualization, pseudo code, and key concepts</li>
                  <li>• Watch step-by-step animations to understand algorithms</li>
                  <li>• Perfect for students, teachers, and interview preparation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
