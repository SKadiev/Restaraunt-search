import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItemObject = async (value: object, key: string) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
	} catch (e) {
		// save error
	}

	console.log('Done.');
};
