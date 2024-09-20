import React from "react";
import { Modal, StyleSheet, View } from "react-native";
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
      <View style={styles.overlay}>
        <View style={styles.modalContentWrapper}>
          {/* Handle the draggable line at the top */}
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
            <View style={styles.dragLine} />
          </PanGestureHandler>

          {/* Inside modal content */}
          <View style={styles.modalContent}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContentWrapper: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 300,
  },
  modalContent: {},
  dragLine: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
    alignSelf: "center",
    marginTop: 10,
  },
});

export default CustomModal;
