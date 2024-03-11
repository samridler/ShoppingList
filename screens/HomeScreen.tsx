// HomeScreen.tsx
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import ShoppingCategory from "../components/ShoppingCategory";
import ItemModal from "../components/ItemModal";

const HomeScreen: React.FC = () => {
  const [item, setItem] = useState<string>("");
  const [categories, setCategories] = useState<{ [key: string]: Item[] }>({});
  const [selectedItem, setSelectedItem] = useState<Item>();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const addItem = () => {
    if (item.trim() !== "" && selectedCategory !== "") {
      const updatedCategories = { ...categories };
      const categoryItems = updatedCategories[selectedCategory] || [];
      updatedCategories[selectedCategory] = [
        ...categoryItems,
        { id: Date.now(), text: item.trim(), completed: false },
      ];
      setCategories(updatedCategories);
      setItem("");
    }
  };

  const toggleItem = (categoryId: string, itemId: number) => {
    const updatedCategories = { ...categories };
    const categoryItems = updatedCategories[categoryId] || [];
    updatedCategories[categoryId] = categoryItems.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    setCategories(updatedCategories);
  };

  const openModal = (categoryId: string, itemId: number) => {
    setSelectedCategory(categoryId);
    setSelectedItem(categories[categoryId].find((item) => item.id === itemId));
    setModalVisible(true);
  };

  const saveChanges = (text: string) => {
    const updatedCategories = { ...categories };
    updatedCategories[selectedCategory] = categories[selectedCategory].map(
      (item) => (item === selectedItem ? { ...item, text } : item)
    );
    setCategories(updatedCategories);
    setModalVisible(false);
  };

  const removeItem = () => {
    const updatedCategories = { ...categories };
    updatedCategories[selectedCategory] = categories[selectedCategory].filter(
      (item) => item !== selectedItem
    );
    setCategories(updatedCategories);
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.itemInput}
        placeholder="Enter item..."
        value={item}
        onChangeText={(text) => setItem(text)}
      />
      <TextInput
        style={styles.itemInput}
        placeholder="Enter category..."
        value={selectedCategory}
        onChangeText={(text) => setSelectedCategory(text)}
      />
      <Button title="Add Item" onPress={addItem} />

      {Object.entries(categories).map(([category, items]) => (
        <ShoppingCategory
          key={category}
          category={category}
          items={items}
          onItemPress={(id) => toggleItem(category, id)}
          onItemLongPress={(id) => openModal(category, id)}
        />
      ))}

      <ItemModal
        isVisible={isModalVisible}
        item={selectedItem}
        onSave={saveChanges}
        onRemove={removeItem}
        onClose={closeModal}
      />
    </ScrollView>
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
