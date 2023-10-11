import { StyleSheet, Text, View } from 'react-native';
import Position from './components/Position';


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SÄÄ</Text>
      <Position/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight:'bold'
  }
});


