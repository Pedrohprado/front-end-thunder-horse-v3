import { useContext, useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { GlobalContext } from '../globalcontext/globalcontext';

const InitialGraph = () => {
  const [isDate, setDate] = useState<null | string[]>(null);

  const { isLastWeldBead } = useContext(GlobalContext);

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
    <section className=' w-2/3 bg-slate-50 h-full rounded border flex items-center p-2'>
      {isLastWeldBead && isDate ? (
        <AreaChart data={isLastWeldBead} width={400} height={200}>
          {/* <CartesianGrid strokeDasharray='3 3' /> */}
          <YAxis />
          <XAxis AxisComp={isDate} />
          <Tooltip />
          <Area
            type='natural'
            dataKey={'amperagem'}
            stroke='#3a6bb6'
            fill='#3a6bb6'
          />
        </AreaChart>
      ) : (
        'oi'
      )}
    </section>
  );
};

export default InitialGraph;
