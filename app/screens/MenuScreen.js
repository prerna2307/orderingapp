import { View, Text, FlatList, StyleSheet, Image, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import data from '../config/data'
import { styles } from './styles';

export default function MenuScreen({ navigation }) {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(data.items);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      const updatedItems = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(updatedItems);
    } else {
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...item, quantity: 1 },
      ]);
    }
  };

  const removeItemFromCart = (itemId) => {
    const updatedItems = cartItems.filter((cartItem) => cartItem.id !== itemId);
    setCartItems(updatedItems);
  };

  const increaseQuantity = (itemId) => {
    const updatedItems = cartItems.map((cartItem) =>
      cartItem.id === itemId
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCartItems(updatedItems);
  };

  const decreaseQuantity = (itemId) => {
    const updatedItems = cartItems.map((cartItem) =>
      cartItem.id === itemId && cartItem.quantity > 1
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    setCartItems(updatedItems);
  };

  const searchItems = () => {
    const filteredItems = data.items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.item_type.toLowerCase() === searchQuery.toLowerCase() ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredItems);
  };
  const Item = ({ item }) => {
    const { name, price, description, category, image, item_type } = item;
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    return (
      <View style={styles.item}>
        {image ? <Image
          style={styles.onlineFoodImage}
          source={{
            uri: "https://i.pinimg.com/564x/53/d2/d7/53d2d70568b136b43329f26be5703f40.jpg",
          }}
        />
          : <Image
            style={styles.onlineFoodImage}
            source={require("../assets/images/food.png")}
          />
        }
        <View style={styles.rightContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.category}>{category}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
          <Text style={styles.price}>Rs. {price}</Text>
          <Text style={styles[item_type]}>{item_type}</Text>
          {existingItem ? (
            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.quantityBtn} onPress={() => {
                if (existingItem.quantity == 1) {
                  removeItemFromCart(item.id)
                } else {
                  decreaseQuantity(item.id)
                }
              }}>
                <Text style={styles.textStyle}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantitySize}>{existingItem.quantity}</Text>
              <TouchableOpacity style={styles.quantityBtn} onPress={() => increaseQuantity(item.id)}>
                <Text style={styles.textStyle}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.addToCartBtn} onPress={() => addItemToCart(item)}>
              <Text style={styles.textStyle}>Add to Cart</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by category or item name"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Button title="Search" onPress={searchItems} />
      <FlatList
        data={searchResults}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity onPress={() => { navigation.navigate('Cart', { cartItems }); }} style={styles.bottonContainer}>
        <Text style={styles.textStyle}>View Cart</Text>
      </TouchableOpacity>
    </View>
  )
}

