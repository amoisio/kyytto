export interface IInitializable<TDto, T> {
    init(input: TDto): T;
}
