const agregarTarea = async () => {
    const descripcion = document.querySelector('#nuevaTarea').value;
    if (descripcion.trim() === '') {
        alert('Por favor, ingresa una descripción para la tarea');
        return;
    }
    const response = await fetch('http://localhost:3000/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ descripcion }),
    });
    const tarea = await response.json();
    agregarTareaALista(tarea);
};

const agregarTareaALista = (tarea) => {
    const lista = document.querySelector('#listaTareas');
    const li = document.createElement('li');
    li.textContent = tarea.descripcion;
    lista.appendChild(li);
};

const obtenerTareas = async () => {
    const response = await fetch('http://localhost:3000/tareas');
    const data = await response.json();
    data.tareas.forEach((tarea) => agregarTareaALista(tarea));
};

document.addEventListener('DOMContentLoaded', obtenerTareas);

