import { IdentifierType, TagType } from 'kyytto-models';
import UnitOfWork from '../../storage/unit-of-work.js';
import { Tag } from './tag.js';

export class TagService {
  constructor(
    private readonly uow: UnitOfWork) { }

  public async getAllSorted(): Promise<Tag[]> {
    const tags = await this.uow.tagRepository.getAll();
    const projects = await this.uow.projectRepository.getAll();
    for(const project of projects) {
      tags.push(new Tag(
        project.id,
        project.name,
        TagType.Project
      ));
    }
    return tags.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      else return 0;
    })
  }

  public async getById(id: IdentifierType): Promise<Tag> {
    const tag = await this.findById(id);
    if (tag === undefined) {
      throw new Error(`Tag with id ${id} not found.`);
    } else {
      return tag;
    }
  }

  public async findById(id: IdentifierType): Promise<Tag | undefined> {
    const tag = await this.uow.tagRepository.findById(id);
    const project = await this.uow.projectRepository.findById(id);
    if (tag !== undefined) {
      return tag;
    } else if (project !== undefined) {
      return project.toTag();
    } else {
      throw undefined;
    }
  }
}