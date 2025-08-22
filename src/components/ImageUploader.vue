<template>
  <div class="image-uploader-container">
    <label v-if="label" :for="inputId" class="uploader-label">{{ label }}</label>

    <div
      class="uploader-wrapper"
      :class="{ 'dragging': isDragging }"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
      @click="openFilePicker"
    >
      <div v-if="!previewUrl && !defaultImage" class="default-upload-area">
        <div class="plus-icon-wrapper">
          <!-- <svg class="plus-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg> -->
          <img src="../assets/icons/dashboard/uploadDefault.svg" />
        </div>
      </div>
      
      <div v-if="previewUrl || defaultImage" class="image-preview-wrapper">
        <img
          :src="previewUrl || defaultImage"
          alt="Preview"
          class="preview-image"
        />
        <button v-if="previewUrl" @click.stop="removeImage" class="remove-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
      </div>

      <input
        :id="inputId"
        type="file"
        class="hidden"
        accept="image/*"
        @change="handleFileChange"
        ref="fileInput"
      />
    </div>

    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: '图片上传',
  },
  inputId: {
    type: String,
    required: true,
  },
  defaultImage: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['file-selected', 'file-removed']);

const fileInput = ref(null);
const previewUrl = ref('');
const isDragging = ref(false);
const error = ref('');

const openFilePicker = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  processFile(file);
};

const handleDragOver = () => {
  isDragging.value = true;
};

const handleDragLeave = () => {
  isDragging.value = false;
};

const handleDrop = (event) => {
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  processFile(file);
};

const processFile = (file) => {
  if (!file) {
    return;
  }

  if (!file.type.startsWith('image/')) {
    error.value = '请选择一个图片文件。';
    return;
  }

  if (file.size > 2 * 1024 * 1024) { // 2MB
    error.value = '图片大小不能超过 2MB。';
    return;
  }

  error.value = '';
  previewUrl.value = URL.createObjectURL(file);
  emit('file-selected', file);
};

const removeImage = () => {
  previewUrl.value = '';
  if (fileInput.value) {
    fileInput.value.value = '';
  }
  emit('file-removed');
};
</script>

<style scoped>
.image-uploader-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: sans-serif;
}

.uploader-label {
  font-size: 14px;
  color: #555;
}

.uploader-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  min-height: 120px;
}

.uploader-wrapper.dragging {
  border-color: #3b82f6;
  background-color: #f3f4f6;
}

.plus-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
}

.plus-icon {
  width: 48px;
  height: 48px;
  color: #d1d5db;
}

.image-preview-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.remove-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  padding: 4px;
  color: #ef4444;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hidden {
  display: none;
}

.error-message {
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
}
</style>