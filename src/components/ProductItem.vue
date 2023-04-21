<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#" @click.prevent="$emit('goToPage', 'product', {id: product.id})">
      <img :src="product.image" :alt="product.title">
    </a>
    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
              {{ product.price }}
            </span>
    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.color" :key="product.color.id">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio"
                 :value="color.id" v-model.number="Color">
          <span class="colors__value" :style="`background-color: ${color.background_color}`">
                  </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>


export default {
  name: 'ProductItem',
  data() {
    return {
      Color: 0,
    };
  },
  props: ['product'],
  watch: {
    colorsItem(item) {
      this.Color = item;
    },
  },
};
</script>

<style scoped>

</style>
