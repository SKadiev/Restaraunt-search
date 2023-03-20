import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import EmptyScreen from './EmptyScreen';
import SearchScreen from './SearchScreen';
import HomeLayoutTabs from './Home/HomeLayoutTabs';

const RootScreen = () => {
	const Drawer = createDrawerNavigator();
	const Tab = createBottomTabNavigator();

	return (
		<>
			<Drawer.Navigator
				// screenOptions={{ headerShown: false }}
				useLegacyImplementation
			>
				<Drawer.Screen name='Home' component={HomeLayoutTabs} />
				<Drawer.Screen name='About' component={EmptyScreen} />
			</Drawer.Navigator>
		</>
	);
};

export default RootScreen;
