// - 'pageTitle' is taken from LayoutBasePages.jsx
export default function Hero({ pageTitle }) {
  return (
    <section className="md:py-12 text-center hidden sm:block bg-white container-workaround">
      <h2 className="leading-6 text-custom-primary-color uppercase font-medium">
        Our Latest Listing
        {pageTitle}
      </h2>
      <p className="mt-2 text-3xl leading-8 font-semibold tracking-tight md:text-4xl">
        New Listings in Our Directory
      </p>
      <p className="mt-3 text-center text-custom-gray-color">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>
    </section>
  );
}
