<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<q-toolbar-title>
					J Perez
				</q-toolbar-title>
			</q-toolbar>
		</q-header>
		<q-page-container>
			<q-page>
				<div class="row full-width q-pa-md">
					<div class="col-10">
						<span style="font-size: 20px; font-weight: 600;"> Products by categories </span>
					</div>

				</div>
				<div class="row q-pa-md">
					<div class="col-4">
						<q-list>
							<q-item clickable v-ripple v-for="item in formatted" :key="item.id" @click="selectItem(item)">
								<q-item-section thumbnail>
									<img :src="item.thumbnail">
								</q-item-section>
								<q-item-section>{{ item.title }}</q-item-section>
							</q-item>
						</q-list>
					</div>
					<div class="col-8">
						<q-card v-if="currentProd" class="my-card" flat bordered>
							<q-item>
								<q-item-section avatar>
									<q-avatar>
										<img :src="currentProd.thumbnail">
									</q-avatar>
								</q-item-section>

								<q-item-section>
									<div class="row align-center" style="flex-wrap: unset;    justify-content: end;">
										<div class="col-11">
											<q-item-label>{{ currentProd.title }}</q-item-label>
											<q-item-label caption>
												{{ currentProd.brand }}
											</q-item-label>
										</div>
										<div class="col-auto text-right">
											<q-btn flat round color="primary" icon="edit" @click="edit = !edit" />
										</div>
									</div>
								</q-item-section>
							</q-item>

							<q-separator />

							<q-card-section horizontal>
								<q-card-section class="col-7">
									<q-carousel swipeable animated v-model="slide" thumbnails infinite :autoplay="true">
										<q-carousel-slide v-for="(img, index) in currentProd.images" :key="'img-' + index"
											:name="'img-' + index" :img-src="img" />
									</q-carousel>
								</q-card-section>

								<q-separator vertical />

								<q-card-section class="col-5">
									<div class="row full-width">
										<div class="col" v-if="!edit">Current Discount (%): {{
											currentProd.discountPercentage }}</div>
										<div class="col" v-else>
											<q-input :dense="true" class="text-right" :input-style="{ textAlign: 'end' }"
												bottom-slots v-model="currentProd.discountPercentage" label="">
												<template v-slot:before>
													<span class="i-label">Current Discount (%):</span>
												</template>
											</q-input>
										</div>
									</div>
									<div class="row full-width">
										<div class="col" v-if="!edit">Price: {{ currentProd.price }} </div>
										<div class="col" v-else>
											<q-input :dense="true" class="text-right" :input-style="{ textAlign: 'end' }"
												bottom-slots v-model="currentProd.price" label="">
												<template v-slot:before>
													<span class="i-label">Price:</span>
												</template>
											</q-input>
										</div>
									</div>
									<div class="row full-width">
										<div class="col"> Rating: <q-rating :disabled="!edit" v-model="currentProd.rating"
												size="2em" :max="5" color="primary" /></div>

									</div>
									<div class="row full-width">
										<div class="col" v-if="!edit"> Stock :{{ currentProd.stock }}</div>
										<div class="col" v-else>
											<q-input :dense="true" class="text-right" :input-style="{ textAlign: 'end' }"
												bottom-slots v-model="currentProd.stock" label="">
												<template v-slot:before>
													<span class="i-label">Stock:</span>
												</template>
											</q-input>
										</div>
									</div>
									<div class="row full-width">
										<div class="col" v-if="!edit"> Description : {{ currentProd.description }}</div>
										<div class="col" v-else>
											<q-input :dense="true" type="textarea" class="text-left"
												:input-style="{ textAlign: 'end' }" bottom-slots
												v-model="currentProd.description" label="">
												<template v-slot:before>
													<span class="i-label">Description :</span>
												</template>
											</q-input>
										</div>
									</div>
									<div v-if="edit" class="row full-width">
										<div class="col-12">
											<q-btn color="primary" @click="update({id:id,data:currentProd})" class="full-width"> Save </q-btn>
										</div>
									</div>
								</q-card-section>
							</q-card-section>
						</q-card>
					</div>

				</div>
			</q-page>
		</q-page-container>
	</q-layout>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import MainLayout from 'src/layouts/MainLayout.vue';
export default {
	name: 'Category',
	components: { MainLayout },
	data() {
		return {
			slide: 1,
			currentProd: null,
			id: 0,
			edit: false,
			params: null
		}
	},
	computed: {
		...mapGetters({
			stats: 'products/getStatistics',
		}),
		formatted() {
			let prods = []
			this.stats.details.forEach(cats => {
				if (cats.category == this.params) {
					prods = cats.products
				}
			})
			return prods
		}
	},
	mounted() {
		let category = this.$route.params.category;
		console.log(this.$route.params.category)
		this.params = category
	},
	methods:{
		...mapActions({
			update: 'products/updateProduct',
		}),
		selectItem(item){
			this.id = item.id
			this.currentProd ={
				title: item.title,
				brand: item.brand,
				stock: item.stock,
				rating: item.rating,
				description: item.description,
				discountPercentage: item.discountPercentage,
				thumbnail :item.thumbnail,
				images : item.images,
				price: item.price
			} 
		}
	}

}
</script>
<style scoped>
.i-label {
	font-size: 15px !important;
	color: black !important;
	min-width: 10%;
}</style>