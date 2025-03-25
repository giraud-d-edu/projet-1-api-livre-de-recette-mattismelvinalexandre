export const findAll = async () => {
    const response = await fetch("http://localhost:8000/recettes");
    return await response.json();
};