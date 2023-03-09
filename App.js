import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import RestaurantDetails from './screens/RestarauntDetails';
import SearchScreen from './screens/SearchScreen';

const AppNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    Details: RestaurantDetails,
  },
  {
    initialRouteName: 'Search',
    defaultNavigationOptions: {
      title: 'BusinessSearch'
    }
  }
);

const App = createAppContainer(AppNavigator);

export default App;
