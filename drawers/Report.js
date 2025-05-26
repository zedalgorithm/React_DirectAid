
// import React, { useState } from 'react';
// import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { CheckBox } from 'react-native-elements';
// import Checkbox from 'expo-checkbox';
// const IncidentReport = () => {
//   const [selectedIncident, setSelectedIncident] = useState('');
//   const [selectedMobility, setSelectedMobility] = useState('');
//   const [selectedBurn, setSelectedBurn] = useState('');
//   const [selectedConsciousness, setSelectedConsciousness] = useState('');
//   const [actionsTaken, setActionsTaken] = useState({});
//   const [selectedSymptoms, setSelectedSymptoms] = useState([]);
//   const [checked, setChecked] = useState([]);
//   const handleActionCheck = (action) => {
//     setActionsTaken((prevState) => ({
//       ...prevState,
//       [action]: !prevState[action],
//     }));
//   };

//   const handleSymptomSelection = (symptom) => {
//     setSelectedSymptoms((prevSelected) => {
//       if (prevSelected.includes(symptom)) {
//         return prevSelected.filter(item => item !== symptom);
//       } else {
//         return [...prevSelected, symptom];
//       }
//     });
//   };
//   const toggleCheckbox = (key) => {
//     setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
//   };
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Header */}
//       <Text style={styles.header}>Incident Report</Text>

//       {/* Patient Details */}
//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//         <Text style={styles.sectionHeader}>Patient Details</Text>
//         </View>
//         <TextInput style={styles.input} placeholder="August 9, 2024" />
//         <TextInput style={styles.input} placeholder="Patient's Name" />
//         <TextInput style={styles.input} placeholder="Sex/Gender" />
//         <TextInput style={styles.input} placeholder="Age" />
//         <TextInput style={styles.input} placeholder="Phone Number" />
//         <TextInput style={styles.input} placeholder="Patient Address" multiline />
//         <TextInput style={styles.input} placeholder="Incident Address" multiline />
//         <TextInput style={styles.input} placeholder="Time of Call" />
//         <TextInput style={styles.input} placeholder="Time of Arrival" />
//         <TextInput style={styles.input} placeholder="Informant" />
//         <TextInput style={styles.input} placeholder="Chief Complaint" />
//       </View>

//       {/* Type of Incident */}
//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//   <Text style={styles.sectionHeader}>Type of Incident</Text>
// </View>
//         {['Vehicular Accident', 'Medical Case', 'Trauma Case', 'Transport Only'].map((incident) => (
//           <TouchableOpacity
//             key={incident}
//             style={selectedIncident === incident ? styles.radioButtonSelected : styles.radioButton}
//             onPress={() => setSelectedIncident(incident)}
//           >
//             <Text style={styles.radioText}>{incident}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//      {selectedIncident === 'Vehicular Accident' && (
//   <>
//     <View style={styles.section}>
   
//       <View style={styles.twoColumnContainer}>
//         <View style={styles.column}>
//           {['Deformity', 'Burn', 'Contusion', 'Tenderness', 'Abrasion'].map((injury) => (
//             <View key={injury} style={styles.checkboxItem}>
//               <CheckBox
//                 checked={selectedSymptoms.includes(injury)}
//                 onPress={() => handleSymptomSelection(injury)}
//                 containerStyle={styles.checkbox}
//                 checkedIcon='dot-circle-o'
//                 uncheckedIcon='circle-o'
//               />
//               <Text style={styles.checkboxText}>{injury}</Text>
//             </View>
//           ))}
//         </View>
//         <View style={styles.column}>
//           {['Laceration', 'Avulsion', 'Swelling', 'Puncture', 'Fracture'].map((injury) => (
//             <View key={injury} style={styles.checkboxItem}>
//               <CheckBox
//                 checked={selectedSymptoms.includes(injury)}
//                 onPress={() => handleSymptomSelection(injury)}
//                 containerStyle={styles.checkbox}
//                 checkedIcon='dot-circle-o'
//                 uncheckedIcon='circle-o'
//               />
//               <Text style={styles.checkboxText}>{injury}</Text>
//             </View>
//           ))}
//         </View>
//       </View>
//     </View>

//     <View style={styles.section}>
//     <View style={styles.wrapper}>
//       <Text style={styles.sectionHeader}>Cause of Vehicular Accident</Text>
//       </View>
//       <View style={styles.twoColumnContainer}>
//         <View style={styles.column}>
//           {['Reckless', 'Animal Xing', 'Slip & Slide', 'S. Ped Xing', 'Collision'].map((cause) => (
//             <View key={cause} style={styles.checkboxItem}>
//               <CheckBox
//                 checked={selectedSymptoms.includes(cause)}
//                 onPress={() => handleSymptomSelection(cause)}
//                 containerStyle={styles.checkbox}
//                 checkedIcon='dot-circle-o'
//                 uncheckedIcon='circle-o'
//               />
//               <Text style={styles.checkboxText}>{cause}</Text>
//             </View>
//           ))}
//         </View>
//         <View style={styles.column}>
//           {['Speeding', 'Drunk Driving', 'Distracted'].map((cause) => (
//             <View key={cause} style={styles.checkboxItem}>
//               <CheckBox
//                 checked={selectedSymptoms.includes(cause)}
//                 onPress={() => handleSymptomSelection(cause)}
//                 containerStyle={styles.checkbox}
//                 checkedIcon='dot-circle-o'
//                 uncheckedIcon='circle-o'
//               />
//               <Text style={styles.checkboxText}>{cause}</Text>
//             </View>
//           ))}
//         </View>
//       </View>
//     </View>
//   </>
// )}

//     {selectedIncident === 'Medical Case' && (
//   <View style={styles.section}>
  
//     <View style={styles.twoColumnContainer}>
//       <View style={styles.column}>
//         {['Hypertension', 'Vomiting', 'DOB/Cough', 'Nose Bleed', 'Fainting/Dizziness'].map((symptom) => (
//           <View key={symptom} style={styles.checkboxItem}>
//             <CheckBox
//               checked={selectedSymptoms.includes(symptom)}
//               onPress={() => handleSymptomSelection(symptom)}
//               containerStyle={styles.checkbox}
//               checkedIcon='dot-circle-o'
//               uncheckedIcon='circle-o'
//             />
//             <Text style={styles.checkboxText}>{symptom}</Text>
//           </View>
//         ))}
//       </View>
//       <View style={styles.column}>
//         {['LBM', 'Fever/Seizure', 'Chest Pain', 'Skin Allergy', 'Labor Pain'].map((symptom) => (
//           <View key={symptom} style={styles.checkboxItem}>
//             <CheckBox
//               checked={selectedSymptoms.includes(symptom)}
//               onPress={() => handleSymptomSelection(symptom)}
//               containerStyle={styles.checkbox}
//               checkedIcon='dot-circle-o'
//               uncheckedIcon='circle-o'
//             />
//             <Text style={styles.checkboxText}>{symptom}</Text>
//           </View>
//         ))}
//       </View>
//     </View>
//   </View>
// )}


//      {selectedIncident === 'Trauma Case' && (
//   <View style={styles.section}>

//     <View style={styles.twoColumnContainer}>
//       <View style={styles.column}>
//         {['Alcohol Intox', 'Drug Intox', 'Drowning', 'Electrocution', 'Stab Wounds'].map((symptom) => (
//           <View key={symptom} style={styles.checkboxItem}>
//             <CheckBox
//               checked={selectedSymptoms.includes(symptom)}
//               onPress={() => handleSymptomSelection(symptom)}
//               containerStyle={styles.checkbox}
//               checkedIcon='dot-circle-o'
//               uncheckedIcon='circle-o'
//             />
//             <Text style={styles.checkboxText}>{symptom}</Text>
//           </View>
//         ))}
//       </View>
//       <View style={styles.column}>
//         {['Mauling', 'Fall', 'Animal Bite', 'FBAO', 'Psychiatric'].map((symptom) => (
//           <View key={symptom} style={styles.checkboxItem}>
//             <CheckBox
//               checked={selectedSymptoms.includes(symptom)}
//               onPress={() => handleSymptomSelection(symptom)}
//               containerStyle={styles.checkbox}
//               checkedIcon='dot-circle-o'
//               uncheckedIcon='circle-o'
//             />
//             <Text style={styles.checkboxText}>{symptom}</Text>
//           </View>
//         ))}
//       </View>
//     </View>
//   </View>
// )}

//       {/* Mobility */}
//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//         <Text style={styles.sectionHeader}>Mobility</Text>
//         </View>
//         {['None', 'Ambulatory', 'Non - Ambulatory'].map((mobility) => (
//           <TouchableOpacity
//             key={mobility}
//             style={selectedMobility === mobility ? styles.radioButtonSelected : styles.radioButton}
//             onPress={() => setSelectedMobility(mobility)}
//           >
//             <Text style={styles.radioText}>{mobility}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Burn */}
//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//         <Text style={styles.sectionHeader}>Burn</Text>
//         </View>
//         {['None', '1st Degree', '2nd Degree', '3rd Degree'].map((burn) => (
//           <TouchableOpacity
//             key={burn}
//             style={selectedBurn === burn ? styles.radioButtonSelected : styles.radioButton}
//             onPress={() => setSelectedBurn(burn)}
//           >
//             <Text style={styles.radioText}>{burn}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Vital Signs */}
//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//         <Text style={styles.sectionHeader}>Vital Signs</Text>
//         </View>
//         <TextInput style={styles.input} placeholder="Temperature" />
//         <TextInput style={styles.input} placeholder="Pulse Rate" />
//         <TextInput style={styles.input} placeholder="Respiratory Rate" />
//         <TextInput style={styles.input} placeholder="SpO2" />
//         <TextInput style={styles.input} placeholder="Blood Pressure" />
//       </View>

//       {/* Level of Consciousness */}
//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//         <Text style={styles.sectionHeader}>Level of Consciousness</Text>
//         </View>
//         {['Alert', 'Verbal Response', 'Responsive to Pain', 'Unresponsive'].map((consciousness) => (
//           <TouchableOpacity
//             key={consciousness}
//             style={selectedConsciousness === consciousness ? styles.radioButtonSelected : styles.radioButton}
//             onPress={() => setSelectedConsciousness(consciousness)}
//           >
//             <Text style={styles.radioText}>{consciousness}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Action Taken */}
// <View style={styles.section}>
// <View style={styles.wrapper}>
//   <Text style={styles.sectionHeader}>Action Taken</Text>
//   </View>
//   <View style={styles.twoColumnContainer}>
//     <View style={styles.column}>
//       {[
//        'Oxygenation', 'Nebulization', 'HGT', 'Advice to eat', 'Assisted on Meds', 'VS Check', 
//        'Hydration', 'Advise BRAT', 'Restrained', 'Bleeding Control', 'Torniquet', 'Bandaging'
//       ].map((action) => (
//         <View key={action} style={styles.checkboxItem}>
//           <CheckBox
//             checked={actionsTaken[action] || false}
//             onPress={() => handleActionCheck(action)}
//             containerStyle={styles.checkbox}
//             checkedIcon='dot-circle-o'
//             uncheckedIcon='circle-o'
//           />
//           <Text style={styles.checkboxText}>{action}</Text>
//         </View>
//       ))}
//     </View>
//     <View style={styles.column}>
//       {[
//        'Cold Compress', 'Warm Compress', 'Burn Care', 'Wound Care', 'CPR', 'Rescue Breathing', 'FBAO Mgt.',
//        'AED', 'Arm Sling', 'Spine Board', 'C.Colar', 'Spliting'
//       ].map((action) => (
//         <View key={action} style={styles.checkboxItem}>
//           <CheckBox
//             checked={actionsTaken[action] || false}
//             onPress={() => handleActionCheck(action)}
//             containerStyle={styles.checkbox}
//             checkedIcon='dot-circle-o'
//             uncheckedIcon='circle-o'
//           />
//           <Text style={styles.checkboxText}>{action}</Text>
//         </View>
//       ))}
//     </View>
//   </View>
// </View>


