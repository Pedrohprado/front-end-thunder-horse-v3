import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { TypePerformancePrometeus } from '../types/TypeDevice';

const InitialGraph = ({ device }: { device: TypePerformancePrometeus }) => {
  return (
    <section className=' w-full  h-full rounded shadow flex flex-col justify-center gap-2 items-start p-2'>
      <h1>{device.prometeus}</h1>
      <div className=' w-2/3 bg-slate-50 rounded border flex flex-col justify-center p-2'>
        <h4 className=' text-xs font-bold '>Ultimo cordão de solda</h4>
        <AreaChart
          margin={{
            top: 30,
            bottom: 20,
          }}
          data={device.lastWelding}
          width={630}
          height={150}
        >
          <YAxis dataKey={'amperagem'} fontSize={12} />
          <XAxis dataKey={'createdAt'} />

          <Area dataKey={'amperagem'} type='monotone' />
          <Tooltip />
        </AreaChart>
      </div>
    </section>
  );
};

export default InitialGraph;
