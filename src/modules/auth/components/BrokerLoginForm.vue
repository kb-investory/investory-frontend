<script setup>
import { computed, reactive, ref, watch } from 'vue'

import AppIcon from '@/shared/components/AppIcon.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTextField from '@/shared/components/BaseTextField.vue'

const props = defineProps({
  status: {
    type: String,
    default: 'idle',
    validator: (value) => ['idle', 'loading', 'success', 'error'].includes(value),
  },
  errorMessage: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['submit'])

const loginId = ref('')
const password = ref('')
const showPassword = ref(false)
const useSecurityKeyboard = ref(false)
const agreed = ref(false)
const touched = reactive({
  loginId: false,
  password: false,
  agreement: false,
})

const loginIdError = computed(() => {
  if (!touched.loginId || loginId.value.trim()) {
    return ''
  }

  return '증권사 아이디를 입력해 주세요.'
})

const passwordError = computed(() => {
  if (!touched.password || password.value) {
    return ''
  }

  return '증권사 비밀번호를 입력해 주세요.'
})

const agreementError = computed(() => {
  if (!touched.agreement || agreed.value) {
    return ''
  }

  return '계좌 정보 조회를 위한 필수 동의가 필요해요.'
})

const isFormValid = computed(() => Boolean(loginId.value.trim() && password.value && agreed.value))
const isSubmitting = computed(() => props.status === 'loading')
const isSubmitDisabled = computed(() => !isFormValid.value || isSubmitting.value)

watch(
  () => props.status,
  (status) => {
    if (status === 'success') {
      password.value = ''
      touched.password = false
    }
  },
)

function validateForm() {
  touched.loginId = true
  touched.password = true
  touched.agreement = true
  return isFormValid.value
}

function handleSubmit() {
  if (!validateForm()) {
    return
  }

  emit('submit', {
    loginId: loginId.value.trim(),
    password: password.value,
  })
}
</script>

<template>
  <form class="broker-login-form" novalidate @submit.prevent="handleSubmit">
    <div class="broker-login-form__fields">
      <BaseTextField
        v-model="loginId"
        label="증권사 아이디"
        name="broker-login-id"
        autocomplete="username"
        placeholder="아이디를 입력하세요"
        required
        :disabled="isSubmitting"
        :error="loginIdError"
        @blur="touched.loginId = true"
      />

      <BaseTextField
        v-model="password"
        label="비밀번호"
        name="broker-password"
        autocomplete="current-password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="비밀번호를 입력하세요"
        required
        :disabled="isSubmitting"
        :error="passwordError"
        @blur="touched.password = true"
      >
        <template #suffix>
          <button
            class="broker-login-form__icon-button"
            type="button"
            :aria-label="showPassword ? '비밀번호 숨기기' : '비밀번호 보기'"
            :disabled="isSubmitting"
            @click="showPassword = !showPassword"
          >
            <AppIcon :name="showPassword ? 'eye' : 'eye-off'" :size="18" />
          </button>
        </template>
      </BaseTextField>
    </div>

    <button
      class="security-keyboard"
      :class="{ 'security-keyboard--active': useSecurityKeyboard }"
      type="button"
      :aria-pressed="useSecurityKeyboard"
      :disabled="isSubmitting"
      @click="useSecurityKeyboard = !useSecurityKeyboard"
    >
      <span class="security-keyboard__icon">
        <AppIcon name="keyboard" :size="17" />
      </span>
      <span>
        <strong>보안 키패드 사용</strong>
        <small>화면 키패드로 비밀번호를 안전하게 입력해요</small>
      </span>
      <span class="security-keyboard__toggle" aria-hidden="true">
        <span />
      </span>
    </button>

    <div class="agreement">
      <label class="agreement__row">
        <input
          v-model="agreed"
          type="checkbox"
          :disabled="isSubmitting"
          @blur="touched.agreement = true"
        />
        <span class="agreement__check" aria-hidden="true">
          <AppIcon v-if="agreed" name="check" :size="13" />
        </span>
        <span class="agreement__copy">
          <strong><em>필수</em> 계좌 정보 조회 및 수집에 동의</strong>
          <small>보유 계좌와 거래 내역을 불러오기 위해 필요해요</small>
        </span>
        <AppIcon name="chevron-right" :size="17" />
      </label>
      <span v-if="agreementError" class="agreement__error" role="alert">
        {{ agreementError }}
      </span>
    </div>

    <aside class="security-notice">
      <span class="security-notice__icon">
        <AppIcon name="shield-check" :size="17" />
      </span>
      <p>
        <strong>로그인 정보는 저장하지 않아요</strong>
        <span>증권사 인증에만 사용하고 즉시 폐기합니다.</span>
      </p>
    </aside>

    <div
      v-if="status !== 'idle'"
      class="request-status"
      :class="`request-status--${status}`"
      :role="status === 'error' ? 'alert' : 'status'"
      aria-live="polite"
    >
      <AppIcon
        :name="
          status === 'loading'
            ? 'loader-circle'
            : status === 'success'
              ? 'circle-check'
              : 'triangle-alert'
        "
        :size="18"
      />
      <span v-if="status === 'loading'">증권사에 로그인하고 있어요.</span>
      <span v-else-if="status === 'success'">로그인에 성공했습니다. 계좌를 연결했어요.</span>
      <span v-else>{{ errorMessage || '증권사 로그인에 실패했습니다.' }}</span>
    </div>

    <div class="broker-login-form__action">
      <BaseButton type="submit" full-width :disabled="isSubmitDisabled">
        {{ isSubmitting ? '로그인 중...' : '로그인하고 연결하기' }}
        <template #icon>
          <AppIcon
            :class="{ 'broker-login-form__spinner': isSubmitting }"
            :name="isSubmitting ? 'loader-circle' : 'arrow-right'"
            :size="18"
          />
        </template>
      </BaseButton>
      <p>증권사에 따라 인증에 잠시 시간이 걸릴 수 있어요.</p>
    </div>
  </form>
</template>

<style scoped>
.broker-login-form {
  display: grid;
  gap: 14px;
}

.broker-login-form__fields {
  display: grid;
  gap: 12px;
}

.broker-login-form__icon-button {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--color-text-subtle);
  cursor: pointer;
}

