export interface ISerializable<T> {
    deserialize(input: any): T;
}
