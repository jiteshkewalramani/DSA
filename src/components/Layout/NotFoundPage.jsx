// ============= src/components/Layout/NotFoundPage.jsx =============
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import SEOHead from '../SEO/SEOHead';
import { ROUTES } from '../../config/routes';

export default function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="404 - Page Not Found | DSA Visualizer"
        description="The page you're looking for doesn't exist. Return to DSA Visualizer homepage to explore interactive data structures and algorithms."
        keywords="404, page not found"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Animation */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-slate-400 text-lg mb-2">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <p className="text-slate-500">
              Let's get you back on track with some data structure visualizations!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to={ROUTES.HOME}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Home size={20} />
              Go to Homepage
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold transition-all"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
          </div>

          {/* Suggested Links */}
          <div className="mt-12 p-6 bg-slate-800 bg-opacity-50 rounded-lg border border-slate-700">
            <h3 className="text-slate-300 font-semibold mb-4">Popular Visualizers:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Link
                to={ROUTES.SORTING}
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
              >
                Sorting Algorithms
              </Link>
              <Link
                to={ROUTES.BST}
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
              >
                Binary Search Tree
              </Link>
              <Link
                to={ROUTES.GRAPH}
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
              >
                Graph Algorithms
              </Link>
              <Link
                to={ROUTES.STACK}
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
              >
                Stack
              </Link>
              <Link
                to={ROUTES.QUEUE}
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
              >
                Queue
              </Link>
              <Link
                to={ROUTES.DP}
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
              >
                Dynamic Programming
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
