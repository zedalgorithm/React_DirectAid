
import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, ScrollView, Modal, Button, Image } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera/legacy';
import { getFirestore, collection, addDoc, doc, setDoc, query, where, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth from firebase/auth
import { SafeAreaView } from "react-native-safe-area-context";


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAZwD4F-jTPCIkWWyMMCgpF9zMUQ90vqXk",
  authDomain: "emsdirectaid.firebaseapp.com",
  projectId: "emsdirectaid",
  storageBucket: "emsdirectaid.appspot.com",
  messagingSenderId: "262681042121",
  appId: "1:262681042121:web:379a9d9b9194d4cd6d0118",
  measurementId: "G-R4TS1QLBS2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize auth

export default function UserDashboard() {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [emergencyFor, setEmergencyFor] = useState("");
  const [emergencyType, setEmergencyType] = useState("Crime");
  const [reportSent, setReportSent] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isCameraVisible, setCameraVisible] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const cameraRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      try {
        let currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        const { latitude, longitude } = currentLocation.coords;
        setLocation({ latitude, longitude });
        setMapRegion({
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
        fetchAddress(latitude, longitude);
      } catch (error) {
        console.error("Error getting location:", error);
        Alert.alert("Error getting location");
      }
    })();
  }, []);

  const fetchAddress = useCallback(async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      if (response.data && response.data.display_name) {
        setAddress(response.data.display_name);
      } else {
        setAddress("Address not found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Error fetching address");
    }
  }, []);

  const handleMarkerDragEnd = useCallback((e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
    setMapRegion({
      latitude,
      longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
    fetchAddress(latitude, longitude);
  }, [fetchAddress]);

  // useEffect(() => {
  //   if (mapRef.current && mapRegion) {
  //     mapRef.current.animateToRegion({
  //       ...mapRegion,
  //       latitudeDelta: mapRegion.latitudeDelta * 0.6,
  //       longitudeDelta: mapRegion.longitudeDelta * 0.6,
  //     }, 1000); // Animation duration in milliseconds
  //   }
  // }, [mapRegion]);

  const addHelpRequest = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("No user logged in");
        return;
      }

      // Fetch user data from Accounts collection
      const userRef = collection(db, "Accounts");
      const userQuery = query(userRef, where("__name__", "==", user.uid));
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        Alert.alert("User not found in Accounts collection");
        return;
      }

      const userData = userSnapshot.docs[0].data();

      // Prepare userDetails object
      const userDetails = {
        address: userData.address || " ",
        age: userData.age || "",
        email: userData.email || "",
        gender: userData.gender || "",
        name: userData.name || "",
        phoneNumber: userData.phoneNumber || "",
        photo: userData.photo || "",
        religion: userData.religion || " ",
        stability: userData.stability || "",
        token: userData.token || "",
        userID: user.uid
      };

      // Prepare help request data
      const helpRequestData = {
        accidentType: emergencyType,
        accidentTypeIcon: 2131230848, // Example icon value
        address,
        emergencyPhoto: photoUri,
        latitude: location.latitude,
        longitude: location.longitude,
        reportedFor: emergencyFor,
        requestDate: new Date(), // Current date and time
        stability: 0,
        team: "",
        timeNow: new Date().toLocaleTimeString(),
        userDetails // Include specific user details
      };

      // Add help request to Firestore with userID as document ID
      const docRef = doc(db, "Help Requests", user.uid);
      await setDoc(docRef, helpRequestData);

      console.log("Document written with ID: ", user.uid);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleSendReport = () => {
    if (!emergencyFor || !emergencyType) {
      Alert.alert("Error", "Please select an emergency for and type.");
      return;
    }

    // Send report to Firestore
    addHelpRequest();

    setReportSent(true);
    console.log("Report Sent:");

    // Navigate to CancelReport.js
    // navigation.navigate('CancelReport');
    navigation.reset({
      index: 0,
      routes: [{ name: 'CancelReport' }],
    });

  };

  const handleRefreshLocation = async () => {
    try {
      let currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      setLocation({ latitude, longitude });
      setMapRegion({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      fetchAddress(latitude, longitude);
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error getting location");
    }
  };
  



  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
    });
  }, [navigation]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', alignSelf: 'center', marginTop: 375, }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  };

  const capturePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      setCameraVisible(false);
    }
  };

  const handleMapFullview = () => {
    setIsFullscreen(!isFullscreen);
  };



  
  return (
    <View style={styles.container}>
    
    <View style={{alignSelf: "center", marginTop: 1, flexDirection:"row", alignItems:"center"}}>
    <Image source={require('../assets/images/police.png')} style={styles.icon} />
    <Text style={{marginLeft:5, color:"#2451C5", fontSize: 20, fontWeight:"bold"}}>Report Crime</Text>
    </View>
   
      <View style={isFullscreen ? styles.fullscreenMapContainer : styles.mapContainer}>
        <MapView
          style={styles.map}
          ref={mapRef}
          region={mapRegion}
          provider={PROVIDER_GOOGLE}
          onRegionChangeComplete={region => setMapRegion(region)} // Optional: Update mapRegion on user interaction
        >
          {location && (
            <Marker
              coordinate={location}
              draggable
              onDragEnd={handleMarkerDragEnd}
            />
          )}
        </MapView>

        <TouchableOpacity
          style={styles.refreshButton}
          onPress={handleRefreshLocation}
        >
          <MaterialIcons name="my-location" size={15 } color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fullmap}
          onPress={handleMapFullview}
        >
          <MaterialIcons name="fullscreen" size={15} color="white" />
        </TouchableOpacity>
      </View>
      {!isFullscreen && (
        <ScrollView style={styles.form}>
          <Text style={styles.label}>Select Emergency:</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.optionButton, emergencyFor === "For Myself" && styles.selectedButton]}
              onPress={() => setEmergencyFor("For Myself")}
            >
              <Text style={styles.optionButtonText}>For Myself</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, emergencyFor === "For Someone" && styles.selectedButton]}
              onPress={() => setEmergencyFor("For Someone")}
            >
              <Text style={styles.optionButtonText}>For Someone</Text>
            </TouchableOpacity>
          </View>
          {/* <Text style={styles.label}>Location Coordinates:</Text>
          <TextInput
            style={styles.input}
            value={location ? `${location.latitude}, ${location.longitude}` : ""}
            editable={false}
          /> */}
          <Text style={styles.label}>Location Address:</Text>
          <TextInput
            style={styles.input}
            value={address}
            editable={false}
          />
          <Text style={styles.label}>Type of Emergency:</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.emergencyButton, emergencyType === "Crime" && styles.selectedButton]}
              onPress={() => setEmergencyType("Crime")}
            >
            <MaterialIcons name="local-police" size={40} color="#2451C5" />
              <Text style={[styles.emergencyButtonText,{color:"#F1811A"}]}>Crime</Text>
            </TouchableOpacity>
           
          </View>

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => setCameraVisible(true)}
          >
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.uploadImage} />
            ) : (
              <MaterialIcons name="attach-file" size={24} color="black" />
            )}
            <Text style={styles.uploadButtonText}>
              {photoUri ? 'Change photo of incident' : 'Upload photo of incident (optional)'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendReport}
          >
            <Text style={styles.sendButtonText}>Send Report</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      <Modal
        visible={isCameraVisible}
        animationType="slide"
        onRequestClose={() => setCameraVisible(false)}
      >
        <View style={styles.cameraContainer}>
          <Camera style={styles.camera} type={type} ref={cameraRef}>
            <View style={styles.cameraControls}>
              <TouchableOpacity
                style={styles.cameraControl}
                onPress={toggleCameraType}
              >
                <MaterialIcons name="flip-camera-ios" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cameraControl}
                onPress={capturePhoto}
              >
                <MaterialIcons name="camera-alt" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cameraControl}
                onPress={() => setCameraVisible(false)}
              >
                <MaterialIcons name="close" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingTop: 1,
  },
  mapContainer: {
    height: "30%",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 10,
  },
  fullscreenMapContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  refreshButton: {
    position: 'absolute',
    top: 70,
    right: 10,
    backgroundColor: '#CAC4D0',
    padding: 10,
    borderRadius: 20,
  },
  fullmap: {
    position: 'absolute',
    top: 25,
    right: 10,
    backgroundColor: '#CAC4D0',
    padding: 10,
    borderRadius: 20,
  },
  form: {
    flex: 1,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: "#2451C5",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  optionButton: {
    flex: 1,
   
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    // Border to show the selected state
    borderWidth: 1, 
    borderColor: '#fff', // Default border color (matches background)
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // Android Shadow
    elevation: 5,
  },
  selectedButton: {
   borderColor: "#2451C5",
    color: "white",
  },
  emergencyButtonText:{

    fontSize: 16,


  },
  input: {
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "black",
  },
  emergencyButton: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  uploadImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  uploadButtonText: {
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#2451C5",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  cameraControl: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  
});

