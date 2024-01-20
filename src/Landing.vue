<template>
  <div class="bg-sky-100 dark:bg-slate-950 rounded-lg p-8 ring-sky-600/5 shadow w-full transition-all duration-500">
    <div class="mb-4 text-3xl flex justify-center">
      <h1 class="mb-4 flex justify-center items-center font-bold text-black dark:text-white">Vehicle Recall Search</h1>
    </div>
  
    <!--  error messages -->
    <div v-if="errorMessages.length" class="flex justify-center text-sm font-bold text-black dark:text-white mt-4 mb-2">
      <ul>
        <li v-for="(errorMessage, index) in errorMessages" :key="index">{{ errorMessage }}</li>
      </ul>
    </div>

    <div class="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Model Year"
        v-model="modelYear"
        class="w-96 p-2 border border-gray-300 rounded transition-all duration-300"
      />
    </div>
  
    <div class="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Make"
        v-model="make"
        class="w-96 p-2 border border-gray-300 rounded transition-all duration-300"
      />
    </div>

    <div class="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Model"
        v-model="model"
        class="w-96 p-2 border border-gray-300 rounded transition-all duration-300"
      />
    </div>

    <div class="flex justify-center">
      <button
        @click="handleSearchClick"
        class="w-96 dark:bg-slate-900 dark:text-white bg-sky-200 text-black rounded cursor-pointer transition-all duration-300 text-md p-2 hover:bg-sky-300 dark:hover:bg-blue-600"
      >
        Search Recalls
      </button>
    </div>

    <div class="text-black dark:text-white">
      <template v-if="searchResults && searchResults.results.length > 0">
        <div>
          <h2 class="text-black dark:text-white text-xl font-bold mb-4">{{ searchResults.Count }} Results Found</h2>
          <div v-for="(result, index) in searchResults.results" :key="index" class="mb-2 p-4 border border-gray-300 rounded">
            <h3 class="text-lg font-semibold mb-2">{{ result.Manufacturer }}</h3>
            <p class="group/item hover:bg-slate-100"><strong>Campaign Number:</strong> {{ result.NHTSACampaignNumber }}</p>
            <p class="hover:bg-slate-100"><strong>Report Received Date:</strong> {{ result.ReportReceivedDate }}</p>
            <p><strong>Component:</strong> {{ result.Component }}</p>
            <p><strong>Summary:</strong> {{ result.Summary }}</p>
          </div>
        </div>
      </template>
    </div>
  </div>


  <div v-if="user">{{ user?.email }} <button @click="signOutUser">Sign Out</button></div>
  <div>
    <form @submit.prevent="submit">
      <div>
        
        <input type="email" placeholder="Enter email" v-model="data.email" id="email" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="data.password" type="password" id="password" />
      </div>
      <button type="submit">{{ mode === 'login' ? 'Login' : 'Register' }}</button>
      <div @click="toggleMode(mode === 'login' ? 'register' : 'login')">
        {{ mode === 'login' ? 'Not a user? Register' : 'Already a user? Login' }}
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from '@/firebase';
  import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'Landing',
  props: {
    onSearch: Function,
    searchResults: Object,
    errorMessages: Array,
  },
  setup(props) {
    const modelYear = ref('');
    const make = ref('');
    const model = ref('');

    const handleSearchClick = () => {
      props.errorMessages = []; 

      if (!modelYear.value || !make.value || !model.value) {
        props.errorMessages.push('Please confirm the year, make, and model are entered correctly and try again.');
        return;
      }

      props.onSearch(modelYear.value, make.value, model.value);
    };

    return {
      modelYear,
      make,
      model,
      handleSearchClick,
    };
  },
};

const data = ref({
    email: '',
    password: ''
  });

  const mode = ref('login');
  const user = ref(null);

  function toggleMode(val) {
    mode.value = val;
  }

  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  }

  async function register(email, password) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Registration successful!');
      
    } catch (err) {
      console.error(err);
    }
  }

  function submit() {
    let email = data.email;
    let password = data.password;

    if (mode.value === 'login') {
      login(email, password);
    } else {
      register(email, password);
    }
  }

  async function signOutUser() {
    try {
      await signOut(auth);
      
    } catch (err) {
      console.error(err);
    }
  }

  onAuthStateChanged(auth, (CurrentUser) => {
    user.value = CurrentUser;
  });
</script>