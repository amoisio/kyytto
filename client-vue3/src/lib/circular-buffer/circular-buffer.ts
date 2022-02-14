export class CircularBuffer<T> {

  private readonly _buffer: (T | undefined)[];
  private _iindex: number = 0;
  private _oindex: number | undefined = undefined;

  constructor(capacity: number, items?: T[]) {
    this._buffer = new Array<T | undefined>(capacity);
    if (items !== undefined && items.length > 0) {
      for (const item of items) {
        this.push(item);
      }
    }
  }

  public get capacity(): number {
    return this._buffer.length;
  }

  public push(item: T): void {
    const currentIndex = this._iindex;
    this._buffer[currentIndex] = item;

    // Set the next index
    this._iindex++;
    if (this._iindex >= this.capacity) {
      this._iindex = 0;
    }

    // Update the output index if necessary
    if (this._oindex === undefined) {
      this._oindex = currentIndex;
    } else if (currentIndex === this._oindex) {
      this._oindex = this._iindex;
    }
  }

  public pop(): T | undefined {
    if (this._oindex === undefined) {
      return undefined;
    }

    const currentIndex = this._oindex;
    const item = this._buffer[currentIndex];
    this._buffer[currentIndex] = undefined;

    this._oindex++;
    if (this._oindex >= this.capacity) {
      this._oindex = 0;
    }
    if (this._oindex === this._iindex) {
      this._oindex = undefined;
    }
    
    return item;
  }

  [Symbol.iterator](): Iterator<T | undefined> {
    let value: T | undefined;
    let index: number | undefined;
    return {
      next: () => {
        if (this._oindex === undefined) {
          return { done: true, value: undefined };
        }

        if (index === undefined) {
          index = this._oindex;
        } else {
          index++;
          if (index >= this.capacity) {
            index = 0;
          }
        }

        if (index === this._iindex) {
          return { done: true, value: undefined };
        }

        value = this._buffer[index];
        return { done: false, value: value };
      }
    };
  }
}