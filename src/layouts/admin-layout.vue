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
                <router-view>
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

                <!-- BEGIN FOOTER -->
                <Footer class="hide-on-print"></Footer>
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
        mounted() {
            this.$appSetting.toggleMode('light');
        }
    };
</script>

<style lang="scss">
    .live-bet-icon {
        color: #fff;
        font-weight: bolder;
    }

    .txt-green {
        color: #009688;
    }

    .bg-red-summary {
        background-color: rgb(255 159 159 / 34%) !important;
    }

    .bg-red-summary svg {
        color: rgb(255 159 159) !important;
        fill: rgb(255 159 159 / 20%) !important;
    }

    .bg-green-summary {
        background-color: rgb(160 245 167 / 34%) !important;
    }

    .bg-green-summary svg {
        color: rgb(26 253 45) !important;
        fill: rgb(26 253 45 / 20%) !important;
    }

    @media print {
        .main-content {
            margin-top: 0 !important;
        }
    }
</style>