.broker-login-form__icon-button:focus-visible,
.security-keyboard:focus-visible,
.agreement__row:focus-within {
  outline: 3px solid var(--color-primary-soft);
  outline-offset: 1px;
}

.security-keyboard {
  display: grid;
  min-height: 58px;
  grid-template-columns: 34px 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  text-align: left;
}

.security-keyboard--active {
  border-color: var(--color-primary);
  background: var(--color-primary-subtle);
}

.security-keyboard__icon {
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border-radius: 8px;
  background: var(--color-surface-subtle);
  color: var(--color-text-muted);
}

.security-keyboard > span:nth-child(2) {
  display: grid;
  gap: 2px;
}

.security-keyboard strong {
  font-size: 12px;
}

.security-keyboard small {
  color: var(--color-text-muted);
  font-size: 10px;
}

.security-keyboard__toggle {
  position: relative;
  width: 30px;
  height: 18px;
  border-radius: 999px;
  background: var(--color-border);
  transition: background 150ms ease;
}

.security-keyboard__toggle span {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-surface);
  box-shadow: 0 1px 3px rgb(24 24 23 / 20%);
  transition: transform 150ms ease;
}

.security-keyboard--active .security-keyboard__toggle {
  background: var(--color-primary);
}

.security-keyboard--active .security-keyboard__toggle span {
  transform: translateX(12px);
}

.agreement {
  display: grid;
  gap: 5px;
}

.agreement__row {
  display: grid;
  min-height: 58px;
  grid-template-columns: 20px 1fr auto;
  align-items: center;
  gap: 9px;
  padding: 9px 12px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-surface);
  cursor: pointer;
}

.agreement__row input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
}

.agreement__check {
  display: grid;
  width: 19px;
  height: 19px;
  place-items: center;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  background: var(--color-surface);
  color: var(--color-heading);
}

.agreement__row input:checked + .agreement__check {
  border-color: var(--color-primary);
  background: var(--color-primary);
}

.agreement__copy {
  display: grid;
  gap: 2px;
}

.agreement__copy strong {
  font-size: 11.5px;
}

.agreement__copy em {
  margin-right: 4px;
  color: var(--color-primary-strong);
  font-style: normal;
}

.agreement__copy small {
  color: var(--color-text-muted);
  font-size: 9.5px;
}

.agreement__row > :last-child {
  color: var(--color-text-subtle);
}

.agreement__error {
  color: var(--color-danger);
  font-size: 11px;
  line-height: 16px;
}

.security-notice {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 9px 11px;
  border-radius: 8px;
  background: var(--color-primary-subtle);
}

.security-notice__icon {
  color: var(--color-primary-strong);
}

.security-notice p {
  display: grid;
  gap: 1px;
  margin: 0;
}

.security-notice strong {
  color: var(--color-primary-strong);
  font-size: 10.5px;
}

.security-notice p span {
  color: var(--color-text-muted);
  font-size: 9.5px;
}

.request-status {
  display: flex;
  min-height: 44px;
  align-items: center;
  gap: 8px;
  padding: 9px 11px;
  border-radius: 8px;
  font-size: 11px;
  line-height: 16px;
}

.request-status--loading {
  background: var(--color-primary-subtle);
  color: var(--color-primary-strong);
}

.request-status--success {
  background: var(--color-success-soft);
  color: var(--color-success);
}

.request-status--error {
  background: var(--color-danger-soft);
  color: var(--color-danger);
}

.request-status--loading :deep(.app-icon),
.broker-login-form__spinner {
  animation: spin 800ms linear infinite;
}

.broker-login-form__action {
  display: grid;
  gap: 7px;
}

.broker-login-form__action p {
  margin: 0;
  color: var(--color-text-subtle);
  font-size: 9.5px;
  text-align: center;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
