<template>
  <v-container dir="rtl" class="mb-15">
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field label="نام" v-model="firstName" solo hide-details/>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field label="نام خانوادگی" v-model="lastName" solo hide-details/>
        </v-col>
        <v-col cols="12" md="3">
          <v-select :items="genderItems" v-model="gender" solo hide-details/>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field label="تاریخ آشنایی" v-model="acquaintance_date" solo hide-details/>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field label="سن" v-model="age" solo hide-details/>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field label="شماره تلفن" v-model="phoneNumber" solo hide-details/>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field label="اینستاگرام" v-model="instagramId" solo hide-details/>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field label="وضعیت رابطه" v-model="relationshipStatus" solo hide-details/>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field label="سطح تعامل" type="number" v-model="interactionLevel" solo hide-details/>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field label="سطح احساسات" type="number" v-model="feelingsLevel" solo hide-details/>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field label="برنامه آینده" v-model="futurePlan" solo hide-details/>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field label="اطلاعات دیگر" v-model="notes" solo hide-details/>
        </v-col>
        <v-col cols="12">
          <v-btn text="افزودن" color="primary" @click="addNewCrush()" solo hide-details/>
        </v-col>
      </v-row>

    <v-snackbar v-model="showSnackBar" :text="snackBarText" :color="snackBarColor" />

  </v-container>
</template>

<script setup lang="ts">

const router = useRouter();
const cookie = useCookie('crush-manager');


const genderItems = [
  {
      title: 'مرد',
      value: 'Male'
  },
  {
    title: 'زن',
    value: 'Female'
  }
];



const firstName = ref('');
const lastName = ref('');
const acquaintance_date = ref('2025-01-11');
const age = ref(18);
const gender = ref('Male');
const phoneNumber = ref('');
const instagramId = ref('');
const relationshipStatus = ref('');
const interactionLevel = ref(0);
const feelingsLevel = ref(0);
const futurePlan = ref('');
const notes = ref('');


const showSnackBar = ref(false);
const snackBarText = ref('');
const snackBarColor = ref('');


const addNewCrush = async () => {
  const {data, error} = await useFetch(useRuntimeConfig().public.api + '/crushes', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cookie.value?.token}`

    },
    body: {
      first_name: firstName.value,
      last_name: lastName.value,
      acquaintance_date: acquaintance_date.value,
      age: age.value,
      gender: gender.value,
      phone_number: phoneNumber.value,
      instagram_id: instagramId.value,
      relationship_status: relationshipStatus.value,
      interaction_level: parseInt(interactionLevel.value),
      feelings_level: parseInt(feelingsLevel.value),
      future_plan: futurePlan.value,
      notes: notes.value
    }
  });


  if (error.value) {
    snackBarColor.value = 'error';
    showSnackBar.value = true;
    snackBarText.value = 'مشکلی پیش امده است 😭';
  }


  if (data.value) {
    snackBarColor.value = 'success';
    showSnackBar.value = true;
    snackBarText.value = 'کراش جدیدت اضافه شد❤️';

    setTimeout(async () => {
      await router.push('/crushes');
    }, 1000);
  }


}

</script>

<style scoped>

</style>
