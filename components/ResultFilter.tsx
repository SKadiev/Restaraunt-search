import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
	check25000,
	check500,
	check5000
} from '../store/resultFilter/resultFilterSlice';

export type Props = {
	filter500: boolean;
	filter5000: boolean;
	filter25000: boolean;
};

const ResultFilter: React.FC<Props> = ({
	filter500,
	filter5000,
	filter25000
}) => {
	const dispatch = useDispatch();

	return (
		<View style={styles.checkBoxContainer}>
			<BouncyCheckbox
				isChecked={filter500}
				fillColor='#334756'
				unfillColor='#FFFFFF'
				text='500m'
				iconStyle={{ borderColor: '#334756' }}
				textStyle={styles.checkboxText}
				onPress={(isChecked: boolean) => {
					dispatch(check500(isChecked));
				}}
				style={styles.checkbox}
			/>
			<BouncyCheckbox
				isChecked={filter5000}
				fillColor='#334756'
				unfillColor='#FFFFFF'
				text='5000m'
				iconStyle={{ borderColor: '#334756' }}
				textStyle={styles.checkboxText}
				onPress={(isChecked: boolean) => {
					dispatch(check5000(isChecked));
				}}
				style={styles.checkbox}
			/>
			<BouncyCheckbox
				isChecked={filter25000}
				fillColor='#334756'
				unfillColor='#FFFFFF'
				text='25000m'
				iconStyle={{ borderColor: '#334756' }}
				textStyle={styles.checkboxText}
				onPress={(isChecked: boolean) => {
					dispatch(check25000(isChecked));
				}}
				style={styles.checkbox}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	checkBoxContainer: {
		flexDirection: 'row',
		alignItems: 'stretch'
	},
	checkbox: {
		flex: 1,
		paddingBottom: 10
	},
	checkboxText: {
		color: '#334756',
		fontSize: 14,
		fontWeight: '400',
		marginLeft: 10
	}
});

export default ResultFilter;
