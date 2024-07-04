import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import AdImgSwiper from '../components/UI/AdImgSwiper';

export default function PageTown() {
  // From App.jsx parameter <Route path="/skelbimas/:id"...
  const { id } = useParams();

  const [town, setTown] = useState(null); // Where data is feched from API (server)
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function getPosts(url) {
    try {
      setIsLoading(true);
      const resp = await axios.get(url);
      // console.log(resp.data);
      setTown(resp.data[0]);
    } catch (error) {
      // console.warn('getTrip', error);
      setIsError(true);
    }
    setIsLoading(false);
  }
  // console.log('Fetched town title:', resp.data.title);
  // console.log('Fetched town title:', resp.data);

  const cUrl = `http://localhost:3000/api/towns/${id}`;
  useEffect(() => {
    getPosts(cUrl);
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to fetch the town</p>;
  if (!town) return <p>No town data!</p>; // Check if town is null

  return (
    <div className="md:flex min-h-screen">
      <main className="w-full">
        {/* Listed item to sell */}
        <section className="mb-4 mt-4 bg-white p-4 md:mr-4 rounded-lg">
          {/* Description */}
          <h2 className="text-xl font-semibold pb-2">{town.name}</h2>
          <p className="mt-1">
            <i className="bi bi-person-arms-up pr-1 text-custom-primary-color" />
            Population:
            {' '}
            {town.population}
          </p>
          <p>
            <i className="bi bi-pin-map pr-1 text-custom-primary-color" />
            Area:
            {' '}
            {town.area}
          </p>
        </section>
      </main>
    </div>
  );
}