//      {/* Waiver */}
//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//         <Text style={styles.sectionHeader}>Waiver</Text>
        
//         </View>
//         <View style={styles.checkboxContainer}>
//             <Checkbox
//               value={checked.refuseMedicalAid}
//               onValueChange={() => toggleCheckbox('refuseMedicalAid')}
//             />
//             <Text style={styles.checkboxLabel}>Refuse any medical aid and/or evaluation by emergency medical personnel.</Text>
//           </View>
//           <View style={styles.checkboxContainer}>
//             <Checkbox
//               value={checked.refuseTransportation}
//               onValueChange={() => toggleCheckbox('refuseTransportation')}
//             />
//             <Text style={styles.checkboxLabel}>Refuse transportation to emergency receiving facility by emergency medical personnel.</Text>
//           </View>
//           <Text style={styles.waiverText}>
//             I also acknowledge that I have been advised that medical aid is needed and that my refusal of evaluation and/or transportation may result in the worsening of my condition and could result in permanent injury or death. I will not hold anyone accountable for my decision.
//           </Text>
     
    
//       </View>

//       {/* Patient Name & Signature */}
//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//       <Text style={styles.sectionHeader}>Witness Name & Signature</Text>
//       </View>



//         <Text></Text>
//         <TextInput style={styles.input} placeholder="Witness Name" />
//         <TextInput style={styles.input} placeholder="Relation/Designation" />
       
//       </View>



//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//       <Text style={styles.sectionHeader}>Patient Name & Signature</Text>

//       </View>
//       <Text>Signature:</Text>






//       <Text>Name:</Text>
//       <TextInput style={styles.input} placeholder="Patient Name" />
//       </View>










//       {/* Save Button */}
//       <TouchableOpacity style={styles.saveButton}>
//         <Text style={styles.saveButtonText}>Save Report</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//     marginTop: 15,
//     borderWidth: 0.7, // Adjust border width here
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 4, // Adjust padding if needed
//     alignSelf: 'center',
//     width: '120%',
//     backgroundColor: '#000000',
//     color:'#ffffff',
//   },
//   section: {
//     marginBottom: 16,
    
//   },
//   wrapper: {
//     borderWidth: 0.7, // Adjust border width here
//     borderColor: '#ccc',
//     borderRadius: 10,
//     padding: 4, // Adjust padding if needed
//     alignSelf: 'center',
//     width: '98%', // Adjust width as needed
//     marginBottom: 15,
//     backgroundColor: '#000000',
   
//   },
//   sectionHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 8,
//     alignItems:"center",
//     color: '#ffffff',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 8,
//   },
//   radioButton: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 8,
//     backgroundColor: '#fff',
//     elevation: 100,
//     shadowColor: '#fcfcfc',
   
//   },
//   radioButtonSelected: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 8,
//     backgroundColor: '#fa8072',
//   },
//   radioText: {
//     fontSize: 16,
//   },
 
//   checkboxText: {
//     fontSize: 16,
//   },
//   checkbox: {
//     margin: 0,
//     padding: 0,
//   },
//   waiverText: {
//     fontSize: 14,
//     marginBottom: 8,
//   },
//   saveButton: {
//     backgroundColor: '#32CD32',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },

  
  
//   twoColumnContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   column: {
//     width: '48%',
//   },
//   checkboxItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   shadowProp: {
//     shadowColor: '#171717',
//     shadowOffset: {width: -2, height: 4},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },

//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   checkboxLabel: {
//     marginLeft: 8,
//   },
//   waiverText: {
//     marginTop: 8,
//     fontSize: 14,
//   },
// });



// export default IncidentReport;


// import React, { useState, useEffect } from 'react';
// import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { CheckBox } from 'react-native-elements';
// import Checkbox from 'expo-checkbox';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getFirestore, doc, getDoc, setDoc, } from 'firebase/firestore';
// import { getApp } from 'firebase/app';
// const app = getApp();
// const db = getFirestore(app);
// const IncidentReport = () => {
//   const [selectedIncident, setSelectedIncident] = useState('');
//   const [selectedMobility, setSelectedMobility] = useState('');
//   const [selectedBurn, setSelectedBurn] = useState('');
//   const [selectedConsciousness, setSelectedConsciousness] = useState('');
//   const [actionsTaken, setActionsTaken] = useState({});
//   const [selectedSymptoms, setSelectedSymptoms] = useState([]);
//   const [WaiverChecked, setChecked] = useState([]);
//   const options = { year: 'numeric', month: 'long', day: 'numeric' };
//   const timestamp = {requestDate};
//   const requestDate = new Date(timestamp).toLocaleDateString('en-US', options);
 
//   const [vitalSigns, setVitalSigns] = useState({
//     temperature: '',
//     pulseRate: '',
//     respiratoryRate: '',
//     spO2: '',
//     bloodPressure: '',
//   });
// const [witness, setwitness] = useState({

// witnessName:'',
// relation:'',
// patientName:'',
// })






//     const initialActionsState = {
//       action1: null,
//     action2: null,
//     action3: null,
//     action4: null,
//     action5: null,
//     action6: null,
//     action7: null,
//     action8: null,
//     action9: null,
//     action10: null,
//     action11: null,
//     action12: null,
//     action13: null,
//     action14: null,
//     action15: null,
//     action16: null,
//     action17: null,
//     action18: null,
//     action19: null,
//     action20: null,
//     action21: null,
//     action22: null,
//     action23: null,
//     action24: null,
//     };
    
//     const [actionsTakenChecked, setActionsTakenChecked] = useState(initialActionsState);










//     const initialIncidentMemberState = {
//       incident1: null,
//       incident2: null,
//       incident3: null,
//       incident4: null,
//       incident5: null,
//       incident6: null,
//       incident7: null,
//       incident8: null,
//       incident9: null,             
//       incident10: null,
//     };


// const initialvehicularCauseMemberState = {
// vehic1: null,
// vehic2: null,
// vehic3: null,
// vehic4: null,
// vehic5: null,
// vehic6: null,
// vehic7: null,
// vehic8: null,
// }

// const vehicCase ={
// Reckless: 'vehic1',
// 'Animal Xing': 'vehic2',
// 'Slip & Slide': 'vehic3',
// 'S. Ped Xing': 'vehic4',
// Collision: 'vehic5',
// Speeding: 'vehic6',
// 'Drunk Driving': 'vehic7',
// Distracted: 'vehic8',

// }
// const [vehicularCauseMember, setvehicularCauseMember] = useState(initialvehicularCauseMemberState);







//   const [selectedReport, setSelectedReport] = useState({
   
//     userDetails: {
//       name: '',
//       gender: '',
//       age: '',
//       address: '',
     
//     },
//     requestDate: '',
//     phoneNumber: '',
//     address: '',
//     timeOfCall: '',
//     timeOfArrival: '',
//     informant: '',
//     chiefComplaint: ''

//   });

  
//   const actionsMapping = {
//     Oxygenation: 'action1',
//     Nebulization: 'action2',
//     HGT: 'action3',
//     'Advice to eat': 'action4',
//     'Assisted on Meds': 'action5',
//     'VS Check': 'action6',
//     Hydration: 'action7',
//     'Advise BRAT': 'action8',
//     Restrained: 'action9',
//     'Bleeding Control': 'action10',
//     Torniquet: 'action11',
//     Bandaging: 'action12',
//     'Cold Compress': 'action13',
//     'Warm Compress': 'action14',
//     'Burn Care': 'action15',
//     'Wound Care': 'action16',
//     CPR: 'action17',
//     'Rescue Breathing': 'action18',
//     'FBAO Mgt.': 'action19',
//     AED: 'action20',
//     'Arm Sling': 'action21',
//     'Spine Board': 'action22',
//     'C.Colar': 'action23',
//     Splinting: 'action24',
//   };



 
//   const symptomMappings = {
//     VehicularAccident: {
//       Deformity: 'incident1',
//       Burn: 'incident2',
//       Contusion: 'incident3',
//       Tenderness: 'incident4',
//       Abrasion: 'incident5',
//       Laceration: 'incident6',
//       Avulsion: 'incident7',
//       Swelling: 'incident8',
//       Puncture: 'incident9',
//       Fracture: 'incident10',
//     },
//     MedicalCase: {
//       Hypertension: 'incident1',
//       Vomiting: 'incident2',
//       'DOB/Cough': 'incident3',
//       'Nose Bleed': 'incident4',
//       'Fainting/Dizziness': 'incident5',
//       LBM: 'incident6',
//       'Fever/Seizure': 'incident7',
//       'Chest Pain': 'incident8',
//       'Skin Allergy': 'incident9',
//       'Labor Pain': 'incident10',
//     },
//     TraumaCase: {
//       'Alcohol Intox': 'incident1',
//       'Drug Intox': 'incident2',
//       Drowning: 'incident3',
//       Electrocution: 'incident4',
//       'Stab Wounds': 'incident5',
//       Mauling: 'incident6',
//       Fall: 'incident7',
//       'Animal Bite': 'incident8',
//       FBAO: 'incident9',
//       Psychiatric: 'incident10',
//     },
//   };
  
//   const [incidentMember, setIncidentMember] = useState(initialIncidentMemberState);
  


//   const fetchSelectedReport = async (reportId) => {
//     try {
//       const docRef = doc(db, 'Help Requests', reportId);
//       const docSnap = await getDoc(docRef);
//       // console.log('reportId:', reportId);
//       if (docSnap.exists()) {
//         console.log('Fetched Data:', docSnap.data());
//         const data = docSnap.data();

//         setSelectedReport({ ...data, id: docSnap.id }); 
//        setSelectedIncident(docSnap.data().accidentType || '');
      
//       } else {
//         console.log('No such document!');
//       }
//     } catch (error) {
//       console.error('Error fetching report data:', error);
//     }
//   };





