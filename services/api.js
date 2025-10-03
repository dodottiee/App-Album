// Substitua pelo seu IP local onde o json-server está rodando
const API_URL = "http://10.110.12.39:3000/photos";

/**
 * Busca todas as fotos do JSON-Server.
 * @returns {Promise<Array>} Lista de fotos.
 */
export const fetchPhotos = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Falha ao buscar dados da API.");
    }
    return response.json();
};

/**
 * Adiciona um novo registro de foto ao JSON-Server.
 * @param {object} photoData Dados da nova foto.
 * @returns {Promise<object>} O novo registro.
 */
export const addPhoto = async (photoData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(photoData),
    });
    if (!response.ok) {
        throw new Error("Falha ao adicionar foto.");
    }
    return response.json();
};

/**
 * Atualiza um registro de foto existente.
 * @param {object} updatedData Dados atualizados da foto.
 * @returns {Promise<object>} O registro atualizado.
 */
export const updatePhoto = async (updatedData) => {
    const response = await fetch(`${API_URL}/${updatedData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
        throw new Error("Falha ao atualizar foto.");
    }
    return response.json();
};

/**
 * Deleta um registro de foto pelo ID.
 * @param {number} id ID da foto a ser deletada.
 * @returns {Promise<void>}
 */
export const deletePhotoFromApi = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Falha ao deletar foto.");
    }
};