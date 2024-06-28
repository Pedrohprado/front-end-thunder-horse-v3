import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { TypeDayCycle } from '../types/TypeCycle';
import { useState } from 'react';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';

interface Props {
  isDaysCycle: TypeDayCycle[];
}

const LineGraphCycle = ({ isDaysCycle }: Props) => {
  const [isOpenList, setOpenList] = useState<number | null>(null);

  const toggleList = (barNumber: number) => {
    if (isOpenList === barNumber) setOpenList(null);
    else setOpenList(barNumber);
  };

  return (
    <section className=' w-full rounded  shadow flex flex-col justify-center gap-2 items-start p-2 mt-16'>
      <h2 className=' font-bold mb-5'>Ciclo de serviço diário</h2>
      <div className=' w-full flex flex-col gap-2'>
        {isDaysCycle.map((item, index) => (
          <div className=''>
            <button
              onClick={() => toggleList(index)}
              className={` py-1 w-1/4 shadow flex rounded items-center justify-around gap-10 transition ${
                isOpenList === index
                  ? 'bg-slate-400 shadow-none text-white'
                  : 'ease-out'
              }`}
              key={index}
            >
              {item.data}
              {isOpenList === index ? (
                <MdOutlineKeyboardArrowDown />
              ) : (
                <MdOutlineKeyboardArrowRight />
              )}
            </button>
            {isOpenList === index ? (
              <div
                className={`grid grid-cols-2 p-2 items-center justify-between transition gap-2 ${
                  isOpenList === index
                    ? 'opacity-0 translate-y-[-10px] animate-animationleft'
                    : ''
                }`}
              >
                <div className=' p-2 rounded border flex flex-col items-center justify-center text-center '>
                  <p className=' text-sm'>Capacidade efetiva</p>
                  {item.porcentagemCapacidadeEfetiva} %
                </div>
                <div className=' p-2 rounded border flex flex-col items-center justify-center text-center '>
                  <p className=' text-sm'>parado</p>
                  {item.porcentagemParado} %
                </div>
                <div className=' p-2 rounded border flex flex-col items-center justify-center text-center '>
                  <p className=' text-sm'>trabalhado</p>
                  {item.porcentagemTrabalhando} %
                </div>
                <div className=' p-2 rounded border flex flex-col items-center justify-center text-center '>
                  <p className=' text-sm'>Quantidade de soldas</p>
                  {item.quantidadeDeCordoesDeSolda} cordões
                </div>
                <div className=' p-2 rounded border flex flex-col items-center justify-center text-center '>
                  <p className=' text-sm'>tempo parado</p>
                  {item.tempoParado} segundos
                </div>
                <div className=' p-2 rounded border flex flex-col items-center justify-center text-center '>
                  <p className=' text-sm'>tempo trabalhado</p>
                  {item.tempoTrabalhado} segundos
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <h2 className=' font-bold mb-2 mt-5'>
        Porcentagem diária - tempo parado x tempo trabalhando - (8h: 56min)
      </h2>
      <div className=' w-full bg-slate-50 rounded border flex flex-col justify-center p-4 '>
        <LineChart data={isDaysCycle} width={970} height={200}>
          <YAxis />
          <XAxis dataKey='data' />
          <Tooltip />
          <Line
            type='bump'
            dataKey={'porcentagemTrabalhando'}
            stroke='#0c7418'
          />

          <Line type='bump' dataKey={'porcentagemParado'} stroke='#6b1111' />
        </LineChart>
      </div>
      <h2 className=' font-bold mb-2 mt-5'>
        Porcentagem diária - capacidade efetiva - (7h: 56min)
      </h2>
      <div className=' w-full bg-slate-50 rounded border flex flex-col justify-center p-4 '>
        <LineChart data={isDaysCycle} width={970} height={200}>
          <YAxis />
          <XAxis dataKey='data' />
          <Tooltip />
          <Line
            type='linear'
            dataKey={'porcentagemCapacidadeEfetiva'}
            stroke='#0e0c74'
          />
        </LineChart>
      </div>
    </section>
  );
};

export default LineGraphCycle;