//   useEffect(() => {
//     const getReportId = async () => {
//       try {
//         const storedReportId = await AsyncStorage.getItem('selectedReport');
//         console.log('Stored Report ID:', storedReportId);
//         if (storedReportId) {
//           await fetchSelectedReport(storedReportId);
//         }
//       } catch (error) {
//         console.error('Failed to fetch the report ID from AsyncStorage:', error);
//       }
//     };
  
//     getReportId();
  
//     const now = new Date();
//     const formattedTime = now.toLocaleTimeString(); // Formats time in locale-specific format
  
//     // Update timeOfArrival state
//     setTimeOfArrival(formattedTime);
//   }, []);
  




//   useEffect(() => {
//     if (selectedIncident) {
//       setSelectedReport((prevReport) => {
//         const updatedReport = { ...prevReport, accidentType: selectedIncident };
//         saveReport(updatedReport);
//         return updatedReport;
//       });
//     }
//   }, [selectedIncident]);

//   // Save updated report to Firestore
//   const saveReport = async (updatedReport) => {
//     try {
//       if (!updatedReport.id) {
//         throw new Error('Report ID is undefined');
//       }
//       const docRef = doc(db, 'Help Requests', updatedReport.id);
//       await setDoc(docRef, updatedReport); 
//       console.log('Report updated successfully!');
//     } catch (error) {
//       console.error('Error updating report:', error);
//     }
//   };
  








//   const formattedDate = selectedReport.requestDate
//   ? new Date(selectedReport.requestDate.seconds * 1000).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     })
//   : '';

//   const userDetails = selectedReport.userDetails || {};
//   const age = userDetails.age !== undefined && userDetails.age !== null ? userDetails.age.toString() : '';
//   const phoneNumber = userDetails.phoneNumber !== undefined && userDetails.phoneNumber !== null ? userDetails.phoneNumber.toString() : '';
//   const [timeOfArrival, setTimeOfArrival] = useState(selectedReport.timeOfArrival || '');




//   const handleSaveReport = () => {
//     // Creating the reportData object
//     let reportData = {
//       id: selectedReport.id,
//       userDetails: selectedReport.userDetails || {},
//       requestDate: selectedReport.requestDate,
//       ...(selectedReport.timeNow ? { timeOfCall: selectedReport.timeNow } : {}),
//       ...(selectedReport.address ? { incidentAddress: selectedReport.address } : {}),
//       ...(timeOfArrival ? { timeOfArrival: timeOfArrival } : {}),
//       ...(selectedReport.informant ? { informant: selectedReport.informant } : {}),
//       ...(selectedReport.chiefComplaint ? { chiefComplaint: selectedReport.chiefComplaint } : {}),
//       ...(selectedIncident ? { selectedIncident } : {}),
//       ...(selectedMobility ? { selectedMobility } : {}),
//       ...(selectedBurn ? { selectedBurn } : {}),
//       ...(selectedConsciousness ? { selectedConsciousness } : {}),
//       ...(actionsTakenChecked ? { actionsTakenChecked } : {}),
//       ...(WaiverChecked ? { WaiverChecked } : {}),
//       ...(vitalSigns ? { ...vitalSigns } : {}),
//       ...(witness ? { witness } : {}),
//       // Add the incidentMember field here
//       incidentMember: {
//         incident1: incidentMember.incident1 || null,
//         incident2: incidentMember.incident2 || null,
//         incident3: incidentMember.incident3 || null,
//         incident4: incidentMember.incident4 || null,
//         incident5: incidentMember.incident5 || null,
//         incident6: incidentMember.incident6 || null,
//         incident7: incidentMember.incident7 || null,
//         incident8: incidentMember.incident8 || null,
//         incident9: incidentMember.incident9 || null,
//         incident10: incidentMember.incident10 || null,
//       }
//     };
  
//     console.log('Report Data to Save:', reportData);
//     saveToRespondedRequests(reportData);
//   };
  
//   const saveToRespondedRequests = async (reportData) => {
//     try {
//       const docRef = doc(db, 'Responded Requests', reportData.id);
//       await setDoc(docRef, reportData);
      
//       console.log('Report saved to Responded Requests successfully!');
//     } catch (error) {
//       console.error('Error saving report to Responded Requests:', error);
//       console.log('Report Data:', reportData);
//     }
//   };


  

//   const handleChange = (field, value) => {
//     setVitalSigns((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const witnessfield = (field, value) => {
//     setwitness((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };



 
//  const handleActionCheck = (action) => {
//   const actionKey = actionsMapping[action];
//   const currentValue = actionsTakenChecked[actionKey];

//   setActionsTakenChecked((prevState) => ({
//     ...prevState,
//     [actionKey]: currentValue ? null : action, // Toggle between the action name and null
//   }));
// };



// const handleSymptomSelection = (symptom, incidentType) => {
//   const currentMapping = symptomMappings[incidentType];
//   if (!currentMapping) {
//     console.warn(`Invalid incident type: ${incidentType}`);
//     return;
//   }

//   const symptomKey = currentMapping[symptom];
//   if (!symptomKey) {
//     console.warn(`Invalid mapping for symptom: ${symptom} in incident type: ${incidentType}`);
//     return;
//   }

//   setIncidentMember((prevState) => {
//     // Toggle the symptom for the incident
//     return {
//       ...prevState,
//       [symptomKey]: prevState[symptomKey] === symptom ? null : symptom, // Set to null if already selected, otherwise set the symptom
//     };
//   });
// };






//   const toggleCheckbox = (key) => {
//     setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
//   };
 
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
    
//       <Text style={styles.header}>Incident Report</Text>

//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//         <Text style={styles.sectionHeader}>Patient Details</Text>
//         </View>
//         <TextInput style={styles.input} placeholder="Date" value={formattedDate} />
//         <TextInput style={styles.input} placeholder="Patient's Name" value={selectedReport.userDetails?.name} />
//         <TextInput style={styles.input} placeholder="Sex/Gender" value={selectedReport.userDetails?.gender} />
//         <TextInput style={styles.input} placeholder="Age" value={age} />
//         <TextInput style={styles.input} placeholder="Phone Number" value={phoneNumber} />
//         <TextInput style={styles.input} placeholder="Patient Address" multiline value={selectedReport.userDetails?.address} />
//         <TextInput style={styles.input} placeholder="Incident Address" multiline value={selectedReport.address} />
//         <TextInput style={styles.input} placeholder="Time of Call" value={selectedReport.timeNow} />
//         <TextInput style={styles.input} placeholder="Time of Arrival" value={timeOfArrival} />
//         <TextInput style={styles.input} placeholder="Informant" value={selectedReport.informant} />
//         <TextInput style={styles.input} placeholder="Chief Complaint" value={selectedReport.chiefComplaint} />
//       </View>

   
//       <View style={styles.container}>
//       <View style={styles.section}>
//         <View style={styles.wrapper}>
//           <Text style={styles.sectionHeader}>Type of Incident</Text>
//         </View>
//         {['Vehicular Accident', 'Medical Case', 'Trauma Case', 'Transport Only'].map((incident) => (
//           <TouchableOpacity
//             key={incident}
//             style={selectedIncident === incident ? styles.radioButtonSelected : styles.radioButton}
//             onPress={() => setSelectedIncident(incident)}
//           >
//             <Text style={styles.radioText}>{incident}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {selectedIncident === 'Vehicular Accident' && (
//         <View style={styles.section}>
//           <Text style={styles.sectionHeader}>Vehicular Accident Symptoms</Text>
//           <View style={styles.twoColumnContainer}>
//             <View style={styles.column}>
//               {['Deformity', 'Burn', 'Contusion', 'Tenderness', 'Abrasion'].map((symptom) => (
//                 <View key={symptom} style={styles.checkboxItem}>
//                   <CheckBox
//                     checked={incidentMember[symptomMappings.VehicularAccident[symptom]] === symptom}
//                     onPress={() => handleSymptomSelection(symptom, 'VehicularAccident')}
//                     containerStyle={styles.checkbox}
//                     checkedIcon='dot-circle-o'
//                     uncheckedIcon='circle-o'
//                   />
//                   <Text style={styles.checkboxText}>{symptom}</Text>
//                 </View>
//               ))}
//             </View>
//             <View style={styles.column}>
//               {['Laceration', 'Avulsion', 'Swelling', 'Puncture', 'Fracture'].map((symptom) => (
//                 <View key={symptom} style={styles.checkboxItem}>
//                   <CheckBox
//                     checked={incidentMember[symptomMappings.VehicularAccident[symptom]] === symptom}
//                     onPress={() => handleSymptomSelection(symptom, 'VehicularAccident')}
//                     containerStyle={styles.checkbox}
//                     checkedIcon='dot-circle-o'
//                     uncheckedIcon='circle-o'
//                   />
//                   <Text style={styles.checkboxText}>{symptom}</Text>
//                 </View>
//               ))}
//             </View>
//           </View>
//         </View>
//       )}

//       {selectedIncident === 'Medical Case' && (
//         <View style={styles.section}>
//           <Text style={styles.sectionHeader}>Medical Case Symptoms</Text>
//           <View style={styles.twoColumnContainer}>
//             <View style={styles.column}>
//               {['Hypertension', 'Vomiting', 'DOB/Cough', 'Nose Bleed', 'Fainting/Dizziness'].map((symptom) => (
//                 <View key={symptom} style={styles.checkboxItem}>
//                   <CheckBox
//                     checked={incidentMember[symptomMappings.MedicalCase[symptom]] === symptom}
//                     onPress={() => handleSymptomSelection(symptom, 'MedicalCase')}
//                     containerStyle={styles.checkbox}
//                     checkedIcon='dot-circle-o'
//                     uncheckedIcon='circle-o'
//                   />
//                   <Text style={styles.checkboxText}>{symptom}</Text>
//                 </View>
//               ))}
//             </View>
//             <View style={styles.column}>
//               {['LBM', 'Fever/Seizure', 'Chest Pain', 'Skin Allergy', 'Labor Pain'].map((symptom) => (
//                 <View key={symptom} style={styles.checkboxItem}>
//                   <CheckBox
//                     checked={incidentMember[symptomMappings.MedicalCase[symptom]] === symptom}
//                     onPress={() => handleSymptomSelection(symptom, 'MedicalCase')}
//                     containerStyle={styles.checkbox}
//                     checkedIcon='dot-circle-o'
//                     uncheckedIcon='circle-o'
//                   />
//                   <Text style={styles.checkboxText}>{symptom}</Text>
//                 </View>
//               ))}
//             </View>
//           </View>
//         </View>
//       )}

