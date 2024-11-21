// Agregar una tarea al servidor
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
    if (response.ok) {
        const tarea = await response.json();
        agregarTareaALista(tarea);
        document.querySelector('#nuevaTarea').value = ''; // Limpiar el campo
    } else {
        alert('Error al agregar la tarea');
    }
};

// Mostrar una tarea en la lista
const agregarTareaALista = (tarea) => {
    const lista = document.querySelector('#listaTareas');
    const li = document.createElement('li');
    li.id = `tarea-${tarea.id}`;
    li.innerHTML = `
        ${tarea.descripcion}
        <button onclick="eliminarTarea(${tarea.id})">Eliminar</button>
    `;
    lista.appendChild(li);
};

// Obtener todas las tareas del servidor
const obtenerTareas = async () => {
    const response = await fetch('http://localhost:3000/tareas');
    if (response.ok) {
        const data = await response.json();
        data.tareas.forEach((tarea) => agregarTareaALista(tarea));
    } else {
        alert('Error al obtener las tareas');
    }
};

// Eliminar una tarea del servidor
const eliminarTarea = async (id) => {
    const response = await fetch(`http://localhost:3000/tareas/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        document.querySelector(`#tarea-${id}`).remove();
    } else {
        alert('Error al eliminar la tarea');
    }
};

// Cargar tareas al cargar la página
document.addEventListener('DOMContentLoaded', obtenerTareas);
