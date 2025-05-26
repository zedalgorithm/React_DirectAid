// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Modal, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
// import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
// import { getAuth, signOut } from 'firebase/auth';
// import { useNavigation } from '@react-navigation/native';  // Navigation for redirecting to login
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const SettingsScreen = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [userDetails, setUserDetails] = useState(null); // Will hold user data
//   const [loading, setLoading] = useState(true);

//   // Form State
//   const [name, setName] = useState('');
//   const [gender, setGender] = useState('');
//   const [religion, setReligion] = useState('');
//   const [address, setAddress] = useState('');
//   const [dateOfBirth, setdateOfbirth] = useState('');
//   const [age, setAge] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('+63');

//   const auth = getAuth();
//   const firestore = getFirestore();
//   const navigation = useNavigation(); // Hook for navigation

//   // Fetch the user's data from Firestore when the component mounts
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const user = auth.currentUser;

//       if (user) {
//         const docRef = doc(firestore, "Accounts", user.uid);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           setUserDetails(data);
//           setName(data.name || '');
//           setGender(data.gender || '');
//           setReligion(data.religion || '');
//           setAddress(data.address || '');
//           setdateOfbirth(data.dateOfBirth.toString() || '');
//           setAge(data.age.toString() || '');
//           setPhoneNumber(data.phoneNumber.toString() || '');
//         }
//       }
//       setLoading(false);
//     };

//     fetchUserData();
//   }, []);

  // // Handle updates to Firestore
  // const handleUpdate = async () => {
  //   const user = auth.currentUser;
  //   if (user) {
  //     const docRef = doc(firestore, "Accounts", user.uid);

  //     await updateDoc(docRef, {
  //       name,
  //       gender,
  //       religion,
  //       address,
  //       dateOfBirth,
  //       age,
  //       phoneNumber,
  //     });

  //     setModalVisible(false); // Close modal after saving
  //   }
  // };

//   // Handle Logout
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       Alert.alert("Logged out", "You have been successfully logged out.");
//       navigation.replace('LoginScreen'); // Navigate back to the login screen
//     } catch (error) {
//       console.error("Error logging out: ", error);
//       Alert.alert("Error", "Failed to log out.");
//     }
//   };

//   if (loading) {
//     return <Text>Loading...</Text>; // Show loading while data is being fetched
//   }

//   const handlePhoneChange = (input) => {
//     // Prevents multiple +63 in the input
//     const strippedInput = input.replace(/^(\+63)/, '');
//     setPhoneNumber(`+63${strippedInput}`);
//   };



//   return (
//     <View style={styles.container}>
//       {/* Settings Options */}
//       <TouchableOpacity style={styles.settingsOption}>
//         <Text style={styles.settingsText}>Change login email address</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.settingsOption}>
//         <Text style={styles.settingsText}>Change password</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.settingsOption} onPress={() => setModalVisible(true)}>
//         <Text style={styles.settingsText}>Update account details</Text>
//       </TouchableOpacity>
      
//       {/* Logout Option */}
//       <TouchableOpacity onPress={async () => {
//   try {
    
//     const currentRoute = navigation.getState().routes[navigation.getState().index].name;
//     await AsyncStorage.setItem('lastRoute', currentRoute);
//     await AsyncStorage.removeItem('user-info');  // Clears the user data
//     await AsyncStorage.removeItem('lastRoute');
//     navigation.navigate('Login');
//   } catch (error) {
//     console.log('Error saving last route:', error);
//   }
// }}>
//           <View style={styles.settingsOption}>
          
