<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>
<style lang="sass">
@import '../node_modules/typeface-roboto/index.css'
@font-face 
  font-family: 'kanit'
  font-style: normal
  font-weight: normal
  src: local('Kanit-Regular'), url('/assets/Kanit/Kanit-Regular.ttf') format('ttf')
*
  font-family: "Roboto" , "kanit", sans-serif, monospace 
  font-weight: 600 !important
.nocopy
  -webkit-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none
html
  -ms-overflow-style: none
  scrollbar-width: none
html::-webkit-scrollbar
  display: none
.v-dialog
  box-shadow: none !important
</style>