//       {selectedIncident === 'Trauma Case' && (
//         <View style={styles.section}>
//           <Text style={styles.sectionHeader}>Trauma Case Symptoms</Text>
//           <View style={styles.twoColumnContainer}>
//             <View style={styles.column}>
//               {['Alcohol Intox', 'Drug Intox', 'Drowning', 'Electrocution', 'Stab Wounds'].map((symptom) => (
//                 <View key={symptom} style={styles.checkboxItem}>
//                   <CheckBox
//                     checked={incidentMember[symptomMappings.TraumaCase[symptom]] === symptom}
//                     onPress={() => handleSymptomSelection(symptom, 'TraumaCase')}
//                     containerStyle={styles.checkbox}
//                     checkedIcon='dot-circle-o'
//                     uncheckedIcon='circle-o'
//                   />
//                   <Text style={styles.checkboxText}>{symptom}</Text>
//                 </View>
//               ))}
//             </View>
//             <View style={styles.column}>
//               {['Mauling', 'Fall', 'Animal Bite', 'FBAO', 'Psychiatric'].map((symptom) => (
//                 <View key={symptom} style={styles.checkboxItem}>
//                   <CheckBox
//                     checked={incidentMember[symptomMappings.TraumaCase[symptom]] === symptom}
//                     onPress={() => handleSymptomSelection(symptom, 'TraumaCase')}
//                     containerStyle={styles.checkbox}
//                     checkedIcon='dot-circle-o'
//                     uncheckedIcon='circle-o'
//                   />
//                   <Text style={styles.checkboxText}>{symptom}</Text>
//                 </View>
//               ))}
//             </View>
//           </View>
//         </View>
//       )}
//       </View>
 


   
//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//         <Text style={styles.sectionHeader}>Mobility</Text>
//         </View>
//         {['None', 'Ambulatory', 'Non - Ambulatory'].map((mobility) => (
//           <TouchableOpacity
//             key={mobility}
//             style={selectedMobility === mobility ? styles.radioButtonSelected : styles.radioButton}
//             onPress={() => setSelectedMobility(mobility)}
//           >
//             <Text style={styles.radioText}>{mobility}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

      
//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//         <Text style={styles.sectionHeader}>Burn</Text>
//         </View>
//         {['None', '1st Degree', '2nd Degree', '3rd Degree'].map((burn) => (
//           <TouchableOpacity
//             key={burn}
//             style={selectedBurn === burn ? styles.radioButtonSelected : styles.radioButton}
//             onPress={() => setSelectedBurn(burn)}
//           >
//             <Text style={styles.radioText}>{burn}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

      
//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//         <Text style={styles.sectionHeader}>Vital Signs</Text>
//         </View>
//         <TextInput style={styles.input} placeholder="Temperature" 
//           onChangeText={(text) => handleChange('temperature', text)}
//           value={vitalSigns.temperature}
//         />




//         <TextInput style={styles.input} placeholder="Pulse Rate"
//         onChangeText={(text) => handleChange('pulseRate', text)}
//         value={vitalSigns.pulseRate} 
//         />



//         <TextInput style={styles.input} placeholder="Respiratory Rate" 
//           onChangeText={(text) => handleChange('respiratoryRate', text)}
//           value={vitalSigns.respiratoryRate}
//         />

//         <TextInput style={styles.input} placeholder="SpO2"  
//            onChangeText={(text) => handleChange('spO2', text)}
//            value={vitalSigns.spO2}
//         />

//         <TextInput style={styles.input} placeholder="Blood Pressure" 
//            onChangeText={(text) => handleChange('bloodPressure', text)}
//            value={vitalSigns.bloodPressure}
//         />
//       </View>

//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//         <Text style={styles.sectionHeader}>Level of Consciousness</Text>
//         </View>
//         {['Alert', 'Verbal Response', 'Responsive to Pain', 'Unresponsive'].map((consciousness) => (
//           <TouchableOpacity
//             key={consciousness}
//             style={selectedConsciousness === consciousness ? styles.radioButtonSelected : styles.radioButton}
//             onPress={() => setSelectedConsciousness(consciousness)}
//           >
//             <Text style={styles.radioText}>{consciousness}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>




//  <View style={styles.section}>
//         <View style={styles.wrapper}>
//           <Text style={styles.sectionHeader}>Action Taken</Text>
//         </View>
//         <View style={styles.twoColumnContainer}>
//           <View style={styles.column}>
//             {Object.keys(actionsMapping).slice(0, 12).map((action) => (
//               <View key={action} style={styles.checkboxItem}>
//                 <CheckBox
//                   checked={actionsTakenChecked[actionsMapping[action]] !== null}
//                   onPress={() => handleActionCheck(action)}
//                   containerStyle={styles.checkbox}
//                   checkedIcon='dot-circle-o'
//                   uncheckedIcon='circle-o'
//                 />
//                 <Text style={styles.checkboxText}>{action}</Text>
//               </View>
//             ))}
//           </View>
//           <View style={styles.column}>
//             {Object.keys(actionsMapping).slice(12).map((action) => (
//               <View key={action} style={styles.checkboxItem}>
//                 <CheckBox
//                   checked={actionsTakenChecked[actionsMapping[action]] !== null}
//                   onPress={() => handleActionCheck(action)}
//                   containerStyle={styles.checkbox}
//                   checkedIcon='dot-circle-o'
//                   uncheckedIcon='circle-o'
//                 />
//                 <Text style={styles.checkboxText}>{action}</Text>
//               </View>
//             ))}
//           </View>
//         </View>
//       </View>



//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//         <Text style={styles.sectionHeader}>Waiver</Text>
        
//         </View>
//         <View style={styles.checkboxContainer}>
//             <Checkbox
//               value={WaiverChecked.refuseMedicalAid}
//               onValueChange={() => toggleCheckbox('refuseMedicalAid')}
//             />
//             <Text style={styles.checkboxLabel}>Refuse any medical aid and/or evaluation by emergency medical personnel.</Text>
//           </View>
//           <View style={styles.checkboxContainer}>
//             <Checkbox
//               value={WaiverChecked.refuseTransportation}
//               onValueChange={() => toggleCheckbox('refuseTransportation')}
//             />
//             <Text style={styles.checkboxLabel}>Refuse transportation to emergency receiving facility by emergency medical personnel.</Text>
//           </View>
//           <Text style={styles.waiverText}>
//             I also acknowledge that I have been advised that medical aid is needed and that my refusal of evaluation and/or transportation may result in the worsening of my condition and could result in permanent injury or death. I will not hold anyone accountable for my decision.
//           </Text>
     
    
//       </View>

//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//       <Text style={styles.sectionHeader}>Witness Name & Signature</Text>
//       </View>



//         <Text></Text>
//         <TextInput style={styles.input} placeholder="Witness Name" 
//            onChangeText={(text) => witnessfield('witnessName', text)}
//            value={witness.witnessName}
//         />



//         <TextInput style={styles.input} placeholder="Relation/Designation"
//         onChangeText={(text) => witnessfield('relation', text)}
//         value={witness.relation}
        
//          />
       
//       </View>



//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//       <Text style={styles.sectionHeader}>Patient Name & Signature</Text>

//       </View>
//       <Text>Signature:</Text>






//       <Text>Name:</Text>
//       <TextInput style={styles.input} placeholder="Patient Name"
//        onChangeText={(text) => witnessfield('patientName', text)}
//        value={witness.patientName}
//        />
//       </View>










     
//       <TouchableOpacity style={styles.saveButton} onPress={handleSaveReport}>
//         <Text style={styles.saveButtonText}>Save Report</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };   
// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//     marginTop: 15,
//     borderWidth: 0.7,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 4, 
//     alignSelf: 'center',
//     width: '120%',
//     backgroundColor: '#000000',
//     color:'#ffffff',
//   },
//   section: {
//     marginBottom: 16,
    
//   },
//   wrapper: {
//     borderWidth: 0.7, 
//     borderColor: '#ccc',
//     borderRadius: 10,
//     padding: 4, 
//     alignSelf: 'center',
//     width: '98%', 
//     marginBottom: 15,
//     backgroundColor: '#000000',
   
//   },
//   sectionHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 8,
//     alignItems:"center",
//     color: '#ffffff',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 8,
//   },
//   radioButton: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 8,
//     backgroundColor: '#fff',
//     elevation: 100,
//     shadowColor: '#fcfcfc',
   
//   },
//   radioButtonSelected: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 8,
//     backgroundColor: '#fa8072',
//   },
//   radioText: {
//     fontSize: 16,
//   },
 
//   checkboxText: {
//     fontSize: 16,
//   },
//   checkbox: {
//     margin: 0,
//     padding: 0,
//   },
//   waiverText: {
//     fontSize: 14,
//     marginBottom: 8,
//   },
//   saveButton: {
//     backgroundColor: '#32CD32',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },

  
  
//   twoColumnContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   column: {
//     width: '48%',
//   },
//   checkboxItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   shadowProp: {
//     shadowColor: '#171717',
//     shadowOffset: {width: -2, height: 4},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },

//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   checkboxLabel: {
//     marginLeft: 8,
//   },
//   waiverText: {
//     marginTop: 8,
//     fontSize: 14,
//   },
// });



// export default IncidentReport;





//tuhay pa top//
























// import React, { useState, useEffect } from 'react';
// import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { CheckBox } from 'react-native-elements';
// import Checkbox from 'expo-checkbox';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// import { getApp } from 'firebase/app';
// const app = getApp();
// const db = getFirestore(app);
// const IncidentReport = () => {
//   const [selectedIncident, setSelectedIncident] = useState('');
//   const [selectedMobility, setSelectedMobility] = useState('');
//   const [selectedBurn, setSelectedBurn] = useState('');
//   const [selectedConsciousness, setSelectedConsciousness] = useState('');
//   const [actionsTaken, setActionsTaken] = useState({});
//   const [selectedSymptoms, setSelectedSymptoms] = useState([]);
//   const [checked, setChecked] = useState([]);
//   const options = { year: 'numeric', month: 'long', day: 'numeric' };
//   const timestamp = {requestDate};
//   const requestDate = new Date(timestamp).toLocaleDateString('en-US', options);
  

//   const [selectedReport, setSelectedReport] = useState({
   
//     userDetails: {
//       name: '',
//       gender: '',
//       age: '',
//       address: '',
     
//     },
//     requestDate: '',
//     phoneNumber: '',
//     address: '',
//     timeOfCall: '',
//     timeOfArrival: '',
//     informant: '',
//     chiefComplaint: ''
//   });

//   // const fetchselectedReport = async (reportId) => {
//   //   try {
//   //     const docRef = doc(db, 'Help Requests', reportId);
//   //     const docSnap = await getDoc(docRef);
//   //     console.log('reportId:', reportId);
//   //     if (docSnap.exists()) {
//   //       console.log('Fetched Data:', docSnap.data()); 
//   //       setSelectedReportId(docSnap.data());
       
//   //     } else {
//   //       console.log('No such document!');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error fetching report data:', error);
//   //   }
//   // };



//   const fetchSelectedReport = async (reportId) => {
//     try {
//       const docRef = doc(db, 'Help Requests', reportId);
//       const docSnap = await getDoc(docRef);
//       // console.log('reportId:', reportId);
//       if (docSnap.exists()) {
//         console.log('Fetched Data:', docSnap.data());
//         const data = docSnap.data();

