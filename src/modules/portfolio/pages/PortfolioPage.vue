<script setup>
import { onMounted } from 'vue'

import PortfolioCard from '@/modules/portfolio/components/PortfolioCard.vue'
import { usePortfolioStore } from '@/modules/portfolio/stores/portfolioStore'
import BaseLoading from '@/shared/components/BaseLoading.vue'

const portfolioStore = usePortfolioStore()
onMounted(() => portfolioStore.fetchPortfolios())
</script>

<template>
  <section class="page-section">
    <p class="eyebrow">Portfolio</p>
    <h1>내 포트폴리오</h1>
    <BaseLoading v-if="portfolioStore.loading" />
    <p v-else-if="portfolioStore.error">포트폴리오를 불러오지 못했습니다.</p>
    <div v-else class="card-grid">
      <PortfolioCard
        v-for="portfolio in portfolioStore.portfolios"
        :key="portfolio.id"
        :portfolio="portfolio"
      />
    </div>
  </section>
</template>
