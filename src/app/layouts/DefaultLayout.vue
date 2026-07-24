<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

import { ROUTE_NAMES } from '@/app/router/route-names'

const route = useRoute()
const isAuthLayout = computed(() => route.meta.layout === 'auth')
</script>

<template>
  <div class="app-layout" :class="{ 'app-layout--auth': isAuthLayout }">
    <div class="mobile-container" :class="{ 'mobile-container--auth': isAuthLayout }">
      <header v-if="!isAuthLayout" class="app-header">
        <div class="header-brand-row">
          <RouterLink class="brand" :to="{ name: ROUTE_NAMES.HOME }">Investory</RouterLink>
        </div>

        <nav class="navigation" aria-label="주요 메뉴">
          <RouterLink :to="{ name: ROUTE_NAMES.PORTFOLIO }">포트폴리오</RouterLink>
          <RouterLink :to="{ name: ROUTE_NAMES.JOURNAL }">투자일지</RouterLink>
          <RouterLink :to="{ name: ROUTE_NAMES.AI_CONVERSATION }">AI 대화</RouterLink>
          <RouterLink :to="{ name: ROUTE_NAMES.MYPAGE }">마이페이지</RouterLink>
        </nav>
      </header>

      <main class="app-main" :class="{ 'app-main--auth': isAuthLayout }">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  background-color: #f2f2f5;
  display: flex;
  justify-content: center;
}

.mobile-container {
  width: 100%;
  max-width: 480px;
  min-height: 100vh;
  background-color: #ffffff;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
}

.app-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 20px 12px;
  border-bottom: 1px solid var(--color-border);
  background: #ffffff;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-brand-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  color: var(--color-heading);
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 2px;
  -webkit-overflow-scrolling: touch;
}

.navigation a {
  color: var(--color-text-muted);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  padding: 6px 10px;
  border-radius: 8px;
  transition: all 0.15s ease;
}

.navigation a.router-link-active {
  color: #111111;
  font-weight: 700;
  background-color: #f4f4f1;
}

.app-main {
  flex: 1;
  width: 100%;
  padding: 20px 16px 32px;
}

.app-layout--auth,
.mobile-container--auth,
.app-main--auth {
  min-height: 100svh;
}

.app-layout--auth {
  background-color: #ffffff;
}

.mobile-container--auth {
  max-width: none;
  box-shadow: none;
}

.app-main--auth {
  padding: 0;
}

@media (max-width: 480px) {
  .app-layout {
    background-color: #ffffff;
  }

  .mobile-container {
    box-shadow: none;
  }
}
</style>
