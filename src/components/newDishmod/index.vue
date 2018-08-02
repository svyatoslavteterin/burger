<template>
    <div class="dishmod" v-if="!okButton">
        <div class="modal-header">
            <button class="info-modal-close" @click="okButton = !okButton">OK</button>
            <div class="info-yellow-block">Добавлено</div>
            <div class="info-title">
                <span v-if="this.$store.getters.getModsSum[dishId]">
                +
                <span v-text="this.$store.getters.getModsSum[dishId]"></span>
                ₽
                    </span>
            </div>
        </div>
        <div class="scrollbar-wrapper">
            <VuePerfectScrollbar class="modal-scrollbar" v-once :settings="settings">
                <ul class="mods">
                    <dishModItem :key="mod.id_Mod" :data="mod" :dishId="dishId" :type="'include'"
                                 v-for="(mod) in mods"></dishModItem>
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
                settings: {
                    maxScrollbarLength: 60
                },
                okButton: false
            };
        },
        props: ["mods", "dishId"]
    };
</script>

