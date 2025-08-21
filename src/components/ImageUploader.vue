<template>
  <div class="image-uploader-container">
    <label v-if="label" :for="inputId" class="uploader-label">{{ label }}</label>

    <div class="uploader-wrapper" 
         :class="{ 'dragging': isDragging }"
         @dragover.prevent="handleDragOver" 
         @dragleave.prevent="handleDragLeave" 
         @drop.prevent="handleDrop">
      
      <slot>
        <div class="default-upload-area">
          <img src="https://img.icons8.com/ios-filled/50/4B5563/upload.png" alt="upload icon" class="upload-icon"/>
          <p class="text-gray-500">
            <span class="text-blue-500 font-medium cursor-pointer" @click="openFilePicker">点击上传</span> 或拖放文件
          </p>
        </div>
      </slot>
      
      <input 
        :id="inputId" 
        type="file" 
        class="hidden" 
        accept="image/*" 
        @change="handleFileChange" 
        ref="fileInput"
      />
    </div>

    <div v-if="previewUrl" class="image-preview">
      <img :src="previewUrl" alt="Image preview" class="preview-image"/>
      <button @click="removeImage" class="remove-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
          <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
        </svg>
      </button>
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

  // 验证文件类型
  if (!file.type.startsWith('image/')) {
    error.value = '请选择一个图片文件。';
    return;
  }

  // 验证文件大小 (可选)
  if (file.size > 2 * 1024 * 1024) { // 2MB
    error.value = '图片大小不能超过 2MB。';
    return;
  }

  error.value = '';
  // 创建预览 URL
  previewUrl.value = URL.createObjectURL(file);
  // 向父组件发送事件，传递文件对象
  emit('file-selected', file);
};

const removeImage = () => {
  previewUrl.value = '';
  // 清空文件输入框，以便再次选择相同的文件
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
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  padding: 20px;
  transition: border-color 0.3s;
  min-height: 120px;
}

.uploader-wrapper.dragging {
  border-color: #3b82f6;
  background-color: #f3f4f6;
}

.default-upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
}

.upload-icon {
  width: 48px;
  height: 48px;
  opacity: 0.6;
}

.image-preview {
  position: relative;
  width: 100%;
  height: auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.preview-image {
  width: 100%;
  height: auto;
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
  margin-top: -4px;
}
</style>