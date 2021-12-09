class ColorWheel {
  private index: number;
  private readonly colors = [
    '#005f73',
    '#0a9396',
    '#94d2bd',
    '#e9d8a6',
    '#ee9b00',
    '#ca6702',
    '#bb3e03',
    '#ae2012',
    '#9b2226'
  ];

  constructor() {
    const str = localStorage.getItem('current-index');
    this.index = str === null 
      ? 0 
      : Number(str) % this.colors.length;
  }

  public next(): string {
    const validIndex = this.index % this.colors.length;
    const color = this.colors[validIndex];
    localStorage.setItem('current-index', String(++this.index % this.colors.length));
    return color;
  }
}

export const colorWheel = new ColorWheel();
