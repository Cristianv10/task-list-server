const { printSeparator, prompt } = require("./utils");

let isRunning = true;
const tasks = [];
console.log('¡Bienvenido al gestor de tareas!\n');


const displayTasks = (title) => {
  console.log(title || 'Lista de tareas');
  tasks.forEach(({ id, description, status }) => {
    console.log(`Tarea ${id}, descripción: ${description}, estado: ${status}\n`);
  });
};

const addTask = async () => {
  const taskData = { status: 'No completado' };
  taskData.id = await prompt('\nIngrese un identificador\n');
  if (tasks.length > 0 && tasks.find((t) => t.id == taskData.id)) {
    console.log('\nYa existe una tarea con ese identificador\n');
    return;
  }
  taskData.description = await prompt('\nIngrese una descripción\n');

  tasks.push(taskData);
  console.log('\nTarea añadida exitosamente\n');
};

const removeTask = async () => {
  if (tasks.length === 0) {
    console.log('¡No hay tareas!\n');
  } else {
    const id = await prompt('\nIngrese el identificador de la tarea que desea eliminar\n');
    const indexTaskToDelete = tasks.findIndex((task) => task.id == id);
    if (indexTaskToDelete !== -1) {
      tasks.splice(indexTaskToDelete, 1);
      console.log('\nTarea eliminada exitosamente\n');
    } else {
      console.log('\nTarea inexistente\n');
    }
  }
};

const completeTask = async () => {
  if (tasks.length === 0) {
    console.log('¡No hay tareas!\n');
  } else {
    const id = await prompt('\nIngrese el identificador de la tarea que desea completar\n');
    const indexTaskToComplete = tasks.findIndex((task) => task.id == id);
    if (indexTaskToComplete !== -1) {
      tasks[indexTaskToComplete].status = 'Completado';
      console.log('\nTarea completada exitosamente\n');
    } else {
      console.log('\nTarea inexistente\n');
    }
  }
};

const main = async () => {
  do {
    printSeparator();
    displayTasks('\nLista de tareas actual\n');
    printSeparator();
    const option = await prompt(
      'Opciones del programa:\n 1: Añadir tarea\n 2: Completar tarea\n 3: Eliminar tarea\n 4: Ver lista de tareas actual\n 5: Salirse del programa\n'
    );
    if (option === '1') {
      await addTask();
    } else if (option === '2') {
      await completeTask();
    } else if (option === '3') {
      await removeTask();
    } else if (option === '4') {
      displayTasks('\nLista de tareas actual\n');
    } else if (option === '5') {
      isRunning = false;
    } else {
      console.log('Esta opción no existe\n');
      printSeparator();
    }
  } while (isRunning);
};

main();