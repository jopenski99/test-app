<template>
	<q-page>
		<div class="row full-width q-pa-md">
			<div class="col-10">
				<span style="font-size: 20px; font-weight: 600;"> Your Tasks </span>
			</div>
		</div>
		<div class="row full-width q-pa-md">
			<q-table title="Products" :data="tableData" :columns="columns" row-key="name">
			</q-table>
		</div>
	</q-page>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	name: 'Tasks',
	data() {
		return {
			columns: [
				{ name: 'todo', align: 'left', label: 'Name', field: 'todo', sortable: true },
				{ name: 'completed', align: 'left', label: 'Completed', field: 'completed', sortable: true },
			],
			data:[],
			currentProd:{}
		}
	},
	computed: {
		...mapGetters({
			tasks: 'user/getTasks',
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
			this.tasks.todos.forEach(prod=> {
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