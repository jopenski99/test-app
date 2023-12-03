<template>
	<q-page>
		<div class="row full-width q-pa-md">
			<div class="col-12">
				<span style="font-size: 20px; font-weight: 600;"> Products by categories </span>
			</div>
		</div>
		<div class="row flex full-width justify-center text-center ">
			<div class="col-2 q-ma-sm items-start" v-for="category in stats.details" :key="category.category">
				<q-card @click="handleView(category.category)" class="my-card" width="100%" height="150px"
					style="min-height: 150px;">
					<q-card-section>
						<div class="text-h6">{{ localize(category.category) }}</div>
					</q-card-section>
					<q-card-section>
						<span class="text-h6">{{ category.count }}</span>
					</q-card-section>
				</q-card>
			</div>
		</div>
	</q-page>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	name: 'PageIndex',
	data() {
		return {

		}
	},
	async mounted() {
		await this.fetchStats()
	},
	computed: {
		...mapGetters({
			stats: 'products/getStatistics',
		}),
		formatted() {

		}
	},
	methods: {
		...mapActions({
			fetchStats: 'products/fetchStats',
		}),
		localize(str) {
			return str.charAt(0).toUpperCase() + str.slice(1)
		},
		handleView(cat) {
			this.$router.push({
				name: "category", 
				params: { category:cat }
			})
		}

	}
}
</script>
