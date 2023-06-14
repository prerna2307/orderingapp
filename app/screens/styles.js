import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  rowContainer:{
    flexDirection:"row",
    justifyContent:"space-evenly"
  },
  totalContainer:{
    justifyContent:"flex-end",
    alignItems:"flex-end"
  },
  onlineFoodImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  totalSize:{
    fontSize:15,
    color:"#000",
    marginBottom:2
  },
  quantitySize: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 5
  },
  addToCartBtn: {
    backgroundColor: "#ef6a6a",
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10
  },
  textStyle: {
    fontSize: 16,
    color: "white"
  },
  quantityContainer: {
    flexDirection: "row",
    marginTop: 10
  },
  quantityBtn: {
    backgroundColor: "#ef6a6a",
    width: 30,
    alignItems: "center"
  },
  bottonContainer: {
    backgroundColor: "#ef6a6a",
    alignItems: "center",
    padding: 10
  },
  name: {
    fontSize: 18,
    color: "black"
  },
  category: {
    fontSize: 16,
  },
  veg: {
    fontSize: 20,
    color: "green"
  },
  "non-veg": {
    fontSize: 20,
    color: "red"
  },
  price: {
    fontSize: 20,
    color: "black"
  },
  rightContainer: {
    flex: 1,
    marginLeft: 10
  },
  item: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "gray",
    padding: 10,
    flexDirection: "row",
    marginVertical: 8,
  },
  title: {
    fontSize: 32,
  },
});