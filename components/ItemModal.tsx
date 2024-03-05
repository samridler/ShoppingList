import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import Modal from "react-native-modal";

interface ItemModalProps {
  isVisible: boolean;
  item: Item;
  onSave: (text: string) => void;
  onRemove: () => void;
  onClose: () => void;
}

const ItemModal: React.FC<ItemModalProps> = ({
  isVisible,
  item,
  onSave,
  onRemove,
  onClose,
}) => {
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    setEditedText(item ? item.text : "");
  }, [item]);

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <TextInput
          style={styles.modalInput}
          value={editedText}
          onChangeText={(text) => setEditedText(text)}
        />
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={() => onSave(editedText)} />
          <Button title="Delete" onPress={onRemove} color="red" />
          <Button title="Cancel" onPress={onClose} color="gray" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
  modalInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default ItemModal;
