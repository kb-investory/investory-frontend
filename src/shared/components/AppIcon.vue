<script setup>
import {
  ArrowRight,
  ArrowUpRight,
  ChartPie,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  History,
  House,
  Lock,
  Notebook,
  Plus,
  Search,
  Settings,
  Sparkles,
} from '@lucide/vue'

const iconComponents = {
  'arrow-right': ArrowRight,
  'arrow-up-right': ArrowUpRight,
  'chart-pie': ChartPie,
  check: Check,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  ellipsis: Ellipsis,
  history: History,
  home: House,
  lock: Lock,
  notebook: Notebook,
  plus: Plus,
  search: Search,
  settings: Settings,
  sparkles: Sparkles,
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
