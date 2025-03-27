export const findAll = async () => {
    const response = await fetch("http://localhost:8000/ingredients");
    return await response.json();
}

export const findOne = async (id: string) => {
    const response = await fetch(`http://localhost:8000/ingredients/${id}`);
    return await response.json();
}