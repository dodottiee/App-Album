import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const styles = globalStyles;

export default function PhotoFormScreen({ 
    formState, 
    setFormState, 
    handleSubmitForm, 
    capturedPhoto, 
    setViewMode,
    setCapturedPhoto
}) {

    const handleBack = () => {
        setViewMode("album");
        setCapturedPhoto(null);
        setFormState({ id: null, titulo_foto: "", descricao_foto: "" });
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.formTitle}>
                {formState.id ? "Editar Foto" : "Adicionar Nova Foto"}
            </Text>
            
            {capturedPhoto && (
                <Image source={{ uri: capturedPhoto.uri }} style={styles.preview} />
            )}

            <TextInput
                style={styles.input}
                placeholder="Título da Foto"
                value={formState.titulo_foto}
                onChangeText={(text) =>
                    setFormState({ ...formState, titulo_foto: text })
                }
            />
            <TextInput
                style={styles.input}
                placeholder="Descrição da Foto"
                value={formState.descricao_foto}
                onChangeText={(text) =>
                    setFormState({ ...formState, descricao_foto: text })
                }
                multiline
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitForm}>
                <Text style={styles.submitText}>
                    {formState.id ? "Salvar Alterações" : "Salvar Foto"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.backButton}
                onPress={handleBack}
            >
                <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}