<template>
  <div dir="rtl">
    <v-app>
      <slot/>
      <v-bottom-navigation bg-color="accent">
        <v-btn value="add-new-crush"  @click="router.push('/add-new-crush')">
          <v-icon>mdi-heart-plus</v-icon>

          <span>کراش جدید</span>
        </v-btn>

        <v-btn value="crushes" @click="router.push('/crushes')">
          <v-icon>mdi-heart</v-icon>

          <span>کراش ها</span>
        </v-btn>

        <v-btn value="settings">
          <v-icon>mdi-cog</v-icon>

          <span>تنظیمات</span>
        </v-btn>
      </v-bottom-navigation>
    </v-app>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
</script>

<style scoped>

</style>
