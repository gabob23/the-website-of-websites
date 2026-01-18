import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Website of Websites</h1>
        <p className="text-xl mb-8">Central hub for all your projects</p>
        <Link
          href="/projects"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block transition-colors"
        >
          View Projects Dashboard
        </Link>
      </div>
    </main>
  );
}
