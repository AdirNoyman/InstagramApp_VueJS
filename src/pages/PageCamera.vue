<template>
  <q-page class="constrain-camera q-pa-md">
    <div class="camera-frame q-pa-md">
      <img class="full-width" src='https://cdn.quasar.dev/img/mountains.jpg'>
    </div>
    <div class="text-center q-pa-md">
      <q-btn round color="grey-10" icon="fas fa-camera" size="1.2em" />
      <div class="row justify-center q-ma-md">
        <q-input v-model="post.caption" label="Caption" class="col-10 col-sm-8"/>        
      </div>
      <div class="row justify-center q-ma-md">
         <q-input v-model="post.location" label="Location" class="col-10 col-sm-8">
           <template v-slot:append>
          <q-btn round dense flat icon="fas fa-map-marker-alt" />
          
        </template>
           </q-input>       
      </div>
       <div class="row justify-center q-mt-lg">
             <q-btn unelevated rounded color="primary" label="POST IMAGE" />
      </div>
     
    </div>
  </q-page>
</template>

<script>
import { uid } from 'quasar'
export default {
  name: 'PageCamera',
  data() {

    return {

      post: {

        id: uid(),
        caption: "",
        location: "",
        photo: null,
        date: Date.now()
      }

    }

  }
}
</script>

<style lang="sass">
.camera-frame img
  border: 1px solid $grey-7
  border-radius: 7px

</style>
