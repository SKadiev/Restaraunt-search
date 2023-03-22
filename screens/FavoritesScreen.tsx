import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import FavoriteRestaurants from '../components/FavoriteRestaurants';
import { RootResultState } from '../store/store';

const FavoritesScreen = () => {
	const favorites = useSelector(
		(state: RootResultState) => state.favoriteRestaurants.items
	);
	return (
		<View style={styles.container}>
			<FavoriteRestaurants items={favorites} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1
	}
});

export default FavoritesScreen;
