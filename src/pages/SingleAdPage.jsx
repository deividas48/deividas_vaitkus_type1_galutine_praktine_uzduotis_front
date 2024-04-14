import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdImgCarousel from '../components/UI/AdImgCarousel';
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
    <>
      {/* <ul>
  <li>{ad.id}</li>
  <li>{ad.title}</li>
  <li>{ad.main_image_url}</li>
  <li>{ad.description}</li>
  <li>{ad.price}</li>
  <li>{ad.phone}</li>
  <li>{ad.type}</li>
  <li>{ad.town_id}</li>
  <li>{ad.user_id}</li>
  <li>{ad.category_id}</li>
  <li>{ad.created_at}</li>
  <li>{ad.is_published}</li>
</ul> */}
      <div className="md:flex min-h-screen">
        <main className="md:w-3/4">
          {/* Listed item to sell */}
          <section className="mb-4 bg-white p-4 md:mr-4 mt-4 rounded-lg">
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
          </section>
        </main>
        <aside className="md:w-1/4">
          <section className=" bg-white p-4 mb-4 mt-4 rounded-lg">
            Skelbimą trinti
          </section>
          <section className=" bg-white p-4 rounded-lg">
            <h2 className="text-xl font-semibold pb-2">Pardavėjo kontaktai</h2>
            <i class="bi bi-telephone"></i> {ad.phone}
            {/* <i class="bi bi-geo-alt"></i> */}
          </section>
        </aside>
      </div>
    </>
  );
}
