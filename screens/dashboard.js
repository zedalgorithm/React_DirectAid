

// // export default Dashboard;


// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { Ionicons } from 'react-native-vector-icons';
// import gifImage from '../assets/images/gifbutton.gif'; // Adjust the path as needed
// import profileImage from '../assets/images/profile.png'; // Placeholder for profile image

// const Drawer = createDrawerNavigator();

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
//         <TouchableOpacity onPress={() => navigation.navigate('UserDashboard')}>
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

// const Dashboard = () => {
//   const navigation = useNavigation();
//   const [showAlert, setShowAlert] = useState(false);

//   const handleEmergencyPress = () => {
//     navigation.navigate('UserDashboard');
//   };

//   const handleEmergencyClick = () => {
//     setShowAlert(true);
//     setTimeout(() => {
//       setShowAlert(false);
//     }, 2000);
//   };

//   React.useLayoutEffect(() => {
//     navigation.setOptions({
//       headerShown: false,
//     });
//   }, [navigation]);

//   return (
//     <Drawer.Navigator
//       drawerPosition="left"
//       drawerType="slide"
//       overlayColor="transparent"
//       drawerStyle={styles.drawer}
//       drawerContent={(props) => <DrawerContent {...props} />}
//     >
//       <Drawer.Screen name="Menu">
//         {() => (
//           <View style={styles.container}>
//             <TouchableOpacity
//               style={styles.menuButton}
//               onPress={() => navigation.openDrawer()}
//             >
                 
//             </TouchableOpacity>
//             <Text style={styles.heading}>Having an Emergency?</Text>
//             <Text style={styles.subHeading}>Press and hold the button below.</Text>
//             <TouchableOpacity
//               style={styles.emergencyButton}
//               onPress={handleEmergencyClick}
//               onLongPress={handleEmergencyPress}
//             >
//               <Image
//                 source={gifImage}
//                 style={styles.gif}
//               />
//             </TouchableOpacity>
//             {showAlert && (
//               <Text style={styles.alertText}>Please long press or hold the button.</Text>
//             )}
//           </View>
//         )}
//       </Drawer.Screen>
//     </Drawer.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 10,
//   },
//   subHeading: {
//     fontSize: 16,
//     color: '#999',
//     marginBottom: 30,
//   },
//   emergencyButton: {
//     width: 300,
//     height: 300,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   gif: {
//     width: 450,
//     height: 450,
//   },
//   alertText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#FF0000',
//   },
//   drawer: {
//     width: '75%',
//   },
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

// export default Dashboard;


import React, { useState, useEffect, useCallback } from 'react';

import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from 'react-native-vector-icons';
import gifImage from '../assets/images/gifbutton.gif'; // Adjust the path as needed
import profileImage from '../assets/images/profile.png'; // Placeholder for profile image
import { auth, firestore } from '../firebasecon/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { color } from 'react-native-elements/dist/helpers';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from "expo-location";
import axios from "axios";
const MAPBOX_API_KEY = 'pk.eyJ1IjoiemVkZDEyMyIsImEiOiJjbWI0Z3J4a2UxcTFiMmxxdXY4YXhxc3R2In0.7O2s8eB0ULX79aVaO3g6Eg';
import Feather from '@expo/vector-icons/Feather';
import Foundation from '@expo/vector-icons/Foundation';


const Drawer = createDrawerNavigator();

const DrawerContent = ({ navigation, userData }) => {
  return (
    <View style={styles.drawerContent}>
      <View style={styles.profileSection}>
        <Image source={userData?.photo ? { uri: userData.photo } : profileImage} style={styles.profileImage} />
        <Text style={styles.profileName}>{userData?.name || 'Muzan Kibutsuji'}</Text>
        <Text style={styles.profileEmail}>{userData?.email || 'zedalgorithmhbot01@gmail.com'}</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.menuSection}>
        {/* <Text style={styles.menuTitle}>Emergency</Text> */}
       
        {/* <Text style={styles.menuTitle}>Account</Text> */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.menuItem}>
            <Ionicons name="person-outline" size={24} color="#000" />
            <Text style={styles.menuItemText}>My Account</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('userhotlines')}>
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
        <View style={styles.footer}>
      <Text style={styles.footerText}>© Direct Aid v1.0Beta.</Text>
    </View>
      </View>
    </View>
  );
};
 

