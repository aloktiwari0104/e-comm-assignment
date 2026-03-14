import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const PRODUCTS = [
  { id: '1', name: 'Product 1', price: 100 },
  { id: '2', name: 'Product 2', price: 200 },
  { id: '3', name: 'Product 3', price: 300 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('products');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [profile] = useState({ name: 'John Doe', email: 'john@example.com' });

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const addToWishlist = (product) => {
    setWishlist([...wishlist, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <Button title="Profile" onPress={() => setActiveTab('profile')} />
        <Button title="Products" onPress={() => setActiveTab('products')} />
        <Button title="Cart" onPress={() => setActiveTab('cart')} />
        <Button title="Wishlist" onPress={() => setActiveTab('wishlist')} />
      </View>
      {activeTab === 'profile' && (
        <View style={styles.section}>
          <Text style={styles.heading}>Profile</Text>
          <Text>Name: {profile.name}</Text>
          <Text>Email: {profile.email}</Text>
        </View>
      )}
      {activeTab === 'products' && (
        <View style={styles.section}>
          <Text style={styles.heading}>Products</Text>
          <FlatList
            data={PRODUCTS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>{item.name} - ${item.price}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => addToCart(item)} style={styles.button}>
                    <Text>Add to Cart</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => addToWishlist(item)} style={styles.button}>
                    <Text>Add to Wishlist</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      )}
      {activeTab === 'cart' && (
        <View style={styles.section}>
          <Text style={styles.heading}>Cart</Text>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>{item.name} - ${item.price}</Text>
                <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.button}>
                  <Text>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
      {activeTab === 'wishlist' && (
        <View style={styles.section}>
          <Text style={styles.heading}>Wishlist</Text>
          <FlatList
            data={wishlist}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>{item.name} - ${item.price}</Text>
                <TouchableOpacity onPress={() => removeFromWishlist(item.id)} style={styles.button}>
                  <Text>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  section: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    backgroundColor: '#eee',
    padding: 5,
    marginLeft: 5,
    borderRadius: 5,
  },
});
