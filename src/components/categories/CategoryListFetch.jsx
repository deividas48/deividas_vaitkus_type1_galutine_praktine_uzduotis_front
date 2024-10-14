/* eslint-disable no-console */
import axios from 'axios';
import { useState, useEffect } from 'react';
import CategoryListLiMap from './CategoryListLiMap';
import { baseUrl } from '../../config/config';
import dotenv from 'dotenv';

function CategoryListFetch() {
  const [categoriesArr, setcategoriesArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  function getCategories(url) {
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
    getCategories(`${baseUrl}/api/categories`);
  }, []);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to fetch categories</p>}
      {!isLoading && !isError && <CategoryListLiMap list={categoriesArr} />}
    </div>
  );
}

export default CategoryListFetch;
