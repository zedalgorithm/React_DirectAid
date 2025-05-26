import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, StyleSheet, Alert, Linking, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { db } from "../firebasecon/Firebase";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export default function Hotlines() {
  const [hotlines, setHotlines] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newHotline, setNewHotline] = useState({ name: '', number: '', provider: '' });
  const [selectedHotline, setSelectedHotline] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Hotlines'), 
      (querySnapshot) => {
        const hotlinesData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          console.log('Hotline data:', data);
          return {
            id: doc.id,
            ...data,
          };
        });
        setHotlines(hotlinesData);
      },
      (error) => {
        console.error("Error fetching hotlines: ", error);
        Alert.alert("Error", "Failed to load hotlines. Please try again.");
      }
    );

    return () => unsubscribe();
  }, []);

  const openModal = (hotline = null) => {
    setSelectedHotline(hotline);
    setNewHotline(hotline || { name: '', number: '', provider: '' });
    setModalVisible(true);
  };

  const saveHotline = async () => {
    if (!newHotline.name || !newHotline.number || !newHotline.provider) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      if (selectedHotline) {
        await updateDoc(doc(db, 'Hotlines', selectedHotline.id), newHotline);
      } else {
        await addDoc(collection(db, 'Hotlines'), newHotline);
      }
      setModalVisible(false);
      setNewHotline({ name: '', number: '', provider: '' });
    } catch (error) {
      console.error("Error saving hotline: ", error);
      Alert.alert("Error", "Failed to save hotline. Please try again.");
    }
  };

  const deleteHotline = async (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this hotline?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'Hotlines', id));
              setModalVisible(false);
            } catch (error) {
              console.error("Error deleting hotline: ", error);
              Alert.alert("Error", "Failed to delete hotline. Please try again.");
            }
          }
        }
      ]
    );
  };

  const callNumber = (number) => {
    console.log('Attempting to call number:', number);
    
    if (!number) {
      console.error('No number provided');
      Alert.alert('Error', 'No phone number available');
      return;
    }

    // Remove any non-numeric characters from the number
    let cleanNumber = number.replace(/[^\d+]/g, '');
    console.log('Cleaned number:', cleanNumber);

    if (cleanNumber.length === 0) {
      console.error('Invalid number after cleaning');
      Alert.alert('Error', 'Invalid phone number');
      return;
    }

    // Add the country code if it's not already there
    if (!cleanNumber.startsWith('+')) {
      cleanNumber = '+63' + cleanNumber.replace(/^0/, ''); // Assuming Philippines (+63)
    }

    console.log('Formatted number:', cleanNumber);

    if (Platform.OS === "android") {
      Linking.openURL(`tel:${cleanNumber}`);
    } else {
      Linking.openURL(`telprompt:${cleanNumber}`);
    }
  };

  const handleUnsupportedCall = (number) => {
    Alert.alert(
      'Cannot make call',
      'This device cannot make phone calls. Would you like to copy the number to your clipboard?',
      [
        {
          text: 'Yes',
          onPress: () => {
            Clipboard.setString(number);
            Alert.alert('Success', `The number ${number} has been copied to your clipboard.`);
          },
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ]
    );
  };

  const copyToClipboard = (number) => {
    Clipboard.setString(number);
    Alert.alert(
      'Cannot make call',
      `The number ${number} has been copied to your clipboard.`,
      [{ text: 'OK' }]
    );
  };

  const renderHotline = ({ item }) => {
    console.log('Rendering hotline item:', item);
    return (
      <View style={styles.hotlineItem}>
        <TouchableOpacity onPress={() => openModal(item)} style={styles.hotlineDetails}>
          <Text style={styles.hotlineText}>{item.name} ({item.provider})</Text>
          <Text style={styles.hotlineNumber}>{item.number}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => callNumber(item.number)}>
          <FontAwesome name="phone" size={24} color="green" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={hotlines}
        keyExtractor={item => item.id}
        renderItem={renderHotline}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => openModal()}>
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{selectedHotline ? 'Edit Hotline' : 'Add New Hotline'}</Text>
            <TextInput
              placeholder="Hotline Name"
              value={newHotline.name}
              onChangeText={text => setNewHotline({ ...newHotline, name: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Phone Number"
              value={newHotline.number}
              onChangeText={text => setNewHotline({ ...newHotline, number: text })}
              keyboardType="phone-pad"
              style={styles.input}
            />
            <TextInput
              placeholder="Provider"
              value={newHotline.provider}
              onChangeText={text => setNewHotline({ ...newHotline, provider: text })}
              style={styles.input}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={saveHotline}>
                <Text style={styles.buttonText}>{selectedHotline ? 'Update' : 'Add'}</Text>
              </TouchableOpacity>
              {selectedHotline && (
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteHotline(selectedHotline.id)}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    
  },
  hotlineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#333',
    marginBottom: 10,
    borderRadius: 10,
  },
  hotlineDetails: {
    flex: 1,
  },
  hotlineText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  hotlineNumber: {
    color: '#fff',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#333',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    width: 300,
    marginVertical: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
