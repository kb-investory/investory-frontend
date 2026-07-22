<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { ROUTE_NAMES } from '@/app/router/route-names'
</script>

<template>
  <div class="app-layout">
    <header class="app-header">
      <RouterLink class="brand" :to="{ name: ROUTE_NAMES.HOME }">Investory</RouterLink>

      <nav class="navigation" aria-label="주요 메뉴">
        <RouterLink :to="{ name: ROUTE_NAMES.PORTFOLIO }">포트폴리오</RouterLink>
        <RouterLink :to="{ name: ROUTE_NAMES.JOURNAL }">투자일지</RouterLink>
        <RouterLink :to="{ name: ROUTE_NAMES.AI_CONVERSATION }">AI 대화</RouterLink>
        <RouterLink :to="{ name: ROUTE_NAMES.MYPAGE }">마이페이지</RouterLink>
      </nav>
    </header>

    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 32px;
  border-bottom: 1px solid var(--color-border);
}

.brand {
  color: var(--color-heading);
  font-size: 20px;
  font-weight: 700;
}

.navigation {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.navigation a {
  color: var(--color-text-muted);
}

.navigation a.router-link-active {
  color: var(--color-primary);
  font-weight: 600;
}

.app-main {
  width: min(1120px, calc(100% - 40px));
  margin: 0 auto;
  padding: 48px 0;
}

@media (max-width: 720px) {
  .app-header {
    align-items: flex-start;
    flex-direction: column;
    padding: 20px;
  }
}
</style>
