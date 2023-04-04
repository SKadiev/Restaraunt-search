import React, { useEffect, useState } from 'react';
import {
	Image,
	StyleSheet,
	TouchableOpacity,
	Text,
	FlatList,
	View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RestaurantDetails from './RestaurantDetails';

export type RestaurantItem = {
	id: string;
	title: string;
	location: {
		latitude: number;
		longitude: number;
	};
	stars: number;
	reviews: number;
	image: string;
	street: string;
	distance?: string;
	favorite: boolean;
};

export type LocationNavigateProps = {
	name: string;
	path: string;
	key: string;
	params: {
		location: {
			latitude: number;
			longitude: number;
		};
		item: RestaurantItem;
	};
};

export type Props = {
	listTitle: string;
	items: RestaurantItem[];
};

const RestaurantItem: React.FC<Props> = ({ listTitle, items }) => {
	const navigation = useNavigation<LocationNavigateProps>();
	const CLIENT_ID = '23HWHSA4QNI3Z1SBY3C3KIUZPKSR5NPWZIHVJPK14IYN31NR';
	const CLIENT_SECRET = 'BH4Y0WTUIC0251NWLIQV25HF3LYIEYAHYCM0PORTHOGILAX0';

	return (
		<View style={styles.container}>
			{items.length > 0 && (
				<Text style={styles.title}>
					{listTitle} - Results({items.length})
				</Text>
			)}
			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				style={styles.container}
				data={items}
				keyExtractor={(item, index) => item.id}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							style={{ ...styles.restaurantItem, ...styles.listItem }}
							key={item.id}
						>
							<TouchableOpacity
								onPress={() =>
									navigation.navigate('Details', {
										location: item.location,
										item: item
									})
								}
							>
								<Image
									source={require('../assets/pancake.jpg')}
									style={styles.image}
								/>
								<RestaurantDetails item={item} />
							</TouchableOpacity>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginVertical: 10
	},
	restaurantItem: {
		borderColor: 'lightgray',
		borderBottomWidth: 1,
		marginVertical: 5,
		width: 200,
		marginRight: 20
	},
	image: {
		height: 120,
		borderRadius: 8,
		width: '100%'
	},
	title: {
		fontWeight: 'bold',
		alignSelf: 'center',
		color: '#fff'
	},
	listItem: {
		backgroundColor: '#fff',
		padding: 10,
		marginVertical: 5,
		borderRadius: 5,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	}
});

export default RestaurantItem;
