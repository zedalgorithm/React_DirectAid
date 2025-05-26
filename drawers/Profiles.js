


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Image, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { Ionicons } from 'react-native-vector-icons';
// import DrawerContent from './DrawerContent'; // Adjust the path as needed
// import { auth, firestore } from '../firebasecon/Firebase';
// import { doc, getDoc } from 'firebase/firestore';

// const Drawer = createDrawerNavigator();

// const ProfileScreen = ({ navigation }) => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const user = auth.currentUser;
//       if (user) {
//         try {
//           const userDoc = doc(firestore, 'Accounts', user.uid);
//           const userSnapshot = await getDoc(userDoc);
//           if (userSnapshot.exists()) {
//             setUserData(userSnapshot.data());
//           } else {
//             console.log('No user data found!');
//           }
//         } catch (error) {
//           console.error('Error fetching user data: ', error);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         console.log('No user is logged in!');
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
//         <Ionicons name="menu" size={24} color="#000" />
//       </TouchableOpacity>
//       <View style={styles.profileContainer}>
//         <Image
//           source={userData?.photo ? { uri: userData.photo } : require('../assets/images/profile.png')} // Use user's image or placeholder
//           style={styles.profileImage}
//         />
//         <Button title="Change Photo" onPress={() => {}} color="#2a9d8f" />
//         <Text style={styles.label}>Name:</Text>
//         <Text style={styles.value}>{userData?.name || 'N/A'}</Text>
//         <Text style={styles.label}>Email Address:</Text>
//         <Text style={styles.value}>{userData?.email || 'N/A'}</Text>
//         <Text style={styles.label}>Religion:</Text>
//         <Text style={styles.value}>{userData?.religion || 'N/A'}</Text>
//         <Text style={styles.label}>Gender:</Text>
//         <Text style={styles.value}>{userData?.gender || 'N/A'}</Text>
//         <Text style={styles.label}>Home Address:</Text>
//         <Text style={styles.value}>{userData?.address || 'N/A'}</Text>
//         <Text style={styles.label}>Birth Date:</Text>
//         <Text style={styles.value}>{userData?.dateOfBirth || 'N/A'}</Text>
//         <Text style={styles.label}>Age:</Text>
//         <Text style={styles.value}>{userData?.age || 'N/A'}</Text>
//         <Text style={styles.label}>Phone Number:</Text>
//         <Text style={styles.value}>{userData?.phoneNumber || 'N/A'}</Text>
//       </View>
//     </View>
//   );
// };

// const Profile = () => {
//   return (
//     <Drawer.Navigator
//       drawerPosition="left"
//       drawerType="slide"
//       overlayColor="transparent"
//       drawerStyle={styles.drawer}
//       drawerContent={(props) => <DrawerContent {...props} />}
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Drawer.Screen name="Profile" component={ProfileScreen} />
//     </Drawer.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   menuButton: {
//     position: 'absolute',
//     top: 40,
//     left: 20,
//     zIndex: 1,
//   },
//   profileContainer: {
//     padding: 20,
//     alignItems: 'center',
//     marginTop: 80,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   value: {
//     fontSize: 16,
//   },
//   drawer: {
//     width: '75%',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Profile;




import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from 'react-native-vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import DrawerContent from './DrawerContent'; // Adjust the path as needed
import { auth, firestore } from '../firebasecon/Firebase';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Drawer = createDrawerNavigator();

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
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
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={24} color="#000" />
      </TouchableOpacity> */}
      <View style={styles.profileContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={userData?.photo ? { uri: userData.photo } : require('../assets/images/profile.png')}
          style={styles.profileImage}
        />
         </View>
         
        <TouchableOpacity onPress={pickImage}  style={styles.cameraIcon}>
        <EvilIcons name="camera" size={30} color="black" position="center" />
        </TouchableOpacity>
        </View>
        <Text style={styles.valuee}>{userData?.name || 'N/A'}</Text>
        <View style={styles.profileContain}>
       
        <View style={styles.row}>
        <Text style={styles.label}>Email Address: </Text>
        <Text style={styles.value}>{userData?.email || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
        <Text style={styles.label}>Religion:</Text>
        <Text style={styles.value}>{userData?.religion || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
        <FontAwesomeIcon icon="fa-solid fa-venus-mars" style={{color: "#737578",}} />
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>{userData?.gender || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
        <Text style={styles.label}>Home Address:</Text>
        <Text style={styles.value}>{userData?.address || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
        <Text style={styles.label}>Birth Date:</Text>
        <Text style={styles.value}>{userData?.dateOfBirth || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{userData?.age || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
    <Text style={styles.label}>Phone Number:</Text>
    <Text style={styles.value}>{userData?.phoneNumber ? `+63${userData.phoneNumber}` : 'N/A'}</Text>
  </View>
      </View>
    </View>
   
  );
};

const Profile = () => {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerType="slide"
      overlayColor="transparent"
      drawerStyle={styles.drawer}
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
      }}
    >
      <Drawer.Screen name="Profile" component={ProfileScreen} />
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
    alignItems: "flex-start",
    marginLeft: 20,
    marginTop: 20,
   
  },
  profileContain: {
    
    alignItems: "flex-start",
    marginLeft: 40,
  
   
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 1,
    borderWidth: 1,
    borderColor: 'black',
  },
  imageContainer: {
    position: 'relative',
    
    marginBottom: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    
    
  },
  value: {
    fontSize: 16,
    flex: 1,
  },
  valuee: {
    fontSize: 24,
   bottom: 130,
   marginLeft: 200,
   fontFamily: "Roboto",
   fontWeight: 'bold',
  },
  drawer: {
    width: '75%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  cameraIcon: {
    position: 'absolute',
    bottom: 25,
    right: 220,
   elevation: 50,
    borderWidth: 1,
    padding: 3,
    borderRadius: 35,
   backgroundColor:'#c7c9c9',
  
   
   
    
  },
});

export default Profile;
