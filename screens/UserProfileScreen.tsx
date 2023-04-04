import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const UserProfileScreen = () => {
	return (
		<View style={styles.container}>
			<View style={styles.profileContainer}>
				<Image
					style={styles.profileImage}
					source={{ uri: 'https://picsum.photos/id/237/200/300' }}
				/>
				<Text style={styles.profileName}>John Doe</Text>
				<Text style={styles.profileEmail}>johndoe@example.com</Text>
			</View>
			<View style={styles.infoContainer}>
				<TouchableOpacity style={styles.infoButton}>
					<Text style={styles.infoText}>Edit Profile</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.infoButton}>
					<Text style={styles.infoText}>Change Password</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.infoButton}>
					<Text style={styles.infoText}>Logout</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF'
	},
	profileContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 50
	},
	profileImage: {
		width: 150,
		height: 150,
		borderRadius: 75
	},
	profileName: {
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 20
	},
	profileEmail: {
		fontSize: 16,
		marginTop: 10
	},
	infoContainer: {
		marginTop: 50,
		marginLeft: 30,
		marginRight: 30
	},
	infoButton: {
		backgroundColor: '#5DA5DA',
		height: 50,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10
	},
	infoText: {
		color: '#FFFFFF',
		fontSize: 18
	}
});

export default UserProfileScreen;
