import { defineStore } from 'pinia';
import api from '../axios';

export const useProductsStore = defineStore('products', {
  state: () => ({
    data: [],
    pending: false,
    loaded: false,
    currentProduct: {},
    error: null,
  }),

  actions: {

    loadProducts() {
      this.pending = true;
      this.error = null;

      return api.get('/products')
        .then((response) => {
          this.data = response.data.products;
          this.loaded = true;
        })
        .catch((error) => {
          console.error('Error loading products:', error);
          this.error =
            'Products-ka lama soo rari karin. Fadlan mar kale isku day.';
        })
        .finally(() => {
          this.pending = false;
        });
    },

    getProduct(id) {
      return api.get(`/products/${id}`)
        .then((response) => {
          this.currentProduct = response.data ?? {};
          return this.currentProduct;
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
          throw error;
        });
    },

    addProduct(data) {
      return api.post('/products/add', data)
        .then((response) => {
          this.currentProduct = response.data;
          return this.currentProduct;
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    },

    updateProduct(data, id) {
      return api.put(`/products/${id}`, data)
        .then((response) => {
          this.currentProduct = response.data;
          return this.currentProduct;
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    },

    deleteProduct(id) {
      return api.delete(`/products/${id}`)
        .then((response) => {
          this.currentProduct = response.data;
          return this.currentProduct;
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    },
  },
});