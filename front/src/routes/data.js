export const getData = async () => {
    const res = await fetch('http://localhost:3000/api/all');
    const data = await res.json();
    return data;
};