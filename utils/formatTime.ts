export const formatDateTime = (time: string) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${hours}:${minutes} - ${day}/${month}/${year}`;
}; 