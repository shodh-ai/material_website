export default function EnforcementFlow() {
  return (
    <section className="py-24 bg-gray-50 border-t border-gray-200 text-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-16">How correctness is enforced</h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-sm">
          {[
            "Change detected",
            "Impact predicted",
            "Intent verified",
            "Heal or block",
            "Explain outcome",
          ].map((step, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <div className="text-xs text-gray-400 mb-2">STEP {i + 1}</div>
              <div className="font-medium">{step}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
