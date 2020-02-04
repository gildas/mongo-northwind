<template>
  <div>
    <header>
      <b-navbar toggleable="lg" type="default" style="font-size: 22px;">
        <b-navbar-brand href="/">
          <logo />
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"/>
        <b-collapse is-nav id="nav-collapse">
          <b-navbar-nav>
            <b-nav-item to="/products">Products</b-nav-item>
            <b-nav-item to="/regions">Regions</b-nav-item>
            <b-nav-item to="/shippers">Shippers</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <hr class="nav nav-divider" style="margin-top: 0; margin-bottom: 5;" />
    </header>

    <nuxt />

    <footer>
      <b-navbar toggleable type="inverse" fixed="bottom" role="navigation">
        <b-navbar-nav>
          <b-nav-text>{{ $store.state.appname }} {{ $store.state.version }}</b-nav-text>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-text>Northwind Database</b-nav-text>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <a href="https://kubernetes.io/" target="_blank">&pi;</a>
        </b-navbar-nav>
      </b-navbar>
    </footer>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>


<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.container {
  margin: 0 auto;
  min-height: 70vh;
  display: flex;
}

.page-enter-active,
.page-leave-active {
  opacity: 1;
  transition: opacity .25s;
  animation-duration: .3s;
  animation-fill-mode: both;
}

.page-enter-active {
  animation-name: pageFadeInUp;
}

.page-leave-active {
  animation-name: pageFadeOutDown;
}

@-webkit-keyframes pageFadeInUp {
  0% {
    opacity: 0;
    transform: translate3d(0, 1.25%, 0);
  }

  100% {
    opacity: 1;
    transform: none;
  }
}

@keyframes pageFadeInUp {
  0% {
    opacity: 0;
    transform: translate3d(0, 1.25%, 0);
  }

  100% {
    opacity: 1;
    transform: none;
  }
}

@-webkit-keyframes pageFadeOutDown {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translate3d(0, 1.25%, 0);
  }
}

@keyframes pageFadeOutDown {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translate3d(0, 1.25%, 0);
  }
}
</style>
