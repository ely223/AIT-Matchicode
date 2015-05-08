function main() {
		var sketch = document.getElementById('sketch');
		var context = sketch.getContext("2d");
		
		// face circle
		context.beginPath();
		context.arc(150, 150, 150, 0, 2 * Math.PI, true);
		context.closePath();
		context.fillStyle = "#339933"
		context.fill();

		// eyes
		context.beginPath();
		context.arc(160, 130, 35, 0, 2 * Math.PI, true);
		context.closePath();
		context.fillStyle = "#FFFFFF"
		context.fill();

		// eyes
		context.beginPath();
		context.arc(70, 130, 35, 0, 2 * Math.PI, true);
		context.closePath();
		context.fillStyle = "#FFFFFF"
		context.fill();

		// eyes
		context.beginPath();
		context.arc(150, 130, 25, 0, 2 * Math.PI, true);
		context.closePath();
		context.fillStyle = "#000000"
		context.fill();

		// eyes
		context.beginPath();
		context.arc(60, 130, 25, 0, 2 * Math.PI, true);
		context.closePath();
		context.fillStyle = "#000000"
		context.fill();

		context.fillRect(80, 200, 70, 30);

	}


document.addEventListener('DOMContentLoaded', main);