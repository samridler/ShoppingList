import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface ShoppingListProps {
  items: Item[];
  onItemPress: (id: number) => void;
  onItemLongPress: (id: number) => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({
  items,
  onItemPress,
  onItemLongPress,
}) => {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.listItem}
          onPress={() => onItemPress(item.id)}
          onLongPress={() => onItemLongPress(item.id)}
        >
          <Text style={item.completed ? styles.completedText : styles.itemText}>
            {item.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default ShoppingList;
