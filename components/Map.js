import React from 'react';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useSelector } from 'react-redux';
import tw from 'twrnc';
import { selectDestination, selectOrigin } from '../features/slices/navSlice';
import { GOOGLE_MAP_API_KEY_FIXED } from "@env"
import MapViewDirections from 'react-native-maps-directions';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window")

const Map = () => {
    const origin = useSelector(selectOrigin)
    const destinations = useSelector(selectDestination)
    const ref = React.useRef(null)

    React.useEffect(() => {
        if (!origin || !destinations) return
        ref.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
        })
    }, [origin, destinations])

    return (
        <MapView
            showsCompass={true}
            showsMyLocationButton={true}
            scrollDuringRotateOrZoomEnabled={true}
            zoomTapEnabled={true}
            scrollEnabled={true}
            showsScale={true}
            shouldRasterizeIOS={true}
            provider={PROVIDER_DEFAULT} // remove if not using Google Maps
            ref={ref}
            style={{
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height,
                flex: 1,
            }}
            zoomControlEnabled={true}
            showsUserLocation={true}
            zoomEnabled={true}
            region={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            {origin && destinations && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destinations.description}
                    apikey={GOOGLE_MAP_API_KEY_FIXED}
                    strokeWidth={5}
                    strokeColor="black"
                    optimizeWaypoints={true}
                    onStart={(params) => {
                        console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                    }}
                    onReady={result => {
                        console.log(`Distance: ${result.distance} km`)
                        console.log(`Duration: ${result.duration} min.`)

                        ref.current.fitToCoordinates(result.coordinates, {
                            edgePadding: {
                                right: (width / 20),
                                bottom: (height / 20),
                                left: (width / 20),
                                top: (height / 20),
                            }
                        });
                    }}
                    onError={(errorMessage) => {
                        console.error(errorMessage);
                    }}
                />
            )}
            {origin?.location && (
                <Marker
                    title='origin'
                    identifier='origin'
                    description={origin.description}
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            )}

            {destinations?.location && (
                <Marker
                    title='destination'
                    identifier='destination'
                    description={destinations.description}
                    coordinate={{
                        latitude: destinations.location.lat,
                        longitude: destinations.location.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            )}
        </MapView>
    )
}


export default Map