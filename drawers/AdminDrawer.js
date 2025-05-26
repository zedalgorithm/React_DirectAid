// // DrawerContent.js
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { Ionicons } from 'react-native-vector-icons';
// import profileImage from '../assets/images/profile.png'; // Placeholder for profile image

// const AdminDrawer = ({ navigation }) => {
//   return (
//     <View style={styles.drawerContent}>
//       <View style={styles.profileSection}>
//         <Image source={profileImage} style={styles.profileImage} />
//         <Text style={styles.profileName}>Muzan Kibutsuji</Text>
//         <Text style={styles.profileEmail}>zedalgorithmhbot01@gmail.com</Text>
//       </View>
//       <View style={styles.separator} />

// <View style={styles.menuSection}>
//   <Text style={styles.menuTitle}>Emergency</Text>
//   <TouchableOpacity onPress={() => navigation.navigate("AdminDashboard")}>
//     <View style={styles.menuItem}>
//       <Ionicons name="map-outline" size={24} color="#000" />
//       <Text style={styles.menuItemText}>Map</Text>
//     </View>
//   </TouchableOpacity>
  
//   <TouchableOpacity onPress={() => navigation.navigate("IncidentReport")}>
//     <View style={styles.menuItem}>
//       <Ionicons name="medkit-outline" size={24} color="#000" />
//       <Text style={styles.menuItemText}>Incident Report</Text>
//     </View>
//   </TouchableOpacity>

//   <Text style={styles.menuTitle}>Account</Text>
//   <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
//     <View style={styles.menuItem}>
//       <Ionicons name="person-outline" size={24} color="#000" />
//       <Text style={styles.menuItemText}>Profile</Text>
//     </View>
//   </TouchableOpacity>

//   <TouchableOpacity onPress={() => navigation.navigate("Scan")}>
//     <View style={styles.menuItem}>
//       <Ionicons name="qr-code-outline" size={24} color="#000" />
//       <Text style={styles.menuItemText}>Scan Q.R</Text>
//     </View>
//   </TouchableOpacity>

//   <Text style={styles.menuTitle}>Others</Text>
//   <TouchableOpacity onPress={() => navigation.navigate("AboutUs")}>
//     <View style={styles.menuItem}>
//       <Ionicons name="information-circle-outline" size={24} color="#000" />
//       <Text style={styles.menuItemText}>About Us</Text>
//     </View>
//   </TouchableOpacity>

//   <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//     <View style={styles.menuItem}>
//       <Ionicons name="exit-outline" size={24} color="#000" />
//       <Text style={styles.menuItemText}>Logout</Text>
//     </View>
//   </TouchableOpacity>
// </View>
// </View>
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

// export default AdminDrawer;


import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { auth, firestore } from '../firebasecon/Firebase'; // Adjust the path if needed
import { doc, getDoc } from 'firebase/firestore';
import profileImage from '../assets/images/profile.png'; // Placeholder for profile image


const AdminDrawer = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: 'Loading...',
    email: 'Loading...'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = doc(firestore, 'Accounts', user.uid);
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            console.log('User data:', userSnapshot.data()); // Log user data for debugging
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

  return (
    <View style={styles.drawerContent}>
      {loading ? (
        <ActivityIndicator size="large" color="#42f54b" />
      ) : (
        <View style={styles.profileSection}>
        <Image source={userData?.photo ? { uri: userData.photo } : profileImage} style={styles.profileImage} />
          <Text style={styles.profileName}>{userData.name}</Text>
          <Text style={styles.profileEmail}>{userData.email}</Text>
        </View>
      )}
      <View style={styles.separator} />

      <View style={styles.menuSection}>
        <Text style={styles.menuTitle}>Emergency</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AdminDashboard")}>
          <View style={styles.menuItem}>
            <Ionicons name="map-outline" size={24} color="#000" />
            <Text style={styles.menuItemText}>Map</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate("incidentreport")}>
          <View style={styles.menuItem}>
            <Ionicons name="medkit-outline" size={24} color="#000" />
            <Text style={styles.menuItemText}>Incident Report</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.menuTitle}>Account</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AdminProfiles")}>
          <View style={styles.menuItem}>
            <Ionicons name="person-outline" size={24} color="#000" />
            <Text style={styles.menuItemText}>Profile</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Scan")}>
          <View style={styles.menuItem}>
            <Ionicons name="qr-code-outline" size={24} color="#000" />
            <Text style={styles.menuItemText}>Scan Q.R</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.menuTitle}>Others</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <View style={styles.menuItem}>
          <Ionicons name="settings" size={24} color="black" />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableOpacity>

        
        <TouchableOpacity onPress={() => navigation.navigate("AboutUs")}>
          <View style={styles.menuItem}>
            <Ionicons name="information-circle-outline" size={24} color="#000" />
            <Text style={styles.menuItemText}>About Us</Text>
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
    marginBottom: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    backgroundColor: '#ccc', // Change to your desired color
    marginVertical: 10,
  },
});

export default AdminDrawer;