//         setSelectedReport({ ...data, id: docSnap.id }); 
//        setSelectedIncident(docSnap.data().accidentType || '');
      
//       } else {
//         console.log('No such document!');
//       }
//     } catch (error) {
//       console.error('Error fetching report data:', error);
//     }
//   };

//   // useEffect(() => {
//   //   const getReportId = async () => {
//   //     try {
//   //       const selectedReport = await AsyncStorage.getItem('selectedReport');
//   //       if (selectedReport) {
//   //         fetchselectedReport(selectedReport);
         
//   //       }
//   //     } catch (error) {
//   //       console.error('Failed to fetch the report ID from AsyncStorage:', error);
//   //     }
//   //   };

//   //   getReportId();
//   //   const now = new Date();
//   //   const formattedTime = now.toLocaleTimeString(); // Formats time in locale-specific format

//   //   // Update timeOfArrival state
//   //   setTimeOfArrival(formattedTime);
    
//   // }, []);




//   useEffect(() => {
//     const getReportId = async () => {
//       try {
//         const storedReportId = await AsyncStorage.getItem('selectedReport');
//         console.log('Stored Report ID:', storedReportId);
//         if (storedReportId) {
//           await fetchSelectedReport(storedReportId);
//         }
//       } catch (error) {
//         console.error('Failed to fetch the report ID from AsyncStorage:', error);
//       }
//     };
  
//     getReportId();
  
//     const now = new Date();
//     const formattedTime = now.toLocaleTimeString(); // Formats time in locale-specific format
  
//     // Update timeOfArrival state
//     setTimeOfArrival(formattedTime);
//   }, []);
  




//   useEffect(() => {
//     if (selectedIncident) {
//       setSelectedReport((prevReport) => {
//         const updatedReport = { ...prevReport, accidentType: selectedIncident };
//         saveReport(updatedReport);
//         return updatedReport;
//       });
//     }
//   }, [selectedIncident]);

//   // Save updated report to Firestore
//   const saveReport = async (updatedReport) => {
//     try {
//       if (!updatedReport.id) {
//         throw new Error('Report ID is undefined');
//       }
//       const docRef = doc(db, 'Help Requests', updatedReport.id);
//       await setDoc(docRef, updatedReport);
//       console.log('Report updated successfully!');
//     } catch (error) {
//       console.error('Error updating report:', error);
//     }
//   };
  








//   const formattedDate = selectedReport.requestDate
//   ? new Date(selectedReport.requestDate.seconds * 1000).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     })
//   : '';

//   const userDetails = selectedReport.userDetails || {};
//   const age = userDetails.age !== undefined && userDetails.age !== null ? userDetails.age.toString() : '';
//   const phoneNumber = userDetails.phoneNumber !== undefined && userDetails.phoneNumber !== null ? userDetails.phoneNumber.toString() : '';
//   const [timeOfArrival, setTimeOfArrival] = useState(selectedReport.timeOfArrival || '');


//   const handleActionCheck = (action) => {
//     setActionsTaken((prevState) => ({
//       ...prevState,
//       [action]: !prevState[action],
//     }));
//   };

//   const handleSymptomSelection = (symptom) => {
//     setSelectedSymptoms((prevSelected) => {
//       if (prevSelected.includes(symptom)) {
//         return prevSelected.filter(item => item !== symptom);
//       } else {
//         return [...prevSelected, symptom];
//       }
//     });
//   };
//   const toggleCheckbox = (key) => {
//     setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
//   };
 
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
    
//       <Text style={styles.header}>Incident Report</Text>

//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//         <Text style={styles.sectionHeader}>Patient Details</Text>
//         </View>
//         <TextInput style={styles.input} placeholder="Date" value={formattedDate} />
//         <TextInput style={styles.input} placeholder="Patient's Name" value={selectedReport.userDetails?.name} />
//         <TextInput style={styles.input} placeholder="Sex/Gender" value={selectedReport.userDetails?.gender} />
//         <TextInput style={styles.input} placeholder="Age" value={age} />
//         <TextInput style={styles.input} placeholder="Phone Number" value={phoneNumber} />
//         <TextInput style={styles.input} placeholder="Patient Address" multiline value={selectedReport.userDetails?.address} />
//         <TextInput style={styles.input} placeholder="Incident Address" multiline value={selectedReport.address} />
//         <TextInput style={styles.input} placeholder="Time of Call" value={selectedReport.timeNow} />
//         <TextInput style={styles.input} placeholder="Time of Arrival" value={timeOfArrival} />
//         <TextInput style={styles.input} placeholder="Informant" value={selectedReport.informant} />
//         <TextInput style={styles.input} placeholder="Chief Complaint" value={selectedReport.chiefComplaint} />
//       </View>

   
//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//   <Text style={styles.sectionHeader}>Type of Incident</Text>
// </View>
//         {['Vehicular Accident', 'Medical Case', 'Trauma Case', 'Transport Only'].map((incident) => (
//           <TouchableOpacity
//             key={incident}
//             style={selectedIncident === incident ? styles.radioButtonSelected : styles.radioButton}
//             onPress={() => setSelectedIncident(incident)}
//           >
//             <Text style={styles.radioText}>{incident}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//      {selectedIncident === 'Vehicular Accident' && (
//   <>
//     <View style={styles.section}>
   
//       <View style={styles.twoColumnContainer}>
//         <View style={styles.column}>
//           {['Deformity', 'Burn', 'Contusion', 'Tenderness', 'Abrasion'].map((injury) => (
//             <View key={injury} style={styles.checkboxItem}>
//               <CheckBox
//                 checked={selectedSymptoms.includes(injury)}
//                 onPress={() => handleSymptomSelection(injury)}
//                 containerStyle={styles.checkbox}
//                 checkedIcon='dot-circle-o'
//                 uncheckedIcon='circle-o'
//               />
//               <Text style={styles.checkboxText}>{injury}</Text>
//             </View>
//           ))}
//         </View>
//         <View style={styles.column}>
//           {['Laceration', 'Avulsion', 'Swelling', 'Puncture', 'Fracture'].map((injury) => (
//             <View key={injury} style={styles.checkboxItem}>
//               <CheckBox
//                 checked={selectedSymptoms.includes(injury)}
//                 onPress={() => handleSymptomSelection(injury)}
//                 containerStyle={styles.checkbox}
//                 checkedIcon='dot-circle-o'
//                 uncheckedIcon='circle-o'
//               />
//               <Text style={styles.checkboxText}>{injury}</Text>
//             </View>
//           ))}
//         </View>
//       </View>
//     </View>

//     <View style={styles.section}>
//     <View style={styles.wrapper}>
//       <Text style={styles.sectionHeader}>Cause of Vehicular Accident</Text>
//       </View>
//       <View style={styles.twoColumnContainer}>
//         <View style={styles.column}>
//           {['Reckless', 'Animal Xing', 'Slip & Slide', 'S. Ped Xing', 'Collision'].map((cause) => (
//             <View key={cause} style={styles.checkboxItem}>
//               <CheckBox
//                 checked={selectedSymptoms.includes(cause)}
//                 onPress={() => handleSymptomSelection(cause)}
//                 containerStyle={styles.checkbox}
//                 checkedIcon='dot-circle-o'
//                 uncheckedIcon='circle-o'
//               />
//               <Text style={styles.checkboxText}>{cause}</Text>
//             </View>
//           ))}
//         </View>
//         <View style={styles.column}>
//           {['Speeding', 'Drunk Driving', 'Distracted'].map((cause) => (
//             <View key={cause} style={styles.checkboxItem}>
//               <CheckBox
//                 checked={selectedSymptoms.includes(cause)}
//                 onPress={() => handleSymptomSelection(cause)}
//                 containerStyle={styles.checkbox}
//                 checkedIcon='dot-circle-o'
//                 uncheckedIcon='circle-o'
//               />
//               <Text style={styles.checkboxText}>{cause}</Text>
//             </View>
//           ))}
//         </View>
//       </View>
//     </View>
//   </>
// )}

//     {selectedIncident === 'Medical Case' && (
//   <View style={styles.section}>
  
//     <View style={styles.twoColumnContainer}>
//       <View style={styles.column}>
//         {['Hypertension', 'Vomiting', 'DOB/Cough', 'Nose Bleed', 'Fainting/Dizziness'].map((symptom) => (
//           <View key={symptom} style={styles.checkboxItem}>
//             <CheckBox
//               checked={selectedSymptoms.includes(symptom)}
//               onPress={() => handleSymptomSelection(symptom)}
//               containerStyle={styles.checkbox}
//               checkedIcon='dot-circle-o'
//               uncheckedIcon='circle-o'
//             />
//             <Text style={styles.checkboxText}>{symptom}</Text>
//           </View>
//         ))}
//       </View>
//       <View style={styles.column}>
//         {['LBM', 'Fever/Seizure', 'Chest Pain', 'Skin Allergy', 'Labor Pain'].map((symptom) => (
//           <View key={symptom} style={styles.checkboxItem}>
//             <CheckBox
//               checked={selectedSymptoms.includes(symptom)}
//               onPress={() => handleSymptomSelection(symptom)}
//               containerStyle={styles.checkbox}
//               checkedIcon='dot-circle-o'
//               uncheckedIcon='circle-o'
//             />
//             <Text style={styles.checkboxText}>{symptom}</Text>
//           </View>
//         ))}
//       </View>
//     </View>
//   </View>
// )}


//      {selectedIncident === 'Trauma Case' && (
//   <View style={styles.section}>

//     <View style={styles.twoColumnContainer}>
//       <View style={styles.column}>
//         {['Alcohol Intox', 'Drug Intox', 'Drowning', 'Electrocution', 'Stab Wounds'].map((symptom) => (
//           <View key={symptom} style={styles.checkboxItem}>
//             <CheckBox
//               checked={selectedSymptoms.includes(symptom)}
//               onPress={() => handleSymptomSelection(symptom)}
//               containerStyle={styles.checkbox}
//               checkedIcon='dot-circle-o'
//               uncheckedIcon='circle-o'
//             />
//             <Text style={styles.checkboxText}>{symptom}</Text>
//           </View>
//         ))}
//       </View>
//       <View style={styles.column}>
//         {['Mauling', 'Fall', 'Animal Bite', 'FBAO', 'Psychiatric'].map((symptom) => (
//           <View key={symptom} style={styles.checkboxItem}>
//             <CheckBox
//               checked={selectedSymptoms.includes(symptom)}
//               onPress={() => handleSymptomSelection(symptom)}
//               containerStyle={styles.checkbox}
//               checkedIcon='dot-circle-o'
//               uncheckedIcon='circle-o'
//             />
//             <Text style={styles.checkboxText}>{symptom}</Text>
//           </View>
//         ))}
//       </View>
//     </View>
//   </View>
// )}

   
//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//         <Text style={styles.sectionHeader}>Mobility</Text>
//         </View>
//         {['None', 'Ambulatory', 'Non - Ambulatory'].map((mobility) => (
//           <TouchableOpacity
//             key={mobility}
//             style={selectedMobility === mobility ? styles.radioButtonSelected : styles.radioButton}
//             onPress={() => setSelectedMobility(mobility)}
//           >
//             <Text style={styles.radioText}>{mobility}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

      
//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//         <Text style={styles.sectionHeader}>Burn</Text>
//         </View>
//         {['None', '1st Degree', '2nd Degree', '3rd Degree'].map((burn) => (
//           <TouchableOpacity
//             key={burn}
//             style={selectedBurn === burn ? styles.radioButtonSelected : styles.radioButton}
//             onPress={() => setSelectedBurn(burn)}
//           >
//             <Text style={styles.radioText}>{burn}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

      
//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//         <Text style={styles.sectionHeader}>Vital Signs</Text>
//         </View>
//         <TextInput style={styles.input} placeholder="Temperature" />
//         <TextInput style={styles.input} placeholder="Pulse Rate" />
//         <TextInput style={styles.input} placeholder="Respiratory Rate" />
//         <TextInput style={styles.input} placeholder="SpO2" />
//         <TextInput style={styles.input} placeholder="Blood Pressure" />
//       </View>

