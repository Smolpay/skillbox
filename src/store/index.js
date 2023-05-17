import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],

    userAccessKey: null,

    cartProductsData: [],

    orderInfo: null,

    cartLoading: false,

    orderInfoProducts: [],
  },
  getters: {
    cartDetailProducts(state) {
      state.cartLoading = true;
      setTimeout(() => {
        state.cartLoading = false;
      }, 500);
      return state.cartProducts.map(item => {
        const product = state.cartProductsData.find(p => p.product.id === item.productId).product;
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url
          }
        };
      });
    },
    cartFormInfoProducts(state) {
      return state.orderInfoProducts = state.orderInfo.basket.items.map(infoProducts => infoProducts.product);
    },

    cartFormInfoProductsAmount(state) {
      return state.orderInfoProducts = (state.orderInfo.basket.items.map(infoProducts => infoProducts)).reduce((total, item) => (item.quantity) + total, 0);
    },

    cartFormInfoTotalPrice(state) {
      return (state.orderInfo.basket.items.map(infoProducts => infoProducts)).reduce((infoTotal, item) => (item.product.price * item.quantity) + infoTotal, 0);
    },

    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    cartAmount(state) {
      return state.cartProducts.reduce((total, item) => (item.amount) + total, 0);
    },
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, {
      productId,
      amount
    }) {
      const item = state.cartProducts.find(item => item.productId === productId);

      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter(element => element.productId !== productId);
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    updateProductsInfo(state, items) {
      state.cartFormInfoProducts = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity,
        };
      });
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return axios.get(API_BASE_URL + '/api/orders/' + orderId, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then(response => {
          context.commit('updateOrderInfo', response.data);
        });
    },
    loadCart(context) {
      this.state.cartLoading = true;
      axios.get(API_BASE_URL + '/api/baskets', {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then(response => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }

          this.state.cartLoading = false;

          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');

        });

    },
    addProductToCart(context, {
      productId,
      amount
    }) {
      return (new Promise(resolve => setTimeout(resolve, 2000)))
        .then(() => {
          return axios
            .post(API_BASE_URL + '/api/baskets/products', {
              productId: productId,
              quantity: amount
            }, {
              params: {
                userAccessKey: context.state.userAccessKey
              }
            })
            .then(response => {
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts');

            });
        });

    },
    updateCartProductAmount(context, {
      productId,
      amount
    }) {
      context.commit('updateCartProductAmount', {
        productId,
        amount
      });
      if (amount < 1) {
        return;
      }

      return axios
        .put(API_BASE_URL + '/api/baskets/products', {
          productId: productId,
          quantity: amount
        }, {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then(response => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    deleteCartProduct(context,
      productId
    ) {
      context.commit('deleteCartProduct', productId);

      return axios
        .delete(API_BASE_URL + '/api/baskets/products', {
          params: {
            userAccessKey: context.state.userAccessKey
          },
          data: {
            productId
          }
        })
        .then(response => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
  },
  modules: {},
});
