<template>
    <div class="dishmod" v-if="!okButton">
        <div class="modal-header">
            <button class="info-modal-close" @click="okButton = !okButton">OK</button>
            <div class="info-yellow-block">Добавлено</div>
            <div class="info-title">+274<span>₽</span></div>
        </div>
        <div class="scrollbar-wrapper">
            <VuePerfectScrollbar class="modal-scrollbar" v-once :settings="settings">
                <ul class="mods">
                    <dishModItem :key="mod.id_Mod" :data="mod" :dishId="dishData.id" :type="'include'"
                                 v-for="(mod) in data.dishes[this.activeDish].ModGroups[1].mods"></dishModItem>
                </ul>
            </VuePerfectScrollbar>

            <!-- <div class="fade-out-block"></div> -->
        </div>
    </div>
</template>
<script>
    import VuePerfectScrollbar from "vue-perfect-scrollbar";
    import dishModItem from "./item.vue";
    import "./style.scss";

    export default {
        components: {VuePerfectScrollbar, dishModItem},
        data() {
            return {
                okButton: false
            };
        },
        props: ["data"]
    };
</script>

