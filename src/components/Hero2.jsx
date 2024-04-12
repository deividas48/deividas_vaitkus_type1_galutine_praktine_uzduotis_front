export default function Hero2() {
  return (
    <section className="py-12 px-3 text-center bg-cover bg-center relative container-workaround mb-24" style={{ backgroundImage: "url('/img/turgus.jpeg')" }}>
      <div className="absolute inset-0 bg-black opacity-20" />
      <div className="relative z-10">
        <div className="container text-white text-center py-4">
          <p className="mb-1 mt-2 capitalize ">Discover & connect With great sellers Around The World</p>
          <h1 className="text-5xl font-semibold capitalize">Let’s Buy Some Things</h1>
        </div>
      </div>
    </section>
  );
}
