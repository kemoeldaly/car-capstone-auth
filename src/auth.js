

//   import { auth } from '@/components/firebase';
//   import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
//   import { ref } from 'vue';

//   const data = ref({
//     email: '',
//     password: ''
//   });

//   const mode = ref('login');
//   const user = ref(null);

//   function toggleMode(val) {
//     mode.value = val;
//   }

//   async function login(email, password) {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   async function register(email, password) {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       console.log('Registration successful!');
//       // Additional actions on success if needed
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   function submit() {
//     let email = data.value.email;
//     let password = data.value.password;

//     if (mode.value === 'login') {
//       login(email, password);
//     } else {
//       register(email, password);
//     }
//   }

//   async function signOutUser() {
//     try {
//       await signOut(auth);
//       // Additional actions on successful sign out if needed
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   onAuthStateChanged(auth, (CurrentUser) => {
//     user.value = CurrentUser;
//   });
