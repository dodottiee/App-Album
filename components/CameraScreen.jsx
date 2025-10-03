import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
const { File } = FileSystem;
import { globalStyles } from '../styles/globalStyles';

const styles = globalStyles;

export default function CameraScreen({ setViewMode, setCapturedPhoto }) {
    // Gerencia a câmera ativa: "back" (traseira) ou "front" (frontal).
    const [facing, setFacing] = useState("back");
    // Hook para solicitar e gerenciar as permissões da câmera.
    const [permission, requestPermission] = useCameraPermissions();
    // Ref para acessar a instância da câmera e seus métodos.
    const cameraRef = useRef(null);

    // Exibe uma tela vazia enquanto as permissões estão sendo carregadas.
    if (!permission) {
        return <View style={styles.container} />;
    }

    // Se a permissão não foi concedida, exibe uma mensagem e um botão para solicitá-la.
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.permissionText}>Permissão para acessar a câmera</Text>
                <Button onPress={requestPermission} title="Conceder permissão" />
            </View>
        );
    }

    // Alterna entre a câmera frontal e traseira.
    const toggleCameraFacing = () => {
        setFacing((current) => (current === "back" ? "front" : "back"));
    };

    // Função assíncrona para tirar a foto.
    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                // Tira a foto e obtém um objeto com a URI.
                const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
                if (!photo || !photo.uri) {
                    throw new Error("A URI da foto não foi gerada ou é inválida.");
                }
                // Salva a foto capturada no estado e muda a tela para o formulário.
                setCapturedPhoto(photo);
                setViewMode("form");
            } catch (error) {
                console.error("Erro ao tirar foto:", error);
                Alert.alert("Erro", "Não foi possível tirar a foto. Detalhe: " + error.message);
                setViewMode("album");
            }
        }
    };

    return (
        <View style={styles.container}>
            {/* Componente CameraView para exibir a pré-visualização da câmera. */}
            <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
            {/* Botão para voltar ao álbum. */}
            <TouchableOpacity
                style={styles.backCameraBtn}
                onPress={() => setViewMode("album")}
            >
                <Text style={styles.backCameraText}>Voltar</Text>
            </TouchableOpacity>
            <View style={styles.controlsContainer}>
                <View style={styles.controls}>
                    {/* Botão para alternar a câmera. */}
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Trocar Câmera</Text>
                    </TouchableOpacity>
                    {/* Botão para tirar a foto. */}
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Text style={styles.text}>Tirar Foto</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}