<script setup>
import { onMounted } from 'vue'

import ProfileCard from '@/modules/mypage/components/ProfileCard.vue'
import { useMypageStore } from '@/modules/mypage/stores/mypageStore'
import BaseLoading from '@/shared/components/BaseLoading.vue'

const mypageStore = useMypageStore()
onMounted(() => mypageStore.fetchProfile())
</script>

<template>
  <section class="page-section">
    <p class="eyebrow">My Page</p>
    <h1>마이페이지</h1>
    <ProfileCard v-if="mypageStore.profile" :profile="mypageStore.profile" />
    <BaseLoading v-else />
  </section>
</template>
