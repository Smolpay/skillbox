<template>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
       Общее кол-во товаров: {{ amount }}
      </span>
    </div>
    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key="item.productId" :item="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ TotalPrice | numberFormat }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem';
import numberFormat from '@/helpers/numberFormat';
import PreLoading from '@/data/pictures/PreLoading';

export default {
  name: 'CartPage',
  data() {
    return {
      cartLoading: false,
    };
  },
  filters: { numberFormat },
  components: {
    CartItem,
    PreLoading,
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      TotalPrice: 'cartTotalPrice',
      amount: 'cartAmount',
    }),
  },
  methods: {
    cartLoad() {
        this.cartLoading = true;
        setTimeout(() => {
          this.cartLoading = false;
        }, 500);
    }
  }
};

</script>

<style scoped>

</style>
