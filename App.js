import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { globalStyles } from './styles/globalStyles';
import { fetchPhotos, addPhoto, updatePhoto } from './services/api';

import AlbumScreen from './components/AlbumScreen';
import CameraScreen from './components/CameraScreen';
import PhotoFormScreen from './components/PhotoFormScreen';

export default function App() {
    // Gerencia qual tela está sendo exibida: "album", "camera" ou "form".
    const [viewMode, setViewMode] = useState("album");
    // Armazena a lista de fotos obtidas da API.
    const [photos, setPhotos] = useState([]);
    
    // Guarda a foto capturada pela câmera antes de ser salva ou editada.
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    
    // Gerencia o estado do formulário de foto, para edição ou nova foto.
    const [formState, setFormState] = useState({
        id: null, // ID da foto (null para nova foto, com ID para edição).
        titulo_foto: "",
        descricao_foto: "",
    });

    // Hook useEffect para carregar as fotos quando o componente é montado.
    useEffect(() => {
        loadPhotos();
    }, []);

    // Função assíncrona para buscar as fotos da API.
    const loadPhotos = async () => {
        try {
            const data = await fetchPhotos();
            setPhotos(data);
        } catch (error) {
            console.error("Erro ao carregar fotos:", error);
            Alert.alert("Erro", "Não foi possível carregar as fotos.");
        }
    };

    // Prepara o estado do formulário para editar uma foto existente.
    const handleEditPhotoPress = (photo) => {
        setFormState({
            id: photo.id,
            titulo_foto: photo.titulo_foto,
            descricao_foto: photo.descricao_foto,
        });
        setCapturedPhoto({ uri: photo.uri }); 
        setViewMode("form"); // Altera para o modo de formulário.
    };

    // Função para lidar com o envio do formulário, salvando ou atualizando a foto na API.
    const handleSubmitForm = async () => {
        // Validação básica do título da foto.
        if (!formState.titulo_foto) {
             Alert.alert("Atenção", "O título da foto é obrigatório.");
             return;
        }

        try {
            // Verifica se é uma edição (com ID) ou uma nova foto.
            if (formState.id) {
                const updatedData = { 
                    ...formState, 
                    data_foto: new Date().toISOString(),
                    uri: capturedPhoto.uri 
                };
                await updatePhoto(updatedData); // Chama a função de atualização da API.
            } else {
                const newPhoto = {
                    titulo_foto: formState.titulo_foto,
                    descricao_foto: formState.descricao_foto,
                    data_foto: new Date().toISOString(),
                    uri: capturedPhoto.uri,
                };
                await addPhoto(newPhoto); // Chama a função de adição da API.
            }
            
            // Limpa o estado e volta para o álbum após o sucesso.
            setViewMode("album");
            setCapturedPhoto(null);
            setFormState({ id: null, titulo_foto: "", descricao_foto: "" });
            loadPhotos(); // Recarrega a lista de fotos para atualizar a tela.

        } catch (error) {
            console.error("Erro ao salvar o formulário:", error);
            Alert.alert("Erro", "Falha ao salvar a foto na API.");
        }
    };

    // Renderiza a tela correta com base no estado 'viewMode'.
    switch (viewMode) {
        case 'camera':
            return (
                <CameraScreen 
                    setViewMode={setViewMode} 
                    setCapturedPhoto={setCapturedPhoto} 
                />
            );
        case 'form':
            return (
                <PhotoFormScreen
                    formState={formState}
                    setFormState={setFormState}
                    handleSubmitForm={handleSubmitForm}
                    capturedPhoto={capturedPhoto}
                    setViewMode={setViewMode}
                    setCapturedPhoto={setCapturedPhoto}
                />
            );
        case 'album':
        default:
            return (
                <AlbumScreen
                    photos={photos}
                    fetchPhotos={loadPhotos}
                    setViewMode={setViewMode}
                    handleEditPhotoPress={handleEditPhotoPress}
                />
            );
    }
}