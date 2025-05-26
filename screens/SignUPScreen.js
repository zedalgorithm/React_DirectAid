

// // import React, { useState } from 'react';
// // import {
// //   StyleSheet,
// //   Text,
// //   View,
// //   Image,
// //   TextInput,
// //   TouchableOpacity,
// //   Alert,
// // } from 'react-native';
// // import QRCode from 'react-native-qrcode-svg'; // Import QRCode component
// // import { auth } from '../firebasecon/Firebase'; // Adjust the path if firebase.js is in a different directory
// // import { createUserWithEmailAndPassword } from 'firebase/auth';

// // export default function SignUpScreen({ navigation }) {
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [homeAddress, setHomeAddress] = useState('');
// //   const [religion, setReligion] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [showQRCode, setShowQRCode] = useState(false); // State to toggle QR code display

// //   const handleSignUp = async () => {
// //     // Simple validation example (replace with your own logic)
// //     if (!name || !email || !homeAddress || !religion || !password || !confirmPassword) {
// //       Alert.alert('Error', 'Please fill in all fields');
// //       return;
// //     }

// //     if (password !== confirmPassword) {
// //       Alert.alert('Error', 'Passwords do not match');
// //       return;
// //     }

// //     try {
// //       // Create user with email and password
// //       await createUserWithEmailAndPassword(auth, email, password);

// //       // After successful sign-up, show QR code
// //       setShowQRCode(true);
// //     } catch (error) {
// //       Alert.alert('Registration Error', error.message);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Image style={styles.image} source={require('../assets/log2.png')} />

// //       {!showQRCode ? (
// //         <>
// //           <View style={styles.inputView}>
// //             <TextInput
// //               style={styles.TextInput}
// //               placeholder="Name"
// //               placeholderTextColor="#003f5c"
// //               onChangeText={(name) => setName(name)}
// //             />
// //           </View>

// //           <View style={styles.inputView}>
// //             <TextInput
// //               style={styles.TextInput}
// //               placeholder="Email"
// //               placeholderTextColor="#003f5c"
// //               onChangeText={(email) => setEmail(email)}
// //             />
// //           </View>

// //           <View style={styles.inputView}>
// //             <TextInput
// //               style={styles.TextInput}
// //               placeholder="Home Address"
// //               placeholderTextColor="#003f5c"
// //               onChangeText={(homeAddress) => setHomeAddress(homeAddress)}
// //             />
// //           </View>

// //           <View style={styles.inputView}>
// //             <TextInput
// //               style={styles.TextInput}
// //               placeholder="Religion"
// //               placeholderTextColor="#003f5c"
// //               onChangeText={(religion) => setReligion(religion)}
// //             />
// //           </View>

// //           <View style={styles.inputView}>
// //             <TextInput
// //               style={styles.TextInput}
// //               placeholder="Password"
// //               placeholderTextColor="#003f5c"
// //               secureTextEntry={true}
// //               onChangeText={(password) => setPassword(password)}
// //             />
// //           </View>

// //           <View style={styles.inputView}>
// //             <TextInput
// //               style={styles.TextInput}
// //               placeholder="Confirm Password"
// //               placeholderTextColor="#003f5c"
// //               secureTextEntry={true}
// //               onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
// //             />
// //           </View>

// //           <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp}>
// //             <Text style={styles.loginText}>Sign up</Text>
// //           </TouchableOpacity>