//             <Text style={styles.settingsText}>Logout</Text>
//           </View>
//         </TouchableOpacity>

      // {/* Modal for Updating Details */}
      // <Modal visible={modalVisible} animationType="slide" transparent={true}>
      //   <View style={styles.modalContainer}>
      //     <View style={styles.modalContent}>
      //       <Text style={styles.heading}>Update Details</Text>

      //       <View style={styles.inputContainer}>
      //         <FontAwesome name="user" size={24} color="red" />
      //         <TextInput style={styles.input} value={name} onChangeText={setName} />
      //       </View>

      //       <View style={styles.inputContainer}>
      //         <FontAwesome name="transgender" size={24} color="red" />
      //         <TextInput style={styles.input} value={gender} onChangeText={setGender} />
      //       </View>

      //       <View style={styles.inputContainer}>
      //         <MaterialIcons name="place" size={24} color="red" />
      //         <TextInput style={styles.input} value={religion} onChangeText={setReligion} />
      //       </View>

      //       <View style={styles.inputContainer}>
      //         <Ionicons name="home" size={24} color="red" />
      //         <TextInput style={styles.input} value={address} onChangeText={setAddress} />
      //       </View>

      //       <View style={styles.inputContainer}>
      //         <FontAwesome name="calendar" size={24} color="red" />
      //         <TextInput style={styles.input} value={dateOfBirth} onChangeText={setdateOfbirth} />
      //       </View>

      //       <View style={styles.inputContainer}>
      //         <Ionicons name="hourglass" size={24} color="red" />
      //         <TextInput style={styles.input} value={age} onChangeText={setAge} />
      //       </View>

      //       <View style={styles.inputContainer}>
      //       <Ionicons name="call" size={24} color="red" />
      //       <TextInput
      //         style={styles.input}
      //         value={phoneNumber}
      //         onChangeText={handlePhoneChange}
      //         keyboardType="phone-pad"
      //       />
      //     </View>

      //       <View style={styles.buttonContainer}>
      //         <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
      //           <Text style={styles.updateButtonText}>Update</Text>
      //         </TouchableOpacity>

      //         {/* <Button title="Close" onPress={() => setModalVisible(false)} /> */}
      //       </View>
      //     </View>
      //   </View>
      // </Modal>
//     </View>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     marginTop: 20,
    
//   },
//   settingsOption: {
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#333',
//   },
//   settingsText: {
   
//     fontSize: 16,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//   },
//   modalContent: {
//     width: '90%',
//     padding: 20,
//     backgroundColor: 'grey',
//     borderRadius: 10,
//   },
//   heading: {
//     fontSize: 24,
//     color: '#fff',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#333',
//     borderRadius: 10,
//     marginBottom: 15,
//     paddingHorizontal: 10,
//     paddingVertical: 15,
//   },
//   input: {
//     color: '#fff',
//     marginLeft: 10,
//     fontSize: 16,
//     flex: 1,
//   },
//   buttonContainer: {
//     marginTop: 20,
//   },
//   updateButton: {
//     backgroundColor: 'green',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   updateButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   menuItemText: {
//     fontSize: 16,
//     marginLeft: 10,
//   },
// });

// export default SettingsScreen;











import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider, updateEmail } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';  // Navigation for redirecting to login
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false); // Modal for updating account details
  const [passwordModalVisible, setPasswordModalVisible] = useState(false); // Modal for changing password
  const [userDetails, setUserDetails] = useState(null);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form State for account details
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [religion, setReligion] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setdateOfbirth] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+63');

  // Form State for password change
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [email, setemail] = useState('');

  const auth = getAuth();
  const firestore = getFirestore();
  const navigation = useNavigation(); // Hook for navigation

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        const docRef = doc(firestore, "Accounts", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserDetails(data);
          setName(data.name || '');
          setGender(data.gender || '');
          setReligion(data.religion || '');
          setAddress(data.address || '');
          setdateOfbirth(data.dateOfBirth.toString() || '');
          setAge(data.age.toString() || '');
          setPhoneNumber(data.phoneNumber.toString() || '');
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);
// Re-authentication method
const reauthenticate = async () => {
  const user = auth.currentUser;
  if (user && oldPassword) {
    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    try {
      await reauthenticateWithCredential(user, credential);
      return true;
    } catch (error) {
      Alert.alert('Re-authentication failed', 'Please enter your correct old password.');
      return false;
    }
  }
};

