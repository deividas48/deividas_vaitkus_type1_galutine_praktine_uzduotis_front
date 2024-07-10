// - 'currentCategory' is taken from LayoutBasePages.jsx
export default function Hero2({ currentCategory, welcome, ifcategory }) {
  return (
    <section
      className="py-12 px-3 text-center bg-cover bg-center relative container-workaround mb-4"
      style={{ backgroundImage: "url('/img/turgus.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-20" />
      <div className="relative z-1 h-20">
        <h2 className="leading-6 text-gray-100 uppercase font-medium">
          {/* Here you can freely buy, rent and sell your goods */}
        </h2>
        <p className="mt-2 text-3xl leading-8 font-semibold tracking-tight md:text-4xl text-white">
          {/* If it's home page  */}
          {welcome}
          {' '}
          {/* If it's a category page  */}
          {ifcategory}
        </p>
        <p className="mt-3 text-center text-gray-100">
          All Categories
          {' '}
          <span className="text-custom-primary-color">{currentCategory}</span>
        </p>
      </div>
    </section>
  );
}
