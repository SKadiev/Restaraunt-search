import axios from 'axios';

export const geoapify = axios.create({
  baseURL: 'https://api.geoapify.com/v2',
  headers: {

  }

});

export const loadRadiusRestaurants = async (radius = 500) => {

  const radius500Res = await geoapify.get(`/places?categories=catering.restaurant&filter=circle:21.4316495,41.9960924,${radius}&bias=proximity:21.4316495,41.9960924&lang=en&limit=500&apiKey=34f01aa367cc4fcb96f56acdb24d79c6`);
  const radiusRestaurantData = radius500Res.data.features.map((restaurant, index) => {
    return {
      id: restaurant.properties.name + restaurant.properties.street,
      title: restaurant.properties.name,
      location: {
        latitude: restaurant.properties.lat,
        longitude: restaurant.properties.lon,
      },
      stars: 4.5,
      reviews: 100,
      image: ''
    }
  });

  console.log((radiusRestaurantData));
  return radiusRestaurantData.filter(restaurant => restaurant.title !== undefined);
}

export const loadSingleRestaurant = async ({ longitude, latitude }) => {

  const restaurantData = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=34f01aa367cc4fcb96f56acdb24d79c6`);
  const restaurant = restaurantData.data.results[0];

  return {
    id: restaurant.name + restaurant.street,
    title: restaurant.name,
    location: {
      latitude: restaurant.lat,
      longitude: restaurant.lon,
    },
    stars: 4.5,
    reviews: 100,
    image: ''
  }
}


export const searchRestarauns = async (searchText) => {
  const restaurantData = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${searchText}&format=json&apiKey=&apiKey=34f01aa367cc4fcb96f56acdb24d79c6`);
  const restaurant = restaurantData.data.results[0];

  return {
    id: restaurant.name + restaurant.street,
    title: restaurant.name,
    location: {
      latitude: restaurant.lat,
      longitude: restaurant.lon,
    },
    stars: 4.5,
    reviews: 100,
    image: ''
  }
}
