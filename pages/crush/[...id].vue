<template>
  <div>
     <v-container class="mb-15">
       <v-row>
         <v-col>
           <v-card>
             <v-card-title>
               <v-btn icon="mdi-pen" color="primary" @click="disableForm = false"/>
             </v-card-title>
             <v-card-text>
               <v-row>
                 <v-col cols="12" md="3">
                   <v-text-field v-model="crush.first_name" label="نام" :disabled="disableForm"/>
                 </v-col>
                 <v-col cols="12" md="3">
                   <v-text-field v-model="crush.last_name" label="نام خانوادگی" :disabled="disableForm"/>
                 </v-col>
                 <v-col cols="12" md="3">
                   <v-select v-model="crush.gender" :items="genderItems" :disabled="disableForm"/>
                 </v-col>
                 <v-col cols="12" md="3">
                   <v-text-field v-model="crush.acquaintance_date" label="تاریخ آشنایی" :disabled="disableForm"/>
                 </v-col>
                 <v-col cols="12" md="3">
                   <v-text-field v-model="crush.age" label="سن" :disabled="disableForm"/>
                 </v-col>
                 <v-col cols="12" md="3">
                   <v-text-field v-model="crush.phone_number" label="شماره تلفن" :disabled="disableForm"/>
                 </v-col>
                 <v-col cols="12" md="3">
                   <v-text-field v-model="crush.instagram_id" label="اینستاگرام" :disabled="disableForm"/>
                 </v-col>
                 <v-col cols="12" md="3">
                   <v-text-field v-model="crush.relationship_status" label="وضعیت رابطه" :disabled="disableForm"/>
                 </v-col>
                 <v-col cols="12" md="3">
                   <v-text-field v-model="crush.interaction_level" label="سطح تعامل" type="number" :disabled="disableForm"/>
                 </v-col>
                 <v-col cols="12" md="3">
                   <v-text-field v-model="crush.feelings_level" label="سطح احساسات" type="number" :disabled="disableForm"/>
                 </v-col>
                 <v-col cols="12" md="3">
                   <v-text-field v-model="crush.future_plan" label="برنامه آینده" :disabled="disableForm"/>
                 </v-col>
                 <v-col cols="12" md="3">
                   <v-text-field v-model="crush.notes" label="اطلاعات دیگر" :disabled="disableForm"/>
                 </v-col>
                 <v-col v-if="!disableForm" cols="12">
                   <v-btn text="ویرایش" color="primary" @click="edit()" :loading="editLoading"/>
                 </v-col>
               </v-row>
             </v-card-text>
           </v-card>
         </v-col>
       </v-row>
       <v-row>
         <v-col>
           <h2 class="my-2">چت با دستیار هوشمند:</h2>
           <v-textarea v-model="query" dir="rtl" variant="solo"/>
           <v-btn icon="mdi-send" :loading="queryLoding" @click="sendQuery()"/>
           <v-card v-for="(advice, i) in queryAnswers" :key="i" class="rounded-xl shadow-md text-right my-3">
             <v-card-text dir="rtl">
               {{advice}}
             </v-card-text>
           </v-card>
         </v-col>
       </v-row>
       <v-snackbar v-model="showSnackBar" :text="snackBarText" :color="snackBarColor" />

     </v-container>
  </div>
</template>

<script setup lang="ts">
const cookie = useCookie('crush-manager');
const route = useRoute();
const crushId = route.params.id;


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

const crush = ref({});
const disableForm = ref(true);


const query = ref('');
const queryAnswers = ref([]);
const queryLoding = ref(false);


const showSnackBar = ref(false);
const snackBarText = ref('');
const snackBarColor = ref('');


const editLoading = ref(false);

const {data} = await useFetch(useRuntimeConfig().public.api + '/crushes/' + crushId, {
  headers: {
    Authorization: `Bearer ${cookie.value?.token}`
  }
});

if (data.value) {
  crush.value = data.value;
}



const sendQuery = async () => {
  queryLoding.value = true;
  const {data: aiData} = await useFetch(useRuntimeConfig().public.api + '/ai/get-advice', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${cookie.value?.token}`
  },
  body: {
    query: query.value
  }
});


  queryLoding.value = false;

  if (aiData.value) {
    queryAnswers.value.push(aiData.value.advice);
  }
}


const edit = async () => {
  editLoading.value = true;
  const {error} = await useFetch(useRuntimeConfig().public.api + '/crushes/' + crushId, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${cookie.value?.token}`
    },
    body: crush.value
  });

  editLoading.value = false;

  if (!error.value) {
    snackBarText.value = 'اطلاعات با موفقیت ویرایش شد';
    snackBarColor.value = 'success';
    showSnackBar.value = true;
    disableForm.value = true;
  }
}

</script>

<style scoped>

</style>
