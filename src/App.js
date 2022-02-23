import React from 'react';
import DeckGL from 'deck.gl';
import { IconLayer } from '@deck.gl/layers';

import maplibregl from 'maplibre-gl';
import { Map } from 'react-map-gl';

const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0,
};

// Data to be used by the LineLayer
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';

// DeckGL react component
function DeckDev() {
  const deckRef = React.useRef();
  const [coordinates, setCoordinates] = React.useState([
    {
      longitude: -122.41669,
      latitude: 37.7853,
    },
    {
      longitude: -122.5,
      latitude: 37.7853,
    },
  ]);

  const iconlayer = new IconLayer({
    id: 'icon',
    data: [...coordinates],
    autoHighlight: true,
    getIcon: (d) => ({
      url: 'https://image.flaticon.com/icons/png/512/53/53077.png',
      width: 128,
      height: 128,
    }),
    getPosition: (d) => {
      // console.log('get icon position:', d);
      return [d.longitude, d.latitude];
    },
    getSize: 64,
    pickable: true,
    onDragStart: (obj) => {
      // NOTE: need this to be able to drag the icon I am not sure why
      deckRef.current.setProps({
        controller: false,
      });
      return true;
    },
    onDrag: (obj) => {
      const { coordinate } = obj;
      if (coordinate) {
        const newCoordinate = coordinates[obj.index];
        const newCoordinates = [...coordinates];
        newCoordinate.longitude = coordinate[0];
        newCoordinate.latitude = coordinate[1];
        newCoordinates[obj.index] = newCoordinate;
        setCoordinates(newCoordinates);
      }
      return true;
    },
  });

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={[iconlayer]}
      ref={deckRef}
      onDrag={(e) => { }}
      onDragEnd={(e) => {
        // console.log('drag end', e);
      }}
    >
      <Map mapStyle={MAP_STYLE} styleDiffing={false} mapLib={maplibregl} />
    </DeckGL>
  );
}

export const App = DeckDev

export default App;

