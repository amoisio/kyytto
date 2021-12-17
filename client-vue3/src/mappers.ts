import { ITask } from './board/task-models';
import { IProject } from './projects/project-models';
import * as api from '@/api';
import { ProjectResource, TaskResource } from 'kyytto-models';

export const taskResourceMapper = (task: ITask): TaskResource => {
    const projectItem = task.project 
        ? projectResourceMapper(task.project)
        : undefined;

    return {
      href: `${api.endPoints.get(api.tasksKey)}/${task.id}`,
      title: task.title,
      description: task.description,
      state: task.state,
      projectHref: projectItem?.href
    };
};

export const projectResourceMapper = (project: IProject): ProjectResource => {
  return {
    href: `${api.endPoints.get(api.projectsKey)}/${project.id}`,
    name: project.name,
    description: project.description,
    color: project.color
  };
};
