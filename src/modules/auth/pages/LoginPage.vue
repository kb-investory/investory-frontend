<script setup>
import LoginForm from '@/modules/auth/components/LoginForm.vue'
import { useAuthStore } from '@/modules/auth/stores/authStore'

const authStore = useAuthStore()
</script>

<template>
  <section class="page-section">
    <p class="eyebrow">Auth</p>
    <h1>로그인</h1>
    <LoginForm @submit="authStore.signIn" />
    <p v-if="authStore.user">{{ authStore.user.name }}님, 환영합니다.</p>
  </section>
</template>
