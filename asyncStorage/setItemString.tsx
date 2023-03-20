import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItemString = async (value: string) => {
	try {
		await AsyncStorage.setItem('key', value);
	} catch (e) {
		// save error
	}

	console.log('Done.');
};
