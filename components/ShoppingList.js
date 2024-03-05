import React from "react";
import { FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";

const ShoppingList = ({ items, onItemPress, onItemLongPress }) => {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => onItemPress(item.id)}
          onLongPress={() => onItemLongPress(item.id)}
        >
          <Text style={item.completed ? styles.completedText : styles.itemText}>
            {item.text}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    margin: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
  completedText: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "gray",
  },
});

export default ShoppingList;
