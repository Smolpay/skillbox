<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ amount }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <label class="form__label">
              <BaseFormText v-model="formData.name" title="ФИО" :error="formError.name"
                            placeholder="Введите ваше полное имя"/>
            </label>

            <label class="form__label">
              <BaseFormText v-model="formData.address" title="Адрес доставки"
                            :error="formError.address"
                            placeholder="Введите ваш адрес"/>
            </label>

            <label class="form__label">
              <BaseFormText v-model="formData.phone" title="Телефон" :error="formError.phone"
                            placeholder="Введите ваш телефон"/>
            </label>

            <label class="form__label">
              <BaseFormText v-model="formData.email" title="Email" :error="formError.email"
                            placeholder="Введите ваш Email"/>
            </label>

            <label class="form__label">
              <BaseFormTextarea v-model="formData.comment" title="Комментарий"
                                :error="formError.comment" placeholder="Ваши пожелания"/>
            </label>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0"
                         checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders" v-for="product in products" :key="product.productId">
            <li class="cart__order">
              <h3>{{ product.product.title }}</h3>
              <b>{{ product.product.price }} ₽</b>
              <span>Артикул: {{ product.productId }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ amount }}</b> товара на сумму <b>{{ TotalPrice }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit"
                  v-if="products.length > 0">
            Оформить заказ
            <PreLoading v-if="$store.state.cartLoading"/>
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseFormText from '@/components/BaseFormText';
import BaseFormTextarea from '@/components/BaseFormTextarea';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import PreLoading from '@/data/pictures/PreLoading';

export default {
  name: 'OrderPage',
  components: {
    PreLoading,
    BaseFormTextarea,
    BaseFormText,
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      TotalPrice: 'cartTotalPrice',
      amount: 'cartAmount',
    }),
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',

    };
  },
  methods: {
    order() {
      this.$store.state.cartLoading = true;
      this.formError = {};
      this.formErrorMessage = '';
      axios.post(API_BASE_URL + '/api/orders', {
        ...this.formData
      }, {
        params: {
          userAccessKey: this.$store.state.userAccessKey,
        }
      })
        .then(response => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$store.state.cartLoading = false;
          this.$router.push({
            name: 'orderInfo',
            params: { id: response.data.id }
          });
        })
        .catch(error => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
          this.$store.state.cartLoading = false;
        });
    },
  }
};
</script>

<style scoped>

</style>
