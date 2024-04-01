import { Button, Text } from '@ui-kitten/components';
import { useRef, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import Header from '@components/Header/Header';

export const MapScreen = () => {
  const mapRef = useRef();
  const [markers, setMarkers] = useState([
    {
      latlng: {
        latitude: 21.019121,
        longitude: 105.809102,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      title: 'VNPT',
    },
    {
      latlng: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      title: 'Somewhere',
    },
  ]);
  // --------------- Action -------------------
  const handlePin = (latitude, longitude) => {
    setMarkers([
      ...markers,
      {
        latlng: {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        title: `${markers.length + 1}`,
      },
    ]);
  };

  const handleFocusOn = (latitude, longitude, name) => {
    let location = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0222,
      longitudeDelta: 0.0021,
    };
    mapRef.current?.animateToRegion(location, 1000);
  };
  const handleRemovePin = (index) => {
    setMarkers((l) =>
      l.filter((_, i) => {
        return i != index;
      }),
    );
  };
  // ------------------------------------------
  return (
    <Container>
      <Header
        style={{ backgroundColor: '#286FC3' }}
        color="#FFFFFF"
        status="primary"
        title="Bản đồ"
        hideLeftIcon={false}
      />
      <Content>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={{
            latitude: 21.019121,
            longitude: 105.809102,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider={PROVIDER_GOOGLE}
          showsMyLocationButton
          showsUserLocation
          onPoiClick={(event) =>
            handleFocusOn(
              event.nativeEvent.coordinate.latitude,
              event.nativeEvent.coordinate.longitude,
              event.nativeEvent.coordinate.name,
            )
          }
          onLongPress={(event) =>
            handlePin(
              event.nativeEvent.coordinate.latitude,
              event.nativeEvent.coordinate.longitude,
            )
          }
        >
          {markers?.map((marker, index) => (
            <Marker
              key={index}
              draggable
              coordinate={marker.latlng}
              title={marker.title}
              onPress={(event) => {
                handleFocusOn(
                  event.nativeEvent.coordinate.latitude,
                  event.nativeEvent.coordinate.longitude,
                  event.nativeEvent.coordinate.name,
                );
                // handleRemovePin(event.currentTarget._internalFiberInstanceHandleDEV.return.key);
              }}
              // description={marker.description}
            />
          ))}
        </MapView>
      </Content>
    </Container>
  );
};
