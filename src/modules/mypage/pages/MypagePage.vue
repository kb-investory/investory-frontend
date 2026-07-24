<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Bell,
  ChevronRight,
  CircleHelp,
  Landmark,
  LogOut,
  Megaphone,
  MessageCircle,
  Pencil,
  Send,
  ShieldCheck,
  UserX,
  X,
} from '@lucide/vue'

import { ROUTE_NAMES } from '@/app/router/route-names'
import { useAuthStore } from '@/modules/auth/stores/authStore'
import { useJournalStore } from '@/modules/journal/stores/journalStore'
import { useMypageStore } from '@/modules/mypage/stores/mypageStore'
import BaseLoading from '@/shared/components/BaseLoading.vue'

const router = useRouter()
const authStore = useAuthStore()
const journalStore = useJournalStore()
const mypageStore = useMypageStore()

const isLogoutModalOpen = ref(false)
const isWithdrawalModalOpen = ref(false)
const isLoggingOut = ref(false)
const isWithdrawing = ref(false)
const isProfileImageBroken = ref(false)
const isGuideOpen = ref(false)
const frontOnlyMessage = ref('')
let frontOnlyMessageTimer = null

const profileInitial = computed(() => mypageStore.profile?.name?.slice(0, 1) || '나')
const hasCustomProfileImage = computed(() => {
  const imageUrl = mypageStore.profile?.profileImageUrl
  return imageUrl && !imageUrl.includes('placehold.co') && !isProfileImageBroken.value
})
const journalCount = computed(() => journalStore.totalJournalCount)

onMounted(() => {
  Promise.all([mypageStore.fetchProfile(), journalStore.fetchTotalJournalCount()])
})

function goToProfileEdit() {
  router.push({ name: ROUTE_NAMES.MYPAGE_EDIT })
}

function goToAccountManagement() {
  router.push({ name: ROUTE_NAMES.MYPAGE_ACCOUNTS })
}

function showFrontOnlyMessage() {
  frontOnlyMessage.value = '준비 중인 기능입니다.'
  window.clearTimeout(frontOnlyMessageTimer)
  frontOnlyMessageTimer = window.setTimeout(() => {
    frontOnlyMessage.value = ''
  }, 1800)
}

async function confirmLogout() {
  if (isLoggingOut.value) return

  isLoggingOut.value = true

  try {
    await authStore.signOut()
  } catch {
    // 목업 환경에서 토큰이 없어도 로그인 화면으로 이동한다.
  } finally {
    router.replace({ name: ROUTE_NAMES.LOGIN })
  }
}

async function confirmWithdrawal() {
  if (isWithdrawing.value) return

  isWithdrawing.value = true

  try {
    await mypageStore.withdraw('USER_REQUEST')
    await authStore.signOut()
  } catch {
    // 목업 환경에서 토큰이 없어도 탈퇴 처리 후 로그인 화면으로 이동한다.
  } finally {
    router.replace({ name: ROUTE_NAMES.LOGIN })
  }
}
</script>

