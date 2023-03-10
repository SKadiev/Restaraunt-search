import React, { useState } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { View, StyleSheet } from 'react-native';
import { RootResultFilterState } from '../store/store';
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
				fillColor='red'
				unfillColor='#FFFFFF'
				text='500 meters'
				iconStyle={{ borderColor: 'red' }}
				innerIconStyle={{ borderWidth: 2 }}
				onPress={(isChecked: boolean) => {
					dispatch(check500(isChecked));
				}}
				style={styles.checkbox}
			/>
			<BouncyCheckbox
				isChecked={filter5000}
				fillColor='red'
				unfillColor='#FFFFFF'
				text='5000 meters'
				iconStyle={{ borderColor: 'red' }}
				innerIconStyle={{ borderWidth: 2 }}
				onPress={(isChecked: boolean) => {
					dispatch(check5000(isChecked));
				}}
				style={styles.checkbox}
			/>
			<BouncyCheckbox
				isChecked={filter25000}
				fillColor='red'
				unfillColor='#FFFFFF'
				text='25000 meters'
				iconStyle={{ borderColor: 'red' }}
				innerIconStyle={{ borderWidth: 2 }}
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
		flexDirection: 'row'
	},
	checkbox: { marginRight: 10 }
});

export default ResultFilter;
