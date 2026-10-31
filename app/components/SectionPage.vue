<script setup lang="ts">
import { knowledgePages, type KnowledgePageKey } from '~/content'

const props = defineProps<{ section: KnowledgePageKey }>()
const content = computed(() => knowledgePages[props.section])
</script>

<template>
  <KnowledgePage :content="content" />
</template>
