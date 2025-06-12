<template>

  <v-container>
    <v-row>
      <v-progress-circular v-if="loading" indeterminate/>
      <template v-else>
        <v-col cols="12">
          <h1 v-if="!crushes.crushes.length">کراش نداری 😭 یکی اضافه کن</h1>
          <h1 v-else>لیست کراش ها:</h1>
        </v-col>
        <v-col v-for="(crush, i) in crushes.crushes" cols="12" :key="i" md="6">
          <v-card>
            <v-card-title>
              <v-row>
                <v-col cols="8">
                  <v-avatar color="surface-variant">
                    <v-img :src="`https://avatar.iran.liara.run/username?username=${crush.first_name+crush.last_name}`"/>
                  </v-avatar>
                  <span class="mx-3">{{crush.first_name}}</span>
                </v-col>
                <v-col cols="4" class="text-left flex gap-2">
                  <v-btn icon="mdi-eye" color="primary" size="small" @click="router.push(`/crush/${crush.id}`)"/>
                  <v-btn icon="mdi-trash-can" color="error" size="small" @click="deleteCrush(crush.id)"/>
                </v-col>
              </v-row>

            </v-card-title>
          </v-card>
        </v-col>
      </template>
    </v-row>
    <v-snackbar v-model="showSnackBar" :text="snackBarText" :color="snackBarColor" />

  </v-container>
</template>

<script setup lang="ts">
const cookie = useCookie('crush-manager');
const router = useRouter();



const showSnackBar = ref(false);
const snackBarText = ref('');
const snackBarColor = ref('');

const loading = ref(true);
const {data: crushes, refresh} = await useFetch(useRuntimeConfig().public.api + '/crushes', {
  headers: {
    Authorization: `Bearer ${cookie.value.token}`
  }
});


loading.value = false;


const deleteCrush = async (crushId: number) => {
  const res = await $fetch(useRuntimeConfig().public.api + `/crushes/${crushId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${cookie.value.token}`
    }
  });

  snackBarText.value = 'کراشت حذف شد';
  snackBarColor.value = 'success';
  showSnackBar.value = true;

  await refresh();
}
</script>

<style scoped>

</style>
