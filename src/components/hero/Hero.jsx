import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Hero.css';

// - 'currentCategory' is taken from LayoutBasePages.jsx
export default function Hero({ welcome, ifcategory, currentCategory }) {
  const [opacity, setOpacity] = useState('bg-black opacity-20');

  useEffect(() => {
    if (currentCategory) {
      setOpacity(
        'bg-black transition-opacity duration-300 ease-in-out opacity-70',
      );
    } else {
      // setOpacity('transition-opacity duration-1000 ease-in-out bg-black opacity-20');
    }
  }, [currentCategory]);

  return (
    <section
      className="py-12 px-3 text-center bg-cover bg-center relative container-workaround mb-4"
      style={{ backgroundImage: "url('/img/turgus.jpeg')" }}
    >
      {/* Make the wallpaper darker */}
      <div className={`absolute inset-0 ${opacity}`} />
      <div className="relative z-1 h-20">
        {/* <h2 className="leading-6 text-gray-100 uppercase font-medium">
          Here you can freely buy, rent and sell your goods
        </h2> */}
        <h2 className="mt-2 leading-8 font-semibold tracking-tight text-white">
          {/* If it's home page  */}
          <div className={`mb-4 ${ifcategory ? 'text-xl' : 'text-4xl'}`}>
            {welcome}
          </div>{' '}
          {/* If it's a category page  */}
          <div className="mb-4 text-3xl md:text-4xl">
            {ifcategory}
            <span>{currentCategory}</span>
          </div>
        </h2>
        {/* Path to navigate */}
        <p className="mt-3 text-center text-gray-100 hidden">
          <Link to="/">All Categories</Link>{' '}
          {currentCategory && (
            <>
              <span> &gt; </span>
              <span className="currentCategory-color">{currentCategory}</span>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
