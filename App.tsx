import RestaurantDetails from './screens/RestaurantDetails';
import SearchScreen from './screens/SearchScreen';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootScreen from './screens/RootScreen';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName='Root'
					// screenOptions={{ headerShown: false }}
				>
					<Stack.Screen name='Root' component={RootScreen} />
					<Stack.Screen
						name='Details'
						component={RestaurantDetails}
						options={{ title: 'Restaurant Details' }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
