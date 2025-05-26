

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getFirestore, doc, getDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../drawers/DrawerContent';

const Drawer = createDrawerNavigator();

const CancelReportScreen = ({ navigation }) => {
  const [canCancel, setCanCancel] = useState(true);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = checkReportStatus();
    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  const checkReportStatus = () => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "Help Requests", user.uid);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCanCancel(!data.team);
        } else {
          // Document doesn't exist, can't cancel
          setCanCancel(false);
          // Navigate to dashboard if the report is deleted
          navigation.navigate('dashboard');
        }
      });
      return unsubscribe; // Return the unsubscribe function
    }
  };

  const handleCancel = async () => {
    if (!canCancel) {
      Alert.alert("Cannot Cancel", "This report has already been responded to and cannot be canceled.");
      return;
    }

    const user = auth.currentUser;
    if (user) {
      try {
        const docRef = doc(db, "Help Requests", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.Team) {
            Alert.alert("Cannot Cancel", "This report has been assigned to a team and cannot be canceled.");
            return;
          }

          // If no Team is assigned, proceed with cancellation
          await deleteDoc(docRef);
          Alert.alert(
            "Report Canceled",
            "Your report has been successfully canceled.",
            [
              { text: "OK", onPress: () => navigation.navigate('dashboard') }
            ]
          );
        } else {
          Alert.alert("Error", "Report not found.");
        }
      } catch (error) {
        console.error("Error canceling report: ", error);
        Alert.alert("Error", "Failed to cancel the report. Please try again.");
      }
    } else {
      Alert.alert("Error", "No user logged in.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.cancelButton, !canCancel && styles.disabledButton]} 
        onPress={handleCancel}
        disabled={!canCancel}
      >
        <Text style={styles.cancelButtonText}>
          {canCancel ? "Cancel Report" : "Cannot Cancel"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Cancel = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Menu" component={CancelReportScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  cancelButton: {
    width: 300,
    height: 300,
    borderRadius: 300,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: 'grey',
  },
});

export default Cancel;
