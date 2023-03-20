import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoritesScreen from '../FavoritesScreen';
import SearchScreen from '../SearchScreen';
import HomeLayout from './HomeLayout';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function HomeLayoutTabs() {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen
				name='Restaurant'
				component={HomeLayout}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='restaurant' size={25} />
					)
				}}
			></Tab.Screen>
			<Tab.Screen
				name='Favorite Restaurant'
				component={FavoritesScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='star' size={25} />
					)
				}}
			/>
		</Tab.Navigator>
	);
}

export default HomeLayoutTabs;
