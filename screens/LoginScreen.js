


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
// import { auth } from '../firebasecon/Firebase'; // Adjust the path if firebase.js is in a different directory
// import { signInWithEmailAndPassword } from 'firebase/auth';

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please enter both email and password');
//       return;
//     }

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigation.navigate('dashboard');
//     } catch (error) {
//       Alert.alert('Login Error', error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image style={styles.image} source={require('../assets/log2.png')} />

//       <View style={styles.inputView}>
//         <TextInput
//           style={styles.TextInput}
//           placeholder='Email'
//           placeholderTextColor='#003f5c'
//           onChangeText={(email) => setEmail(email)}
//           value={email}
//         />
//       </View>

//       <View style={styles.inputView}>
//         <TextInput
//           style={styles.TextInput}
//           placeholder='Password'
//           placeholderTextColor='#003f5c'
//           secureTextEntry={true}
//           onChangeText={(password) => setPassword(password)}
//           value={password}
//         />
//       </View>

//       <TouchableOpacity onPress={() => console.log('Forgot password pressed.')}>
//         <Text style={styles.forgot_button}>Forgot Password?</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
//         <Text style={styles.loginText}>LOGIN</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
//         <Text style={styles.signup_button}>Sign Up</Text>
//       </TouchableOpacity>
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
//     backgroundColor: '#f2f2f2',
//     borderRadius: 25,
//     width: '75%',
//     height: 45,
//     marginBottom: 20,
//     justifyContent: 'center',
//   },
//   TextInput: {
//     height: 50,
//     flex: 1,
//     padding: 10,
//     borderWidth: 1,
//     borderRadius: 25,
//     borderColor: '#42f54b',
//   },
//   forgot_button: {
//     height: 30,
//     marginBottom: 30,
//     fontSize: 12,
//     color: '#42f54b',
//   },
//   loginBtn: {
//     width: '80%',
//     borderRadius: 25,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10,
//     backgroundColor: '#42f54b',
//   },
//   loginText: {
//     color: '#fff',
//   },
//   signup_button: {
//     height: 30,
//     marginTop: 20,
//     fontSize: 12,
//     color: '#42f54b',
//   },
// });



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
// import { auth, firestore } from '../firebasecon/Firebase'; // Adjust the path if firebase.js is in a different directory
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please enter both email and password');
//       return;
//     }

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       const userDoc = doc(firestore, 'Accounts', user.uid);
//       const docSnap = await getDoc(userDoc);

//       if (docSnap.exists()) {
//         const userData = docSnap.data();
//         await AsyncStorage.setItem(
//           'user-info',
//           JSON.stringify({
//             name: userData.name,
//             role: userData.userType,
//           })
//         );

//         if (userData.userType === 'Admin') {
//           navigation.navigate('AdminDashboard');
//         } else {
//           navigation.navigate('dashboard');
//         }
//       } else {
//         Alert.alert('Error', 'User data not found');
//       }
//     } catch (error) {
//       Alert.alert('Login Error', error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image style={styles.image} source={require('../assets/log2.png')} />

//       <View style={styles.inputView}>
//         <TextInput
//           style={styles.TextInput}
//           placeholder='Email'
//           placeholderTextColor='#003f5c'
//           onChangeText={(email) => setEmail(email)}
//           value={email}
//         />
//       </View>

//       <View style={styles.inputView}>
//         <TextInput
//           style={styles.TextInput}
//           placeholder='Password'
//           placeholderTextColor='#003f5c'
//           secureTextEntry={true}
//           onChangeText={(password) => setPassword(password)}
//           value={password}
//         />
//       </View>

//       <TouchableOpacity onPress={() => console.log('Forgot password pressed.')}>
//         <Text style={styles.forgot_button}>Forgot Password?</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
//         <Text style={styles.loginText}>LOGIN</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
//         <Text style={styles.signup_button}>Sign Up</Text>
//       </TouchableOpacity>
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
//     backgroundColor: '#f2f2f2',
//     borderRadius: 25,
//     width: '75%',
//     height: 45,
//     marginBottom: 20,
//     justifyContent: 'center',
//   },
//   TextInput: {
//     height: 50,
//     flex: 1,
//     padding: 10,
//     borderWidth: 1,
//     borderRadius: 25,
//     borderColor: '#42f54b',
//   },
//   forgot_button: {
//     height: 30,
//     marginBottom: 30,
//     fontSize: 12,
//     color: '#42f54b',
//   },
//   loginBtn: {
//     width: '80%',
//     borderRadius: 25,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10,
//     backgroundColor: '#42f54b',
//   },
//   loginText: {
//     color: '#fff',
//   },
//   signup_button: {
//     height: 30,
//     marginTop: 20,
//     fontSize: 12,
//     color: '#42f54b',
//   },
// });


