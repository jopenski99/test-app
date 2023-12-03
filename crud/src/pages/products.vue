<template>
	<q-page>
		<div class="row full-width q-pa-md">
			<div class="col-10">
				<span style="font-size: 20px; font-weight: 600;"> Product management </span>
			</div>
		</div>
		<div class="row full-width q-pa-md">
			<q-table title="Products" :data="tableData" :columns="columns" row-key="name">

				<template v-slot:header="props">
					<q-tr :props="props">
						<q-th auto-width />
						<q-th v-for="col in props.cols" :key="col.name" :props="props">
							{{ col.label }}
						</q-th>
					</q-tr>
				</template>

				<template v-slot:body="props">
					<q-tr :props="props" @click="selectItem(props.row)">
						<q-td auto-width>
							<q-btn size="sm" color="accent" round dense @click="props.row.edit = !props.row.edit"
								:icon="props.row.edit ? 'remove' : 'add'" />
						</q-td>
						<q-td v-for="col in props.cols" :key="col.name" :props="props">
							{{ col.value }}
						</q-td>
					</q-tr>
					<q-tr v-show="props.row.edit" :props="props">
						<q-td colspan="100%">
							<div class="row">
								<div class="col-12"> 
									<ProductCard :current-prod="props.row" />
								</div>
							</div>
						</q-td>
					</q-tr>
				</template>

			</q-table>
		</div>
	</q-page>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import ProductCard from 'src/components/products/productCard.vue';
export default {
	name: 'Products',
	components: { ProductCard },
	data() {
		return {
			columns: [
				{ name: 'name', align: 'left', label: 'Name', field: 'title', sortable: true },
				{ name: 'brand', align: 'left', label: 'Brand', field: 'brand', sortable: true },
				{ name: 'category', label: 'Category', field: 'category', sortable: true },
				{ name: 'price', label: 'Price', field: 'price' },
				{ name: 'stock', label: 'Stock', field: 'stock' },
			],
			data:[],
			currentProd:{}
		}
	},
	computed: {
		...mapGetters({
			allProducts: 'products/getAll',
		}),
		formatted() {
			let prods = []
			this.stats.details.forEach(cats => {
				if (cats.category == this.params) {
					prods = cats.products
				}
			})
			return prods
		},
		tableData(){
			this.allProducts.forEach(prod=> {
				this.data.push({...prod, edit:false})
			})
			return this.data
		}
	},
	mounted() {
		let category = this.$route.params.category;
		console.log(this.$route.params.category)
		this.params = category
	},
	methods: {
		...mapActions({
			update: 'products/updateProduct',
		}),
		selectItem(item) {
			this.id = item.id
			this.currentProd = {
				title: item.title,
				brand: item.brand,
				stock: item.stock,
				rating: item.rating,
				description: item.description,
				discountPercentage: item.discountPercentage,
				thumbnail: item.thumbnail,
				images: item.images,
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
}
</style>