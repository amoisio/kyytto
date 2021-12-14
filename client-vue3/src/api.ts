export const endPoints = new Map<symbol, string>();
export const projectsKey = Symbol('projects');
endPoints.set(projectsKey, 'http://localhost:8080/api/projects');

export const tasksKey = Symbol('tasks');
endPoints.set(tasksKey, 'http://localhost:8080/api/tasks');
