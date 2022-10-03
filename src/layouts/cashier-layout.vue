<template>
    <div>
        <!--  BEGIN NAVBAR  -->
        <Header></Header>
        <!--  END NAVBAR  -->

        <!--  BEGIN MAIN CONTAINER  -->
        <div
            class="main-container"
            id="container"
            :class="[!$store.state.is_show_sidebar ? 'sidebar-closed sbar-open' : '', $store.state.menu_style === 'collapsible-vertical' ? 'collapsible-vertical-mobile' : '']"
        >
            <!--  BEGIN OVERLAY  -->
            <div class="overlay" :class="{ show: !$store.state.is_show_sidebar }" @click="$store.commit('toggleSideBar', !$store.state.is_show_sidebar)"></div>
            <div class="search-overlay" :class="{ show: $store.state.is_show_search }" @click="$store.commit('toggleSearch', !$store.state.is_show_search)"></div>
            <!-- END OVERLAY -->

            <!--  BEGIN SIDEBAR  -->
            <Sidebar></Sidebar>
            <!--  END SIDEBAR  -->

            <!--  BEGIN CONTENT AREA  -->
            <div id="content" class="main-content">
                <router-view v-if="has_money">
                    <!-- BEGIN LOADER -->
                    <div id="load_screen">
                        <div class="loader">
                            <div class="loader-content">
                                <div class="spinner-grow align-self-center"></div>
                            </div>
                        </div>
                    </div>
                    <!--  END LOADER -->
                </router-view>
                <b-jumbotron v-else primary>
                    <h2 class="display-4 mb-5  mt-4 text-center text-warning">Insufficient funds</h2>
                    <p class="lead mt-3 mb-4 text-center">Please cash-in to proceed.</p>
                    <hr class="my-4" />
                    <!-- <p class="mb-5">It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <p class="lead">
                        <b-button variant="dark">Learn more</b-button>
                    </p> -->
                </b-jumbotron>

                <!-- BEGIN FOOTER -->
                <Footer></Footer>
                <!-- END FOOTER -->
            </div>
            <!--  END CONTENT AREA  -->

            <!-- BEGIN APP SETTING LAUNCHER -->
            <!-- <app-settings /> -->
            <!-- END APP SETTING LAUNCHER -->
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    import Header from '@/components/layout/header.vue';
    import Sidebar from '@/components/layout/sidebar.vue';
    import Footer from '@/components/layout/footer.vue';
    // import appSettings from '@/components/app-settings.vue';
    export default {
        components: {
            Header,
            Sidebar,
            Footer
            // appSettings
        },
        data() {
            return {};
        },
        computed: {
            ...mapGetters('auth', ['has_money'])
        },
        mounted() {
            this.$appSetting.toggleMode('dark');
        }
    };
</script>
