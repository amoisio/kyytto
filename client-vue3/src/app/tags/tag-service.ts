import { IdentifierType, KyyttoClient, TagDto } from 'kyytto-models';
import { Tag, TagCollection } from './tag-models';

export interface TagService {
  create(name: TagDto): Promise<IdentifierType>;
  getAll(): Promise<Tag[]>;
  getAllUserTags(): Promise<Tag[]>;
  getById(id: IdentifierType): Promise<Tag>;
  delete(id: IdentifierType): Promise<void>;
}

export class ApiTagService implements TagService {
  private readonly client: KyyttoClient;

  constructor(client: KyyttoClient) {
    this.client = client;
  }

  public async create(dto: TagDto): Promise<IdentifierType> {
    const id = await this.client.tags.create(dto);
    return id;
  }

  public async getAll(): Promise<Tag[]> {
    const tagResources = await this.client.tags.getAll();
    return new TagCollection(tagResources);
  }

  public async getAllUserTags(): Promise<Tag[]> {
    const tagResources = await this.client.tags.getAll();
    const tags = new TagCollection(tagResources)
      .filter(tag => tag.isUserDefined());
    return tags;
  }

  public async getById(id: IdentifierType): Promise<Tag> {
    const tagResource = await this.client.tags.getById(id);
    return new Tag(tagResource);
  }

  public async delete(id: IdentifierType): Promise<void> {
    await this.client.tags.delete(id);
  }
}
