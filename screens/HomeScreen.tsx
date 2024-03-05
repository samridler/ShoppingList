import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import ShoppingList from "../components/ShoppingList";
import ItemModal from "../components/ItemModal";

const HomeScreen: React.FC = () => {
  const [item, setItem] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item>();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const addItem = () => {
    if (item.trim() !== "") {
      setItems([...items, { id: Date.now(), text: item.trim(), completed: false }]);
      setItem("");
    }
  };

  const toggleItem = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const openModal = (id: number) => {
    setSelectedItem(items.find(item => item.id === id));
    setModalVisible(true);
  };

  const saveChanges = (text: string) => {
    setItems(items.map((item) =>
      item === selectedItem ? { ...item, text } : item
    ));
    setModalVisible(false);
  };

  const removeItem = () => {
    setItems(items.filter((item) => item !== selectedItem));
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
        item={selectedItem}
        onSave={saveChanges}
        onRemove={removeItem}
        onClose={closeModal}
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
