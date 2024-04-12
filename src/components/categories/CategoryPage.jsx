/* eslint-disable no-console */
import axios from 'axios';
import { useState, useEffect } from 'react';
import CategoryList from './CategoryList';

function CategoryPage() {
  const [categoriesArr, setcategoriesArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  function getPosts(url) {
    setIsLoading(true);
    axios
      .get(url)
      .then((resp) => {
        setcategoriesArr(resp.data);
      })
      .catch((error) => {
        console.warn('Error fetching categories:', error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getPosts('http://localhost:3000/api/categories');
  }, []);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to fetch categories</p>}
      {!isLoading && !isError && <CategoryList list={categoriesArr} />}
    </div>
  );
}

export default CategoryPage;
