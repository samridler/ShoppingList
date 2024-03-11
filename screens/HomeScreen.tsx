import React, { useState } from "react";
import { ScrollView, TextInput, Button, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import ShoppingCategory from "../components/ShoppingCategory";
import ItemModal from "../components/ItemModal";

const HomeScreen: React.FC = () => {
  const [item, setItem] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([
    { id: 0, text: "Fruit and Veg", items: [] },
    { id: 1, text: "Meat", items: [] },
    { id: 2, text: "Dairy", items: [] },
    { id: 3, text: "Household", items: [] },
  ]);
  const [selectedItem, setSelectedItem] = useState<Item>();
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[0]
  );
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const addItem = () => {
    if (item.trim() !== "" && selectedCategory != null) {
      selectedCategory.items = [
        ...selectedCategory.items,
        { id: Date.now(), text: item.trim(), completed: false },
      ];
      setCategories([...categories]);
      setItem("");
    }
  };

  const toggleItem = (category: Category, itemId: number) => {
    category.items = category.items.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    setCategories([...categories]);
  };

  const openModal = (category: Category, itemId: number) => {
    setSelectedCategory(category);
    setSelectedItem(category.items.find((item) => item.id === itemId));
    setModalVisible(true);
  };

  const saveChanges = (text: string) => {
    selectedCategory.items = selectedCategory.items.map((item) =>
      item === selectedItem ? { ...item, text } : item
    );
    setCategories([...categories]);
    setModalVisible(false);
  };

  const removeItem = () => {
    selectedCategory.items = selectedCategory.items.filter(
      (item) => item !== selectedItem
    );
    setCategories([...categories]);
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
      <Dropdown
        style={styles.categoryDropdown}
        data={categories}
        labelField="text"
        valueField="id"
        value={selectedCategory}
        onChange={(category) => {
          setSelectedCategory(category);
        }}
      ></Dropdown>
      <Button title="Add Item" onPress={addItem} />

      {categories.map((category) => (
        <ShoppingCategory
          key={category.id}
          category={category}
          items={category.items}
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
  categoryDropdown: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default HomeScreen;
