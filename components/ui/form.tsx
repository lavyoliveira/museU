
export default function Form(){
  return (
    <div className="bg-white pt-4 pb-8 pl-8 pr-8 mx-auto my-8 w-8/12 rounded-md">
      <h2 className="mb-6 text-center">utilize as opções abaixo para gerar relatório</h2>
      <div className="flex">
        <div className="w-1/3 pr-8">
        <div className="mb-4">
            <label htmlFor="fonte-dados" className="block text-sm font-semibold mb-2">fonte de dados</label>
            <select id="fonte-dados" className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
              <option value="opcao1">pinturas</option>
              <option value="opcao2">esculturas</option>
            </select>
          </div>

        <div className="w-full mb-8 md:mb-0">
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">conexões</label>
            <div className="bg-gray-200 border border-gray-300 rounded-lg p-2 w-full">
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <input type="checkbox" id="conexao1" className="mr-2" />
                  <label htmlFor="conexao1" className="mr-4 text-sm">autores</label>
                </div>
                <div className="flex items-center mb-2">
                  <input type="checkbox" id="conexao2" className="mr-2" />
                  <label htmlFor="conexao2" className="mr-4 text-sm">artes</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="conexao3" className="mr-2" />
                  <label htmlFor="conexao3" className="mr-4 text-sm">coleções</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
            <label htmlFor="ordenacao" className="block text-sm font-semibold mb-2">ordenação</label>
            <select id="ordenacao" className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
              <option value="opcao1">id</option>
            </select>
          </div>

          <div className="mb-4">
            <select id="ordenacao" className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
              <option value="opcao2">nome</option>
            </select>
          </div>

          <div className="mb-4">
            <select id="ordenacao" className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
              <option value="opcao2">descricao</option>
            </select>
          </div>

          <div className="mb-4">
            <select id="ordenacao" className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
              <option value="opcao2">data</option>
            </select>
          </div>
        </div>

        <div className="w-1/3 pr-8">
        <label className="block text-sm font-semibold mb-2">campos</label>
            <div className="bg-gray-200 border border-gray-300 rounded-lg p-2 w-full">
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <input type="checkbox" id="campos1" className="mr-2" />
                  <label htmlFor="campos1" className="mr-4 text-sm">id</label>
                </div>
                <div className="flex items-center mb-2">
                  <input type="checkbox" id="campos2" className="mr-2" />
                  <label htmlFor="campos2" className="mr-4 text-sm">nome</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="campos3" className="mr-2" />
                  <label htmlFor="campos3" className="mr-4 text-sm">descrição</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="campos4" className="mr-2" />
                  <label htmlFor="campos4" className="mr-4 text-sm">data</label>
                </div>
              </div>
            </div>
        </div>

        <div className="w-1/3">
        <label className="block text-sm font-semibold mb-2">conexões</label>
            <div className="bg-gray-200 border border-gray-300 rounded-lg p-2 w-full">
              <div className="flex flex-col">

              </div>
            </div>
        </div>
      </div>
    </div>
  );
}