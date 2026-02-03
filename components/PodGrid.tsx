"use client";

import { useEffect, useState } from "react";

const states = ["Idle", "Running tests", "Analyzing impact", "Verifying intent", "Completed"];

export default function PodGrid() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % states.length);
    }, 1600);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-12">Autonomous testing in motion</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {states.map((state, i) => (
            <div
              key={state}
              className={`rounded-xl border p-6 transition-all duration-500
                ${i === active ? "border-blue-400 bg-blue-500/10" : "border-white/10 bg-white/5"}`}
            >
              <div className="text-xs text-gray-400 mb-2">Pod {i + 1}</div>
              <div className="font-medium">{state}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
