import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1020] via-[#1c1322] to-[#2b1055] p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20">
        <div className="text-8xl mb-4">🔍</div>
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Página não encontrada</h2>
        <p className="text-gray-300 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link
          href="/prototype"
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
}
