<template>
  <b-container>
    <b-table striped hover :items="products">
    </b-table>
  </b-container>
</template>

<script>
import * as _ from 'lodash'
import axios  from 'axios'

export default {
  async asyncData({ params }) {
    try {
      let { data } = await axios.get('/api/v1/products')
      return {
        products: data.map(item => {
          return _.pick(item, ['ProductName', 'QuantityPerUnit', 'UnitPrice', 'UnitsInStock'])
        })
      }
    } catch (err) {
      console.warn('Error while retrieving products', err)
      return { products: [] }
    }
  }
}
</script>