import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles';
import data from '../config/data';

export default function CartScreen({ route }) {
  const { cartItems } = route.params;
  const [taxApplied, setTaxApplied] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  useEffect(() => {
    const grandTotal = cartItems.reduce((accumulator, item) => {
      return accumulator + (item.price*item.quantity);
    }, 0);
    setGrandTotal(grandTotal);
    const percentage = data?.tax_applicable?.type == "percentage" && data.tax_applicable.value;
    if (percentage) {
      setTaxApplied((grandTotal * percentage) / 100)
    }
  }, [cartItems])


  const Item = ({ item }) => {
    const { name, price, quantity, category, image, item_type } = item;
    return (
      <View style={styles.item}>
        <View>
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
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles[item_type]}>{item_type}</Text>
        </View>

        <View style={styles.rightContainer}>

        </View>
        <View style={styles.rightContainer}>
          <Text>{price}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text>{quantity}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text>{price * quantity}</Text>
        </View>
      </View>
    )
  };
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text>Item</Text>
        <Text>Net Price</Text>
        <Text>Qty</Text>
        <Text>Value</Text>
      </View>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.id}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalSize}>Item Subtotal :- {grandTotal}</Text>
        <Text style={styles.totalSize}>Tax applied :- {taxApplied}</Text>
        <Text style={styles.totalSize}>Grand total :- {grandTotal + taxApplied}</Text>
      </View>
      <TouchableOpacity onPress={() => { alert(JSON.stringify(cartItems)) }} style={styles.bottonContainer}>
        <Text style={styles.textStyle}>Checkout</Text>
      </TouchableOpacity>
    </View>
  )
}