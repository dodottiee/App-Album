import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { globalStyles } from './styles/globalStyles';
import { fetchPhotos, addPhoto, updatePhoto } from './services/api';

import AlbumScreen from './components/AlbumScreen';
import CameraScreen from './components/CameraScreen';
import PhotoFormScreen from './components/PhotoFormScreen';

export default function App() {
    const [viewMode, setViewMode] = useState("album");
    const [photos, setPhotos] = useState([]);
    
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    
    const [formState, setFormState] = useState({
        id: null,
        titulo_foto: "",
        descricao_foto: "",
    });

    useEffect(() => {
        loadPhotos();
    }, []);

    const loadPhotos = async () => {
        try {
            const data = await fetchPhotos();
            setPhotos(data);
        } catch (error) {
            console.error("Erro ao carregar fotos:", error);
            Alert.alert("Erro", "Não foi possível carregar as fotos.");
        }
    };

    const handleEditPhotoPress = (photo) => {
        setFormState({
            id: photo.id,
            titulo_foto: photo.titulo_foto,
            descricao_foto: photo.descricao_foto,
        });
        setCapturedPhoto({ uri: photo.uri }); 
        setViewMode("form");
    };

    const handleSubmitForm = async () => {
        if (!formState.titulo_foto) {
             Alert.alert("Atenção", "O título da foto é obrigatório.");
             return;
        }

        try {
            if (formState.id) {
                const updatedData = { 
                    ...formState, 
                    data_foto: new Date().toISOString(),
                    uri: capturedPhoto.uri 
                };
                await updatePhoto(updatedData);
            } else {
                const newPhoto = {
                    titulo_foto: formState.titulo_foto,
                    descricao_foto: formState.descricao_foto,
                    data_foto: new Date().toISOString(),
                    uri: capturedPhoto.uri,
                };
                await addPhoto(newPhoto);
            }
            
            // Limpa o estado e volta para o álbum
            setViewMode("album");
            setCapturedPhoto(null);
            setFormState({ id: null, titulo_foto: "", descricao_foto: "" });
            loadPhotos();

        } catch (error) {
            console.error("Erro ao salvar o formulário:", error);
            Alert.alert("Erro", "Falha ao salvar a foto na API.");
        }
    };

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