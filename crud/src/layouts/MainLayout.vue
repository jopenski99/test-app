<template>
	<q-layout view="hHh Lpr lff">
		<q-header elevated>
			<q-toolbar>
				<q-toolbar-title>
					J Perez
				</q-toolbar-title>
			</q-toolbar>
		</q-header>
		<q-page-container>
			<q-drawer v-model="drawerControl" :width="200" :breakpoint="500" bordered content-class="bg-grey-3">
				<q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
					<q-list padding>
						<q-item v-for="link in menu" :key="link.url" clickable @click="handleLink(link)"
							:active="link.isActive" v-ripple>
							<q-item-section avatar>
								<q-icon :name="link.icon"  />
							</q-item-section>

							<q-item-section color="white">
								<span >{{ link.text }}</span>
							</q-item-section>
						</q-item>
					</q-list>
				</q-scroll-area>
			</q-drawer>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'MainLayout',

	data() {
		return {
			drawer: true,
			menu: [
				{
					text: 'Dashboard',
					icon: 'dashboard',
					url: '/dashboard',
					isActive: false
				},
				{
					text: 'Products',
					icon: 'inventory_2',
					url: '/inventory',
					isActive: false
				},
				{
					text: 'Tasks',
					icon: 'task',
					url: '/task',
					isActive: false
				},
			]
		}
	},
	watch: {
		links: {
			handler(newVal) {
				newVal.forEach(link => {
					var currentUrl = window.location.pathname
					console.log(currentUrl)
				});
			},
			deep: true
		}
	},
	computed: {
		...mapGetters({
			isLoggedIn: 'user/getLoggedStatus'
		}),
		drawerControl() {
			return this.isLoggedIn ? this.isLoggedIn : false
		}
	},
	methods: {
		handleLink(to) {
			this.menu.forEach(link => {
				link.isActive = false
			});
			to.isActive = true
			this.$router.push(to.url)
		}
	}
}
</script>
