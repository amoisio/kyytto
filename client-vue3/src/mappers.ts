import { ITask } from './board/task-models';
import { IProject } from './projects/project-models';
import { ProjectResource, TaskResource } from 'kyytto-models';
import { api } from './api';

export const taskResourceMapper = (task: ITask): TaskResource => {
    const projectItem = task.project 
        ? projectResourceMapper(task.project)
        : undefined;

    return {
      href: api.tasks.resolveHref(task.id),
      title: task.title,
      description: task.description,
      state: task.state,
      projectHref: projectItem?.href
    };
};

export const projectResourceMapper = (project: IProject): ProjectResource => {
  return {
    href: api.projects.resolveHref(project.id),
    name: project.name,
    description: project.description,
    color: project.color
  };
};
