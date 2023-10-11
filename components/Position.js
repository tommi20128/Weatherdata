import * as Location from 'expo-location'
import Weather from './Weather'
import { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function Position() {
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [message, setMessage] = useState('Haetaan sijaintia...')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      (async() => {
        let {status} = await Location.requestForegroundPermissionsAsync()
        console.log(status)
        try {
            if (status !== 'granted') {
                setMessage("Sijainti ei sallittu.")
            } else {
                const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
                setLatitude(position.coords.latitude)
                setLongitude(position.coords.longitude)
                setMessage('Sijainti löydetty')
            }
        } catch (error) {
            setMessage("Virhe sijainnin haussa.")
            console.log(error)
        }
        setIsLoading(false)
      })()
    }, [])
    
    return (
        <View>
            <Text style={styles.coords}>Sijainti: {latitude.toFixed(3)}, {longitude.toFixed(3)}</Text>
            <Text style={styles.message}>{message}</Text>
            {isLoading === false &&
                <Weather latitude={latitude} longitude={longitude} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    coords: {
      marginBottom: 16
    },
    message: {
        fontWeight: 'bold',
        marginBottom: 16
    }
  });

