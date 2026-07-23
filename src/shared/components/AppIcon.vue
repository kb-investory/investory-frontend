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
  Lightbulb,
  LoaderCircle,
  Lock,
  LockKeyhole,
  MessageCircle,
  Notebook,
  NotebookTabs,
  Pencil,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  X,
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
  lightbulb: Lightbulb,
  'loader-circle': LoaderCircle,
  lock: Lock,
  'lock-keyhole': LockKeyhole,
  'message-circle': MessageCircle,
  notebook: Notebook,
  'notebook-tabs': NotebookTabs,
  pencil: Pencil,
  plus: Plus,
  search: Search,
  settings: Settings,
  'shield-check': ShieldCheck,
  sparkles: Sparkles,
  'triangle-alert': TriangleAlert,
  x: X,
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
