import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { deletePhotoFromApi } from '../services/api';
import { File } from 'expo-file-system';
import { StatusBar } from 'expo-status-bar';

const styles = globalStyles;

export default function AlbumScreen({ photos, fetchPhotos, setViewMode, handleEditPhotoPress }) {

    const handleDeletePhoto = async (id, uri) => {
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza que deseja excluir esta foto?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            if (uri) {
                                const file = new File(uri);
                                await file.delete();
                            }
                            await deletePhotoFromApi(id);
                            
                            fetchPhotos();
                        } catch (error) {
                            console.error("Erro ao excluir foto:", error);
                            Alert.alert("Erro", "Não foi possível excluir a foto.");
                        }
                    },
                },
            ]
        );
    };

    const renderPhotoItem = ({ item }) => (
        <View style={styles.photoItem}>
            <Image
                source={{ uri: item.uri }}
                style={styles.photoImage}
                onError={(e) => console.log("Erro ao carregar imagem:", e.nativeEvent.error)}
            />
            <View style={styles.photoDetails}>
                <Text style={styles.photoTitle}>{item.titulo_foto}</Text>
                <Text style={styles.photoDescription}>{item.descricao_foto}</Text>
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleEditPhotoPress(item)}
                    >
                        <Text style={styles.actionText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: "#c0392b" }]}
                        onPress={() => handleDeletePhoto(item.id, item.uri)}
                    >
                        <Text style={styles.actionText}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Text style={styles.albumTitle}>Meu Álbum de Fotos</Text>
            <FlatList
                data={photos}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyListText}>Nenhuma foto encontrada. Que tal tirar uma?</Text>
                )}
                renderItem={renderPhotoItem}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => setViewMode('camera')}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}