<template>
  <section class="mypage" aria-labelledby="mypage-title">
    <header class="mypage__header">
      <h1 id="mypage-title">마이페이지</h1>
      <button
        type="button"
        class="guide-button"
        aria-label="마이페이지 안내"
        :aria-expanded="isGuideOpen"
        @click="isGuideOpen = !isGuideOpen"
      >
        <CircleHelp :size="18" />
      </button>
      <section v-if="isGuideOpen" class="guide-panel" role="tooltip">
        <strong>마이페이지 안내</strong>
        <ul>
          <li>프로필에서 이름과 사진을 수정할 수 있어요.</li>
          <li>연결 계좌에서 계좌 상태를 확인할 수 있어요.</li>
          <li>일지 개수는 작성한 전체 투자 일지 수예요.</li>
        </ul>
      </section>
    </header>

    <BaseLoading v-if="!mypageStore.profile" />

    <template v-else>
      <article class="profile-card">
        <div class="profile-card__avatar" aria-hidden="true">
          <img
            v-if="hasCustomProfileImage"
            :src="mypageStore.profile.profileImageUrl"
            :alt="`${mypageStore.profile.name} 프로필 이미지`"
            @error="isProfileImageBroken = true"
          />
          <span v-else>{{ profileInitial }}</span>
        </div>
        <div class="profile-card__details">
          <div class="profile-card__name-row">
            <strong>{{ mypageStore.profile.name }}</strong>
            <span class="journal-badge">일지 {{ journalCount }}개</span>
          </div>
          <span>{{ mypageStore.profile.email }}</span>
        </div>
        <button type="button" class="edit-button" aria-label="프로필 수정" @click="goToProfileEdit">
          <Pencil :size="17" />
        </button>
      </article>

      <section class="account-highlight" aria-label="연결 계좌 안내">
        <div class="account-highlight__icon"><Landmark :size="19" /></div>
        <div>
          <strong>연결 계좌를 한눈에 관리하세요</strong>
          <p>계좌 상태와 동기화 정보를 확인할 수 있어요.</p>
        </div>
        <button type="button" aria-label="연결 계좌 관리로 이동" @click="goToAccountManagement">
          <ChevronRight :size="19" />
        </button>
      </section>

      <section class="settings-section" aria-label="계정 및 연결">
        <p class="settings-section__label">계정 및 연결</p>
        <button type="button" class="menu-row" @click="showFrontOnlyMessage">
          <span class="menu-row__icon"><Bell :size="18" /></span>
          <span>알림 설정</span>
          <ChevronRight class="menu-row__chevron" :size="18" aria-hidden="true" />
        </button>
      </section>

      <section class="settings-section" aria-label="서비스 지원">
        <p class="settings-section__label">서비스 지원</p>
        <div class="support-list">
          <button type="button" class="menu-row" @click="showFrontOnlyMessage">
            <span class="menu-row__icon menu-row__icon--plain"><Megaphone :size="18" /></span>
            <span>공지사항</span>
            <ChevronRight class="menu-row__chevron" :size="18" aria-hidden="true" />
          </button>
          <button type="button" class="menu-row" @click="showFrontOnlyMessage">
            <span class="menu-row__icon menu-row__icon--plain"><MessageCircle :size="18" /></span>
            <span>자주 묻는 질문</span>
            <ChevronRight class="menu-row__chevron" :size="18" aria-hidden="true" />
          </button>
          <button type="button" class="menu-row" @click="showFrontOnlyMessage">
            <span class="menu-row__icon menu-row__icon--plain"><Send :size="18" /></span>
            <span>문의하기</span>
            <ChevronRight class="menu-row__chevron" :size="18" aria-hidden="true" />
          </button>
          <button type="button" class="menu-row" @click="showFrontOnlyMessage">
            <span class="menu-row__icon menu-row__icon--plain"><ShieldCheck :size="18" /></span>
            <span>개인정보 및 약관</span>
            <ChevronRight class="menu-row__chevron" :size="18" aria-hidden="true" />
          </button>
        </div>
      </section>

      <section class="settings-section" aria-label="계정 관리">
        <p class="settings-section__label">계정</p>
        <button type="button" class="menu-row menu-row--logout" @click="isLogoutModalOpen = true">
          <span class="menu-row__icon menu-row__icon--danger"><LogOut :size="18" /></span>
          <span>로그아웃</span>
          <ChevronRight class="menu-row__chevron" :size="18" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="menu-row menu-row--withdrawal"
          @click="isWithdrawalModalOpen = true"
        >
          <span class="menu-row__icon menu-row__icon--danger"><UserX :size="18" /></span>
          <span class="withdrawal-copy">
            <strong>회원 탈퇴</strong>
            <small>모든 계정 데이터와 연결 해제</small>
          </span>
          <ChevronRight class="menu-row__chevron" :size="18" aria-hidden="true" />
        </button>
        <p class="app-version">앱 버전 1.0.0</p>
      </section>
    </template>

    <Teleport to="body">
      <div v-if="isLogoutModalOpen" class="modal-overlay" @click.self="isLogoutModalOpen = false">
        <section
          class="confirm-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-title"
        >
          <button
            type="button"
            class="confirm-modal__close"
            aria-label="닫기"
            @click="isLogoutModalOpen = false"
          >
            <X :size="20" />
          </button>
          <h2 id="logout-title">로그아웃할까요?</h2>
          <p>로그아웃하면 다시 로그인해야 서비스를 이용할 수 있어요.</p>
          <div class="confirm-modal__actions">
            <button type="button" @click="isLogoutModalOpen = false">취소</button>
            <button
              type="button"
              class="confirm-modal__danger"
              :disabled="isLoggingOut"
              @click="confirmLogout"
            >
              {{ isLoggingOut ? '로그아웃 중...' : '로그아웃' }}
            </button>
          </div>
        </section>
      </div>
    </Teleport>

    <Teleport to="body">
      <div
        v-if="isWithdrawalModalOpen"
        class="modal-overlay"
        @click.self="isWithdrawalModalOpen = false"
      >
        <section
          class="confirm-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="withdrawal-title"
        >
          <button
            type="button"
            class="confirm-modal__close"
            aria-label="닫기"
            @click="isWithdrawalModalOpen = false"
          >
            <X :size="20" />
          </button>
          <h2 id="withdrawal-title">회원 탈퇴할까요?</h2>
          <p>계정 정보와 연결된 계좌 정보가 삭제되며, 이 작업은 되돌릴 수 없어요.</p>
          <div class="confirm-modal__actions">
            <button type="button" @click="isWithdrawalModalOpen = false">취소</button>
            <button
              type="button"
              class="confirm-modal__danger"
              :disabled="isWithdrawing"
              @click="confirmWithdrawal"
            >
              {{ isWithdrawing ? '탈퇴 처리 중...' : '탈퇴하기' }}
            </button>
          </div>
        </section>
      </div>
    </Teleport>

    <Transition name="toast">
      <p v-if="frontOnlyMessage" class="front-only-toast" role="status">{{ frontOnlyMessage }}</p>
    </Transition>
  </section>
