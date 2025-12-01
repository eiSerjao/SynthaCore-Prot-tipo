export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1020] via-[#1c1322] to-[#2b1055]">
      <div className="text-center">
        <div className="inline-block relative">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-white text-lg font-semibold">Carregando SynthaCore...</p>
      </div>
    </div>
  );
}
