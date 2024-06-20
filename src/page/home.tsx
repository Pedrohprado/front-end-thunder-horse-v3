const Home = () => {
  return (
    <main className=' w-full pl-[20%]'>
      <section className=' w-full bg-slate-100 h-screen flex flex-col px-8  py-4 gap-2'>
        <div className=' w-full flex items-center justify-between bg-slate-600 h-1/2'>
          <section>grafico</section>
          <section>status</section>
        </div>

        <section className=' w-full flex items-center justify-between bg-slate-600 h-1/2'>
          ultimas operações
        </section>
      </section>
    </main>
  );
};

export default Home;
