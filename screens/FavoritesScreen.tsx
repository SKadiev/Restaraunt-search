import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import FavoriteRestaurants from '../components/FavoriteRestaurants';
import { RootResultState } from '../store/store';

const FavoritesScreen = () => {
	const favorites = useSelector(
		(state: RootResultState) => state.favoriteRestaurants.items
	);
	console.log('favorites ', favorites);
	return (
		<View style={styles.container}>
			<FavoriteRestaurants items={favorites} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		// justifyContent: 'flex-start',
		// marginLeft: 10,
		flex: 1
	}
});

export default FavoritesScreen;