const handleEmailChange = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updateEmail(user, email);
      Alert.alert("Success", "Email address has been changed successfully.");
      setEmailModalVisible(false); // Close the modal
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }
};


    // Handle updates to Firestore
    const handleUpdate = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(firestore, "Accounts", user.uid);
  
        await updateDoc(docRef, {
          name,
          gender,
          religion,
          address,
          dateOfBirth,
          age,
          phoneNumber,
        });
  
        setModalVisible(false); // Close modal after saving
      }
    };
  

  // Handle password change logic
  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New password and confirm password do not match.");
      return;
    }

    const user = auth.currentUser;
    if (user) {
      const reauthSuccess = await reauthenticate();
      if (reauthSuccess) {
        try {
          await updatePassword(user, newPassword);
          Alert.alert("Success", "Password has been changed successfully.");
          setPasswordModalVisible(false); // Close the modal
        } catch (error) {
          Alert.alert("Error", error.message);
        }
      }
    }
  };

  const handlePhoneChange = (input) => {
    const strippedInput = input.replace(/^(\+63)/, '');
    setPhoneNumber(`+63${strippedInput}`);
  };

  if (loading) {
    return <Text>Loading...</Text>; // Show loading while data is being fetched
  }

  return (
    <View style={styles.container}>
      {/* Settings Options */}
      <TouchableOpacity style={styles.settingsOption} onPress={() => setEmailModalVisible(true)}>
        <Text style={styles.settingsText}>Change login email address</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsOption} onPress={() => setPasswordModalVisible(true)}>
        <Text style={styles.settingsText}>Change password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsOption} onPress={() => setModalVisible(true)}>
        <Text style={styles.settingsText}>Update account details</Text>
      </TouchableOpacity>

      {/* Logout Option */}
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
        <View style={styles.settingsOption}>
          <Text style={styles.settingsText}>Logout</Text>
        </View>
      </TouchableOpacity>

        {/* Modal for Changing Email */}
        <Modal visible={emailModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.heading}>Change Email Address</Text>

            {/* New Email Address */}
            <View style={styles.inputContainer}>
              <FontAwesome name="envelope" size={24} color="red" />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setemail}
                placeholder="Enter new email address"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.updateButton} onPress={handleEmailChange}>
                <Text style={styles.updateButtonText}>Change Email</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.updateButton} onPress={() => setEmailModalVisible(false)}>
                <Text style={styles.updateButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for Changing Password */}
      <Modal visible={passwordModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.heading}>Change Password</Text>

            <View style={styles.inputContainer}>
              <FontAwesome name="lock" size={24} color="red" />
              <TextInput
                style={styles.input}
                value={oldPassword}
                onChangeText={setOldPassword}
                placeholder="Enter old password"
                secureTextEntry={true}
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="lock" size={24} color="red" />
              <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                secureTextEntry={true}
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="lock" size={24} color="red" />
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
                secureTextEntry={true}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.updateButton} onPress={handlePasswordChange}>
                <Text style={styles.updateButtonText}>Change Password</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.updateButton} onPress={() => setPasswordModalVisible(false)}>
                <Text style={styles.updateButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

            {/* Modal for Updating Details */}
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.heading}>Update Details</Text>

            <View style={styles.inputContainer}>
              <FontAwesome name="user" size={24} color="red" />
              <TextInput style={styles.input} value={name} onChangeText={setName} />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="transgender" size={24} color="red" />
              <TextInput style={styles.input} value={gender} onChangeText={setGender} />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons name="place" size={24} color="red" />
              <TextInput style={styles.input} value={religion} onChangeText={setReligion} />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="home" size={24} color="red" />
              <TextInput style={styles.input} value={address} onChangeText={setAddress} />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="calendar" size={24} color="red" />
              <TextInput style={styles.input} value={dateOfBirth} onChangeText={setdateOfbirth} />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="hourglass" size={24} color="red" />
              <TextInput style={styles.input} value={age} onChangeText={setAge} />
            </View>

            <View style={styles.inputContainer}>
            <Ionicons name="call" size={24} color="red" />
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              keyboardType="phone-pad"
            />
          </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                <Text style={styles.updateButtonText}>Update</Text>
              </TouchableOpacity>

              {/* <Button title="Close" onPress={() => setModalVisible(false)} /> */}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 20,
  },
  settingsOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  settingsText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: 'grey',
    borderRadius: 10,
  },
  heading: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  input: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20,
  },
  updateButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;

