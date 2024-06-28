import { useContext } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { GlobalContext } from '../globalcontext/globalcontext';

const InitialGraph = () => {
  const { isLastWeldBead, isPrometeusCode } = useContext(GlobalContext);

  return (
    <section className=' w-2/3 bg-slate-50 h-full rounded border flex flex-col justify-center gap-2 items-center p-2'>
      {isLastWeldBead ? (
        <>
          <p className=' font-bold'>
            Ultimo cordão de solda - {isPrometeusCode}
          </p>

          <AreaChart data={isLastWeldBead} width={600} height={200}>
            <YAxis />
            <XAxis dataKey={'createdAt'} hide />
            <Tooltip />
            <Area
              type='natural'
              dataKey={'amperagem'}
              stroke='#001e4b'
              fill='#001e4b9f'
            />
          </AreaChart>
        </>
      ) : (
        <p>Selecione o dispositivo</p>
      )}
    </section>
  );
};

export default InitialGraph;
