export class ColorWheel {
  private index: number;
  private readonly colors;

  constructor(currentIndex: number, scheme: string[]) {
    this.index = currentIndex;
    this.colors = scheme;
  }

  public next(): string {
    const validIndex = this.index % this.colors.length;
    const color = this.colors[validIndex];
    this.index = ++this.index % this.colors.length;
    return color;
  }

  public prev(): string {
    const validIndex = this.index % this.colors.length;
    const color = this.colors[validIndex];
    if (this.index <= 0) {
      this.index = this.colors.length - 1;
    } else {
      this.index = --this.index % this.colors.length;
    }
    return color;
  }
}
