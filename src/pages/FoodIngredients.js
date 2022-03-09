import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FetchIngredients from '../services/FetchIngredients';

export default function FoodIngredients() {
  const [ready, setReady] = useState(false);
  const [allIngredients, setAllIngredients] = useState();

  const getIngredients = async () => {
    const ingredients = await FetchIngredients();
    setAllIngredients(ingredients);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  useEffect(() => {
    setReady(true);
    console.log(allIngredients);
    console.log(ready);
  }, [allIngredients]);

  return (
    <>
      <Header title="Explore Ingredients" sb={ false } />
      <Footer />
    </>
  );
}
