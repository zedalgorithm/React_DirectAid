



import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator, Modal, TouchableWithoutFeedback,  Alert } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { auth, firestore } from '../firebasecon/Firebase'; // Adjust the path if needed
import { doc, getDoc, collection, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore";
import profileImage from '../assets/images/profile.png'; // Placeholder for profile image
import ambulance from '../assets/images/ambu.png'; // Custom marker image
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";
import respondicon from '../assets/images/ggg.png'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

function MapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showText, setShowText] = useState(false); 
  const [showCircle, setShowCircle] = useState(false);
  const [heading, setHeading] = useState(0);
  const [reports, setReports] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(null); 
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setCurrentUserId(user.uid);
      }
    };

    fetchUserData();

    let locationSubscription = null;
    let headingSubscription = null;


    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Watch the device's position
      locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Highest, timeInterval: 1000, distanceInterval: 1 },
        (loc) => {
          setLocation(loc.coords);
        }
      );

      // Watch the device's heading
      headingSubscription = await Location.watchHeadingAsync((hd) => {
        setHeading(hd.trueHeading);
      });
    })();

 // Listen for real-time updates in the "Help Requests" collection
 const unsubscribe = onSnapshot(collection(firestore, "Help Requests"), (snapshot) => {
  const reportsData = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  setReports(reportsData);
});


    return () => {
      // Clean up subscriptions
      // if (locationSubscription) locationSubscription.remove();
      if (headingSubscription) headingSubscription.remove();
      if (locationSubscription) locationSubscription.remove();
      unsubscribe();
    };
  }, []);




  const handleReportPress = () => {
    navigation.navigate('Report');
  };
    
  const openModal = async (report) => {
    setSelectedReport(report);
    setModalVisible(true);
    setIsButtonDisabled(!!report.Team);
    await AsyncStorage.setItem('selectedReport', report.id );
  };

  const closeModal = () => {
    setSelectedReport(null);
    setModalVisible(false);
  };
  const handleTeamSelection = (team) => {
    setSelectedTeam(team);
  };


  const respondToReport = async () => {
    if (selectedReport && selectedTeam && !selectedReport.Team) {
      try {
        const reportRef = doc(firestore, "Help Requests", selectedReport.id);
  
        // Update the document with the selected team and responder user ID
        await updateDoc(reportRef, {
          Team: selectedTeam,
          ResponderId: currentUserId // Store the ID of the user who responded
        });
  
        // Update the local state to reflect the change
        setReports(reports.map(report => 
          report.id === selectedReport.id ? { ...report, Team: selectedTeam, ResponderId: currentUserId } : report
        ));
  
        setSelectedTeam(null);
        closeModal();
      } catch (error) {
        console.error("Error updating report:", error);
      }
    } else {
      console.log("No team selected, no report found, or Team field already populated.");
    }
  };
  

  const deleteReport = async () => {
    if (selectedReport) {
      try {
        const reportRef = doc(firestore, "Help Requests", selectedReport.id);
  
        // Delete the document
        await deleteDoc(reportRef);
  
        // Update the local state to reflect the change
        setReports(reports.filter(report => report.id !== selectedReport.id));
  
        closeModal();
      } catch (error) {
        console.error("Error deleting report:", error);
      }
    }
  };
  

  const cancelResponse = async () => {
    if (selectedReport && selectedReport.Team) {
      try {
        const reportRef = doc(firestore, "Help Requests", selectedReport.id);
        
        // Retrieve the current document data
        const reportDoc = await getDoc(reportRef);
        const reportData = reportDoc.data();
  
        // Only allow cancellation if the current user is the responder
        if (reportData.ResponderId === currentUserId) {
          Alert.alert(
            'Alert !!!',
            'You are about to cancel your response. Do you want to proceed?',
            [
              {
                text: 'Cancel',
                style: 'cancel'
              },
              {
                text: 'OK',
                onPress: async () => {
                  try {
                    await updateDoc(reportRef, {
                      Team: null,
                      ResponderId: null
                    });
  
                    // Update the local state to reflect the change
                    setReports(reports.map(report =>
                      report.id === selectedReport.id ? { ...report, Team: null, ResponderId: null } : report
                    ));
  
                    closeModal();
                  } catch (error) {
                    console.error("Error canceling response:", error);
                  }
                }
              }
            ]
          );
        } else {
          Alert.alert('Alert !!!', 'You are not authorized to cancel this response.', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      } catch (error) {
        console.error("Error canceling response:", error);
      }
    }
  };
  
  
  const openFullScreenImage = (imageUri) => {
    setFullScreenImage(imageUri);
  };

  const closeFullScreenImage = () => {
    setFullScreenImage(null);
  };
  
  const formattedDate = selectedReport?.requestDate
  ? new Date(selectedReport.requestDate.seconds * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  : '';
  
  const getMarkerIcon = (report) => {
    if (report.Team) {
      return <Image source={respondicon} style={styles.markermage} />;
    
    }
  
    
    switch (report.accidentType) {
      case 'Vehicular Accident':
        return <FontAwesome5 name="car-crash" size={40} color="red" />;
      case 'Medical Case':
        return <FontAwesome5 name="briefcase-medical" size={40} color="red" />;
      case 'Trauma Case':
        return <FontAwesome5 name="user-injured" size={40} color="red" />;
        case 'Crime':
        return <MaterialCommunityIcons name="handcuffs" size={40} color="#2451C5" />;
        case 'Fire':
          return  <MaterialIcons name="local-fire-department" size={40} color="#F1811A" />;
      default:
        return null;
    }
  };

  let region = {
    latitude: location ? location.latitude : 11.6080,
    longitude: location ? location.longitude : 125.4329,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        provider={PROVIDER_GOOGLE}
        onPress={() => {
          setShowText(false);
          setShowCircle(false);
          setModalVisible(false);
        }}
        tileOverlay={{
    urlTemplate: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    tileSize: 256,
  }}
      >
        {location && (
          <>
            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              anchor={{ x: 0.5, y: 0.5 }}
              rotation={heading} 
              onPress={() => {
                setShowText(true);
                setShowCircle(true);
              }}
            >
              <View style={styles.markerContainer}>
                <Image source={ambulance} style={styles.markerImage} resizeMode="contain" />
              </View>
            </Marker>
            {reports.map((report) => (
              <Marker
                key={report.id}
                coordinate={{
                  latitude: report.latitude,
                  longitude: report.longitude,
                }}
                title={report.description}
                description={report.description}
                onPress={() => openModal(report)}
              >
                {/* {getMarkerIcon(report.accidentType)}
                {renderIcon(report)} */}
                {getMarkerIcon(report)}
              </Marker>
            ))}
            {showCircle && (
              <Circle
                center={{ latitude: location.latitude, longitude: location.longitude }}
                radius={500} // Radius in meters
                strokeColor="rgba(0, 0, 255, 0.5)"
                fillColor="rgba(0, 0, 255, 0.2)"
              />
            )}
          </>
        )}
      </MapView>
      
      
      {selectedReport && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{selectedReport.accidentType}</Text>
              
                    <Image source={{ uri: selectedReport.emergencyPhoto }} style={styles.modalImage} />
                  
                <Text style={styles.modalText}>Assign Rescue Team:</Text>
                <View style={styles.buttonContainer}>
                    {['Team A', 'Team B', 'Team C', 'Team D'].map((team) => (
                      <TouchableOpacity
                        key={team}
                        style={[styles.teamButton, selectedTeam === team && styles.selectedTeamButton]}
                        onPress={() => handleTeamSelection(team)}
                        disabled={!!selectedReport.team} // Disable team selection buttons if the Team field is already populated
                      >
                        <Text style={styles.button}>{team}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {selectedReport.Team ? (
                    <TouchableOpacity
                      style={[styles.cancelButton]}
                      onPress={cancelResponse}
                    >
                      <Text style={styles.respondButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.respondButton}
                      onPress={respondToReport}
                    >
                      <Text style={styles.respondButtonText}>Respond</Text>
                    </TouchableOpacity>
                  )}
                <View style={styles.actionsContainer}>

                {selectedReport.accidentType !== "Crime" && selectedReport.accidentType !== "Fire" && (
        <TouchableOpacity style={styles.actionButton} onPress={handleReportPress}>
          <View style={styles.iconContainer}>
            <AntDesign name="file1" size={24} color="white" />
          </View>
          <Text style={styles.buttonText}>Report</Text>
        </TouchableOpacity>
      )}

                {/* <TouchableOpacity style={styles.actionButton} onPress={handleReportPress}>
                    <View style={styles.iconContainer}>
                      <AntDesign name="file1" size={24} color="white" />
                    </View>
                    <Text style={styles.buttonText}>Report</Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity style={styles.actionButton}>
                    <View style={styles.iconContainer}>
                      <Entypo name="dial-pad" size={24} color="white" />
                    </View>
                    <Text style={styles.buttonText}>Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                      style={styles.actionButton} 
                      onPress={() => openFullScreenImage(selectedReport.emergencyPhoto)}
                    >
                      <View style={styles.iconContainer}>
                        <Entypo name="image" size={24} color="white" />
                      </View>
                      <Text style={styles.buttonText}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={deleteReport}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="delete-forever" size={24} color="white" />
              </View>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
                </View>
                <Text style={styles.modalText}>Requester Name:</Text>
                <Text style={styles.resultText}>{selectedReport.userDetails.name}</Text>
                <Text style={styles.modalText}>Coordinate:</Text>
                <Text style={styles.resultText}>{selectedReport.latitude}, {selectedReport.longitude}</Text>
                <Text style={styles.modalText}>Address:</Text>
                <Text style={styles.resultText}>{selectedReport.address}</Text>
                <View style={styles.inlineContainer}>
                  
                  <View style={styles.dateContainer}>
                    <Text style={styles.modalText}>Date:</Text>
                    <Text style={styles.resultText}>{formattedDate}</Text>
                  </View>
                  <View style={styles.timeContainer}>
                    <Text style={styles.modalText}>Time:</Text>
                    <Text style={styles.resultText}>{selectedReport.timeNow}</Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      )}

      {fullScreenImage && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={!!fullScreenImage}
          onRequestClose={closeFullScreenImage}
        >
          <TouchableWithoutFeedback onPress={closeFullScreenImage}>
            <View style={styles.fullScreenImageOverlay}>
              <Image source={{ uri: fullScreenImage }} style={styles.fullScreenImage} />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

      {errorMsg ? <Text>{errorMsg}</Text> : null}
    </View>
  );
}

function SideMenu({ navigation }) {
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

        <TouchableOpacity onPress={() => navigation.navigate("Hotlines")}>
          <View style={styles.menuItem}>
          <FontAwesome name="phone" size={24} color="black" />
            <Text style={styles.menuItemText}>Hotlines</Text>
          </View>
        </TouchableOpacity>




        <TouchableOpacity onPress={() => navigation.navigate("selection")}>
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
}

function DrawerContent({ navigation }) {
  return <SideMenu navigation={navigation} />;
}

export default function AdminDashboard({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Map" component={MapScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
   alignItems: 'flex-start',
  },
 
  markerImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: "center"
  },
  drawerContent: {
    flex: 1,
    paddingTop: 50,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
    color: '#777',
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
    padding: 10,
    marginBottom: 10,
  },
  menuItemText: {
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#f7f2f9',
    borderRadius: 10,
    padding: 20,
    // alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
   width: '90%',
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf:'center',
    color:'white',
    borderWidth: 1,       
    borderColor: '#da4946', 
    padding: 10,          
    borderRadius: 5, 
  textAlign: 'center',
  backgroundColor: '#da4946',
    
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderWidth: 1,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
   
    
    
  },
  teamButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    
  },
  selectedTeamButton: {
    backgroundColor: '#eb6d45', 
  },
  respondButton: {
    backgroundColor: '#148905',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '40%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  respondButtonText: {
    color: 'white',
    fontSize: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#da4946',
    padding: 10,
    borderRadius: 5,
    width: '20%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign:'center',
  },
  button: {
    color: 'black',
    fontSize: 16,
    textAlign:'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
   alignContent:'space-between',
      fontWeight: 'bold',
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
   alignContent:'space-between',
      marginLeft: '3%',
  },
  closeButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    alignItems:'center',
    width: '40%',
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  iconContainer: {
    marginBottom: 5, 
    alignSelf: 'center',
  },
  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  timeContainer: {
    flex: 1,
   marginLeft: 100,
    
  },
  dateContainer: {
    flex: 1,
  
   
  },
  fullScreenImageOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  errorMsg: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
  padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '40%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  markermage: {
    width: 40,
    height: 50,
     resizeMode: 'stretch',
  },
});
