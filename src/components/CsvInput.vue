<template>
<div>
  <input id="fileInput" type="file" accept=".csv, .txt, .xls, .xlsx" @change="handleFile">
  <br>
  <div v-if="fileData && fileData.length" style="margin-top: 50px;">
    <button type="button" @click="writeToDatabase">
      Click to write data to database sever
    </button>
    <table>
      <tr>
        <th v-for="header in headers" :key="header"> {{ header }}</th>
      </tr>
      <tr v-for="(row,i) in fileData" :key="i">
        <td v-for="cell in row" :key="cell"> {{ cell }}</td>
      </tr>
    </table>
  </div>
</div>
</template>

<script>
import Papa from 'papaparse'
import {postData} from '../api/dataPost.js'

export default {
  name: 'HelloWorld',
  data () {
    return {
      fileData: [],
      headers: []
    }
  },
  methods: {
    handleFile (e) {
      const that = this
      const fileToLoad = event.target.files[0]
      const reader = new FileReader()
      reader.onload = fileLoadedEvent => {
        Papa.parse(fileLoadedEvent.target.result, {
          header: true,
          trimHeaders: true,
          complete (results) {
            that.fileData = JSON.parse(JSON.stringify(results.data, null, 2))
            that.headers = results.meta.fields
          },
          error (errors) {
            alert(errors)
            console.log('error', errors)
          }
        })
      }
      reader.readAsText(fileToLoad)
    },
    async writeToDatabase () {
      console.log(this.fileData)
      let p = await postData(this.fileData, localStorage.getItem('ACCESS_TOKEN'))
      console.log(p.data)
    }
  }
}
</script>

<style scoped>
table {
  margin: auto;
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 50%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
