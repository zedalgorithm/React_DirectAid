// // DrawerContent.js
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { Ionicons } from 'react-native-vector-icons';
// import profileImage from '../assets/images/profile.png'; // Placeholder for profile image

// const DrawerContent = ({ navigation }) => {
//   return (
//     <View style={styles.drawerContent}>
//       <View style={styles.profileSection}>
//         <Image source={profileImage} style={styles.profileImage} />
//         <Text style={styles.profileName}>Muzan Kibutsuji</Text>
//         <Text style={styles.profileEmail}>zedalgorithmhbot01@gmail.com</Text>
//       </View>
//       <View style={styles.separator} />
//       <View style={styles.menuSection}>
//         <Text style={styles.menuTitle}>Emergency</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('dashboard')}>
//           <View style={styles.menuItem}>
//             <Ionicons name="medkit-outline" size={24} color="#000" />
//             <Text style={styles.menuItemText}>Send Help</Text>
//           </View>
//         </TouchableOpacity>
//         <Text style={styles.menuTitle}>Account</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
//           <View style={styles.menuItem}>
//             <Ionicons name="person-outline" size={24} color="#000" />
//             <Text style={styles.menuItemText}>Profile</Text>
//           </View>
//         </TouchableOpacity>
//         <Text style={styles.menuTitle}>Others</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
//           <View style={styles.menuItem}>
//             <Ionicons name="information-circle-outline" size={24} color="#000" />
//             <Text style={styles.menuItemText}>About Us</Text>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//           <View style={styles.menuItem}>
//             <Ionicons name="exit-outline" size={24} color="#000" />
//             <Text style={styles.menuItemText}>Logout</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   drawerContent: {
//     flex: 1,
//     backgroundColor: '#FFF',
//     padding: 20,
//   },
//   profileSection: {
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   profileImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//   },
//   profileName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   profileEmail: {
//     fontSize: 14,
//     color: '#666',
//   },
//   menuSection: {
//     flex: 1,
//   },
//   menuTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   menuItemText: {
//     fontSize: 16,
//     marginLeft: 10,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#ccc', // Change to your desired color
//     marginVertical: 10,
//   },
// });

// export default DrawerContent;

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { auth, firestore } from '../firebasecon/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import profileImage from '../assets/images/profile.png'; // Placeholder for profile image
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from '@expo/vector-icons/Feather';
import Foundation from '@expo/vector-icons/Foundation';



const DrawerContent = ({ navigation }) => {
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.drawerContent}>
      <View style={styles.profileSection}>
        <Image source={userData?.photo ? { uri: userData.photo } : profileImage} style={styles.profileImage} />
        <Text style={styles.profileName}>{userData?.name || 'Muzan Kibutsuji'}</Text>
        <Text style={styles.profileEmail}>{userData?.email || 'zedalgorithmhbot01@gmail.com'}</Text>
      </View>

      <View style={styles.separator} />
      <View style={styles.menuSection}>
        <Text style={styles.menuTitle}>Emergency</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.menuItem}>
            <Ionicons name="person-outline" size={24} color="#000" />
            <Text style={styles.menuItemText}>My Account</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Hotlines')}>
          <View style={styles.menuItem}>
          <Foundation name="telephone" size={24} color="black" />
            <Text style={styles.menuItemText}>Hotlines</Text>
          </View>
        </TouchableOpacity>
        {/* <Text style={styles.menuTitle}>Others</Text> */}
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <View style={styles.menuItem}>
          <Ionicons name="settings" size={24} color="black" />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('About')}>
          <View style={styles.menuItem}>
          <Feather name="help-circle" size={24} color="black" />
            <Text style={styles.menuItemText}>About</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={async () => {
  try {
    
    const currentRoute = navigation.getState().routes[navigation.getState().index].name;
    await AsyncStorage.setItem('lastRoute', currentRoute);
    await AsyncStorage.removeItem('user-info');  // Clears the user data
    await AsyncStorage.removeItem('lastRoute');
    navigation.navigate('Login');
  } catch (error) {
    console.log('Error saving last route:', error);
  }
}}>
          <View style={styles.menuItem}>
            <Ionicons name="exit-outline" size={24} color="#000" />
            <Text style={styles.menuItemText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  profileSection: {
    marginBottom: 10,
    alignItems: 'center',
    marginTop: 25,
  },
  profileImage: {
    width: 127,
    height: 127,
    borderRadius: 99999,
    
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  menuSection: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DrawerContent;
