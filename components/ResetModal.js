import PropTypes from "prop-types";
import { Button, Modal, Text, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { resetGame } from "../store/gameSlice";

const ResetModal = ({ isVisible, onClose }) => {

    const dispatch = useDispatch();

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onDismiss={onClose}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Voulez démarrer une nouvelle partie ? La partie en cours sera perdue.</Text>
                        <View style={styles.buttonsContainer}>
                            <View style={styles.button}>
                                <Button color={'#4cc98f'} title="Yes" onPress={() => {
                                    dispatch(resetGame());
                                    onClose();
                                }}/>
                            </View>
                            <View style={styles.button}>
                                <Button color={'#adadad'} title="No" onPress={() => {
                                    onClose();
                                }}/>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 6,
    },
    modalText: {
        fontSize: 18,
    },
    modalContent: {
        alignItems: 'stretch',
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
    },
    button: {
        flex: 1,
        paddingHorizontal: 15
    }
});

ResetModal.propTypes = {
    isVisible: PropTypes.bool,
    onClose: PropTypes.func,
};

export default ResetModal;