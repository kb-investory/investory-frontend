<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { ROUTE_NAMES } from '@/app/router/route-names'
import BrokerLoginForm from '@/modules/auth/components/BrokerLoginForm.vue'
import OnboardingHeader from '@/modules/auth/components/OnboardingHeader.vue'
import { getBrokerMark } from '@/modules/auth/utils/brokerMark'
import AppIcon from '@/shared/components/AppIcon.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseLoading from '@/shared/components/BaseLoading.vue'
import MobileStatusBar from '@/shared/components/MobileStatusBar.vue'
import { useBrokerStore } from '@/shared/stores/brokerStore'

const route = useRoute()
const router = useRouter()
const brokerStore = useBrokerStore()
const pageError = ref('')
const loadingBroker = ref(false)
const providerId = computed(() => Number(route.query.providerId))

const selectedBroker = computed(() => {
  if (Number.isFinite(providerId.value)) {
    return (
      brokerStore.providers.find((provider) => provider.providerId === providerId.value) ??
      (brokerStore.selectedProvider?.providerId === providerId.value
        ? brokerStore.selectedProvider
        : null)
    )
  }

  return brokerStore.selectedProvider
})

const brokerMark = computed(() => getBrokerMark(selectedBroker.value?.providerCode))

onMounted(loadSelectedBroker)

async function loadSelectedBroker() {
  brokerStore.resetConnectionState()
  loadingBroker.value = true
  pageError.value = ''

  try {
    if (!brokerStore.providers.length) {
      await brokerStore.fetchBrokers()
    }

    const provider = selectedBroker.value

    if (!provider) {
      pageError.value = '선택한 증권사 정보를 확인할 수 없습니다.'
      return
    }

    brokerStore.selectBroker(provider)
  } catch {
    pageError.value = '증권사 정보를 불러오지 못했습니다.'
  } finally {
    loadingBroker.value = false
  }
}

function goBack() {
  brokerStore.resetConnectionState()
  router.push({ name: ROUTE_NAMES.BROKER_CONNECT })
}

async function handleLogin(credentials) {
  if (!selectedBroker.value) {
    return
  }

  try {
    await brokerStore.connectBroker({
      providerId: selectedBroker.value.providerId,
      ...credentials,
    })
  } catch {
    // 요청 상태와 안내 문구는 Store에서 관리합니다.
  }
}
</script>

<template>
  <section class="broker-login-page">
    <div class="broker-login-shell">
      <MobileStatusBar />
      <OnboardingHeader title="계좌 연결" :step="2" @back="goBack" />

      <main class="broker-login-content">
        <BaseLoading v-if="loadingBroker" />

        <div v-else-if="pageError" class="broker-login-state" role="alert">
          <span>
            <AppIcon name="triangle-alert" :size="24" />
          </span>
          <h2>증권사를 다시 선택해 주세요</h2>
          <p>{{ pageError }}</p>
          <BaseButton variant="secondary" full-width @click="goBack">
            증권사 선택으로 돌아가기
          </BaseButton>
        </div>

        <template v-else-if="selectedBroker">
          <header class="broker-login-intro">
            <p class="broker-login-intro__eyebrow">BROKER SIGN IN</p>
            <h2>증권사 로그인</h2>
            <p>증권사에서 사용하는 아이디와 비밀번호를 입력해 주세요.</p>
          </header>

          <button
            class="selected-broker"
            type="button"
            aria-label="선택한 증권사 변경"
            @click="goBack"
          >
            <span class="selected-broker__mark" aria-hidden="true">{{ brokerMark }}</span>
            <span class="selected-broker__copy">
              <small>선택한 증권사</small>
              <strong>{{ selectedBroker.providerName }}</strong>
            </span>
            <span class="selected-broker__change">
              변경
              <AppIcon name="chevron-right" :size="17" />
            </span>
          </button>

          <BrokerLoginForm
            :status="brokerStore.connectionStatus"
            :error-message="brokerStore.connectionError"
            @submit="handleLogin"
          />
        </template>
      </main>
    </div>
  </section>
</template>

<style scoped>
.broker-login-page {
  display: grid;
  min-height: 100svh;
  place-items: center;
  background: var(--color-border-subtle);
}

.broker-login-shell {
  width: min(100%, 390px);
  min-height: min(874px, 100svh);
  overflow: hidden;
  background: var(--color-background);
}

.broker-login-content {
  display: grid;
  gap: 16px;
  padding: 20px 20px 18px;
}

.broker-login-intro {
  display: grid;
  gap: 6px;
}

.broker-login-intro p,
.broker-login-intro h2,
.broker-login-state h2,
.broker-login-state p {
  margin: 0;
}

.broker-login-intro__eyebrow {
  color: var(--color-primary-strong);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.2px;
}

.broker-login-intro h2 {
  font-size: 27px;
  letter-spacing: -0.4px;
  line-height: 34px;
}

.broker-login-intro > p:last-child {
  color: var(--color-text-muted);
  font-size: 12.5px;
  line-height: 18px;
}

.selected-broker {
  display: grid;
  width: 100%;
  min-height: 66px;
  grid-template-columns: 40px 1fr auto;
  align-items: center;
  gap: 11px;
  padding: 10px 12px;
  border: 1px solid var(--color-primary);
  border-radius: 11px;
  background: var(--color-primary-subtle);
  color: var(--color-heading);
  cursor: pointer;
  text-align: left;
}

.selected-broker:focus-visible {
  outline: 3px solid var(--color-primary-soft);
  outline-offset: 2px;
}

.selected-broker__mark {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border-radius: 10px;
  background: var(--color-primary-soft);
  color: var(--color-primary-strong);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
}

.selected-broker__copy {
  display: grid;
  gap: 2px;
}

.selected-broker__copy small {
  color: var(--color-primary-strong);
  font-size: 9.5px;
}

.selected-broker__copy strong {
  font-size: 13.5px;
}

.selected-broker__change {
  display: flex;
  align-items: center;
  gap: 1px;
  color: var(--color-text-muted);
  font-size: 10.5px;
}

.broker-login-state {
  display: grid;
  min-height: 520px;
  align-content: center;
  justify-items: center;
  gap: 12px;
  text-align: center;
}

.broker-login-state > span {
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  border-radius: 50%;
  background: var(--color-danger-soft);
  color: var(--color-danger);
}

.broker-login-state h2 {
  font-size: 20px;
}

.broker-login-state p {
  margin-bottom: 8px;
  color: var(--color-text-muted);
  font-size: 13px;
}

@media (min-width: 600px) {
  .broker-login-shell {
    border: 1px solid var(--color-border);
    border-radius: 24px;
    box-shadow: 0 24px 70px rgb(24 24 23 / 9%);
  }
}

@media (max-width: 350px) {
  .broker-login-content {
    padding-inline: 16px;
  }
}
</style>
