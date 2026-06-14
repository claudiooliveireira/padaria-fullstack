import { useState, useEffect } from 'react';
import CardProduto from './components/CardProduto';


export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    //Função para buscar os dados da API
    async function buscarProdutos() {
      try {
        const resposta = await fetch('http://localhost:5000/api/produtos');
        const dados = await resposta.json();
        
        setProdutos(dados);
        
      } catch (error) {
        console.error("Erro ao buscar produtos do backend:", error)
      }finally{
        setCarregando(false);
      }

    }

    buscarProdutos();
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <h1 className="text-2xl font-black tracking-tight text-amber-600">
            Pães & Doces <span className="texr-gray-800">Cia</span>
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium bg-amber-50 text-amber-700 px-3 py-1 rounded-full">
              Backend conectado
            </span>
          </div>
        </div>
      </header>

      {/* Conteúdo Proncipal */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Nosso Cardápio
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Produtos frequinhos
          </p>
        </div>

      {/* Estado de carregando ( Skeleton loading simples)*/}
      {carregando ? (
        <div className="text-center py-10 text-gray-500 font-medium">
          Carregando produtos...
        </div>
      ) : (
        /* Grid de  produtos */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {produtos.map((produto) => (
            <CardProduto key={produto.id} produto={produto} />
          ))}
        </div>
      )}
      </main>
    </div>
     
  )
}
