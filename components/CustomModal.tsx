import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  children,
}) => {
  const handleGesture = (event: any) => {
    // Close modal when drag down is detected
    if (event.nativeEvent.translationY > 100) {
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Close the modal when clicking outside the modal content */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          {/* Inside modal content shouldn't close the modal */}
          <PanGestureHandler
            onGestureEvent={handleGesture}
            onHandlerStateChange={({ nativeEvent }) => {
              if (
                nativeEvent.state === State.END &&
                nativeEvent.translationY > 100
              ) {
                onClose();
              }
            }}
          >
            <View style={styles.modalContent}>
              {/* Handle the draggable line at the top */}
              <View style={styles.dragLine} />
              {children}
            </View>
          </PanGestureHandler>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 300,
  },
  dragLine: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default CustomModal;
