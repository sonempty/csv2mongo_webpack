<template>
  <div>
    <h1>Excel input here</h1>
    <csv-input />
  </div>
</template>

<script>
import CsvInput from '@/components/CsvInput.vue'

export default {
  name: 'DashBoard',
  components: {
    CsvInput
  }
}
</script>