//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//         <Text style={styles.sectionHeader}>Level of Consciousness</Text>
//         </View>
//         {['Alert', 'Verbal Response', 'Responsive to Pain', 'Unresponsive'].map((consciousness) => (
//           <TouchableOpacity
//             key={consciousness}
//             style={selectedConsciousness === consciousness ? styles.radioButtonSelected : styles.radioButton}
//             onPress={() => setSelectedConsciousness(consciousness)}
//           >
//             <Text style={styles.radioText}>{consciousness}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>


// <View style={styles.section}>
// <View style={styles.wrapper}>
//   <Text style={styles.sectionHeader}>Action Taken</Text>
//   </View>
//   <View style={styles.twoColumnContainer}>
//     <View style={styles.column}>
//       {[
//        'Oxygenation', 'Nebulization', 'HGT', 'Advice to eat', 'Assisted on Meds', 'VS Check', 
//        'Hydration', 'Advise BRAT', 'Restrained', 'Bleeding Control', 'Torniquet', 'Bandaging'
//       ].map((action) => (
//         <View key={action} style={styles.checkboxItem}>
//           <CheckBox
//             checked={actionsTaken[action] || false}
//             onPress={() => handleActionCheck(action)}
//             containerStyle={styles.checkbox}
//             checkedIcon='dot-circle-o'
//             uncheckedIcon='circle-o'
//           />
//           <Text style={styles.checkboxText}>{action}</Text>
//         </View>
//       ))}
//     </View>
//     <View style={styles.column}>
//       {[
//        'Cold Compress', 'Warm Compress', 'Burn Care', 'Wound Care', 'CPR', 'Rescue Breathing', 'FBAO Mgt.',
//        'AED', 'Arm Sling', 'Spine Board', 'C.Colar', 'Spliting'
//       ].map((action) => (
//         <View key={action} style={styles.checkboxItem}>
//           <CheckBox
//             checked={actionsTaken[action] || false}
//             onPress={() => handleActionCheck(action)}
//             containerStyle={styles.checkbox}
//             checkedIcon='dot-circle-o'
//             uncheckedIcon='circle-o'
//           />
//           <Text style={styles.checkboxText}>{action}</Text>
//         </View>
//       ))}
//     </View>
//   </View>
// </View>



//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//         <Text style={styles.sectionHeader}>Waiver</Text>
        
//         </View>
//         <View style={styles.checkboxContainer}>
//             <Checkbox
//               value={checked.refuseMedicalAid}
//               onValueChange={() => toggleCheckbox('refuseMedicalAid')}
//             />
//             <Text style={styles.checkboxLabel}>Refuse any medical aid and/or evaluation by emergency medical personnel.</Text>
//           </View>
//           <View style={styles.checkboxContainer}>
//             <Checkbox
//               value={checked.refuseTransportation}
//               onValueChange={() => toggleCheckbox('refuseTransportation')}
//             />
//             <Text style={styles.checkboxLabel}>Refuse transportation to emergency receiving facility by emergency medical personnel.</Text>
//           </View>
//           <Text style={styles.waiverText}>
//             I also acknowledge that I have been advised that medical aid is needed and that my refusal of evaluation and/or transportation may result in the worsening of my condition and could result in permanent injury or death. I will not hold anyone accountable for my decision.
//           </Text>
     
    
//       </View>

//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//       <Text style={styles.sectionHeader}>Witness Name & Signature</Text>
//       </View>



//         <Text></Text>
//         <TextInput style={styles.input} placeholder="Witness Name" />
//         <TextInput style={styles.input} placeholder="Relation/Designation" />
       
//       </View>



//       <View style={styles.section}>
//       <View style={styles.wrapper}>
//       <Text style={styles.sectionHeader}>Patient Name & Signature</Text>

//       </View>
//       <Text>Signature:</Text>






//       <Text>Name:</Text>
//       <TextInput style={styles.input} placeholder="Patient Name" />
//       </View>










     
//       <TouchableOpacity style={styles.saveButton}>
//         <Text style={styles.saveButtonText}>Save Report</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//     marginTop: 15,
//     borderWidth: 0.7,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 4, 
//     alignSelf: 'center',
//     width: '120%',
//     backgroundColor: '#000000',
//     color:'#ffffff',
//   },
//   section: {
//     marginBottom: 16,
    
//   },
//   wrapper: {
//     borderWidth: 0.7, 
//     borderColor: '#ccc',
//     borderRadius: 10,
//     padding: 4, 
//     alignSelf: 'center',
//     width: '98%', 
//     marginBottom: 15,
//     backgroundColor: '#000000',
   
//   },
//   sectionHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 8,
//     alignItems:"center",
//     color: '#ffffff',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 8,
//   },
//   radioButton: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 8,
//     backgroundColor: '#fff',
//     elevation: 100,
//     shadowColor: '#fcfcfc',
   
//   },
//   radioButtonSelected: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 8,
//     backgroundColor: '#fa8072',
//   },
//   radioText: {
//     fontSize: 16,
//   },
 
//   checkboxText: {
//     fontSize: 16,
//   },
//   checkbox: {
//     margin: 0,
//     padding: 0,
//   },
//   waiverText: {
//     fontSize: 14,
//     marginBottom: 8,
//   },
//   saveButton: {
//     backgroundColor: '#32CD32',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },

  
  
//   twoColumnContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   column: {
//     width: '48%',
//   },
//   checkboxItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   shadowProp: {
//     shadowColor: '#171717',
//     shadowOffset: {width: -2, height: 4},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },

//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   checkboxLabel: {
//     marginLeft: 8,
//   },
//   waiverText: {
//     marginTop: 8,
//     fontSize: 14,
//   },
// });



// export default IncidentReport;















