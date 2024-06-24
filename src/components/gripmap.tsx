import { useEffect, useState } from 'react';
import { getAllDevices } from '../api/api';
import { TypeDevice } from '../types/TypeDevice';
import { IoLocationSharp } from 'react-icons/io5';
interface TypeLocalization {
  row: number;
  col: number;
  prometeus: string;
  setor: number;
}
const GridMap = () => {
  const [isLocalization, setLocalization] = useState<TypeLocalization[] | []>(
    []
  );

  useEffect(() => {
    async function getDatas() {
      const datas: TypeDevice[] = await getAllDevices();
      const localization = datas.map((item) => ({
        prometeus: item.prometeusCode,
        setor: item.setor,
        col: item.localizationCol,
        row: item.localizationRow,
      }));
      setLocalization(localization);
      console.log(localization);
    }

    getDatas();
  }, []);

  const gridSize = 14;
  const cells = [];

  for (let row = 1; row < gridSize; row++) {
    for (let col = 1; col < gridSize; col++) {
      const cellKey = `${row}-${col}`;
      const isLocalized = isLocalization.find(
        (item) => item.col === col && item.row === row
      );
      cells.push(
        <button
          key={cellKey}
          className=' flex justify-center items-center border z-10  relative'
        >
          {isLocalized ? (
            <IoLocationSharp
              className=' absolute bottom-1 right-0 text-red-800'
              size={30}
            />
          ) : (
            '.'
          )}
        </button>
      );
    }
  }

  return (
    <section className=' grid grid-cols-12 grid-rows-12 gap-1 relative z-10'>
      <img
        src='/planta-empresa.png'
        alt='planta baixa'
        className=' absolute z-0 w-full h-full'
      />
      {cells}
    </section>
  );
};

export default GridMap;
