import { styles } from '@/styles/sheet';
import React from 'react'
import MapView from 'react-native-maps';


export default function Index() {
    return (
        <MapView style={styles.map} initialRegion={{
            latitude: 37.7749,
            longitude: -122.4194,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }} />
    )
}
