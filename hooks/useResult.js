import { useEffect, useState } from 'react';
import { loadRadiusRestaurants, loadSingleRestaurant } from '../api/geoapify';
const RADIUS_RESTAURANTS = { '500m': [], '5000m': [], '25000m': [] };

export default (searchTerm) => {
  const [restaurantsRadiusItems, setRestaurantRadiusItems] = useState(RADIUS_RESTAURANTS)
  const [isLoading, setIsLoading] = useState(false);

  const searchApi2 = () => {
    const filterResultInit = restaurantsRadiusItems;
    for (const category in filterResultInit) {
      const elementCategory = filterResultInit[category];

    }
  }

  const resLength =
    restaurantsRadiusItems['500m'].length +
    restaurantsRadiusItems['5000m'].length +
    restaurantsRadiusItems['25000m'].length;

  useEffect(() => {

    const load = async () => {

      const radius500 = await loadRadiusRestaurants(500);
      const radius5000 = await loadRadiusRestaurants(5000);
      const radius25000 = await loadRadiusRestaurants(25000);
      const newStateRadiusRestaraunt = { ...RADIUS_RESTAURANTS };
      newStateRadiusRestaraunt['500m'] = radius500;
      newStateRadiusRestaraunt['5000m'] = radius5000;
      newStateRadiusRestaraunt['25000m'] = radius25000;
      setRestaurantRadiusItems(newStateRadiusRestaraunt);
    };

    load();
    searchApi2();
  }, []);


  return {
    restaurantsRadiusItems,
    searchApi2,
    resLength,
    isLoading
  }

};

