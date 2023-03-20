import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../SearchScreen';

const HomeLayout = () => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='Home' component={SearchScreen} />
		</Stack.Navigator>
	);
};

export default HomeLayout;
