import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { LoginForm } from "@/components/LoginForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 p-6">
      <Hero />
      <section className="py-12 flex justify-center gap-5">
        <Features />
        <LoginForm />
      </section>
    </main>
  );
}
