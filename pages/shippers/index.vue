<template>
  <b-container>
    <b-table striped hover :items="shippers">
    </b-table>
  </b-container>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ params }) { // app, store
    try {
      let { data } = await axios.get('/api/v1/shippers')
      return {
        shippers: data.map(item => {
          return _.pick(item, ['CompanyName', 'Phone'])
        })
      }
    } catch (err) {
      console.warn('Error while retrieving shippers', err)
      return { shippers: [] }
    }
  }
}
</script>

<style>
</style>