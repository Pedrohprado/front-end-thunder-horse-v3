import GridMap from '../components/gripmap';

function Devices() {
  return (
    <main className=' w-full pl-[20%]'>
      <section className=' w-full  h-screen flex flex-col px-8  py-4 gap-2'>
        <p className=' font-bold mb-1'>Localização dos dispositivos</p>
        <GridMap />
      </section>
    </main>
  );
}

export default Devices;
