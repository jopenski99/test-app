import { dummy } from "boot/axios";
import qs from "qs";
import { Notify } from "quasar";
import { QSpinnerOrbit } from "quasar";
export default {
  async login(payload) {
    let return_data = [];
    console.log(Notify);
    Notify.create({
      spinner: QSpinnerOrbit,
      message: "Logging you in",
      color: "primary",
      timeout: 2000,
    });
    try {
      await dummy
        .post("/auth/login", payload)
        .then((response) => {
          return_data = response.data;
          Notify.create({
            message: "Welcome back " + return_data.firstName + "!",
            color: "primary",
            timeout: 2000,
          });
		  console.log('success => ', return_data)
        })
        .catch((error, response) => {
          console.log(error.response);
          Notify.create({
            message: error.response.data.message,
            type: "negative",
            timeout: 2000,
          });

          return_data = false;
        });
    } catch (error) {
      console.error(error);
    }
	return return_data
  },
  /* 	async getFeaturedGame() {
		let return_data = []
		try {
			await api.get('/api/games/featured').then(response => {
				return_data = response.data.data;
			})
			return return_data
		} catch (error) {
			throw error;
		}
		return return_data
	}, */
  /* async getGamesByCategories(slugs) {
		let return_data = []
		let payload = { categories: slugs }
		console.log(payload)
		await api.get('/api/get-categories-games', {
			params:{
				...payload
			},
			paramsSerializer: params => {
				return qs.stringify(params)
			  }
		}).then(response => {
			return_data = response.data.data;
		}).catch(error => {
			console.log(error)
		})


		return return_data

	},
	async fetchBuild(url){
		await game.get(url).then(response => {
			return_data = response.data.data;
			console.log(return_data)
		}).catch(error => {
			console.log(error)
		})
	} */
};
