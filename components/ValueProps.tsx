export default function ValueProps() {
  return (
    <section className="py-24 bg-white border-t border-gray-200 text-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-12">Why teams trust Jataka in production</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-lg font-medium mb-3">Intent, not scripts</h3>
            <p className="text-gray-600 leading-relaxed">
              Jataka verifies what the system is supposed to do — not brittle selectors or UI snapshots.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Safe change autonomy</h3>
            <p className="text-gray-600 leading-relaxed">
              Structural changes are healed automatically. Logic changes are blocked and escalated.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Explainable failures</h3>
            <p className="text-gray-600 leading-relaxed">
              Every failure comes with a business-level explanation — not logs, not stack traces.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
