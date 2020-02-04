<template>
  <b-container>
    <b-table striped hover :items="regions">
    </b-table>
  </b-container>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ params }) {
    try {
      let { data } = await axios.get('/api/v1/regions')
      return {
        regions: data.map(item => {
          return _.pick(item, ['RegionDescription'])
        })
      }
    } catch (err) {
      console.warn('Error while retrieving regions', err)
      return { regions: [] }
    }
  }
}
</script>