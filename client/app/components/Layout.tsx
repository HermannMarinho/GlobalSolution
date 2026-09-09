import { Link } from "react-router";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navbar */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-bold hover:text-blue-100 transition">
              🏠 Sistema de Gestão de Abrigos
            </Link>

            <nav className="hidden md:flex space-x-6">
              <Link
                to="/"
                className="hover:text-blue-100 transition font-medium"
              >
                Início
              </Link>
              <Link
                to="/abrigos"
                className="hover:text-blue-100 transition font-medium"
              >
                Abrigos
              </Link>
              <Link
                to="/pessoas/novo"
                className="hover:text-blue-100 transition font-medium"
              >
                Cadastrar Pessoa
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-auto">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm">
            Sistema de Gestão de Desabrigados e Abrigos - Global Solution 2024
          </p>
        </div>
      </footer>
    </div>
  );
}
