export const pickColor = (exclude: string[]) : string => {
    let available = colors.filter(col => !exclude.includes(col));
    if (available.length === 0) {
        available = colors;
    }

    const len = available.length;
    const index = Math.floor(Math.random() * len);
    return available[index];
};

const colors = [
    '#ff0000',
    '#ff8700',
    '#ffd300',
    '#deff0a',
    '#a1ff0a',
    '#0aff99',
    '#0aefff',
    '#147df5',
    '#580aff',
    '#be0aff'
];
