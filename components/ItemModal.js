import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import Modal from "react-native-modal";

const ItemModal = ({ isVisible, onSave, onRemove, onClose, item }) => {
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    setEditedText(item ? item.text : "");
  }, [item]);

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <TextInput
          style={styles.modalInput}
          value={editedText}
          onChangeText={(text) => setEditedText(text)}
        />
        <Button title="Save" onPress={() => onSave(editedText)} />
        <Button title="Delete" onPress={onRemove} />
        <Button title="Cancel" onPress={onClose} />
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
});

export default ItemModal;
