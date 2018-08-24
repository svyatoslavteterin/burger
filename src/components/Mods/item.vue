<template>
  <li>
    <div class="mod-item">
      <span :class="{'mod-name': true, 'bold': mod.count > 0}" v-text="mod.ModName"></span>
      <span class="mod-price"><span v-text="+mod.Price"></span>₽</span>
    </div>
    <div class="mod-actions">
      <button class="counter" @click.prevent="minusMod()">–</button>
      <span class="label-counter">
        <span v-text="mod.count" />
      </span>
      <button class="counter" @click.prevent="plusMod()">+</button>
    </div>
  </li>
</template>

<script>
export default {
  name: 'dishModItem',
  props: ['mod', 'dish'],
  computed: {

  },
  methods: {
    plusMod() {
      this.mod.count += 1;
    },
    minusMod() {
      if (!this.mod.count) return; 
      this.mod.count -= 1;
    },
  },
};
</script>
