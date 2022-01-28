const text = {
  capitalize(val: string): string {
    return `${val[0].toUpperCase()}${val.toLowerCase().substring(1)}`;
  }
};

export default text;