import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { auth, firestore } from '../firebasecon/Firebase'; // Adjust the path if firebase.js is in a different directory
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


// Check if user is already logged in when app starts
useEffect(() => {
  const checkAuthState = async () => {
    const userInfo = await AsyncStorage.getItem('user-info');
    if (userInfo) {
      const lastRoute = await AsyncStorage.getItem('lastRoute');
      if (lastRoute) {
        navigation.navigate(lastRoute);
      } else {
        const parsedUser = JSON.parse(userInfo);
        if (parsedUser.role === 'Admin' || parsedUser.role === 'Super Admin') {
          navigation.navigate('AdminDashboard');
        } else {
          navigation.navigate('dashboard');
        }
      }
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      checkAuthState();
    }
  });
}, []);







  // const handleLogin = async () => {
  //   if (!email || !password) {
  //     Alert.alert('Error', 'Please enter both email and password');
  //     return;
  //   }

  //   try {
  //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;
  //     console.log('User authenticated:', user.uid);

  //     const userDoc = doc(firestore, 'Accounts', user.uid);
  //     console.log('Fetching user data from:', userDoc.path);

  //     const docSnap = await getDoc(userDoc);

  //     if (docSnap.exists()) {
  //       const userData = docSnap.data();
  //       console.log('User data:', userData);

  //       await AsyncStorage.setItem(
  //         'user-info',
  //         JSON.stringify({
  //           name: userData.name,
  //           role: userData.userType,
  //           profileImage: userData.photo || '', // Include profileImage property
  //         })
  //       );

        
  //       if (userData.userType === 'Admin' || userData.userType === 'Super Admin') {
  //         navigation.navigate('AdminDashboard');
  //       } else {
  //         navigation.navigate('dashboard');
  //       }
  //     } else {
  //       console.error('User document not found:', userDoc.path);
  //       Alert.alert('Error', 'User data not found');
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     Alert.alert('Login Error', error.message);
  //   }
  // }





  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
  
    try {
      setLoading(true); 
      await AsyncStorage.clear();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User authenticated:', user.uid);
  
      const userDoc = doc(firestore, 'Accounts', user.uid);
      console.log('Fetching user data from:', userDoc.path);
  
      const docSnap = await getDoc(userDoc);
  
      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log('User data:', userData);
  
        // Save user data to AsyncStorage
        await AsyncStorage.setItem(
          'user-info',
          JSON.stringify({
            name: userData.name,
            role: userData.userType,
            profileImage: userData.photo || '', // Include profileImage property
          })
        );
  
        // Check for the last visited route
        const lastRoute = await AsyncStorage.getItem('lastRoute');
  
        // If a last route exists, navigate to it. Otherwise, navigate to the appropriate dashboard
        if (lastRoute) {
          navigation.navigate(lastRoute); // Navigate to the last stored route
        } else {
          if (userData.userType === 'Admin' || userData.userType === 'Super Admin') {
            navigation.navigate('AdminDashboard'); // Navigate to Admin Dashboard
          } else {
            navigation.navigate('dashboard'); // Navigate to normal dashboard
          }
        }
      } else {
        console.error('User document not found:', userDoc.path);
        Alert.alert('Error', 'User data not found');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/DirectAidLogo1.png')} />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Email'
          placeholderTextColor='#003f5c'
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Password'
          placeholderTextColor='#003f5c'
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
      </View>

      <TouchableOpacity onPress={() => console.log('Forgot password pressed.')}>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signup_button}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    width: '75%',
    height: 45,
    marginBottom: 20,
    justifyContent: 'center',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: 'black',
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
    fontSize: 12,
    color: 'black',
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#C82538',
  },
  loginText: {
    color: '#fff',
  },
  signup_button: {
    height: 30,
    marginTop: 20,
    fontSize: 12,
    color: '#594E4E',
  },
});
