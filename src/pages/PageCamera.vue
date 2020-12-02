<template>
  <q-page class="constrain-camera q-pa-md">
    <div class="camera-frame q-pa-md">
      <video
       ref="video"
       class="full-width"
       autoplay
       v-show="!imageCaptured"
       playsinline
       />
      <canvas class="full-width" ref="canvas" height="240" v-show="imageCaptured"/>
    </div>
    <div class="text-center q-pa-md">
      <q-btn
       v-if="hasCameraSupport"
       @click="captureImage"
       round color="grey-10"
       icon="fas fa-camera"
       size="1.2em"
        />
      <q-file
       v-else
       @input="captureImageFallBack"
       outlined
       v-model="imageUpLoad"
       label="Choose an image"
       accept="image/*"
       >
        <template v-slot:prepend>
          <q-icon name="fas fa-paperclip" />
        </template>
      </q-file>
      <div class="row justify-center q-ma-md">
        <q-input v-model="post.caption" label="Caption" class="col-10 col-sm-8"/>        
      </div>
      <div class="row justify-center q-ma-md">
         <q-input :loading="locationLoading" v-model="post.location" label="Location" class="col-10 col-sm-8">
           <template v-slot:append>
          <q-btn
           v-if="!locationLoading && locationSupported"
           @click="getLocation"
           round dense flat icon="fas fa-map-marker-alt"
            />
          
        </template>
           </q-input>       
      </div>
       <div class="row justify-center q-mt-lg">
             <q-btn
              @click="addPost"
              unelevated rounded color="primary"
              label="POST IMAGE"
               />
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
      imageCaptured: false,
      imageUpLoad: [],
      hasCameraSupport: true,
      locationLoading: false

    }

  },
  computed: {

    locationSupported() {

      if (navigator.geolocation) {

        return true

      }

      return false
    }

  },
 methods: {

   initCamera() {

     navigator.mediaDevices.getUserMedia({

       video: true

     }).then(stream => {

       this.$refs.video.srcObject = stream

     }).catch(error => {

       this.hasCameraSupport = false

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
    this.post.photo = this.dataURItoBlob(canvas.toDataURL());
    this.disableCamera();
   },
   captureImageFallBack(file) {
     this.post.photo = file;
     let canvas = this.$refs.canvas
     let context = canvas.getContext('2d')
     let reader = new FileReader();
    reader.onload = (event) => {
        let img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img,0,0);
            this.imageCaptured = true
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(file); 

   },
   disableCamera() {

     this.$refs.video.srcObject.getVideoTracks().forEach(track => {

       track.stop();

     });

   },
   dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  let byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  let ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  let ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  let blob = new Blob([ab], {type: mimeString});
  return blob;

},
getLocation() {

  this.locationLoading = true
  navigator.geolocation.getCurrentPosition(position => {

    this.getCityAndCountry(position);

  }, error => {this.locationError();},
  {timeout: 7000}
  );

},
getCityAndCountry(position) {

  let apiUrl = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`;

  this.$axios.get(apiUrl).then(result => {

    this.locationSuccess(result);
    console.log(result);

  }).catch(error => {this.locationError();});

},
locationSuccess(result) {
  
  this.post.location = result.data.city;
  if (result.data.country) {

    this.post.location += `, ${result.data.country}`
  }
  this.locationLoading = false
},
locationError() {
  // console.log('error: ', error);

  this.$q.dialog({
        title: 'Error',
        message: 'Could not find your location 😕'
      });

this.locationLoading = false

},
addPost() {

let formData = new FormData();
formData.append('id', this.post.id);
formData.append('caption', this.post.caption);
formData.append('location', this.post.location);
formData.append('date', this.post.date);
formData.append('file', this.post.photo, this.post.id + '.png');

this.$axios.post(`${process.env.API}/createpost`, formData).then
(response => {
  console.log('response :' ,response);

  }).catch(error => {console.log('error 💥🤔💥:' ,error);})

}
   },
   // Vue lifesycle Hooks /////////////////////////////////////////////// 
   mounted() {

     this.initCamera();
     
   },
   beforeDestroy() {

     if (this.hasCameraSupport) {

       this.disableCamera();

     }
     

   }
}
</script>

<style lang="sass">
.camera-frame
  border: 2px solid $grey-7
  border-radius: 7px
</style>
