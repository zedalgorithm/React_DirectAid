// import React, { useState } from 'react';
// import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
// import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// export default function App() {
//   const [optionsVisible, setOptionsVisible] = useState(false);

//   const handleColonPress = () => {
//     setOptionsVisible(!optionsVisible);
//   };

//   const handleEdit = () => {
//     setOptionsVisible(false);
//     // Add your edit logic here
//   };

//   const handleDelete = () => {
//     setOptionsVisible(false);
//     // Add your delete logic here
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.actionButton}>
//         <View style={styles.iconContainer}>
//           <FontAwesome5 name="car-crash" size={120} color="red" />
//         </View>
//         <Text style={styles.buttonText} value ={selectedIncident} />
//         <Text>Date</Text>
//         <Text>Time</Text>
//         <TouchableOpacity style={styles.bottomRightColonContainer} onPress={handleColonPress}>
//           <Text style={styles.bottomRightColon}>:</Text>
//         </TouchableOpacity>

//         {optionsVisible && (
//           <View style={styles.optionsContainer}>
//             <TouchableOpacity style={styles.optionButton} onPress={handleEdit}>
//               <Text style={styles.optionText}>Edit</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.optionButton} onPress={handleDelete}>
//               <Text style={styles.optionText}>Delete</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'top',
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//     marginTop: 1,
//   },
//   actionButton: {
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 1,
//     width: '50%',
//     height: '30%',
//     position: 'relative',
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 16,
//     marginTop: '10%',
//   },
//   iconContainer: {
//     marginBottom: 5,
//     alignSelf: 'center',
//   },
//   bottomRightColonContainer: {
//     position: 'absolute',
//     bottom: 5,
//     right: 5,
//   },
//   bottomRightColon: {
//     color: 'black',
//     fontSize: 24,
//   },
//   optionsContainer: {
//     position: 'absolute',
//     bottom: -40, // Adjusted to position below the colon
//     right: 0,
//     backgroundColor: '#ffffff',
//     borderRadius: 5,
//     padding: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//     elevation: 5,
//   },
//   optionButton: {
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//   },
//   optionText: {
//     fontSize: 12,
//     color: '#da4946',
//   },
// });

import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { firestore } from '../firebasecon/Firebase'; // Ensure the path is correct
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";
import { Alert } from 'react-native';



export default function App() {
  const [incidents, setIncidents] = useState([]);
  const [optionsVisible, setOptionsVisible] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'Responded Requests'));
        const fetchedIncidents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setIncidents(fetchedIncidents);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchIncidents();
  }, []);

  const handleColonPress = (id) => {
    setOptionsVisible(optionsVisible === id ? null : id);
  };

  const handleEdit = (id) => {
    setOptionsVisible(null);
    navigation.navigate('incidentreport', { incidentId: id });
    // console.log(`Edit incident with ID: ${id}`);
  };

  // const handleDelete = async (id) => {
  //   setOptionsVisible(null);
  // };

  const handleDelete = async (id) => {
    try {
      const docRef = doc(firestore, 'Responded Requests', id);
      await deleteDoc(docRef);
      setOptionsVisible(null);
      setIncidents(prevIncidents => prevIncidents.filter(incident => incident.id !== id));
      Alert.alert('Success', 'Document deleted successfully');
    } catch (error) {
      console.error('Error deleting document:', error);
      Alert.alert('Error', 'Failed to delete document');
    }
  };







  const getIconDetails = (selectedIncident) => {
    switch (selectedIncident) {
      case 'Vehicular Accident':
        return { name: 'car-crash', color: 'red' };
      case 'Medical Case':
        return { name: 'briefcase-medical', color: 'red' };
      case 'Trauma Case':
        return { name: 'user-injured', color: 'red' };
    
      default:
        return { name: 'exclamation-circle', color: 'gray' }; // Default icon for unhandled incidents
    }
  };

 
  
  const renderItem = ({ item }) => {
    const { name, color } = getIconDetails(item.selectedIncident);
    const requestDate = item.requestDate; // Access requestDate from the item
    const formattedDate = requestDate
      ? new Date(requestDate.seconds * 1000).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : '';

    return (
      <View style={styles.actionButton}>
        <View style={styles.iconContainer}>
        <FontAwesome5 name={name} size={80} color={color} />
        </View>
        <Text style={styles.buttonText}>{item.selectedIncident}</Text>
        <Text>Date: {formattedDate || 'N/A'}</Text>
        <Text>Time: {item.timeOfCall || 'N/A'}</Text>
        <TouchableOpacity
          style={styles.bottomRightColonContainer}
          onPress={() => handleColonPress(item.id)}
        >
          <Text style={styles.bottomRightColon}>:</Text>
        </TouchableOpacity>

        {optionsVisible === item.id && (
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleEdit(item.id)}>
              <Text style={styles.optionText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleDelete(item.id)}>
              <Text style={styles.optionText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={incidents}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  actionButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    width: '48%',
    height: 200,
    position: 'relative',
    
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    marginTop: '15%',
  },
  iconContainer: {
    marginBottom: 5,
    alignSelf: 'center',
  },
  bottomRightColonContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  bottomRightColon: {
    color: 'black',
    fontSize: 40,
  },
  optionsContainer: {
    position: 'absolute',
    bottom: -20,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    height:'auto',
  },
  optionButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  optionText: {
    fontSize: 12,
    color: '#da4946',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  listContainer: {
    paddingBottom: 20,
  },
});



