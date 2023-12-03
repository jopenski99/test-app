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
						<ProductCard :current-prod="currentProd"/>
					</div>

				</div>
			</q-page>
		</q-page-container>
	</q-layout>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

import ProductCard from 'src/components/products/productCard.vue';
export default {
	name: 'Category',
	components: { ProductCard },
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
