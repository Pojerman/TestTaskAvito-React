export function FilterOption(input: string, option?: { label: string; value: string }) {
    return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
}

export const joinArrayWithCommas = (array: string[]): string => {
    return array.join(", ");
};

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ', ' +
        date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    return formattedDate;
}
