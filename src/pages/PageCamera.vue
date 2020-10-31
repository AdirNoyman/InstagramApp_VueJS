<template>
  <q-page class="constrain-camera q-pa-md">
    <div class="camera-frame q-pa-md">
      <video ref="video" class="full-width" autoplay v-show="!imageCaptured"/>
      <canvas class="full-width" ref="canvas" height="240" v-show="imageCaptured"/>
    </div>
    <div class="text-center q-pa-md">
      <q-btn @click="captureImage" round color="grey-10" icon="fas fa-camera" size="1.2em" />
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
require('md-gum-polyfill')
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
      },
      imageCaptured: false

    }

  },
 methods: {

   initCamera() {

     navigator.mediaDevices.getUserMedia({

       video: true

     }).then(stream => {

       this.$refs.video.srcObject = stream

     })

   },
   captureImage() {

    let video = this.$refs.video
    let canvas = this.$refs.canvas
    canvas.width = video.getBoundingClientRect().width
    canvas.height = video.getBoundingClientRect().height
    let context = canvas.getContext('2d')
    context.drawImage(video,0,0,canvas.width,canvas.height)
    this.imageCaptured = true

   }
   },
   // Vue function Hook 
   mounted() {

     this.initCamera();

   } 
}
</script>

<style lang="sass">
.camera-frame
  border: 2px solid $grey-7
  border-radius: 7px
</style>
