<template>
  <div class="document-list-container">
    <div
      v-for="(item, index) in documents"
      :key="index"
      class="document-item"
      :class="{ 'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0 }"
    >
      <div class="content-wrapper">
        <div class="key-column">
          <div class="key-value-pair">
            <span class="key-name">Document Type</span>
            <span class="value">{{ item['Document Type'] }}</span>
          </div>
          <div class="key-value-pair">
            <span class="key-name">Document Number</span>
            <span class="value">{{ item['Document Number'] }}</span>
          </div>
          <div class="key-value-pair">
            <span class="key-name">Additional information</span>
            <span class="value">{{ item['Additional information'] }}</span>
          </div>
          <div class="key-value-pair">
            <span class="key-name">File</span>
            <span class="value">{{ item['File'] }}</span>
          </div>
        </div>

        <div class="empty-column"></div>

        <div class="key-column">
          <div class="key-value-pair">
            <span class="key-name">Status</span>
            <span
              class="value"
              :class="getStatusClass(item['Status'])"
            >
              {{ item['Status'] }}
            </span>
          </div>
          <div class="key-value-pair">
            <span class="key-name">Comment from Reviewer</span>
            <span class="value">{{ item['Comment from Reviewer'] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  documents: {
    type: Array,
    required: true,
  },
});

const getStatusClass = (status) => {
  switch (status) {
    case 'Verified':
      return 'status-verified';
    case 'Verification failed':
    case 'Under Review':
      return 'status-pending';
    default:
      return '';
  }
};
</script>

<style scoped>
/* 容器 */
.document-list-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: sans-serif;
}

/* 单个列表项 */
.document-item {
  padding: 16px;
  border-radius: 8px;
}

.odd-row {
  background-color: #fffbf8;
}

.even-row {
  background-color: #f8fff9;
}

/* 移动端和桌面端都使用 grid 布局 */
.content-wrapper {
  display: grid;
  gap: 16px;
}

/* 键名和键值的通用 Flexbox 样式 */
.key-value-pair {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 键名左，键值右 */
  gap: 16px; /* 间距 */
}

.key-name {
  color: #8d8d8d;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  white-space: nowrap; /* 防止键名换行 */
}

.value {
  color: #000000;
  font-size: 14px;
  font-weight: 600;
  text-align: right; /* 键值右对齐 */
  flex-shrink: 0; /* 防止值被压缩 */
}

/* 状态颜色 */
.status-verified {
  color: #0ecb81;
}

.status-pending {
  color: #ff7545;
}

/* ------------------- 移动端样式 (默认) ------------------- */
/* 移动端为单列布局 */
.content-wrapper {
  grid-template-columns: 1fr;
}

/* 桌面端隐藏中间列 */
.empty-column {
  display: none;
}

/* ------------------- 桌面端样式 (@media 查询) ------------------- */
@media (min-width: 768px) {
  .content-wrapper {
    grid-template-columns: 2fr 1fr 2fr; /* 三列布局：第一列、空白、第三列 */
  }
  
  /* 确保在桌面端值依然右对齐 */
  .value {
    text-align: right;
  }
  
  .empty-column {
    display: block; /* 显示中间空白列 */
  }
}
</style>