const DashboardContent = () => {
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(null);

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
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      fetchAddress(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  // const fetchAddress = useCallback(async (latitude, longitude) => {
  //   try {
  //     const response = await axios.get(
  //       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  //     );
  //     if (response.data && response.data.display_name) {
  //       setAddress(response.data.display_name);
  //     } else {
  //       setAddress("Address not found");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching address:", error);
  //     setAddress("Error fetching address");
  //   }
  // }, []);
const fetchAddress = useCallback(async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`,
      {
        params: {
          access_token: MAPBOX_API_KEY,
        },
      }
    );

    const features = response.data.features;
    if (features && features.length > 0) {
      setAddress(features[0].place_name); // Full address
    } else {
      setAddress('Address not found');
    }
  } catch (error) {
    console.error('Error fetching address:', error.response?.data || error.message);
    setAddress('Error fetching address');
  }
}, []);







  
  const handleMedicalLongPress = () => {
    navigation.navigate('UserDashboard');
  };
  const handlePoliceLongPress = () => {
    navigation.navigate('police');
  };

  const handleFireLongPress = () => {
    navigation.navigate('fire');
  };

  const handleEmergencyClick = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
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
          <SafeAreaView style={styles.safe}>
          <View style={styles.userDashboarduwu}>
          <TouchableOpacity onPress={openDrawer} style={styles.profileImageContainer}>
            <Image source={userData?.photo ? { uri: userData.photo } : profileImage}  style={
              [
                
                {
                  borderWidth: 1,
                  width: 55,
                  aspectRatio: "1",
                  marginRight: 10,
                }
              ]}/>
             </TouchableOpacity>
              
              <View style={{
                position: "absolute",
                top: 6,
                left: 47,
                aspectRatio: "1",
                width: 15,
                backgroundColor: "#37DB1C",
                borderRadius: 9999,
              }}>
                
              </View>
            <View style={
              {
                alignSelf: "stretch",
                width: "100%",
                flexShrink: 1,
              }
              }>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{userData.name}</Text>
                <Text style={styles.input} >{address}</Text>

              </View>
          </View>
          </SafeAreaView>
       
    
           

            <View style={styles.contain}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onLongPress={handlePoliceLongPress} onPress={handleEmergencyClick}>
          <Image source={require('../assets/images/police.png')} style={styles.icon} />
          <Text style={[styles.text,{color: "#2451C5"}]}>POLICE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onLongPress={handleFireLongPress} onPress={handleEmergencyClick} >
          <Image source={require('../assets/images/fire.png')} style={styles.icon} />
          <Text style={[styles.text, {color: "#F1811A"}]}>FIRE</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.button, {marginTop: 50,}]} onLongPress={handleMedicalLongPress} onPress={handleEmergencyClick} >
      
        <Image source={require('../assets/images/medical.png')} style={styles.icon} />
        <Text style={[styles.text, {color: "#C82538"}]}>MEDICAL</Text>
      </TouchableOpacity>
    </View>
            {showAlert && (
              <Text style={styles.alertText}>Long press on an icon
              to report an emergency.</Text>
            )}
          </View>
       
  );
};

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

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
        }
      } else {
        console.log('No user is logged in!');
      }
    };

    fetchUserData();
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} userData={userData} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '75%',
        },
      }}
    >
      <Drawer.Screen name="DashboardContent" component={DashboardContent} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   alignItems:'center',
 
  
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 16,
    color: '#999',
    marginBottom: 30,
  },
  emergencyButton: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
 
  alertText: {
    marginTop: 200,
    fontSize: 20,
    color: '#594E4E',
    fontFamily: 'PublicSans_400Regular',
    
  },
  drawer: {
    width: '75%',
  },
  drawerContent: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  profileSection: {
    marginBottom: 10,
    alignItems: "flex-start",
    marginTop: 30,
  },
  profileImage: {
    width: 127,
    height: 127,
    borderRadius: 999999,
    borderWidth: 1,
    borderColor: "black"
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
  // separator: {
  //   height: 1,
  //   backgroundColor: '#ccc',
  //   marginVertical: 10,
  // },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  contain: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
    
    
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
    columnGap: 70,
    
  },
  circleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  icon: {
    width: 154,
    height: 154,
  },
  text: {
    marginTop: 10,
    fontWeight: 'bold',
    fontFamily: 'PublicSans_400Regular',
    fontSize: 20,
  },

button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
   
    
   
    
  },
  userDashboarduwu: {
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 9999,
    backgroundColor: "#FBD3D3",
    padding: 6,
    marginBottom: 20,
    textAlign: "center",
    alignSelf: "stretch",
    flexShrink: 1,
    marginLeft: 30,
    marginRight: 30,

    alignItems: "center",
    flexDirection: "row",
  },
  safe: {
    alignSelf: "stretch",
    flexShrink: 1,
  },
profileImageContainer: {
    width: 55,
    height: 55,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 27.5, // Half of width/height for circular shape
    overflow: 'hidden', // This ensures the image doesn't spill outside the border
  },
  footer: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 400,
  },
  footerText: {
    color: '#555',
  },
});

export default Dashboard;
