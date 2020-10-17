import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import regionalExpressions from './RegionalExpression/RegionalExpression';

fetch('./data/Regioes_Brasil.geojson')
	.then((file) => file.json())
	.then((brazil_regions) => {
		console.log('brazil_regions', brazil_regions);
		const regionalExpressionsData = regionalExpressions;
		
		const bounds = [
			[-40, -80],
			[13, -20],
		];
		const map = L.map('map', {
			center: [-15, -50],
			zoom: 5,
			maxZoom: 6,
			minZoom: 5,
			zoomControl: false,
			maxBounds: bounds,
		});

		const brazil_regions_layer = L.geoJSON(brazil_regions, { color: '#fff' }).addTo(map);
	});