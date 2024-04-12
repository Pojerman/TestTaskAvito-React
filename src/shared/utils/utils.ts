export function FilterOption(input: string, option?: { label: string; value: string }) {
    return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
}

export const joinArrayWithCommas = (array: string[]): string => {
    return array.join(", ");
};
