import { router } from 'expo-router'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
 
export default function HomeScreen() {
	return (
		<LinearGradient
			colors={['#588157', '#3a5a40']}
			style={styles.container}
		>
			<Text style={styles.heading}>NoteX</Text>
			<Text style={styles.subText}>Welcome to Our App</Text>
			<TouchableOpacity
				style={styles.button}
				onPress={() => router.push('/(home)/Tasks')}
			>
				<Text style={styles.buttonText}>Get Started</Text>
			</TouchableOpacity>
		</LinearGradient>
	)
}
 
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	heading: {
		fontSize: 48,
		fontWeight: 'bold',
		color: 'white',
		marginBottom: 10,
		textShadowColor: 'rgba(0, 0, 0, 0.3)',
		textShadowOffset: { width: 2, height: 2 },
		textShadowRadius: 5,
		fontStyle: 'italic',
	},
	subText: {
		fontSize: 20,
		color: 'white',
		marginBottom: 30,
		textAlign: 'center',
		opacity: 0.8,
	},
	button: {
		backgroundColor: '#a3b18a',
		paddingVertical: 12,
		paddingHorizontal: 25,
		borderRadius: 25,
		shadowColor: 'rgba(0, 0, 0, 0.4)',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.8,
		shadowRadius: 5,
		elevation: 5,
	},
	buttonText: {
		color: '#344e41',
		fontSize: 18,
		fontWeight: 'bold',
	},
})