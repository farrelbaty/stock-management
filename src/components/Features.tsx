export function Features() {
  return (
    <section className="bg-gray-100 py-12 px-6">
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Fonctionnalités principales
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <FeatureCard
          title="Suivi des stocks"
          desc="Visualisez les entrées, sorties et alertes de seuil."
        />
        <FeatureCard
          title="Historique des mouvements"
          desc="Gardez un historique clair des mouvements de stock."
        />
        <FeatureCard
          title="Multi-utilisateurs"
          desc="Accès sécurisé pour les pharmaciens, gestionnaires, etc."
        />
      </div>
    </section>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
      <h4 className="text-xl font-semibold text-blue-800">{title}</h4>
      <p className="text-gray-600 mt-2">{desc}</p>
    </div>
  );
}
