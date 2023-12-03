import { dummy } from "boot/axios";
import { Notify } from "quasar";
import { QSpinnerOrbit } from "quasar";
export default {
  async getStatistics() {
    let categories = await this.getCategories();
    let categories_details = [];

    for (const category of categories) {
      let products = await this.getProductsByCategory(category);
      categories_details.push({
        category: category,
        count: products.length,
        products: products,
      });
    }
    return {
      details: categories_details,
    };
  },
  async getCategories() {
    let return_data = [];
    await dummy.get("/products/categories").then((response) => {
      console.log(response);
      return_data = response;
    });

    return return_data.data;
  },
  async getProductsByCategory(cat) {
    let return_data = [];
    await dummy.get("/products/category/" + cat).then((response) => {
      return_data = response.data.products;
    });

    return return_data;
  },
  async updateProduct(payload) {
    Notify.create({
      spinner: QSpinnerOrbit,
      message: "Updating " + payload.data.title,
      color: "primary",
      timeout: 2000,
    });
    let return_data = [];
    await dummy
      .put("/products/" + payload.id, payload.data)
      .then((response) => {
        return_data = response.data;
        Notify.create({
          message: "Update was successful!",
          color: "primary",
          timeout: 2000,
        });
      })
      .catch((error) => {
        Notify.create({
          message: error.response.data.message,
          type: "negative",
          timeout: 2000,
        });
      });

    return return_data;
  },
};
