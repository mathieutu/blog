import { existsSync, readFileSync, writeFileSync } from 'fs';
import { STORAGE_PATH } from '@dynamic/constants';

export default ({ Vue }) => {
  Vue.mixin({
    methods: {
      $setInStore(key, value) {
        if (this.$isServer) {
          writeFileSync(STORAGE_PATH, JSON.stringify({ ...this.$store, [key]: value }, null, 2));
        }
      },
      $getInStore(key, defaultValue = null) {
        return this.$store[key] || defaultValue;
      }
    },
    computed: {
      $store() {
        if (!this.$isServer) {
          return window.STORE || {};
        }

        if (existsSync(STORAGE_PATH)) {
          return JSON.parse(readFileSync(STORAGE_PATH));
        }

        return {};
      }
    }
  });
}
