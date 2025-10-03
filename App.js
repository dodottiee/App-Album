import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { globalStyles } from './styles/globalStyles';
import { fetchPhotos, addPhoto, updatePhoto } from './services/api';

// Componentes de Tela
import AlbumScreen from './components/AlbumScreen';
import CameraScreen from './components/CameraScreen';
import PhotoFormScreen from './components/PhotoFormScreen';

export default function App() {
    // Estado principal para navegação e dados
    const [viewMode, setViewMode] = useState("album"); // 'album', 'camera', 'form'
    const [photos, setPhotos] = useState([]);
    
    // Estado para a foto capturada (usada ao criar)
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    
    // Estado para o formulário (usado ao criar ou editar)
    const [formState, setFormState] = useState({
        id: null,
        titulo_foto: "",
        descricao_foto: "",
    });

    // --- LÓGICA DE CARREGAMENTO DE DADOS ---
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

    // --- MANIPULADORES DE EVENTOS ---

    const handleEditPhotoPress = (photo) => {
        // Prepara o formulário com os dados da foto para edição
        setFormState({
            id: photo.id,
            titulo_foto: photo.titulo_foto,
            descricao_foto: photo.descricao_foto,
        });
        // Seta a URI da foto para exibição no formulário (mesmo em edição)
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
                // Modo EDIÇÃO (UPDATE)
                const updatedData = { 
                    ...formState, 
                    data_foto: new Date().toISOString(),
                    uri: capturedPhoto.uri 
                };
                await updatePhoto(updatedData);
            } else {
                // Modo CRIAÇÃO (CREATE)
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

    // --- RENDERIZAÇÃO CONDICIONAL DA TELA ---

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