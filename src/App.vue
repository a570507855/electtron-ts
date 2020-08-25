<template>
  <div id="app">
    <nav class="tabs is-centered is-boxed">
      <ul>
        <li
          :class="{ 'is-active': currentIndex === index }"
          :key="index"
          @click="currentIndex = index"
          v-for="(tab, index) in tabs"
        >
          <a>
            <span>{{ tab }}</span>
          </a>
        </li>
      </ul>
    </nav>
    <Features v-show="currentIndex === 0"></Features>
    <WindowInfo v-show="currentIndex === 1"></WindowInfo>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import WindowInfo from './views/home/WindowInfo.vue';
import Features from './views/home/Features.vue';

@Component({
  components: {
    WindowInfo,
    Features,
  },
})
export default class App extends Vue {
  currentIndex: number = 0;
  tabs: object = ['功能', '信息'];
}
</script>
