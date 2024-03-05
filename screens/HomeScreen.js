import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import ShoppingList from "../components/ShoppingList";
import ItemModal from "../components/ItemModal";

const HomeScreen = () => {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const addItem = () => {
    if (item.trim() !== "") {
      setItems([...items, { id: Date.now(), text: item, completed: false }]);
      setItem("");
    }
  };

  const toggleItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const openModal = (id) => {
    setSelectedItemId(id);
    setModalVisible(true);
  };

  const saveChanges = (text) => {
    const item = items.find((item) => item.id === selectedItemId);
    item.text = text;
    setModalVisible(false);
  };

  const removeItem = () => {
    setItems(items.filter((item) => item.id !== selectedItemId));
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.itemInput}
        placeholder="Enter item..."
        value={item}
        onChangeText={(text) => setItem(text)}
      />
      <Button title="Add Item" onPress={addItem} />

      <ShoppingList
        items={items}
        onItemPress={toggleItem}
        onItemLongPress={openModal}
      />

      <ItemModal
        isVisible={isModalVisible}
        onSave={saveChanges}
        onRemove={removeItem}
        onClose={closeModal}
        item={items.find((item) => item.id === selectedItemId)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default HomeScreen;
