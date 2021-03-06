import * as ActionTypes from './action-types';

const initialState = {
  listaTareas: [],
  filtro: '',
  listaTareasFiltradas: []
}

function inicializar(state, tareas) {
  return {
    ...state,
    listaTareas: tareas,
    listaTareasFiltradas: filtrarLista(tareas, state.filtro),
  }
}

function addTarea(state, tarea) {
  const nuevaListaTareas = [
    ...state.listaTareas,
    tarea
  ]
  return {
    ...state,
    listaTareas: nuevaListaTareas,
    listaTareasFiltradas: filtrarLista(nuevaListaTareas, state.filtro),
  }
}

function borrarTarea(state, id) {
  const nuevaListaTareas = state.listaTareas.filter((t) => t.id !== id)

  return {
    ...state,
    listaTareas: nuevaListaTareas,
    listaTareasFiltradas: filtrarLista(nuevaListaTareas, state.filtro),
  }
}

function editarTarea(state, tareaActualizada) {
  // const nuevaListaTareas = state.listaTareas.map(t => {
  //   if (t.id === tareaActualizada.id) {
  //     return tareaActualizada;
  //   }
  //   return t;
  // });
  const posTarea = state.listaTareas.findIndex(t => t.id === tareaActualizada.id);
  const nuevaListaTareas = [...state.listaTareas];
  nuevaListaTareas.splice(posTarea, 1, tareaActualizada);

  return {
    ...state,
    listaTareas: nuevaListaTareas,
    listaTareasFiltradas: filtrarLista(nuevaListaTareas, state.filtro),
  }
}

function filtrar(state, texto) {
  const tareasFiltradas = filtrarLista(state.listaTareas, texto)

  return {
    ...state,
    filtro: texto,
    listaTareasFiltradas: tareasFiltradas
  }
}

function filtrarLista(lista, texto) {
  return lista.filter(t => t.nombre.includes(texto));
}


export default function listaTareas(state = initialState, action) {
  console.log('Reducer: ', action);
  switch(action.type) {
    case ActionTypes.INICIALIZAR_TAREAS:
      return inicializar(state, action.payload);
    case ActionTypes.CREAR_TAREA:
      return addTarea(state, action.payload);
    case ActionTypes.BORRAR_TAREA:
      return borrarTarea(state, action.payload);
    case ActionTypes.EDITAR_TAREA:
      return editarTarea(state, action.payload);
    case ActionTypes.FILTRAR_TAREA:
      return filtrar(state, action.payload);
    default:
      return state;
  }
}