import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { useNavigation } from '@react-navigation/native';
const app = getApp();
const db = getFirestore(app);
const IncidentReport = () => {
  const [selectedIncident, setSelectedIncident] = useState('');
  const [selectedMobility, setSelectedMobility] = useState('');
  const [selectedBurn, setSelectedBurn] = useState('');
  const [selectedConsciousness, setSelectedConsciousness] = useState('');
  const [actionsTaken, setActionsTaken] = useState({});
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [WaiverChecked, setChecked] = useState([]);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const timestamp = {requestDate};
  const requestDate = new Date(timestamp).toLocaleDateString('en-US', options);
 
  const [vitalSigns, setVitalSigns] = useState({
    temperature: '',
    pulseRate: '',
    respiratoryRate: '',
    spO2: '',
    bloodPressure: '',
  });
const [witness, setwitness] = useState({

witnessName:'',
relation:'',
patientName:'',
})






    const initialActionsState = {
      action1: null,
    action2: null,
    action3: null,
    action4: null,
    action5: null,
    action6: null,
    action7: null,
    action8: null,
    action9: null,
    action10: null,
    action11: null,
    action12: null,
    action13: null,
    action14: null,
    action15: null,
    action16: null,
    action17: null,
    action18: null,
    action19: null,
    action20: null,
    action21: null,
    action22: null,
    action23: null,
    action24: null,
    };
    
    const [actionsTakenChecked, setActionsTakenChecked] = useState(initialActionsState);










    const initialIncidentMemberState = {
      incident1: null,
      incident2: null,
      incident3: null,
      incident4: null,
      incident5: null,
      incident6: null,
      incident7: null,
      incident8: null,
      incident9: null,             
      incident10: null,
    };


const initialvehicularCauseMemberState = {
vehic1: null,
vehic2: null,
vehic3: null,
vehic4: null,
vehic5: null,
vehic6: null,
vehic7: null,
vehic8: null,
}

const vehicCase ={
Reckless: 'vehic1',
'Animal Xing': 'vehic2',
'Slip & Slide': 'vehic3',
'S. Ped Xing': 'vehic4',
Collision: 'vehic5',
Speeding: 'vehic6',
'Drunk Driving': 'vehic7',
Distracted: 'vehic8',

}
const [vehicularCauseMember, setvehicularCauseMember] = useState(initialvehicularCauseMemberState);







  const [selectedReport, setSelectedReport] = useState({
   
    userDetails: {
      name: '',
      gender: '',
      age: '',
      address: '',
     
    },
    requestDate: '',
    phoneNumber: '',
    address: '',
    timeOfCall: '',
    timeOfArrival: '',
    informant: '',
    chiefComplaint: ''

  });

  
  const actionsMapping = {
    Oxygenation: 'action1',
    Nebulization: 'action2',
    HGT: 'action3',
    'Advice to eat': 'action4',
    'Assisted on Meds': 'action5',
    'VS Check': 'action6',
    Hydration: 'action7',
    'Advise BRAT': 'action8',
    Restrained: 'action9',
    'Bleeding Control': 'action10',
    Torniquet: 'action11',
    Bandaging: 'action12',
    'Cold Compress': 'action13',
    'Warm Compress': 'action14',
    'Burn Care': 'action15',
    'Wound Care': 'action16',
    CPR: 'action17',
    'Rescue Breathing': 'action18',
    'FBAO Mgt.': 'action19',
    AED: 'action20',
    'Arm Sling': 'action21',
    'Spine Board': 'action22',
    'C.Colar': 'action23',
    Splinting: 'action24',
  };



 
  const symptomMappings = {
    VehicularAccident: {
      Deformity: 'incident1',
      Burn: 'incident2',
      Contusion: 'incident3',
      Tenderness: 'incident4',
      Abrasion: 'incident5',
      Laceration: 'incident6',
      Avulsion: 'incident7',
      Swelling: 'incident8',
      Puncture: 'incident9',
      Fracture: 'incident10',
    },
    MedicalCase: {
      Hypertension: 'incident1',
      Vomiting: 'incident2',
      'DOB/Cough': 'incident3',
      'Nose Bleed': 'incident4',
      'Fainting/Dizziness': 'incident5',
      LBM: 'incident6',
      'Fever/Seizure': 'incident7',
      'Chest Pain': 'incident8',
      'Skin Allergy': 'incident9',
      'Labor Pain': 'incident10',
    },
    TraumaCase: {
      'Alcohol Intox': 'incident1',
      'Drug Intox': 'incident2',
      Drowning: 'incident3',
      Electrocution: 'incident4',
      'Stab Wounds': 'incident5',
      Mauling: 'incident6',
      Fall: 'incident7',
      'Animal Bite': 'incident8',
      FBAO: 'incident9',
      Psychiatric: 'incident10',
    },
  };
  
  const [incidentMember, setIncidentMember] = useState(initialIncidentMemberState);
  


  const fetchSelectedReport = async (reportId) => {
    try {
      const docRef = doc(db, 'Help Requests', reportId);
      const docSnap = await getDoc(docRef);
      // console.log('reportId:', reportId);
      if (docSnap.exists()) {
        console.log('Fetched Data:', docSnap.data());
        const data = docSnap.data();

        setSelectedReport({ ...data, id: docSnap.id }); 
       setSelectedIncident(docSnap.data().accidentType || '');
      
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };





  useEffect(() => {
    const getReportId = async () => {
      try {
        const storedReportId = await AsyncStorage.getItem('selectedReport');
        console.log('Stored Report ID:', storedReportId);
        if (storedReportId) {
          await fetchSelectedReport(storedReportId);
        }
      } catch (error) {
        console.error('Failed to fetch the report ID from AsyncStorage:', error);
      }
    };
  
    getReportId();
  
    const now = new Date();
    const formattedTime = now.toLocaleTimeString(); // Formats time in locale-specific format
  
    // Update timeOfArrival state
    setTimeOfArrival(formattedTime);
  }, []);
  




  useEffect(() => {
    if (selectedIncident) {
      setSelectedReport((prevReport) => {
        const updatedReport = { ...prevReport, accidentType: selectedIncident };
        saveReport(updatedReport);
        return updatedReport;
      });
    }
  }, [selectedIncident]);

  // Save updated report to Firestore
  const saveReport = async (updatedReport) => {
    try {
      if (!updatedReport.id) {
        throw new Error('Report ID is undefined');
      }
      const docRef = doc(db, 'Help Requests', updatedReport.id);
      await setDoc(docRef, updatedReport); 
      console.log('Report updated successfully!');
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };
  








  const formattedDate = selectedReport.requestDate
  ? new Date(selectedReport.requestDate.seconds * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  : '';

  const userDetails = selectedReport.userDetails || {};
  const age = userDetails.age !== undefined && userDetails.age !== null ? userDetails.age.toString() : '';
  const phoneNumber = userDetails.phoneNumber !== undefined && userDetails.phoneNumber !== null ? userDetails.phoneNumber.toString() : '';
  const [timeOfArrival, setTimeOfArrival] = useState(selectedReport.timeOfArrival || '');

  const navigation = useNavigation();


  const handleSaveReport = async() => {
    // Creating the reportData object
    let reportData = {
      id: selectedReport.id,
      userDetails: selectedReport.userDetails || {},
      requestDate: selectedReport.requestDate,
      ...(selectedReport.timeNow ? { timeOfCall: selectedReport.timeNow } : {}),
      ...(selectedReport.address ? { incidentAddress: selectedReport.address } : {}),
      ...(timeOfArrival ? { timeOfArrival: timeOfArrival } : {}),
      ...(selectedReport.informant ? { informant: selectedReport.informant } : {}),
      ...(selectedReport.chiefComplaint ? { chiefComplaint: selectedReport.chiefComplaint } : {}),
      ...(selectedIncident ? { selectedIncident } : {}),
      ...(selectedMobility ? { selectedMobility } : {}),
      ...(selectedBurn ? { selectedBurn } : {}),
      ...(selectedConsciousness ? { selectedConsciousness } : {}),
      ...(actionsTakenChecked ? { actionsTakenChecked } : {}),
      ...(WaiverChecked ? { WaiverChecked } : {}),
      ...(vitalSigns ? { ...vitalSigns } : {}),
      ...(witness ? { witness } : {}),
      ...(vehicularCauseMember? {vehicularCauseMember} : {}),
      // Add the incidentMember field here
      incidentMember: {
        incident1: incidentMember.incident1 || null,
        incident2: incidentMember.incident2 || null,
        incident3: incidentMember.incident3 || null,
        incident4: incidentMember.incident4 || null,
        incident5: incidentMember.incident5 || null,
        incident6: incidentMember.incident6 || null,
        incident7: incidentMember.incident7 || null,
        incident8: incidentMember.incident8 || null,
        incident9: incidentMember.incident9 || null,
        incident10: incidentMember.incident10 || null,
       
      }
    };
  
    console.log('Report Data to Save:', reportData);
    // saveToRespondedRequests(reportData);
    await saveToRespondedRequests(reportData);
    await deleteFromEmergencyHistory(reportData.id);
    navigation.navigate('AdminDashboard');
  };
  
  const saveToRespondedRequests = async (reportData) => {
    try {
      const docRef = doc(db, 'Responded Requests', reportData.id);
      await setDoc(docRef, reportData);
      
      console.log('Report saved to Responded Requests successfully!');
    } catch (error) {
      console.error('Error saving report to Responded Requests:', error);
      console.log('Report Data:', reportData);
    }
  };
  const deleteFromEmergencyHistory = async (reportId) => {
    try {
      const docRef = doc(db, 'Help Requests', reportId);
      await deleteDoc(docRef);
      console.log('Report deleted from Emergency History successfully!');
    } catch (error) {
      console.error('Error deleting report from Emergency History:', error);
    }
  };

  

  const handleChange = (field, value) => {
    setVitalSigns((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const witnessfield = (field, value) => {
    setwitness((prev) => ({
      ...prev,
      [field]: value,
    }));
  };



 
 const handleActionCheck = (action) => {
  const actionKey = actionsMapping[action];
  const currentValue = actionsTakenChecked[actionKey];

  setActionsTakenChecked((prevState) => ({
    ...prevState,
    [actionKey]: currentValue ? null : action, // Toggle between the action name and null
  }));
};



// const handleSymptomSelection = (symptom, incidentType) => {
//   const currentMapping = symptomMappings[incidentType];
//   if (!currentMapping) {
//     console.warn(`Invalid incident type: ${incidentType}`);
//     return;
//   }

//   const symptomKey = currentMapping[symptom];
//   if (!symptomKey) {
//     console.warn(`Invalid mapping for symptom: ${symptom} in incident type: ${incidentType}`);
//     return;
//   }

//   setIncidentMember((prevState) => {
//     // Toggle the symptom for the incident
//     return {
//       ...prevState,
//       [symptomKey]: prevState[symptomKey] === symptom ? null : symptom, // Set to null if already selected, otherwise set the symptom
//     };
//   });
// };


const handleSymptomSelection = (item, incidentType, isCause = false) => {
  const currentMapping = isCause ? vehicCase : symptomMappings[incidentType];
  
  if (!currentMapping) {
    console.warn(`Invalid incident type or cause: ${incidentType}`);
    return;
  }

  const itemKey = currentMapping[item];
  if (!itemKey) {
    console.warn(`Invalid mapping for item: ${item} in incident type: ${incidentType}`);
    return;
  }

  if (isCause) {
    setvehicularCauseMember((prevState) => ({
      ...prevState,
      [itemKey]: prevState[itemKey] === item ? null : item,
    }));
  } else {
    setIncidentMember((prevState) => ({
      ...prevState,
      [itemKey]: prevState[itemKey] === item ? null : item,
    }));
  }
};

const handleVehicularCauseSelection = (cause) => {
  const causeKey = vehicCase[cause];
  if (!causeKey) {
    console.warn(`Invalid cause: ${cause}`);
    return;
  }

  setVehicularCauseMember((prevState) => ({
    ...prevState,
    [causeKey]: prevState[causeKey] === cause ? null : cause,
  }));
};





  const toggleCheckbox = (key) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };
 
  return (
    <ScrollView contentContainerStyle={styles.container}>
    
      <Text style={styles.header}>Incident Report</Text>

      <View style={styles.section}>
      <View style={styles.wrapper}>
        <Text style={styles.sectionHeader}>Patient Details</Text>
        </View>
        <TextInput style={styles.input} placeholder="Date" value={formattedDate} />
        <TextInput style={styles.input} placeholder="Patient's Name" value={selectedReport.userDetails?.name} />
        <TextInput style={styles.input} placeholder="Sex/Gender" value={selectedReport.userDetails?.gender} />
        <TextInput style={styles.input} placeholder="Age" value={age} />
        <TextInput style={styles.input} placeholder="Phone Number" value={phoneNumber} />
        <TextInput style={styles.input} placeholder="Patient Address" multiline value={selectedReport.userDetails?.address} />
        <TextInput style={styles.input} placeholder="Incident Address" multiline value={selectedReport.address} />
        <TextInput style={styles.input} placeholder="Time of Call" value={selectedReport.timeNow} />
        <TextInput style={styles.input} placeholder="Time of Arrival" value={timeOfArrival} />
        <TextInput style={styles.input} placeholder="Informant" value={selectedReport.informant} />
        <TextInput style={styles.input} placeholder="Chief Complaint" value={selectedReport.chiefComplaint} />
      </View>

   

      <View style={styles.section}>
        <View style={styles.wrapper}>
          <Text style={styles.sectionHeader}>Type of Incident</Text>
        </View>
        {['Vehicular Accident', 'Medical Case', 'Trauma Case', 'Transport Only'].map((incident) => (
          <TouchableOpacity
            key={incident}
            style={selectedIncident === incident ? styles.radioButtonSelected : styles.radioButton}
            onPress={() => setSelectedIncident(incident)}
          >
            <Text style={styles.radioText}>{incident}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedIncident === 'Vehicular Accident' && (
  <>
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>Vehicular Accident Symptoms</Text>
      <View style={styles.twoColumnContainer}>
        {/* Symptoms */}
        <View style={styles.column}>
          {['Deformity', 'Burn', 'Contusion', 'Tenderness', 'Abrasion'].map((symptom) => (
            <View key={symptom} style={styles.checkboxItem}>
              <CheckBox
                checked={incidentMember[symptomMappings.VehicularAccident[symptom]] === symptom}
                onPress={() => handleSymptomSelection(symptom, 'VehicularAccident')}
                containerStyle={styles.checkbox}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
              />
              <Text style={styles.checkboxText}>{symptom}</Text>
            </View>
          ))}
        </View>
        <View style={styles.column}>
          {['Laceration', 'Avulsion', 'Swelling', 'Puncture', 'Fracture'].map((symptom) => (
            <View key={symptom} style={styles.checkboxItem}>
              <CheckBox
                checked={incidentMember[symptomMappings.VehicularAccident[symptom]] === symptom}
                onPress={() => handleSymptomSelection(symptom, 'VehicularAccident')}
                containerStyle={styles.checkbox}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
              />
              <Text style={styles.checkboxText}>{symptom}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>

  {/* Causes */}
  <View style={styles.section}>
  <View style={styles.wrapper}>
      <Text style={styles.sectionHeader}>Cause of Vehicular Accident</Text>
      </View>
      <View style={styles.twoColumnContainer}>
        <View style={styles.column}>
          {['Reckless', 'Animal Xing', 'Slip & Slide', 'S. Ped Xing', 'Collision'].map((cause) => (
            <View key={cause} style={styles.checkboxItem}>
              <CheckBox
                checked={vehicularCauseMember[vehicCase[cause]] === cause}
                onPress={() => handleSymptomSelection(cause, 'VehicularAccident', true)}
                containerStyle={styles.checkbox}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
              />
              <Text style={styles.checkboxText}>{cause}</Text>
            </View>
          ))}
        </View>
        <View style={styles.column}>
          {['Speeding', 'Drunk Driving', 'Distracted'].map((cause) => (
            <View key={cause} style={styles.checkboxItem}>
              <CheckBox
                checked={vehicularCauseMember[vehicCase[cause]] === cause}
                onPress={() => handleSymptomSelection(cause, 'VehicularAccident', true)}
                containerStyle={styles.checkbox}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
              />
              <Text style={styles.checkboxText}>{cause}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
   
  </>
 
)}






{selectedIncident === 'Medical Case' && (
  <View style={styles.section}>
    <Text style={styles.sectionHeader}>Medical Case Symptoms</Text>
    <View style={styles.twoColumnContainer}>
      <View style={styles.column}>
        {['Hypertension', 'Vomiting', 'DOB/Cough', 'Nose Bleed', 'Fainting/Dizziness'].map((symptom) => (
          <View key={symptom} style={styles.checkboxItem}>
            <CheckBox
              checked={incidentMember[symptomMappings.MedicalCase[symptom]] === symptom}
              onPress={() => handleSymptomSelection(symptom, 'MedicalCase')}
              containerStyle={styles.checkbox}
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
            />
            <Text style={styles.checkboxText}>{symptom}</Text>
          </View>
        ))}
      </View>
      <View style={styles.column}>
        {['LBM', 'Fever/Seizure', 'Chest Pain', 'Skin Allergy', 'Labor Pain'].map((symptom) => (
          <View key={symptom} style={styles.checkboxItem}>
            <CheckBox
              checked={incidentMember[symptomMappings.MedicalCase[symptom]] === symptom}
              onPress={() => handleSymptomSelection(symptom, 'MedicalCase')}
              containerStyle={styles.checkbox}
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
            />
            <Text style={styles.checkboxText}>{symptom}</Text>
          </View>
        ))}
      </View>
    </View>
  </View>
)}


{selectedIncident === 'Trauma Case' && (
  <View style={styles.section}>
    <Text style={styles.sectionHeader}>Trauma Case Symptoms</Text>
    <View style={styles.twoColumnContainer}>
      <View style={styles.column}>
        {['Alcohol Intox', 'Drug Intox', 'Drowning', 'Electrocution', 'Stab Wounds'].map((symptom) => (
          <View key={symptom} style={styles.checkboxItem}>
            <CheckBox
              checked={incidentMember[symptomMappings.TraumaCase[symptom]] === symptom}
              onPress={() => handleSymptomSelection(symptom, 'TraumaCase')}
              containerStyle={styles.checkbox}
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
            />
            <Text style={styles.checkboxText}>{symptom}</Text>
          </View>
        ))}
      </View>
      <View style={styles.column}>
        {['Mauling', 'Fall', 'Animal Bite', 'FBAO', 'Psychiatric'].map((symptom) => (
          <View key={symptom} style={styles.checkboxItem}>
            <CheckBox
              checked={incidentMember[symptomMappings.TraumaCase[symptom]] === symptom}
              onPress={() => handleSymptomSelection(symptom, 'TraumaCase')}
              containerStyle={styles.checkbox}
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
            />
            <Text style={styles.checkboxText}>{symptom}</Text>
          </View>
        ))}
      </View>
    </View>
  </View>

)}


   
      <View style={styles.section}>
      <View style={styles.wrapper}>
        <Text style={styles.sectionHeader}>Mobility</Text>
        </View>
        {['None', 'Ambulatory', 'Non - Ambulatory'].map((mobility) => (
          <TouchableOpacity
            key={mobility}
            style={selectedMobility === mobility ? styles.radioButtonSelected : styles.radioButton}
            onPress={() => setSelectedMobility(mobility)}
          >
            <Text style={styles.radioText}>{mobility}</Text>
          </TouchableOpacity>
        ))}
      </View>

      
      <View style={styles.section}>
      <View style={styles.wrapper}>
        <Text style={styles.sectionHeader}>Burn</Text>
        </View>
        {['None', '1st Degree', '2nd Degree', '3rd Degree'].map((burn) => (
          <TouchableOpacity
            key={burn}
            style={selectedBurn === burn ? styles.radioButtonSelected : styles.radioButton}
            onPress={() => setSelectedBurn(burn)}
          >
            <Text style={styles.radioText}>{burn}</Text>
          </TouchableOpacity>
        ))}
      </View>

      
      <View style={styles.section}>
      <View style={styles.wrapper}>
        <Text style={styles.sectionHeader}>Vital Signs</Text>
        </View>
        <TextInput style={styles.input} placeholder="Temperature" 
          onChangeText={(text) => handleChange('temperature', text)}
          value={vitalSigns.temperature}
        />




        <TextInput style={styles.input} placeholder="Pulse Rate"
        onChangeText={(text) => handleChange('pulseRate', text)}
        value={vitalSigns.pulseRate} 
        />



        <TextInput style={styles.input} placeholder="Respiratory Rate" 
          onChangeText={(text) => handleChange('respiratoryRate', text)}
          value={vitalSigns.respiratoryRate}
        />

        <TextInput style={styles.input} placeholder="SpO2"  
           onChangeText={(text) => handleChange('spO2', text)}
           value={vitalSigns.spO2}
        />

        <TextInput style={styles.input} placeholder="Blood Pressure" 
           onChangeText={(text) => handleChange('bloodPressure', text)}
           value={vitalSigns.bloodPressure}
        />
      </View>

      <View style={styles.section}>
      <View style={styles.wrapper}>
        <Text style={styles.sectionHeader}>Level of Consciousness</Text>
        </View>
        {['Alert', 'Verbal Response', 'Responsive to Pain', 'Unresponsive'].map((consciousness) => (
          <TouchableOpacity
            key={consciousness}
            style={selectedConsciousness === consciousness ? styles.radioButtonSelected : styles.radioButton}
            onPress={() => setSelectedConsciousness(consciousness)}
          >
            <Text style={styles.radioText}>{consciousness}</Text>
          </TouchableOpacity>
        ))}
      </View>




 <View style={styles.section}>
        <View style={styles.wrapper}>
          <Text style={styles.sectionHeader}>Action Taken</Text>
        </View>
        <View style={styles.twoColumnContainer}>
          <View style={styles.column}>
            {Object.keys(actionsMapping).slice(0, 12).map((action) => (
              <View key={action} style={styles.checkboxItem}>
                <CheckBox
                  checked={actionsTakenChecked[actionsMapping[action]] !== null}
                  onPress={() => handleActionCheck(action)}
                  containerStyle={styles.checkbox}
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                />
                <Text style={styles.checkboxText}>{action}</Text>
              </View>
            ))}
          </View>
          <View style={styles.column}>
            {Object.keys(actionsMapping).slice(12).map((action) => (
              <View key={action} style={styles.checkboxItem}>
                <CheckBox
                  checked={actionsTakenChecked[actionsMapping[action]] !== null}
                  onPress={() => handleActionCheck(action)}
                  containerStyle={styles.checkbox}
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                />
                <Text style={styles.checkboxText}>{action}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>



      <View style={styles.section}>
      <View style={styles.wrapper}>
        <Text style={styles.sectionHeader}>Waiver</Text>
        
        </View>
        <View style={styles.checkboxContainer}>
            <Checkbox
              value={WaiverChecked.refuseMedicalAid}
              onValueChange={() => toggleCheckbox('refuseMedicalAid')}
            />
            <Text style={styles.checkboxLabel}>Refuse any medical aid and/or evaluation by emergency medical personnel.</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={WaiverChecked.refuseTransportation}
              onValueChange={() => toggleCheckbox('refuseTransportation')}
            />
            <Text style={styles.checkboxLabel}>Refuse transportation to emergency receiving facility by emergency medical personnel.</Text>
          </View>
          <Text style={styles.waiverText}>
            I also acknowledge that I have been advised that medical aid is needed and that my refusal of evaluation and/or transportation may result in the worsening of my condition and could result in permanent injury or death. I will not hold anyone accountable for my decision.
          </Text>
     
    
      </View>

      <View style={styles.section}>
      <View style={styles.wrapper}>
      <Text style={styles.sectionHeader}>Witness Name & Signature</Text>
      </View>



        <Text></Text>
        <TextInput style={styles.input} placeholder="Witness Name" 
           onChangeText={(text) => witnessfield('witnessName', text)}
           value={witness.witnessName}
        />



        <TextInput style={styles.input} placeholder="Relation/Designation"
        onChangeText={(text) => witnessfield('relation', text)}
        value={witness.relation}
        
         />
       
      </View>



      <View style={styles.section}>
      <View style={styles.wrapper}>
      <Text style={styles.sectionHeader}>Patient Name & Signature</Text>

      </View>
      <Text>Signature:</Text>






      <Text>Name:</Text>
      <TextInput style={styles.input} placeholder="Patient Name"
       onChangeText={(text) => witnessfield('patientName', text)}
       value={witness.patientName}
       />
      </View>










     
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveReport}>
        <Text style={styles.saveButtonText}>Save Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};   
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 15,
    borderWidth: 0.7,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 4, 
    alignSelf: 'center',
    width: '120%',
    backgroundColor: '#000000',
    color:'#ffffff',
  },
  section: {
    marginBottom: 16,
    
  },
  wrapper: {
    borderWidth: 0.7, 
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 4, 
    alignSelf: 'center',
    width: '98%', 
    marginBottom: 15,
    backgroundColor: '#000000',
   
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    alignItems:"center",
    color: '#ffffff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
    elevation: 100,
    shadowColor: '#fcfcfc',
   
  },
  radioButtonSelected: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#fa8072',
  },
  radioText: {
    fontSize: 16,
  },
 
  checkboxText: {
    fontSize: 16,
  },
  checkbox: {
    margin: 0,
    padding: 0,
  },
  waiverText: {
    fontSize: 14,
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: '#32CD32',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  
  
  twoColumnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '48%',
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  waiverText: {
    marginTop: 8,
    fontSize: 14,
  },
});
export default IncidentReport;