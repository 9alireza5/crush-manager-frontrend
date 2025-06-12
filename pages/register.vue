<template>
  <v-container class="mx-auto h-full">
    <v-row class="mx-auto h-full" justify="center" align="center">
      <v-col cols="12" md="6">
        <v-text-field v-model="username" placeholder="نام کاربری"/>
        <v-text-field v-model="password" placeholder="رمز عبور" type="password"/>
        <v-text-field v-model="email" placeholder="ایمیل" type="email"/>
        <v-btn text="عضویت" @click="register()"/>
        <v-btn text="ورود" color="primary" class="mx-2" @click="router.push('/')"/>
      </v-col>
    </v-row>
    <v-snackbar v-model="showSnackBar" :color="snackBarColor" :text="snackBarText"/>
  </v-container>
</template>

<script setup lang="ts">

definePageMeta({
  layout: "custom",
});


const router = useRouter();

const username = ref(null);
const password = ref(null);
const email = ref(null);

const showSnackBar = ref(false);
const snackBarColor = ref("");
const snackBarText = ref("");

const register = async () => {
  const {data, error} = await useFetch(useRuntimeConfig().public.api + '/register', {
    method: 'POST',
    body: {
      username: username.value,
      password: password.value,
      email: email.value
    }
  });


  if (error.value) {
    snackBarColor.value = "error";
    snackBarText.value = "اطلاعات اشتباه است";
  }else if (data.value) {
    snackBarColor.value = "success";
    snackBarText.value = "عضویت موفقیت آمیز بود، حالا میتوانید ورود کنید";
    setTimeout(async () => {
      await router.push('/');
    }, 1000);
  }


  showSnackBar.value = true;
}


</script>

<style scoped>

</style>
