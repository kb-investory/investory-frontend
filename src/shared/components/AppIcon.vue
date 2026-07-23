<script setup>
import {
  ArrowRight,
  ArrowUpRight,
  ChartPie,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Ellipsis,
  History,
  House,
  LoaderCircle,
  Lock,
  MessageCircle,
  Notebook,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
} from '@lucide/vue'

const iconComponents = {
  'arrow-right': ArrowRight,
  'arrow-up-right': ArrowUpRight,
  'chart-pie': ChartPie,
  check: Check,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'circle-check': CircleCheck,
  ellipsis: Ellipsis,
  history: History,
  home: House,
  'loader-circle': LoaderCircle,
  lock: Lock,
  'message-circle': MessageCircle,
  notebook: Notebook,
  plus: Plus,
  search: Search,
  settings: Settings,
  'shield-check': ShieldCheck,
  sparkles: Sparkles,
  'triangle-alert': TriangleAlert,
}

defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 20,
  },
})
</script>

<template>
  <component
    :is="iconComponents[name]"
    class="app-icon"
    :size="size"
    :stroke-width="1.8"
    aria-hidden="true"
  />
</template>

<style scoped>
.app-icon {
  display: block;
  flex: 0 0 auto;
}
</style>
