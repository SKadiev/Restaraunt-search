import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import RestaurantDetails from './screens/RestarauntDetails';
import SearchScreen from './screens/SearchScreen';
import { Provider } from 'react-redux';
import { store } from './store/store'

const AppNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    Details: RestaurantDetails,
  },
  {
    initialRouteName: 'Search',
    defaultNavigationOptions: {
      title: 'Restaraunt Search',
    }
  }
);

const App = createAppContainer(AppNavigator);

export default function () {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
} 