</template>

<style scoped>
.mypage {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  gap: 20px;
  padding: 2px 2px 32px;
  background: #fffdf8;
}
.mypage__header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 4px;
}
.mypage__header h1 {
  margin: 0;
  color: #1d1b16;
  font-size: 25px;
  font-weight: 800;
  letter-spacing: -0.7px;
}
.guide-button,
.edit-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  cursor: pointer;
}
.guide-button {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #fff2bd;
  color: #a77900;
}
.guide-panel {
  position: absolute;
  top: 42px;
  right: 0;
  z-index: 20;
  width: min(250px, calc(100vw - 48px));
  padding: 14px;
  border: 1px solid #f1d66c;
  border-radius: 12px;
  background: #fffdf6;
  box-shadow: 0 10px 24px rgb(132 95 0 / 14%);
}
.guide-panel strong {
  color: #604b15;
  font-size: 13px;
  font-weight: 800;
}
.guide-panel ul {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 9px 0 0;
  padding-left: 16px;
  color: #796b49;
  font-size: 11px;
  line-height: 1.4;
}
.profile-card {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 15px;
  border: 1px solid #f0e2b9;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 14px rgb(185 137 0 / 7%);
}
.profile-card__avatar {
  display: flex;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 14px;
  background: #ffefad;
  color: #a77900;
  font-size: 19px;
  font-weight: 800;
}
.profile-card__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.profile-card__details {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 4px;
}
.profile-card__name-row {
  display: flex;
  align-items: center;
  gap: 7px;
}
.profile-card__details strong {
  color: #28251e;
  font-size: 15px;
  font-weight: 800;
}
.profile-card__details > span {
  overflow: hidden;
  color: #8d8061;
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.journal-badge {
  padding: 2px 7px;
  border-radius: 6px;
  background: #fff2bd;
  color: #a77900;
  font-size: 10px;
  font-weight: 800;
}
.edit-button {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: #fff8e5;
  color: #a77900;
}
.account-highlight {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px;
  border: 1px solid #ffe17b;
  border-radius: 14px;
  background: #fff9df;
}
.account-highlight__icon,
.menu-row__icon {
  display: inline-flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  background: #ffed9e;
  color: #a77900;
}
.account-highlight > div:nth-child(2) {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 3px;
}
.account-highlight strong {
  color: #5c4812;
  font-size: 12px;
  font-weight: 800;
}
.account-highlight p {
  margin: 0;
  color: #9b7d23;
  font-size: 10px;
}
.account-highlight button {
  display: inline-flex;
  border: 0;
  background: transparent;
  color: #a77900;
  cursor: pointer;
}
.settings-section {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.settings-section__label {
  margin: 0 0 0 3px;
  color: #9b8750;
  font-size: 11px;
  font-weight: 700;
}
.support-list {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.menu-row {
  display: flex;
  width: 100%;
  min-height: 52px;
  align-items: center;
  gap: 11px;
  padding: 0 13px;
  border: 1px solid #f0e7d2;
  border-radius: 13px;
  background: #fff;
  color: #3d392f;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
}
button.menu-row {
  cursor: pointer;
}
button.menu-row:hover {
  background: #fff9e7;
}
.menu-row__icon--danger {
  background: #fff0ed;
  color: #dc5a4b;
}
.menu-row__icon--plain {
  background: #f8f2e5;
  color: #8e7b47;
}
.menu-row__chevron {
  margin-left: auto;
  color: #b69945;
}
.menu-row--logout {
  border-color: #f5ddd9;
  color: #c64e41;
}
.menu-row--withdrawal {
  min-height: 58px;
  border-color: #f5ddd9;
  color: #c64e41;
}
.withdrawal-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.withdrawal-copy strong {
  font-size: 14px;
}
.withdrawal-copy small {
  color: #a78c86;
  font-size: 10px;
  font-weight: 500;
}
.app-version {
  margin: 2px 0 0 3px;
  color: #aa9d81;
  font-size: 10px;
  font-weight: 600;
}
.front-only-toast {
  position: fixed;
  bottom: 28px;
  left: 50%;
  z-index: 1100;
  margin: 0;
  padding: 10px 14px;
  border-radius: 20px;
  background: #332f25;
  color: #fffdf8;
  font-size: 12px;
  font-weight: 700;
  transform: translateX(-50%);
  box-shadow: 0 6px 16px rgb(0 0 0 / 18%);
}
.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 8px);
}
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgb(24 24 23 / 42%);
}
.confirm-modal {
  position: relative;
  width: min(336px, 100%);
  padding: 28px 24px 22px;
  border-radius: 20px;
  background: #fffdf8;
  box-shadow: 0 18px 45px rgb(0 0 0 / 18%);
}
.confirm-modal h2 {
  margin: 0 0 8px;
  color: #211f19;
  font-size: 20px;
  font-weight: 800;
}
.confirm-modal p {
  margin: 0;
  color: #776f5e;
  font-size: 13px;
  line-height: 1.55;
}
.confirm-modal__close {
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-flex;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #8d8061;
  cursor: pointer;
}
.confirm-modal__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 24px;
}
.confirm-modal__actions button {
  height: 44px;
  border: 1px solid #eadfca;
  border-radius: 10px;
  background: #fff;
  color: #635d50;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
.confirm-modal__actions .confirm-modal__danger {
  border-color: #dc5a4b;
  background: #dc5a4b;
  color: #fff;
}
.confirm-modal__danger:disabled {
  cursor: wait;
  opacity: 0.65;
}
</style>
