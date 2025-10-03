import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
const { File } = FileSystem;
import { globalStyles } from '../styles/globalStyles';

const styles = globalStyles;

export default function CameraScreen({ setViewMode, setCapturedPhoto }) {
    const [facing, setFacing] = useState("back");
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);

    if (!permission) {
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.permissionText}>Permissão para acessar a câmera</Text>
                <Button onPress={requestPermission} title="Conceder permissão" />
            </View>
        );
    }

    const toggleCameraFacing = () => {
        setFacing((current) => (current === "back" ? "front" : "back"));
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
                if (!photo || !photo.uri) {
                    throw new Error("A URI da foto não foi gerada ou é inválida.");
                }
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
            <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
            <TouchableOpacity
                style={styles.backCameraBtn}
                onPress={() => setViewMode("album")}
            >
                <Text style={styles.backCameraText}>Voltar</Text>
            </TouchableOpacity>
            <View style={styles.controlsContainer}>
                <View style={styles.controls}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Trocar Câmera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Text style={styles.text}>Tirar Foto</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
