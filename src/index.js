import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import regionalExpressions from './RegionalExpression/RegionalExpression';

fetch('./data/Regioes_Brasil.geojson')
	.then((file) => file.json())
	.then((brazil_regions) => {
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
		const pointsToWin = regionalExpressionsData.length;
		function getRandomExpression(){
			if(regionalExpressionsData.length){
				const index = Math.floor(Math.random() * (regionalExpressionsData.length - 1) + 0);
				regionalExpression = regionalExpressionsData[index];
				regionalExpressionsData.splice(index,1);
				updateGameInformations();
			} else endGame();
		};

		const expression = document.getElementById('expression');
		const meaning = document.getElementById('meaning');
		const pointsLabel = document.getElementById('points');
		let points = 0;
		let enbaleClickFeature = true
		function updateGameInformations(){
			if(regionalExpression){
				expression.innerHTML = regionalExpression.expression;
				meaning.innerHTML = regionalExpression.meaning;
				pointsLabel.innerHTML = `${points}/${pointsToWin}`;
				if(enbaleClickFeature) enableFeatureClick();
			}
		};

		function enableFeatureClick(){
			brazil_regions_layer.addEventListener('click', (event) => validateAnswer(event));
			enbaleClickFeature = false;
		};

		function validateAnswer(event){
			const region = event.layer.feature.properties.nome;
			if(region === regionalExpression.region){
				highlightRegion(event);
				points += 1;
				getRandomExpression();
			} else endGame();
		};

		function endGame(){
			updateGameMenu();
			resetVariables();
			disableFeatureClick();
			resetGameInformations();
		};

		function resetVariables(){
			regionalExpressionsData = regionalExpressions;
			points = 0;
		};

		function disableFeatureClick(){
			brazil_regions_layer.clearAllEventListeners();
			enbaleClickFeature = true;
		};

		function resetGameInformations(){
			expression.innerHTML = '';
			meaning.innerHTML = '';
			pointsLabel.innerHTML = '';
		};

		function updateGameMenu(){
			const title = document.getElementById('title');
			title.innerHTML = 'Fim de Jogo';
			const content = document.getElementById('content');
			if(points == pointsToWin) content.innerHTML = `Parabéns! Você acertou ${points}/${pointsToWin}.`;
			else content.innerHTML = `Você acertou ${points}/${pointsToWin}.`;
			menu.classList.remove('hide');
		};

		// Extra
		function highlightRegion(feature){
			const highlightedRegion = L.geoJSON(feature.layer.feature, { color: 'rgb(130, 255, 130)' }).addTo(map);
			setTimeout(() => map.removeLayer(highlightedRegion), 250);
		};
	});