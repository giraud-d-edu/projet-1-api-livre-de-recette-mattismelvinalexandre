export const findAll = async () => {
    const response = await fetch("http://localhost:8000/ingredients");
    return await response.json();
}

export const findOne = async (id: string) => {
    const response = await fetch(`http://localhost:8000/ingredients/${id}`);
    return await response.json();
}

export const create = async (ingredient: string) => {
    const response = await fetch("http://localhost:8000/ingredients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom: ingredient }),
    });
    return await response.json();
}

export const remove = async (id: string) => {
    await fetch(`http://localhost:8000/ingredients/${id}`, {
        method: "DELETE",
    });
}