<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10" bordered>
      <q-toolbar class="constrain"> 
         <q-btn flat round icon="fas fa-camera" size="18px" dense to="/camera" class="large-screen-only q-mr-sm"/>
         <q-separator vertical spaced class="large-screen-only"/>
        <q-toolbar-title class="text-grand-hotel text-bold">
          AdirosApp
        </q-toolbar-title>
        <q-btn flat round icon="fas fa-home" size="18px" dense to="/" class="large-screen-only"/>
       
      </q-toolbar>
    </q-header>
    <q-footer class="bg-white small-screen-only" bordered>       
           <q-tabs class="text-grey-10" active-color="primary"
           indicator-color="transparent">
        <q-route-tab
         to="/"         
         icon="fas fa-home"         
         />
        <q-route-tab
         to="/camera"         
         icon="fas fa-camera"        
          />
       
      </q-tabs>
     
      </q-footer>
  

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>



export default {
  name: 'MainLayout',
  
  data () {
    return {
     
    }
  }
}
</script>

<style lang="sass">
.q-toolbar__title
  font-size: 2em
  @media (max-width: $breakpoint-xs-max)
    text-align: center
  
.q-footer
  .q-tab__icon
    font-size: 30px
    </style>
