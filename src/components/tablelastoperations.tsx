import { useEffect, useState } from 'react';

import { url } from '../api/api';
import { TypeWelding } from '../types/TypeWeldings';

const TableLastOperations = () => {
  const [isInfoTable, setInfoTable] = useState<null | TypeWelding[]>(null);
  useEffect(() => {
    async function getLasOperations() {
      const response = await fetch(`${url}/lastprocessweld`);
      const data = await response.json();
      setInfoTable(data);
      console.log(data);
    }

    getLasOperations();
  }, []);

  return (
    <section className=' w-full flex flex-col h-1/2'>
      <h3 className=' font-bold mb-2'>
        Ultimas operações de solda - {new Date().toLocaleDateString()}
      </h3>
      {isInfoTable && (
        <div className='overflow-x-auto relative shadow-md sm:rounded-lg w-full max-h-80'>
          <table className=' min-w-full text-sm text-left text-gray-500 bg-white'>
            <thead className=' text-center'>
              <tr className='bg-gray-100'>
                <th className='border border-gray-300 px-4 py-2'>
                  dispositivo
                </th>
                <th className='border border-gray-300 px-4 py-2'>
                  amperagem +
                </th>
                <th className='border border-gray-300 px-4 py-2'>média</th>
                <th className='border border-gray-300 px-4 py-2'>
                  amperagem -
                </th>
                <th className='border border-gray-300 px-4 py-2'>
                  tempo trabalhado
                </th>
                <th className='border border-gray-300 px-4 py-2'>início</th>
                <th className='border border-gray-300 px-4 py-2'>final</th>
              </tr>
            </thead>
            <tbody>
              {isInfoTable.map((data) => (
                <tr className='text-center'>
                  <td className='border border-gray-300 px-4 py-2'>
                    {data.prometeus}
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    {data.maior}
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    {data.media}
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    {data.menor}
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    {data.tempoDeArc}
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    {new Date(data.tempoInicial).toLocaleTimeString()}
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    {new Date(data.tempoFinal).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default TableLastOperations;
