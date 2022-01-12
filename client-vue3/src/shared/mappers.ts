import { Task } from '../app/board/task-models';
import { Project } from '../app/projects/project-models';
import { ProjectResource, TagResource, TaskResource } from 'kyytto-models';
import { api } from '../app/api';

export const taskResourceMapper = (task: Task): TaskResource => {
  const projectItem = projectResourceMapper(task.project);
  
  return {
    href: api.tasks.resolveHref(task.id),
    title: task.title,
    description: task.description,
    state: task.state,
    projectHref: projectItem.href,
    tags: task.tags.map(tag => ({
      href: api.tags.resolveHref(tag.id),
      name: tag.name,
      type: tag.type
    }))
  };
};

export const projectResourceMapper = (project: Project): ProjectResource => {
  return {
    href: api.projects.resolveHref(project.id),
    name: project.name,
    description: project.description,
    color: project.color.value
  };
};
