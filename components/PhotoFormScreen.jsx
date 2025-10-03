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

    // Função para voltar à tela do álbum e resetar os estados.
    const handleBack = () => {
        setViewMode("album");
        setCapturedPhoto(null);
        setFormState({ id: null, titulo_foto: "", descricao_foto: "" });
    };

    return (
        <View style={styles.formContainer}>
            {/* Título do formulário que muda dependendo se é uma edição ou nova foto. */}
            <Text style={styles.formTitle}>
                {formState.id ? "Editar Foto" : "Adicionar Nova Foto"}
            </Text>
            
            {/* Exibe a pré-visualização da foto capturada ou a ser editada. */}
            {capturedPhoto && (
                <Image source={{ uri: capturedPhoto.uri }} style={styles.preview} />
            )}

            {/* Input para o título da foto. */}
            <TextInput
                style={styles.input}
                placeholder="Título da Foto"
                value={formState.titulo_foto}
                onChangeText={(text) =>
                    setFormState({ ...formState, titulo_foto: text })
                }
            />
            {/* Input para a descrição da foto. */}
            <TextInput
                style={styles.input}
                placeholder="Descrição da Foto"
                value={formState.descricao_foto}
                onChangeText={(text) =>
                    setFormState({ ...formState, descricao_foto: text })
                }
                multiline
            />
            {/* Botão para salvar o formulário, acionando a função handleSubmitForm. */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitForm}>
                <Text style={styles.submitText}>
                    {formState.id ? "Salvar Alterações" : "Salvar Foto"}
                </Text>
            </TouchableOpacity>
            {/* Botão para voltar. */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={handleBack}
            >
                <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}