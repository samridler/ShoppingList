import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface ShoppingCategoryProps {
  category: Category;
  items: Item[];
  onItemPress: (id: number) => void;
  onItemLongPress: (id: number) => void;
}

const ShoppingCategory: React.FC<ShoppingCategoryProps> = ({
  category,
  items,
  onItemPress,
  onItemLongPress,
}) => {
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryHeader}>{category.text}</Text>
      <View style={styles.itemList}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.listItem}
            onPress={() => onItemPress(item.id)}
            onLongPress={() => onItemLongPress(item.id)}
          >
            <Text
              style={item.completed ? styles.completedText : styles.itemText}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    marginBottom: 16,
  },
  categoryHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  itemList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  listItem: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    margin: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  itemText: {
    padding: 8,
    fontSize: 16,
  },
  completedText: {
    padding: 8,
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "gray",
  },
});

export default ShoppingCategory;
