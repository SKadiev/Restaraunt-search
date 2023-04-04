import { createDrawerNavigator } from '@react-navigation/drawer';
import EmptyScreen from './EmptyScreen';
import HomeLayoutTabs from './Home/HomeLayoutTabs';
import UserProfileScreen from './UserProfileScreen';

const RootScreen = () => {
	const Drawer = createDrawerNavigator();

	return (
		<>
			<Drawer.Navigator useLegacyImplementation>
				<Drawer.Screen name='Home' component={HomeLayoutTabs} />
				<Drawer.Screen name='Profile' component={UserProfileScreen} />
				<Drawer.Screen name='About' component={EmptyScreen} />
			</Drawer.Navigator>
		</>
	);
};

export default RootScreen;
