<template>
  <div>sign-up {{ signUp.name }}</div>
</template>

<script setup lang="ts">
import { useSignUpStore } from '@/stores/signUp';

const signUp = useSignUpStore();
</script>
