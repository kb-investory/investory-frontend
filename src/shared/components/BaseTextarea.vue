<script setup>
import { computed } from 'vue'

const model = defineModel({ type: String, default: '' })
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '판단과 근거를 자유롭게 작성해 주세요.',
  },
  maxLength: {
    type: Number,
    default: 200,
  },
  rows: {
    type: Number,
    default: 4,
  },
  required: {
    type: Boolean,
    default: false,
  },
})

const characterCount = computed(() => model.value.length)
</script>

<template>
  <label class="textarea-field">
    <span v-if="label" class="textarea-field__label">{{ label }}</span>
    <span class="textarea-field__box">
      <textarea
        v-model="model"
        :placeholder="placeholder"
        :maxlength="props.maxLength"
        :rows="rows"
        :required="required"
      />
      <span class="textarea-field__helper">
        <span>최대 {{ props.maxLength }}자</span>
        <span class="textarea-field__count">{{ characterCount }} / {{ props.maxLength }}</span>
      </span>
    </span>
  </label>
</template>

<style scoped>
.textarea-field {
  display: grid;
  width: 100%;
  gap: 7px;
}

.textarea-field__label {
  font-size: 13px;
  font-weight: 600;
}

.textarea-field__box {
  display: grid;
  gap: 8px;
  padding: 12px 14px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-surface);
}

textarea {
  width: 100%;
  resize: vertical;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--color-text);
  font-size: 13px;
  line-height: 19px;
}

textarea::placeholder {
  color: var(--color-text-subtle);
}

.textarea-field__helper {
  display: flex;
  justify-content: space-between;
  color: var(--color-text-subtle);
  font-size: 9px;
}

.textarea-field__count {
  font-family: var(--font-mono);
}
</style>
