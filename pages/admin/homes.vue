<template>
  <div class="app-admin app-double-column">
    <div>
      <h2 class="app-subtitle">Add a home</h2>
      <form class="form" @submit.prevent="onSubmit">
        <div class="field">
          <label class="label">Images:</label>
          <ImageUploader @file-uploaded="imageUpdated($event, 0)" />
          <ImageUploader @file-uploaded="imageUpdated($event, 1)" />
          <ImageUploader @file-uploaded="imageUpdated($event, 2)" />
          <ImageUploader @file-uploaded="imageUpdated($event, 3)" />
          <ImageUploader @file-uploaded="imageUpdated($event, 4)" />
        </div>
        <div class="field">
          <label class="label">Title:</label>
          <input v-model="home.title" type="text" class="w-full" />
        </div>
        <div class="field">
          <label class="label">Description:</label>
          <textarea v-model="home.description" class="w-full"></textarea>
        </div>
        <div class="field">
          <label class="label">Note:</label>
          <textarea v-model="home.note" class="w-full"></textarea>
        </div>
        <div class="field">
          <label class="label">Features:</label>
          <input v-model="home.features[0]" type="text" class="w-1/4" />
          <input v-model="home.features[1]" type="text" class="w-1/4" />
          <input v-model="home.features[2]" type="text" class="w-1/4" />
          <input v-model="home.features[3]" type="text" class="w-1/4" />
          <input v-model="home.features[4]" type="text" class="w-1/4" />
        </div>
        <div class="field">
          <label class="label">Price Per Night</label>
          <input v-model="home.pricePerNight" type="number" class="w-14" />
        </div>
        <div class="field">
          <label class="label">Guests / Rooms / Beds / Baths</label>
          <input v-model="home.guests" type="number" class="w-14" />
          <input v-model="home.bedrooms" type="number" class="w-14" />
          <input v-model="home.beds" type="number" class="w-14" />
          <input v-model="home.bathrooms" type="number" class="w-14" /><br />
        </div>
        <div class="field">
          <label class="label">Location:</label>
          <input
            ref="locationSelector"
            type="text"
            autocomplete="off"
            placeholder="Select a location"
            class="w-full"
            @changed="changed"
          />
        </div>
        <div class="field">
          <label class="label">Address:</label>
          <input v-model="home.location.address" type="text" class="w-full" />
        </div>
        <div class="field">
          <label class="label">City:</label>
          <input v-model="home.location.city" type="text" class="w-full" />
        </div>
        <div class="field">
          <label class="label">State:</label>
          <input v-model="home.location.state" type="text" class="w-full" />
        </div>
        <div class="field">
          <label class="label">Postal code:</label>
          <input
            v-model="home.location.postalCode"
            type="text"
            class="w-full"
          />
        </div>
        <div class="field">
          <label class="label">Country:</label>
          <input v-model="home.location.country" type="text" class="w-full" />
        </div>
        <div class="field">
          <label class="label">Date:</label>
          <date-picker
            v-for="(range, index) in home.availabilityRanges"
            :key="index"
            v-model="home.availabilityRanges[index]"
            is-range
            timezone="UTC"
            :model-config="{ timeAdjust: '00:00:00' }"
          >
            <template #default="{ inputValue, inputEvents }">
              <input
                :value="inputValue.start"
                class="w-1/3"
                v-on="inputEvents.start"
              />
              to
              <input
                :value="inputValue.end"
                class="w-1/3"
                v-on="inputEvents.end"
              />
            </template>
          </date-picker>
        </div>
        <button class="add-button">Add</button>
      </form>
    </div>
    <div v-if="homeList.length">
      <h2 class="app-subtitle">Homes list</h2>
      <ul class="mb-4">
        <li v-for="homeItem in homeList" :key="homeItem.objectID" class="mb-2">
          <button class="delete-button" @click="deleteHome(homeItem.objectID)">
            Delete
          </button>
          {{ homeItem.title }}:
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { unWrap } from '~/utils/fetchUtils'

export default {
  data() {
    return {
      homeList: [],
      home: {
        title: '',
        description: '',
        note: '',
        pricePerNight: '',
        guests: '',
        bedrooms: '',
        beds: '',
        bathrooms: '',
        features: ['', '', '', '', ''],
        location: {
          address: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
        },
        _geoloc: {
          lat: '',
          lng: '',
        },
        images: [],
        availabilityRanges: [
          {
            start: '',
            end: '',
          },
          {
            start: '',
            end: '',
          },
        ],
      },
    }
  },

  mounted() {
    this.$maps.makeAutoComplete(this.$refs.locationSelector, ['address'])
    this.setHomesList()
  },

  methods: {
    async deleteHome(homeId) {
      await fetch(`/api/homes/${homeId}`, {
        method: 'DELETE',
      })
      const index = this.homeList.findIndex((obj) => obj.objectID === homeId)
      this.homeList.splice(index, 1)
    },

    async setHomesList() {
      this.homeList = (await unWrap(await fetch('/api/homes/user/'))).json
    },

    async onSubmit() {
      const response = await unWrap(
        await fetch('/api/homes', {
          method: 'POST',
          body: JSON.stringify(this.home),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )

      this.homeList.push({
        title: this.home.title,
        objectID: response.json.homeId,
      })
    },

    imageUpdated(imageUrl, index) {
      this.home.images[index] = imageUrl
    },

    changed(event) {
      const addressParts = event.detail.address_components
      const street =
        this.getAddressPart(addressParts, 'street_number')?.short_name || ''
      const route = this.getAddressPart(addressParts, 'route')?.short_name || ''

      this.home.location.address = `${street} ${route}`
      this.home.location.city =
        this.getAddressPart(addressParts, 'locality')?.short_name || ''
      this.home.location.state =
        this.getAddressPart(addressParts, 'administrative_area_level_1')
          ?.long_name || ''
      this.home.location.country =
        this.getAddressPart(addressParts, 'country')?.short_name || ''
      this.home.location.postalCode =
        this.getAddressPart(addressParts, 'postal_code')?.short_name || ''

      const geo = event.detail.geometry.location
      this.home._geoloc.lat = geo.lat()
      this.home._geoloc.lng = geo.lng()
    },

    getAddressPart(parts, type) {
      return parts.find((part) => part.types.includes(type))
    },
  },
}
</script>
