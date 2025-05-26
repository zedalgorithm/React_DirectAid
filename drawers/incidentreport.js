
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Checkbox from 'expo-checkbox';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { firestore } from '../firebasecon/Firebase';
import { useNavigation } from '@react-navigation/native';
const app = getApp();
const db = getFirestore(app);
const IncidentReport = ({ route }) => {
  const { incidentId } = route.params;
  const [reportData, setReportData] = useState({
    date: '',
    name: '',
    sex: '',
    age: '',
    phone: '',
    patientAddress: '',
    incidentAddress: '',
    timeOfCall: '',
    timeOfArrival: '',
    informant: '',
    chiefComplaint: '' 
  });


  const [viltalSigns, setVitalSigns] = useState({
    temperature: '',
    PulseRate:'',
   RespiratoryRate:'',
   SpO2:'',
   BloodPressure:'',
  });


const [witness, setwitness] = useState({
  witnessName: '',
  'Relation/Designation':'',
  patientname:'',

});


  const [selectedMobility, setSelectedMobility] = useState('');
  const [selectedBurn, setSelectedBurn] = useState('');
  const [selectedConsciousness, setSelectedConsciousness] = useState('');
  const [actionsTakenChecked, setActionsTakenChecked] = useState({});
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [checked, setChecked] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState('');
  const [incidentMember, setIncidentMember] = useState({});
  const [vehicularCauseMember, setVehicularCauseMember] = useState({}); 
  const [WaiverChecked, setWaiverChecked] = useState({
    refuseMedicalAid: false,
    refuseTransportation: false
  });

  useEffect(() => {
    const fetchIncidentData = async () => {
      try {
        const docRef = doc(firestore, 'Responded Requests', incidentId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();



          if (data.WaiverChecked) {
            setWaiverChecked({
              refuseMedicalAid: data.WaiverChecked.refuseMedicalAid || false,
              refuseTransportation: data.WaiverChecked.refuseTransportation || false
            });
          }

          const formattedDate = data.requestDate
          ? new Date(data.requestDate.seconds * 1000).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : '';


          setReportData({
            date: formattedDate, 
            name: data.userDetails.name || '',
            gender: data.userDetails.gender || '',
            age: data.userDetails.age.toString() || '',
            phoneNumber: data.userDetails.phoneNumber.toString() || '',
            patientAddress: data.userDetails.address || '',
            incidentAddress: data.inciddentAdress || '',
            timeOfCall: data.timeOfCall || '',
            timeOfArrival: data.timeOfArrival || '',
            informant: data.informant || '',
            chiefComplaint: data.chiefComplaint || '',
          });

          setVitalSigns({
            temperature: data.temperature || '',
            PulseRate: data.pulseRate.toString() || '',
            RespiratoryRate: data.respiratoryRate.toString() || '',
            SpO2: data.spO2.toString() || '',
            BloodPressure: data.bloodPressure.toString() || '',

          });

            setwitness({
            witnessName: data.witness.witnessName || '',
            'Relation/Designation': data.witness.relation || '',
            patientname: data.witness.patientName || '',
            });
          
          setSelectedIncident(data.selectedIncident || '');
          setIncidentMember(data.incidentMember || {});
          setVehicularCauseMember(data.vehicularCauseMember || {}); 
          setActionsTakenChecked(data.actionsTakenChecked || {});
          setSelectedMobility(data.selectedMobility || '');
          setSelectedBurn(data.selectedBurn || '');
          setSelectedConsciousness(data.selectedConsciousness || '');
         
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        
      }   
    };

    fetchIncidentData();
  }, [incidentId]);
  


  const handleWaiverCheck = (waiverType) => {
    setWaiverChecked(prevState => {
      const newState = { ...prevState };
      newState[waiverType] = !newState[waiverType];
      console.log(`Updated ${waiverType}:`, newState[waiverType]);
      return newState;
    });
  };



  const isSymptomSelected = (symptom) => {
    return incidentMember[symptom] || false;
  };
 
  const handleSymptomSelection = (symptom) => {
    setIncidentMember(prevState => {
      const newState = { ...prevState };
      if (Object.values(newState).includes(symptom)) {
        // If the symptom is already in the list, remove it
        const keyToRemove = Object.keys(newState).find(key => newState[key] === symptom);
        newState[keyToRemove] = null;
      } else {
        // If the symptom is not in the list, add it
        const emptyKey = Object.keys(newState).find(key => newState[key] === null);
        if (emptyKey) {
          newState[emptyKey] = symptom;
        } else {
          const newKey = `incident${Object.keys(newState).length + 1}`;
          newState[newKey] = symptom;
        }
      }
      return newState;
    });
  };

  const handleInjurySelection = (injury) => {
    setIncidentMember(prevState => {
      const newState = { ...prevState };
      if (Object.values(newState).includes(injury)) {
        // If the injury is already in the list, remove it
        const keyToRemove = Object.keys(newState).find(key => newState[key] === injury);
        newState[keyToRemove] = null;
      } else {
        // If the injury is not in the list, add it
        const emptyKey = Object.keys(newState).find(key => newState[key] === null);
        if (emptyKey) {
          newState[emptyKey] = injury;
        } else {
          const newKey = `incident${Object.keys(newState).length + 1}`;
          newState[newKey] = injury;
        }
      }
      return newState;
    });
  };

  const isInjurySelected = (injury) => {
    return incidentMember[injury] || false;
  };

  const handleVehicularCauseSelection = (cause) => {
    setVehicularCauseMember(prevState => {
      const newState = { ...prevState };
      if (Object.values(newState).includes(cause)) {
        // If the cause is already in the list, remove it
        const keyToRemove = Object.keys(newState).find(key => newState[key] === cause);
        newState[keyToRemove] = null;
      } else {
        // If the cause is not in the list, add it
        const emptyKey = Object.keys(newState).find(key => newState[key] === null);
        if (emptyKey) {
          newState[emptyKey] = cause;
        } else {
          const newKey = `cause${Object.keys(newState).length + 1}`;
          newState[newKey] = cause;
        }
      }
      return newState;
    });
  };
  const handleActionCheck = (action) => {
    setActionsTakenChecked(prevState => {
      const newState = { ...prevState };
      if (Object.values(newState).includes(action)) {
        // If the action is already in the list, remove it
        const keyToRemove = Object.keys(newState).find(key => newState[key] === action);
        delete newState[keyToRemove];
      } else {
        // If the action is not in the list, add it
        const newKey = `action${Object.keys(newState).length + 1}`;
        newState[newKey] = action;
      }
      return newState;
    });
  };
  const navigation = useNavigation();
  const handleSaveReport = async () => {
    try {
      const docRef = doc(firestore, 'Responded Requests', incidentId);
      
      await updateDoc(docRef, {
        // Patient Details
        date: reportData.date,
        name: reportData.name,
        gender: reportData.gender,
        age: reportData.age,
        phoneNumber: reportData.phoneNumber,
        patientAddress: reportData.patientAddress,
        incidentAddress: reportData.incidentAddress,
        timeOfCall: reportData.timeOfCall,
        timeOfArrival: reportData.timeOfArrival,
        informant: reportData.informant,
        chiefComplaint: reportData.chiefComplaint,

        // Vital Signs
        temperature: viltalSigns.temperature,
        pulseRate: viltalSigns.PulseRate,
        respiratoryRate: viltalSigns.RespiratoryRate,
        spO2: viltalSigns.SpO2,
        bloodPressure: viltalSigns.BloodPressure,

        // Witness
        witness: {
          witnessName: witness.witnessName,
          relation: witness['Relation/Designation'],
          patientName: witness.patientname,
        },

        // Other fields
        selectedIncident: selectedIncident,
        incidentMember: incidentMember,
        vehicularCauseMember: vehicularCauseMember,
        selectedMobility: selectedMobility,
        selectedBurn: selectedBurn,
        selectedConsciousness: selectedConsciousness,
        actionsTakenChecked: actionsTakenChecked,
        WaiverChecked: WaiverChecked,
      });
      navigation.navigate('AdminDashboard');
      console.log('Report saved successfully!');
      // You can add a success message or navigation here
    } catch (error) {
      console.error('Error saving report:', error);
      // You can add an error message here
    }
  };

  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Incident Report</Text>

      {/* Patient Details */}
      <View style={styles.section}>
      <View style={styles.wrapper}>
        <Text style={styles.sectionHeader}>Patient Details</Text>
        </View>
        <TextInput style={styles.input} placeholder="Date" value={reportData.date} />
        <TextInput style={styles.input} placeholder="Patient's Name" value={reportData.name} />
        <TextInput style={styles.input} placeholder="Sex/Gender" value={reportData.gender} />
        <TextInput style={styles.input} placeholder="Age" value={reportData.age} />
        <TextInput style={styles.input} placeholder="Phone Number" value={reportData.phoneNumber} />
        <TextInput style={styles.input} placeholder="Patient Address" multiline value={reportData.patientAddress} />
        <TextInput style={styles.input} placeholder="Incident Address" multiline value={reportData.incidentAddress} />
        <TextInput style={styles.input} placeholder="Time of Call" value={reportData.timeOfCall} />
        <TextInput style={styles.input} placeholder="Time of Arrival" value={reportData.timeOfArrival} />
        <TextInput style={styles.input} placeholder="Informant" value={reportData.informant} />
        <TextInput style={styles.input} placeholder="Chief Complaint" value={reportData.chiefComplaint} />
      </View>

      {/* Type of Incident */}
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
   
      <View style={styles.twoColumnContainer}>
        <View style={styles.column}>
          {['Deformity', 'Burn', 'Contusion', 'Tenderness', 'Abrasion'].map((injury) => (
            <View key={injury} style={styles.checkboxItem}>
              <CheckBox
                // checked={isSymptomSelected(symptom)}
                // onPress={() => handleSymptomSelection(injury)}
                // checked={isInjurySelected(injury)}
                checked={Object.values(incidentMember).includes(injury)}
                      onPress={() => handleInjurySelection(injury)}
                containerStyle={styles.checkbox}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
              />
              <Text style={styles.checkboxText}>{injury}</Text>
            </View>
          ))}
        </View>
        <View style={styles.column}>
          {['Laceration', 'Avulsion', 'Swelling', 'Puncture', 'Fracture'].map((injury) => (
            <View key={injury} style={styles.checkboxItem}>
              <CheckBox
                // checked={isSymptomSelected(symptom)}
                // onPress={() => handleSymptomSelection(injury)}
                // checked={isInjurySelected(injury)}
                checked={Object.values(incidentMember).includes(injury)}
                      onPress={() => handleInjurySelection(injury)}
                containerStyle={styles.checkbox}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
              />
              <Text style={styles.checkboxText}>{injury}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>

    <View style={styles.section}>
    <View style={styles.wrapper}>
      <Text style={styles.sectionHeader}>Cause of Vehicular Accident</Text>
      </View>
      <View style={styles.twoColumnContainer}>
        <View style={styles.column}>
          {['Reckless', 'Animal Xing', 'Slip & Slide', 'S. Ped Xing', 'Collision'].map((cause) => (
            <View key={cause} style={styles.checkboxItem}>
              <CheckBox
                // checked={vehicularCauseMember[cause] || false}
                // onPress={() => handleVehicularCauseSelection(cause)}
                // checked={vehicularCauseMember[cause] || false}
                checked={Object.values(vehicularCauseMember).includes(cause)}
                      onPress={() => handleVehicularCauseSelection(cause)}
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
                //  checked={vehicularCauseMember[cause] || false}
                //       onPress={() => handleVehicularCauseSelection(cause)}
                // checked={vehicularCauseMember[cause] || false}
                checked={Object.values(vehicularCauseMember).includes(cause)}
                      onPress={() => handleVehicularCauseSelection(cause)}
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
  
    <View style={styles.twoColumnContainer}>
      <View style={styles.column}>
        {['Hypertension', 'Vomiting', 'DOB/Cough', 'Nose Bleed', 'Fainting/Dizziness'].map((symptom) => (
          <View key={symptom} style={styles.checkboxItem}>
            <CheckBox
              // checked={isSymptomSelected(symptom)}
              checked={Object.values(incidentMember).includes(symptom)}
              onPress={() => handleSymptomSelection(symptom)}
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
              // checked={isSymptomSelected(symptom)}
              checked={Object.values(incidentMember).includes(symptom)}
              onPress={() => handleSymptomSelection(symptom)}
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

    <View style={styles.twoColumnContainer}>
      <View style={styles.column}>
        {['Alcohol Intox', 'Drug Intox', 'Drowning', 'Electrocution', 'Stab Wounds'].map((symptom) => (
          <View key={symptom} style={styles.checkboxItem}>
            <CheckBox
              // checked={isSymptomSelected(symptom)}
              checked={Object.values(incidentMember).includes(symptom)}
              onPress={() => handleSymptomSelection(symptom)}
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
              // checked={isSymptomSelected(symptom)}
              checked={Object.values(incidentMember).includes(symptom)}
              onPress={() => handleSymptomSelection(symptom)}
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

      {/* Mobility */}
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

      {/* Burn */}
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

      {/* Vital Signs */}
      <View style={styles.section}>
      <View style={styles.wrapper}>
        <Text style={styles.sectionHeader}>Vital Signs</Text>
        </View>
        <TextInput style={styles.input} placeholder="Temperature" value={viltalSigns.temperature} />
        <TextInput style={styles.input} placeholder="Pulse Rate"  value={viltalSigns.PulseRate} />
        <TextInput style={styles.input} placeholder="Respiratory Rate" value={viltalSigns.RespiratoryRate} />
        <TextInput style={styles.input} placeholder="SpO2" value={viltalSigns.SpO2} />
        <TextInput style={styles.input} placeholder="Blood Pressure" value={viltalSigns.BloodPressure } />
      </View>

      {/* Level of Consciousness */}
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


{/* Action Taken */}
<View style={styles.section}>
  <View style={styles.wrapper}>
    <Text style={styles.sectionHeader}>Action Taken</Text>
  </View>
  <View style={styles.twoColumnContainer}>
    <View style={styles.column}>
      {[
        'Oxygenation', 'Nebulization', 'HGT', 'Advice to eat', 'Assisted on Meds', 'VS Check', 
        'Hydration', 'Advise BRAT', 'Restrained', 'Bleeding Control', 'Torniquet', 'Bandaging'
      ].map((action) => (
        <View key={action} style={styles.checkboxItem}>
          <CheckBox
            checked={Object.values(actionsTakenChecked).includes(action)}
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
      {[
        'Cold Compress', 'Warm Compress', 'Burn Care', 'Wound Care', 'CPR', 'Rescue Breathing', 'FBAO Mgt.',
        'AED', 'Arm Sling', 'Spine Board', 'C.Colar', 'Spliting'
      ].map((action) => (
        <View key={action} style={styles.checkboxItem}>
          <CheckBox
            checked={Object.values(actionsTakenChecked).includes(action)}
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

{/* Waiver */}
<View style={styles.section}>
  <View style={styles.wrapper}>
    <Text style={styles.sectionHeader}>Waiver</Text>
  </View>
  <View style={styles.checkboxContainer}>
    <Checkbox
      value={WaiverChecked.refuseMedicalAid}
      onValueChange={() => handleWaiverCheck('refuseMedicalAid')}
    />
    <Text style={styles.checkboxLabel}>Refuse any medical aid and/or evaluation by emergency medical personnel.</Text>
  </View>
  <View style={styles.checkboxContainer}>
    <Checkbox
      value={WaiverChecked.refuseTransportation}
      onValueChange={() => handleWaiverCheck('refuseTransportation')}
    />
    <Text style={styles.checkboxLabel}>Refuse transportation to emergency receiving facility by emergency medical personnel.</Text>
  </View>
  <Text style={styles.waiverText}>
    I also acknowledge that I have been advised that medical aid is needed and that my refusal of evaluation and/or transportation may result in the worsening of my condition and could result in permanent injury or death. I will not hold anyone accountable for my decision.
  </Text>
</View>

      {/* Patient Name & Signature */}
      <View style={styles.section}>
      <View style={styles.wrapper}>
      <Text style={styles.sectionHeader}>Witness Name & Signature</Text>
      </View>



        <Text></Text>
        <TextInput style={styles.input} placeholder="Witness Name"  value={witness.witnessName}/>
        <TextInput style={styles.input} placeholder="Relation/Designation" value={witness['Relation/Designation']} />
       
      </View>



      <View style={styles.section}>
      <View style={styles.wrapper}>
      <Text style={styles.sectionHeader}>Patient Name & Signature</Text>

      </View>
      <Text>Signature:</Text>


      <Text>Name:</Text>
      <TextInput style={styles.input} placeholder="Patient Name" value={witness.patientname}/>
      </View>


      {/* Save Button */}
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
    borderWidth: 0.7, // Adjust border width here
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 4, // Adjust padding if needed
    alignSelf: 'center',
    width: '120%',
    backgroundColor: '#000000',
    color:'#ffffff',
  },
  section: {
    marginBottom: 16,
    
  },
  wrapper: {
    borderWidth: 0.7, // Adjust border width here
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 4, // Adjust padding if needed
    alignSelf: 'center',
    width: '98%', // Adjust width as needed
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
