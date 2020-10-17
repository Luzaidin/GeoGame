import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import regionalExpressions from './RegionalExpression/RegionalExpression';

fetch('./data/Regioes_Brasil.geojson')
	.then((file) => file.json())
	.then((brazil_regions) => {
		console.log('brazil_regions', brazil_regions);
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

		const play = document.getElementById('play');
		play.addEventListener('click', () => startGame());

		const menu = document.getElementById('menu');
		function startGame(){
			menu.classList.add('hide');
			getRandomExpression();
		};

		let regionalExpressionsData = regionalExpressions;
		let regionalExpression = null;
		function getRandomExpression(){
			if(regionalExpressionsData.length){
				const index = Math.floor(Math.random() * (regionalExpressionsData.length - 1) + 0);
				regionalExpression = regionalExpressionsData[index];
				regionalExpressionsData.splice(index,1);
			} else{
				// TO DO
				// endGame();
			}
		}
	});