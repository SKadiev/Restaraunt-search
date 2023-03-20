import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItemObject = async (key: string) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		// read error
	}

	console.log('Done.');
};
