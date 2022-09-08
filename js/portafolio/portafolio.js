const grid1 = new Muuri('.grid1', {
	layout: {
		rounding: false
	}
});

window.addEventListener('load', () => {
	grid1.refreshItems().layout();
	document.getElementById('grid1').classList.add('imagenes-cargadas');

	// Agregamos los listener de los enlaces para filtrar por categoria.
	const enlaces = document.querySelectorAll('#categorias1 a');
	enlaces.forEach((elemento) => {
		elemento.addEventListener('click', (evento) => {
			evento.preventDefault();
			enlaces.forEach((enlace) => enlace.classList.remove('activo'));
			evento.target.classList.add('activo');

			const categoria1 = evento.target.innerHTML.toLowerCase();
			categoria1 === 'todos' ? grid1.filter('[data-categoria1]') : grid1.filter(`[data-categoria1="${categoria1}"]`)
		});
	});

	// Agregamos el listener para la barra de busqueda
	document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
		const busqueda = evento.target.value;
		grid1.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda))
	});
	// Agregamos listener para las imagenes
	const overlay = document.getElementById('overlay');
	document.querySelectorAll('.grid1 .item img').forEach((elemento) => {
		elemento.addEventListener('click', () => {
			const ruta = elemento.getAttribute('src');
			const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

			overlay.classList.add('activo');
			document.querySelector('#overlay img').src = ruta;
			document.querySelector('#overlay .descripcion').innerHTML = descripcion;
		});
	});
	// Eventlistener del boton de cerrar
	document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
		overlay.classList.remove('activo');
	});

	// Eventlistener del overlay
	overlay.addEventListener('click', (evento) => {
		evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
	});
}); 

