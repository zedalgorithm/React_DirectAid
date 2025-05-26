import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from 'react-native-vector-icons';
import AdminDrawer from './AdminDrawer'; // Adjust the path as needed
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebasecon/Firebase'; // Adjust the path if needed

const Drawer = createDrawerNavigator();

const AdminProfiless = ({ navigation }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = doc(firestore, 'Accounts', user.uid);
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            setUserData(userSnapshot.data());
          } else {
            console.log('No user data found!');
          }
        } catch (error) {
          console.error('Error fetching user data: ', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log('No user is logged in!');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const source = { uri: result.assets[0].uri };
      handleImageUpload(source.uri);
    }
  };

  const handleImageUpload = async (uri) => {
    setLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const user = auth.currentUser;
    const storage = getStorage();
    const storageRef = ref(storage, `profile_pictures/${user.uid}`);

    uploadBytes(storageRef, blob)
      .then(async (snapshot) => {
        const downloadURL = await getDownloadURL(storageRef);
        await updateProfilePicture(downloadURL);
      })
      .catch((error) => {
        console.error('Error uploading image: ', error);
        setLoading(false);
      });
  };

  const updateProfilePicture = async (downloadURL) => {
    const user = auth.currentUser;
    if (user) {
      const userDoc = doc(firestore, 'Accounts', user.uid);
      try {
        await updateDoc(userDoc, { photo: downloadURL });
        setUserData({ ...userData, photo: downloadURL });
        Alert.alert('Profile picture updated successfully!');
      } catch (error) {
        console.error('Error updating profile picture: ', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#42f54b" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <Image
          source={userData.photo ? { uri: userData.photo } : require('../assets/images/profile.png')} // Use user's image or placeholder
          style={styles.profileImage}
        />
        <Button title="Change Photo" onPress={pickImage} color="#2a9d8f" />
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{userData.name}</Text>
        <Text style={styles.label}>Email Address:</Text>
        <Text style={styles.value}>{userData.email}</Text>
        <Text style={styles.label}>Religion:</Text>
        <Text style={styles.value}>{userData.religion}</Text>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>{userData.gender}</Text>
        <Text style={styles.label}>Home Address:</Text>
        <Text style={styles.value}>{userData.address}</Text>
        <Text style={styles.label}>BirthDate:</Text>
        <Text style={styles.value}>{userData.dateOfBirth}</Text>
        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{userData.age}</Text>
        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>{userData.phoneNumber}</Text>
      </View>
    </View>
  );
};

const AdminProfiles = () => {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerType="slide"
      overlayColor="transparent"
      drawerStyle={styles.drawer}
      drawerContent={(props) => <AdminDrawer {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="AdminProfiles" component={AdminProfiless} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  profileContainer: {
    padding: 20,
    alignItems: 'center',
    marginTop: 80,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
  },
  drawer: {
    width: '75%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AdminProfiles;
