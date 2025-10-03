import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    // --- Estilos de Layout Gerais ---
    container: {
        flex: 1,
        backgroundColor: "#2c3e50",
        justifyContent: "center",
        paddingTop: 40,
    },
    permissionText: {
        textAlign: "center",
        marginBottom: 10,
        color: "#fff",
    },

    // --- Estilos do Álbum ---
    albumTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ecf0f1",
        textAlign: "center",
        marginBottom: 20,
    },
    emptyListText: {
        color: "#bdc3c7",
        textAlign: "center",
        marginTop: 50,
        fontSize: 16,
    },
    photoItem: {
        flexDirection: "row",
        backgroundColor: "#34495e",
        borderRadius: 10,
        marginHorizontal: 15,
        marginBottom: 15,
        padding: 10,
        alignItems: "center",
    },
    photoImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginRight: 10,
    },
    photoDetails: {
        flex: 1,
    },
    photoTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    photoDescription: {
        color: "#bdc3c7",
        fontSize: 14,
    },
    actions: {
        flexDirection: "row",
        marginTop: 10,
    },
    actionButton: {
        backgroundColor: "#2980b9",
        padding: 8,
        borderRadius: 5,
        marginRight: 10,
    },
    actionText: {
        color: "#fff",
        fontSize: 12,
    },
    addButton: {
        position: "absolute",
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#1abc9c",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        zIndex: 10,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 30,
        lineHeight: 30,
    },

    // --- Estilos da Câmera ---
    camera: {
        flex: 1,
    },
    controlsContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        paddingBottom: 40,
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "rgba(0,0,0,0.4)",
        paddingVertical: 20,
        width: "100%",
    },
    backCameraBtn: {
        position: 'absolute',
        top: 60,
        left: 20,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 5,
        zIndex: 10,
    },
    backCameraText: {
        color: 'white',
        fontSize: 16,
    },
    button: {
        padding: 15,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },

    // --- Estilos do Formulário ---
    formContainer: {
        flex: 1,
        backgroundColor: "#2c3e50",
        paddingTop: 40,
    },
    formTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#ecf0f1",
        textAlign: "center",
        marginBottom: 20,
    },
    preview: {
        width: "90%",
        height: 250,
        resizeMode: "cover",
        marginBottom: 20,
        borderRadius: 10,
        alignSelf: "center",
    },
    input: {
        width: "90%",
        backgroundColor: "#ecf0f1",
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        alignSelf: "center",
    },
    submitButton: {
        width: "90%",
        padding: 15,
        backgroundColor: "#1abc9c",
        borderRadius: 8,
        alignSelf: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    submitText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    backButton: {
        width: "90%",
        padding: 15,
        backgroundColor: "#95a5a6",
        borderRadius: 8,
        alignSelf: "center",
        alignItems: "center",
    },
    backText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});