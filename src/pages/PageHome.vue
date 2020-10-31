<template>
  <q-page class="constrain q-pa-md">
    <div class="row  q-col-gutter-lg">
      <div class="col-12 col-sm-8">
            <q-card
      v-for="post in posts"
      :key="post.id"
     class="card-post q-mb-md" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold">Adiros__Gadolos</q-item-label>
          <q-item-label caption>
            {{post.location}}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />
      <img class="q-img" :src="post.imageUrl">
         <q-card-section>
        <div>{{post.caption}}</div>
        <div class="text-caption text-grey">{{post.date | formatDate }}</div>
      </q-card-section>       
    </q-card>
      </div>
      <div class="col-4 large-screen-only">
       <q-item class="fixed">
        <q-item-section avatar>
          <q-avatar size="48px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold">Adiros__Gadolos</q-item-label>
          <q-item-label caption>
            Tel-Aviv, Israel
          </q-item-label>
        </q-item-section>
      </q-item>
      </div>
    </div>

  </q-page>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'PageHome',
  data() {

    return {

      posts: [

          {            
            id: 1,
            caption: 'The Great Swiss Valley',
            date: 1604000003500,
            location: 'New York, United States',
            imageUrl: 'https://cdn.quasar.dev/img/mountains.jpg'

          },
           {            
            id: 2,
            caption: 'The Great Swiss Valley',
            date: 1604000003500,
            location: 'New York, United States',
            imageUrl: 'https://cdn.quasar.dev/img/mountains.jpg'

          },
           {            
            id: 3,
            caption: 'The Great Swiss Valley',
            date: 1604000003500,
            location: 'New York, United States',
            imageUrl: 'https://cdn.quasar.dev/img/mountains.jpg'

          },
           {            
            id: 4,
            caption: 'The Great Swiss Valley',
            date: 1604000003500,
            location: 'New York, United States',
            imageUrl: 'https://cdn.quasar.dev/img/mountains.jpg'

          }

      ]

    }

  },
  filters: {

    formatDate(value) {

      return date.formatDate(value, 'MMMM D h:mmA')
    }

  }
}
</script>

<style lang="sass">

  .card-post
     .q-img 
       min-height: 200px

</style>