// //           <TouchableOpacity onPress={() => navigation.navigate('Login')}>
// //             <Text style={styles.signup_button}>Already have an account? Login</Text>
// //           </TouchableOpacity>
// //         </>
// //       ) : (
// //         <View style={styles.qrContainer}>
// //           <Text style={styles.qrHeading}>Congratulations!</Text>
// //           <Text style={styles.qrText}>Here's your QR Code:</Text>
// //           <QRCode
// //             value={`Name: ${name}\nEmail: ${email}\nHome Address: ${homeAddress}\nReligion: ${religion}\nPassword: ${password}`} // Example data for QR code
// //             size={200}
// //             backgroundColor="white"
// //             color="black"
// //           />
// //         </View>
// //       )}
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   image: {
// //     marginBottom: 40,
// //   },
// //   inputView: {
// //     backgroundColor: '#FFFFFF',
// //     borderRadius: 30,
// //     width: '70%',
// //     height: 45,
// //     marginBottom: 20,
// //     alignItems: 'center',
// //   },
// //   TextInput: {
// //     height: 50,
// //     flex: 1,
// //     padding: 10,
// //     marginLeft: 20,
// //     borderWidth: 1,
// //     borderRadius: 25,
// //     width: '80%',
// //   },
// //   loginBtn: {
// //     width: '50%',
// //     borderWidth: 1,
// //     borderRadius: 25,
// //     height: 50,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     marginTop: 2,
// //     marginBottom: 40,
// //     backgroundColor: '#42f54b',
// //   },
// //   signup_button: {
// //     height: 30,
// //     marginBottom: 30,
// //     fontSize: 12,
// //     color: '#42f54b',
// //   },
// //   qrContainer: {
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   qrHeading: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 20,
// //   }, 
// //   qrText: {
// //     fontSize: 18,
// //     marginBottom: 10,
// //   },
// // });


// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import QRCode from 'react-native-qrcode-svg'; // Import QRCode component
// import { auth } from '../firebasecon/Firebase'; // Adjust the path if firebase.js is in a different directory
// import { createUserWithEmailAndPassword } from 'firebase/auth';

// export default function SignUpScreen({ navigation }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [homeAddress, setHomeAddress] = useState('');
//   const [religion, setReligion] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showQRCode, setShowQRCode] = useState(false); // State to toggle QR code display

//   const handleSignUp = async () => {
//     // Simple validation example (replace with your own logic)
//     if (!name || !email || !homeAddress || !religion || !phoneNumber || !password || !confirmPassword) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }

//     try {
//       // Create user with email and password
//       await createUserWithEmailAndPassword(auth, email, password);

//       // After successful sign-up, show QR code
//       setShowQRCode(true);
//     } catch (error) {
//       Alert.alert('Registration Error', error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image style={styles.image} source={require('../assets/log2.png')} />

//       {!showQRCode ? (
//         <>
//           <View style={styles.inputView}>
//             <TextInput
//               style={styles.TextInput}
//               placeholder="Name"
//               placeholderTextColor="#003f5c"
//               onChangeText={(name) => setName(name)}
//             />
//           </View>

//           <View style={styles.inputView}>
//             <TextInput
//               style={styles.TextInput}
//               placeholder="Email"
//               placeholderTextColor="#003f5c"
//               onChangeText={(email) => setEmail(email)}
//             />
//           </View>

//           <View style={styles.inputView}>
//             <TextInput
//               style={styles.TextInput}
//               placeholder="Home Address"
//               placeholderTextColor="#003f5c"
//               onChangeText={(homeAddress) => setHomeAddress(homeAddress)}
//             />
//           </View>

//           <View style={styles.inputView}>
//             <TextInput
//               style={styles.TextInput}
//               placeholder="Religion"
//               placeholderTextColor="#003f5c"
//               onChangeText={(religion) => setReligion(religion)}
//             />
//           </View>

//           <View style={styles.inputView}>
//             <TextInput
//               style={styles.TextInput}
//               placeholder="Phone Number"
//               placeholderTextColor="#003f5c"
//               onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
//             />
//           </View>

//           <View style={styles.inputView}>
//             <TextInput
//               style={styles.TextInput}
//               placeholder="Password"
//               placeholderTextColor="#003f5c"
//               secureTextEntry={true}
//               onChangeText={(password) => setPassword(password)}
//             />
//           </View>

//           <View style={styles.inputView}>
//             <TextInput
//               style={styles.TextInput}
//               placeholder="Confirm Password"
//               placeholderTextColor="#003f5c"
//               secureTextEntry={true}
//               onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
//             />
//           </View>

//           <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp}>
//             <Text style={styles.loginText}>Sign up</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//             <Text style={styles.signup_button}>Already have an account? Login</Text>
//           </TouchableOpacity>
//         </>
//       ) : (
//         <View style={styles.qrContainer}>
//           <Text style={styles.qrHeading}>Congratulations!</Text>
//           <Text style={styles.qrText}>Here's your QR Code:</Text>
//           <QRCode
//             value={JSON.stringify({
//               name,
//               email,
//               homeAddress,
//               religion,
//               phoneNumber,
//               password
//             })}
//             size={200}
//             backgroundColor="white"
//             color="black"
//           />
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     marginBottom: 40,
//   },
//   inputView: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 30,
//     width: '70%',
//     height: 45,
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   TextInput: {
//     height: 50,
//     flex: 1,
//     padding: 10,
//     marginLeft: 20,
//     borderWidth: 1,
//     borderRadius: 25,
//     width: '80%',
//   },
//   loginBtn: {
//     width: '50%',
//     borderWidth: 1,
//     borderRadius: 25,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 2,
//     marginBottom: 40,
//     backgroundColor: '#42f54b',
//   },
//   signup_button: {
//     height: 30,
//     marginBottom: 30,
//     fontSize: 12,
//     color: '#42f54b',
//   },
//   qrContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   qrHeading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   }, 
//   qrText: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
// });








import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { auth } from '../firebasecon/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from 'react-native-check-box'; 

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [religion, setReligion] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+63');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [gender, setGender] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

 

 
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  };

  const handleSignUp = async () => {
    if (!name || !email || !homeAddress || !religion || !phoneNumber || !password || !confirmPassword || !age || !birthday || !gender) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setShowQRCode(true);
    } catch (error) {
      Alert.alert('Registration Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        
        {!showQRCode ? (
          <>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Full Name"
                placeholderTextColor="#003f5c"
                onChangeText={(name) => setName(name)}
              />
            </View>

            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[styles.genderButton, gender === 'Male' && styles.selectedGenderButton]}
                onPress={() => setGender('Male')}
              >
                <Text style={styles.genderButtonText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.genderButton, gender === 'Female' && styles.selectedGenderButton]}
                onPress={() => setGender('Female')}
              >
                <Text style={styles.genderButtonText}>Female</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Religion"
                placeholderTextColor="#003f5c"
                onChangeText={(religion) => setReligion(religion)}
              />
            </View>

            <Text style={styles.label}>BirthDate</Text>
            <View style={styles.birthDateContainer}>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={styles.birthDateText}>{birthday.toDateString()}</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.ageInput}
                placeholder="Age*"
                placeholderTextColor="#003f5c"
                keyboardType="numeric"
                value={age.toString()}  
                editable={false}
              />
            </View>
            {showDatePicker && (
              <DateTimePicker
                value={birthday}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const newDate = selectedDate || birthday;
                  setBirthday(newDate);
                  setAge(calculateAge(newDate));
                  setShowDatePicker(false);
                }}
              />
            )}

            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Home Address"
                placeholderTextColor="#003f5c"
                onChangeText={(homeAddress) => setHomeAddress(homeAddress)}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Email Address"
                placeholderTextColor="#003f5c"
                onChangeText={(email) => setEmail(email)}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Phone Number"
                placeholderTextColor="#003f5c"
                
                keyboardType="phone-pad"
                onChangeText={(phoneNumber) => setPhoneNumber(+63,phoneNumber)}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Password"
                placeholderTextColor="#003f5c"
                secureTextEntry={!showPassword}
                onChangeText={(password) => setPassword(password)}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Confirm Password"
                placeholderTextColor="#003f5c"
                secureTextEntry={!showPassword}
                onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
              />
            </View>

            <View style={styles.checkboxContainer}>
              <CheckBox
                isChecked={showPassword}
                onClick={() => setShowPassword(!showPassword)}
              />
              <Text style={styles.label}>Show Password</Text>
            </View>

            <TouchableOpacity style={styles.signUpBtn} onPress={handleSignUp}>
              <Text style={styles.signUpText}>Sign up</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.qrContainer}>
            <Text style={styles.qrHeading}>Congratulations!</Text>
            <Text style={styles.qrText}>Here's your QR Code:</Text>
            <QRCode
              value={JSON.stringify({
                name,
                email,
                homeAddress,
                religion,
                phoneNumber,
                age,
                birthday: birthday.toDateString(), 
                gender,
                password
              })}
              size={200}
              backgroundColor="white"
              color="black"
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputView: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: 350,
    height: 45,
    marginBottom: 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  TextInput: {
    height: 45,
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  genderButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '45%',
    alignItems: 'center',
  },
  selectedGenderButton: {
    backgroundColor: '#f08080',
  },
  genderButtonText: {
    fontSize: 16,
  },
  birthDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  birthDateText: {
    fontSize: 20,
  },
  ageInput: {
    height: 45,
    width: '50%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpBtn: {
    backgroundColor: '#f08080',
    borderRadius: 10,
    width: 150,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  qrContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  qrHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  qrText: {
    fontSize: 16,
    marginBottom: 20,
  },
});
