<template>
  <div class="flex items-center justify-between mb-2">
    <Landing :onSearch="handleSearch" :searchResults="searchResults" :errorMessages="errorMessages" />
  </div>
</template>

<script>
import { ref } from 'vue';
import Landing from './Landing.vue';

export default {
  name: 'App',
  components: {
    Landing,
  },
  setup() {
    const searchResults = ref(null);
    const errorMessages = ref([]);

    const getVehicleVariants = async (modelYear, make, model) => {
      try {
        const variantsUrl = `https://api.nhtsa.gov/recalls/recallsByVehicle?make=${make}&model=${model}&modelYear=${modelYear}`;
        const variantsResponse = await fetch(variantsUrl);

        if (!variantsResponse.ok) {
          throw new Error(`Error fetching vehicle variants: ${variantsResponse.statusText}`);
        }

        const variantsData = await variantsResponse.json();
        console.log('Vehicle Variants:', variantsData);
        return variantsData;
      } catch (error) {
        console.error('Error fetching vehicle variants:', error.message);
        return [];
      }
    };

    const handleSearch = async (modelYear, make, model) => {
      try {
        errorMessages.value = []; // Clear previous error messages

        if (modelYear && make && model) {
          const recalls = await getRecallsByVehicle(modelYear, make, model);

          if (recalls && recalls.results && recalls.results.length > 0) {
            searchResults.value = recalls;
          } else {
            // Handle invalid input
            errorMessages.value.push('No recalls found for the given input.');
          }
        } else {
          // Handle missing parameters
          errorMessages.value.push('Please fill in all input fields.');
        }
      } catch (error) {
        console.error('Error handling search:', error);
        errorMessages.value.push('An error occurred while processing the search.');
      }
    };

    const getRecallsByVehicle = async (modelYear, make, model) => {
      try {
        const url = `https://api.nhtsa.gov/recalls/recallsByVehicle?make=${make}&model=${model}&modelYear=${modelYear}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error fetching recalls: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Recalls:', data);
        return data;
      } catch (error) {
        console.error('Error fetching recalls:', error.message);
        return null;
      }
    };

    return {
      searchResults,
      errorMessages,
      handleSearch,
    };
  },
};
</script>