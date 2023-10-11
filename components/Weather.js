import { StyleSheet, View, Text, Image } from "react-native";
import React, { useEffect, useState} from "react";

const api = {
    url: process.env.EXPO_PUBLIC_API_URL,
    key: process.env.EXPO_PUBLIC_API_KEY,
    icons: process.env.EXPO_PUBLIC_ICONS_URL
}

export default function Weather(props) {
    const [temp, setTemp] = useState('')
    const [description, setDescription] = useState('')
    const [icon, setIcon] = useState('')

    useEffect (() => {
        const url = api.url +
            'lat=' + props.latitude + 
            '&lon=' + props.longitude +
            '&units=metric' +
            '&lang=fi' +
            '&appid=' + api.key
    
        fetch(url)
            .then(res => res.json())
            .then((json) => {
                console.log(json)
                setTemp(json.main.temp)
                setDescription(json.weather[0].description)
                setIcon(api.icons + json.weather[0].icon + '@2x.png')
            })
            .catch((error) => {
                setDescription("Virhe säätietojen haussa.")
                console.log(error)
            })
    }, [])

    return (
        <View>
            <Text style={styles.temp}>Lämpötila: {temp} &#x2103;</Text>
            {icon &&
                <Image source={{uri: icon}} style={{width:100, height: 100}}/>
            }
            <Text>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    temp: {
      marginBottom: 16
    }
  });

