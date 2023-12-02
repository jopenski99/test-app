<template>
	<q-page class="flex flex-center">
		<q-card class="my-card text-center align-center justify-center q-pa-md">
			<q-card-section>
				Login
			</q-card-section>
			<q-card-section>
				<div class="row full-width">
					<div class="col-12">
						<q-input label="Username" outlined v-model="username" dense />
					</div>
					<div class="col-12 q-mt-md">
						<q-input label="Password" outlined type="password" v-model="password" dense />
					</div>
				</div>
			</q-card-section>
			<q-card-section>
				<div class="row full-width">
					<div class="col-12 q-mt-md">
						<q-btn color="primary" @click="login()" label="Sign in" />
					</div>
				</div>
			</q-card-section>
		</q-card>
	</q-page>
</template>


<script>
import { mapActions, } from 'vuex';
export default {
	name: 'PageIndex',
	data() {
		return {
			username: "kminchelle",
			password: "0lelplR",
		}
	},
	methods: {
		...mapActions({
			handleLogin: 'user/handleLogin',
		}),
		async login() {
			let result = await this.handleLogin({ username: this.username, password: this.password })
			if(result){
				
			}
		}
	}
}
</script>
