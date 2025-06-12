<template>
 <v-container class="mx-auto h-full">
   <v-row class="mx-auto h-full" justify="center" align="center">
     <v-col cols="12" md="6">
       <v-img src="/logo.png" width="256" class="mx-auto my-2"/>
       <span class="block text-center mb-5 font-bold">کراش هاتو مدیریت کن!❤️</span>
       <v-text-field v-model="username" placeholder="Username" label="نام کاربری" type="text"/>
       <v-text-field v-model="password" placeholder="Password" label="رمز عبور" type="password"/>
       <v-btn text="ورود" @click="login()"/>
       <v-btn text="عضویت" color="primary" class="mx-2" @click="router.push('/register')"/>
     </v-col>
   </v-row>
   <span class="text-center block text-sm">version 0.0.1</span>
   <v-snackbar v-model="showSnackBar" :text="snackBarText" :color="snackBarColor" />
 </v-container>
</template>

<script setup lang="ts">

definePageMeta({
  layout: "custom",
});


const router = useRouter();
const cookie = useCookie('crush-manager');

const username = ref(null);
const password = ref(null);

const showSnackBar = ref(false);
const snackBarColor = ref("");
const snackBarText = ref("");

const login = async () => {
  const {data, error} = await useFetch(useRuntimeConfig().public.api + '/login', {
    method: 'POST',
    body: {
      username: username.value,
      password: password.value
    }
  });


  if (error.value) {
    snackBarColor.value = "error";
    snackBarText.value = "اطلاعات اشتباه است";
  }else if (data.value) {
    snackBarColor.value = "success";
    snackBarText.value = "خوش آمدید";
    cookie.value = data.value;

    setTimeout(async () => {
      await router.push('/crushes');
    }, 1000);
  }

  showSnackBar.value = true;

}
</script>

<style scoped>

</style>
