import { useContext, useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { GlobalContext } from '../globalcontext/globalcontext';

const InitialGraph = () => {
  const [isDate, setDate] = useState<null | string[]>(null);

  const { isLastWeldBead, isPrometeusCode } = useContext(GlobalContext);

  useEffect(() => {
    if (isLastWeldBead) {
      const teste = isLastWeldBead.map((item) => {
        const date = new Date(item.createdAt);
        const time = date.toISOString().slice(11, 19);
        return time;
      });
      setDate(teste);
    }
  }, [isLastWeldBead]);
  return (
    <section className=' w-2/3 bg-slate-50 h-full rounded border flex flex-col justify-center gap-2 items-center p-2'>
      {isLastWeldBead && isDate ? (
        <>
          <p className=' font-medium'>
            Ultimo cordão de solda - {isPrometeusCode}
          </p>

          <AreaChart data={isLastWeldBead} width={600} height={200}>
            {/* <CartesianGrid strokeDasharray='3 3' /> */}
            <YAxis />
            <XAxis AxisComp={isDate} />
            <Tooltip />
            <Area
              type='natural'
              dataKey={'amperagem'}
              stroke='#001e4b'
              fill='#001e4b'
            />
          </AreaChart>
        </>
      ) : (
        <p>
          Sem arco de solda no momento, selecione qual dispositivo deseja
          analisar
        </p>
      )}
    </section>
  );
};

export default InitialGraph;
