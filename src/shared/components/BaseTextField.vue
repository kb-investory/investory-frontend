<script setup>
import { computed, useId } from 'vue'

const model = defineModel({ type: String, default: '' })

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '내용을 입력하세요',
  },
  type: {
    type: String,
    default: 'text',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: '',
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  inputmode: {
    type: String,
    default: 'text',
  },
  error: {
    type: String,
    default: '',
  },
})

defineEmits(['blur'])

const generatedId = useId()
const inputId = computed(() => props.id || generatedId)
const errorId = computed(() => `${inputId.value}-error`)
</script>

<template>
  <div class="text-field">
    <label class="text-field__label" :for="inputId">{{ label }}</label>
    <div class="text-field__control" :class="{ 'text-field__control--invalid': error }">
      <input
        :id="inputId"
        v-model="model"
        class="text-field__input"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :autocomplete="autocomplete"
        :inputmode="inputmode"
        :aria-invalid="Boolean(error)"
        :aria-describedby="error ? errorId : undefined"
        @blur="$emit('blur', $event)"
      />
      <span v-if="$slots.suffix" class="text-field__suffix">
        <slot name="suffix" />
      </span>
    </div>
    <span v-if="error" :id="errorId" class="text-field__error" role="alert">
      {{ error }}
    </span>
  </div>
</template>

<style scoped>
.text-field {
  display: grid;
  width: 100%;
  gap: 7px;
}

.text-field__label {
  color: var(--color-heading);
  font-size: 13px;
  font-weight: 600;
}

.text-field__control {
  display: flex;
  width: 100%;
  height: 52px;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-surface);
  transition:
    border-color 150ms ease,
    box-shadow 150ms ease;
}

.text-field__control:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-soft);
}

.text-field__control--invalid {
  border-color: var(--color-danger);
}

.text-field__control--invalid:focus-within {
  border-color: var(--color-danger);
  box-shadow: 0 0 0 3px var(--color-danger-soft);
}

.text-field__input {
  width: 100%;
  min-width: 0;
  height: 100%;
  padding: 0 14px;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--color-text);
  font-size: 14px;
}

.text-field__input::placeholder {
  color: var(--color-text-subtle);
}

.text-field__suffix {
  display: flex;
  padding-right: 8px;
}

.text-field__error {
  color: var(--color-danger);
  font-size: 11px;
  line-height: 16px;
}
</style>
