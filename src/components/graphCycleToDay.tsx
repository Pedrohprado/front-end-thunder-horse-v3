import {
  Bar,
  BarChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { TypeCycleOfPrometeusToDay } from '../types/TypeCycle';

const GraphCycleToDay = ({
  isCycleOfPrometeusToDay,
}: {
  isCycleOfPrometeusToDay: TypeCycleOfPrometeusToDay;
}) => {
  return (
    <ResponsiveContainer>
      <BarChart
        data={isCycleOfPrometeusToDay.cycles}
        width={300}
        height={150}
        margin={{
          top: 30,
          bottom: 20,
        }}
      >
        <XAxis dataKey={'data'} />
        <Tooltip />
        <Bar
          dataKey={'porcentagemTrabalhando'}
          fill='#0a881d'
          activeBar={<Rectangle fill='pink' stroke='blue' />}
          label={{ position: 'top' }}
        />

        <Bar
          dataKey={'porcentagemParado'}
          fill='#880a0a'
          activeBar={<Rectangle fill='pink' stroke='blue' />}
          label={{ position: 'top' }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GraphCycleToDay;
