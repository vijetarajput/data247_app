"use client";

import React from "react";
import { ArrowRight, Lock, Zap, Globe } from "lucide-react";

const dataTracks = [
  {
    title: "Data Analyst",
    modules: [
      "Data Exploration",
      "Data Cleaning",
      "Descriptive Statistics",
      "Reporting & Dashboards",
      "Collaboration Tools",
    ],
    color: "from-blue-500 to-blue-700",
  },
  {
    title: "Data Science",
    modules: [
      "Exploratory Data Analysis",
      "Feature Engineering",
      "Model Training",
      "Evaluation Metrics",
      "Deploy & Monitor",
      "Versioning",
    ],
    color: "from-violet-600 to-violet-800",
  },
];

const highlights = [
  {
    icon: <Zap className="h-7 w-7 text-indigo-500" aria-hidden="true" />,
    title: "In-browser Execution",
    desc: "All computation runs locally, leveraging your device's power.",
  },
  {
    icon: <Globe className="h-7 w-7 text-indigo-500" aria-hidden="true" />,
    title: "Zero Latency",
    desc: "Instant results—no round trips or wait for remote servers.",
  },
  {
    icon: <Lock className="h-7 w-7 text-indigo-500" aria-hidden="true" />,
    title: "Privacy Compliance",
    desc: "Your data never leaves your browser. No uploads, no leaks.",
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-4 tracking-tight">
          DATA247: Modern <span className="text-indigo-600">In-browser Data Science</span>
        </h1>
        <p className="max-w-xl text-center text-lg md:text-xl text-gray-700 mb-8">
          Analyze, visualize, and transform data—<b>instantly</b> & <b>privately</b>—all within your browser. No installs. No privacy risks. Infinite possibilities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#tracks"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <a
            href="https://data247.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white border border-indigo-200 hover:border-indigo-400 text-indigo-700 font-semibold shadow-sm transition"
          >
            Official Site
          </a>
        </div>
      </section>

      {/* Highlights */}
      <section className="max-w-5xl w-full mx-auto px-4 py-6 grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1" aria-label="highlights">
        {highlights.map(({ icon, title, desc }) => (
          <div
            key={title}
            className="flex flex-col items-center p-6 rounded-xl border border-gray-100 bg-gray-50 shadow-sm"
          >
            <div className="mb-3">{icon}</div>
            <h3 className="text-lg font-semibold mb-1 text-gray-900">{title}</h3>
            <p className="text-center text-gray-600 text-sm">{desc}</p>
          </div>
        ))}
      </section>

      {/* Tracks */}
      <section id="tracks" className="flex-1 bg-gradient-to-br from-indigo-50 to-white pb-20 pt-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Choose Your Data Track
          </h2>
          <div className="grid gap-8 md:grid-cols-2 grid-cols-1">
            {dataTracks.map((track) => (
              <div
                key={track.title}
                className={`rounded-2xl shadow-lg p-7 bg-gradient-to-br ${track.color} text-white flex flex-col`}
              >
                <h3 className="text-xl font-bold mb-4">{track.title}</h3>
                <ul className="flex-1 space-y-3 mb-6">
                  {track.modules.map((mod) => (
                    <li key={mod} className="flex items-center">
                      <span className="inline-block rounded-full bg-white bg-opacity-20 mr-3 p-2">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                      <span className="font-medium">{mod}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-auto px-5 py-2 rounded-full font-semibold bg-white text-indigo-700 hover:bg-indigo-50 transition shadow focus:outline-none"
                >
                  Explore {track.title}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}