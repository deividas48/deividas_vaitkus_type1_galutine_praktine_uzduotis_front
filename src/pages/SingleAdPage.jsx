import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdImgCarousel from '../components/UI/AdImgCarousel';
import DeleteBtn from '../components/buttons/DeleteBtn';
// import AdImgSwiper from '../components/UI/AdImgSwiper';

export default function SingleAdPage() {
  // From App.jsx parameter <Route path="/skelbimas/:id"...
  const { id } = useParams();

  const [ad, setAd] = useState(null); // Where data is feched from API (server)
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function getPosts(url) {
    try {
      setIsLoading(true);
      const resp = await axios.get(url);
      // console.log(resp.data);
      setAd(resp.data[0]);
    } catch (error) {
      // console.warn('getTrip', error);
      setIsError(true);
    }
    setIsLoading(false);
  }
  // console.log('Fetched ad title:', resp.data.title);
  // console.log('Fetched ad title:', resp.data);

  const cUrl = `http://localhost:3000/api/ads/${id}`;
  useEffect(() => {
    getPosts(cUrl);
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to fetch the ad</p>;
  if (!ad) return <p>No ad data!</p>; // Check if ad is null

  return (
    <div className="md:flex min-h-screen">
      <main className="md:w-3/4">
        {/* Listed item to sell */}
        <section className="mb-4 bg-white p-4 md:mr-4 mt-4 rounded-lg">
          <span className="text-xs uppercase text-custom-primary-color">{ad.type}</span>
          {/* Ad img */}
          <AdImgCarousel
            images={[
              ad.main_image_url || '',
              ad.main_image_url || '',
              ad.main_image_url || '',
              ad.main_image_url || '',
            ]}
          />
        </section>
        <section className="mb-4 mt-4 bg-white p-4 md:mr-4 rounded-lg">
          {/* Description */}
          <h2 className="text-xl font-semibold pb-2">{ad.title}</h2>
          {ad.description}
          <p className="text-custom-primary-color mt-1 justify-end flex ">
            Price: $
            {ad.price}
          </p>
        </section>
      </main>
      <aside className="md:w-1/4">
        <section className=" bg-white p-4 mb-4 mt-4 rounded-lg">
          <h2 className="text-xl font-semibold pb-2">Personal info</h2>
          <i className="bi bi-telephone text-custom-primary-color" />
          {' '}
          {ad.phone}
          {/* <i class="bi bi-geo-alt"></i> */}
        </section>
        <section className=" bg-white p-4 rounded-lg">
          <h2 className="text-xl font-semibold pb-2">Settings</h2>
          <div className="flex justify-center">
            <DeleteBtn />
          </div>
        </section>
      </aside>
    </div>
  );
}
