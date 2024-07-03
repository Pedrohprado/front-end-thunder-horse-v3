import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TypePerformancePrometeus } from '../types/TypeDevice';

const InitialGraph = ({ device }: { device: TypePerformancePrometeus }) => {
  return (
    <ResponsiveContainer>
      <AreaChart
        margin={{
          top: 30,
          bottom: 20,
        }}
        data={device.lastWelding}
        width={400}
        height={150}
      >
        <YAxis dataKey={'amperagem'} fontSize={12} />
        <XAxis dataKey={'createdAt'} />

        <Area dataKey='amperagem' type='monotone' />
        <Tooltip />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default InitialGraph;
