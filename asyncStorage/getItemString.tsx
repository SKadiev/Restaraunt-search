import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItemString = async () => {
	try {
		return await AsyncStorage.getItem('@key');
	} catch (e) {
		// read error
	}

	console.log('Done.');
};
