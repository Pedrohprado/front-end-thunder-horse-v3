import { TypeAllCycle } from '../types/TypeCycle';

const BlocsAllCycle = ({ isAllCycle }: { isAllCycle: TypeAllCycle[] }) => {
  return (
    <section className=' w-full rounded shadow flex flex-col justify-center gap-2 items-start p-2 mt-2'>
      <h1 className=' font-bold mb-2'>levantamento total</h1>
      {isAllCycle.map((item, index) => (
        <div
          key={index}
          className=' flex items-center justify-between w-full gap-2'
        >
          <div className=' border w-1/4  h-20 rounded flex flex-col gap-2 items-center justify-center'>
            <p>Capacidade efetiva</p>
            {item.porcentagemCapacidadeEfetiva}%
          </div>
          <div className=' border w-1/4  h-20 rounded flex flex-col gap-2 items-center justify-center'>
            <p>Tempo parado</p>
            {item.porcentagemParado}%
          </div>
          <div className=' border w-1/4  h-20 rounded flex flex-col gap-2 items-center justify-center'>
            <p>Tempo operando</p>
            {item.porcentagemTrabalhando}%
          </div>
          <div className=' border w-1/4  h-20 rounded flex flex-col gap-2 items-center justify-center'>
            <p>Quantidade de soldas</p>
            {item.quantidadeDeSolda}
          </div>
        </div>
      ))}
    </section>
  );
};

export default BlocsAllCycle;
