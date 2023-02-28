<template>
  <div class="mb-2">
    <span class="sr-only">Choose profile photo</span>
    <input
      type="file"
      accept=".jpeg,.jpg,image/jpeg"
      class="block w-60 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      @change="uploadFile"
    />
  </div>
</template>
<script>
import { unWrap } from '~/utils/fetchUtils'

export default {
  methods: {
    async uploadFile(e) {
      const file = e.target.files[0]
      if (!file) return
      const filename = file.name.split('.').slice(0, -1).join('.') + Date.now()
      const options = {
        timestamp: Date.now(),
        public_id: filename,
      }
      const response = await unWrap(
        await fetch('/api/cloudinary/signature', {
          method: 'POST',
          body: JSON.stringify(options),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )
      const signature = response.json.signature
      const readData = (fileObj) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.readAsDataURL(fileObj)
        })

      const data = await readData(file)
      const asset = await this.$cloudinary.upload(data, {
        ...options,
        api_key: this.$config.cloudinary.apiKey,
        signature,
      })

      this.$emit('file-uploaded', asset.public_id)
    },
  },
}
</script>
