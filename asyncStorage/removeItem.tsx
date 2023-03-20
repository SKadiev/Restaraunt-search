import AsyncStorage from '@react-native-async-storage/async-storage';

export const removeItem = async () => {
	try {
		await AsyncStorage.removeItem('@MyApp_key');
	} catch (e) {
		// remove error
	}

	console.log('Done.');
};
