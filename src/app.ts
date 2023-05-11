import axios, { AxiosResponse } from 'axios';
import { NominatimParams, NominatimResponse } from './types';
import { map, tileLayer, Map as LeafletMap, LayerGroup, Marker } from 'leaflet';

const form = document.getElementById('js-form')! as HTMLFormElement;
const addressInput = document.getElementById('js-address')! as HTMLInputElement;

let leafletMap: LeafletMap | null = null;
const markersLayerGroup = new LayerGroup();

function searchAddressHandler(event: Event): void {
  event.preventDefault();

  const endpoint = 'https://nominatim.openstreetmap.org/search';
  const params: NominatimParams = {
    q: addressInput.value,
    format: 'json',
    limit: 1,
  };

  axios.get<NominatimResponse[]>(endpoint, { params })
    .then(handleSearchResults)
    .catch((error): void => {
      alert('The address could not be found.');
      console.log(error.message);
    });
}

function handleSearchResults(response: AxiosResponse<NominatimResponse[]>): void {
  const result = response.data[0];

  if (result) {
    const { lat, lon, display_name: placeName } = result;
    locatePlaceOnMap(Number(lat), Number(lon), placeName);
  } else {
    alert('The address could not be found.');
  }
}

function locatePlaceOnMap(lat: number, lon: number, placeName: string, zoom: number = 13): void {
  if (!leafletMap) {
    leafletMap = map('js-map').setView([lat, lon], zoom);

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(leafletMap);
  } else {
    leafletMap.setView([lat, lon], zoom);
    markersLayerGroup.clearLayers();
  }

  const marker = new Marker([lat, lon]).bindPopup(placeName);
  markersLayerGroup.addLayer(marker);
  markersLayerGroup.addTo(leafletMap);
}

form.addEventListener('submit', searchAddressHandler);
