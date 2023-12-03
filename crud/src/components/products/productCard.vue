<template>
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
                    <q-carousel-slide v-for="(img, index) in prod.images" :key="'img-' + index"
                        :name="'img-' + index" :img-src="img" />
                </q-carousel>
            </q-card-section>

            <q-separator vertical />

            <q-card-section class="col-5">
                <div class="row full-width">
                    <div class="col" v-if="!edit">Current Discount (%): {{
                        prod.discountPercentage }}</div>
                    <div class="col" v-else>
                        <q-input :dense="true" class="text-right" :input-style="{ textAlign: 'end' }" bottom-slots
                            v-model="prod.discountPercentage" label="">
                            <template v-slot:before>
                                <span class="i-label">Current Discount (%):</span>
                            </template>
                        </q-input>
                    </div>
                </div>
                <div class="row full-width">
                    <div class="col" v-if="!edit">Price: {{ prod.price }} </div>
                    <div class="col" v-else>
                        <q-input :dense="true" class="text-right" :input-style="{ textAlign: 'end' }" bottom-slots
                            v-model="prod.price" label="">
                            <template v-slot:before>
                                <span class="i-label">Price:</span>
                            </template>
                        </q-input>
                    </div>
                </div>
                <div class="row full-width">
                    <div class="col"> Rating: <q-rating :disabled="!edit" v-model="prod.rating" size="2em" :max="5"
                            color="primary" /></div>

                </div>
                <div class="row full-width">
                    <div class="col" v-if="!edit"> Stock :{{ prod.stock }}</div>
                    <div class="col" v-else>
                        <q-input :dense="true" class="text-right" :input-style="{ textAlign: 'end' }" bottom-slots
                            v-model="prod.stock" label="">
                            <template v-slot:before>
                                <span class="i-label">Stock:</span>
                            </template>
                        </q-input>
                    </div>
                </div>
                <div class="row full-width">
                    <div class="col" v-if="!edit"> Description : {{ prod.description }}</div>
                    <div class="col" v-else>
                        <q-input :dense="true" type="textarea" class="text-left" :input-style="{ textAlign: 'end' }"
                            bottom-slots v-model="prod.description" label="">
                            <template v-slot:before>
                                <span class="i-label">Description :</span>
                            </template>
                        </q-input>
                    </div>
                </div>
                <div v-if="edit" class="row full-width">
                    <div class="col-12">
                        <q-btn color="primary" @click="update({ id: id, data: prod })" class="full-width"> Save </q-btn>
                    </div>
                </div>
            </q-card-section>
        </q-card-section>
    </q-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	name: 'ProductCard',
    props:['currentProd'],
    data() {
		return {
			slide: 1,
			prod: this.currentProd,
			id: 0,
			edit: false,
			params: null
		}
	},
    watch:{
        currentProd:{
            handler(newVal){
                this.prod = newVal
                this.selectItem(newVal)
            },
            deep:true
        }
    },
    methods:{
		...mapActions({
			update: 'products/updateProduct',
		}),
		selectItem(item){
			this.id = item.id
			this.prod ={
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