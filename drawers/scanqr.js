

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { firestore, auth } from '../firebasecon/Firebase'; 
import { doc, setDoc } from 'firebase/firestore'; 
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

const QRCodeScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    handleScannedData(data);
  };

  const handleScannedData = (data) => {
    let userData;
    try {
      userData = JSON.parse(data);
    } catch (error) {
      Alert.alert("Invalid QR Code", "The scanned QR code is not valid.");
      setScanned(false);
      return;
    }

    
    const {
      name = 'N/A',
      email = 'N/A',
      homeAddress = 'N/A',
      religion = 'N/A',
      phoneNumber = 'N/A',
      age = 'N/A',
      birthday = 'N/A',
      gender = 'N/A',
      dateRegistered = new Date().toISOString(),
      password = 'N/A', 
    } = userData;

    console.log("Scanned Data: ", userData); 

    Alert.alert(
      "Scanned Data",
      `Name: ${name}\nEmail: ${email}\nHome Address: ${homeAddress}\nReligion: ${religion}\nPhone Number: ${phoneNumber}\nDate Registered: ${dateRegistered}\nAge: ${age}\nBirthday: ${birthday}\nGender: ${gender}`,
      [
        { text: "Cancel", onPress: () => setScanned(false), style: "cancel" },
        { text: "Assign Role", onPress: () => promptRoleAssignment(userData) }
      ]
    );
  };

  const promptRoleAssignment = (userData) => {
    Alert.alert(
      "Assign Role",
      "Select a role for the scanned user:",
      [
        { text: "Admin", onPress: () => registerUser({ ...userData, dateRegistered: new Date().toISOString() }, "Admin") },
        { text: "User", onPress: () => registerUser({ ...userData, dateRegistered: new Date().toISOString() }, "User") },
        { text: "Rescuer", onPress: () => registerUser({ ...userData, dateRegistered: new Date().toISOString() }, "Rescuer") },
      ]
    );
  };

  const registerUser = async (userData, userType) => {
    try {
      const { email, password } = userData;
      
      console.log("Registering User with Email: ", email); // Log email
      console.log("Registering User with Password: ", password); // Log password
      
      // 1. Create User in Firebase Authentication using provided password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Prepare Data for Firestore (with correct formatting)
      const firestoreData = {
        address: userData.homeAddress || '', 
        age: parseInt(userData.age) || 0, 
        dateOfBirth: userData.birthday || '', 
        dateRegistered: new Date(userData.dateRegistered), 
        email: userData.email || '', 
        gender: userData.gender || '', 
        name: userData.name || '', 
        phoneNumber: parseInt(userData.phoneNumber) || 0, 
        photo: '', 
        religion: userData.religion || '', 
        userID: user.uid,  // Using Firebase Authentication UID
        userType: userType 
      };

      // 3. Store User Data in Firestore 
      await setDoc(doc(firestore, 'Accounts', user.uid), firestoreData);
      
      // 4. Send Verification Email
      await sendEmailVerification(user);
    
      Alert.alert("Success", `User registered as ${userType}. A verification email has been sent to ${email}.`);
    } catch (error) {
      console.error("Error during registration: ", error); // Log error
      Alert.alert("Error", "Failed to register user: " + error.message);
    } finally {
      setScanned(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlay}>
        <Text style={styles.instructions}>Scan a QR code</Text>
      </View>
      <View style={styles.centerBox} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 200,
    height: 200,
    marginTop: -100,
    marginLeft: -100,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
  },
  instructions: {
    color: '#fff',
    fontSize: 18,
  },
});

export default QRCodeScannerScreen;
