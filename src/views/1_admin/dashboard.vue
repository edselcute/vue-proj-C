<template>
    <div class="layout-px-spacing dash_2">
        <portal to="breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Admin</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Dashboard</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </portal>

        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="row widget-statistic">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 layout-spacing">
                        <div class="widget ">
                            <div class="widget-heading">
                                <div class="w-title">
                                    <div class="w-icon icon-fill-danger">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="feather feather-stop-circle"
                                            data-v-02c2cbc4=""
                                        >
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <rect x="9" y="9" width="6" height="6"></rect>
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="spinner-grow align-self-center loader-sm table-loader mb-4" v-if="is_loading"></div>
                                        <p class="w-value" v-else>{{ parseFloat(current_fight.meron_bet) > 0 ? formatNumberString(parseFloat(current_fight.meron_bet)) : '0' }}</p>
                                        <h5>
                                            Meron Current Total Bet
                                            <span class="txt-green">[Payout {{ parseFloat(current_fight.meron_payout) > 0 ? parseFloat(current_fight.meron_payout).toFixed(2) : '0.00' }}]</span>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 layout-spacing">
                        <div class="widget">
                            <div class="widget-heading">
                                <div class="w-title">
                                    <div class="w-icon icon-fill-primary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="feather feather-stop-circle"
                                            data-v-02c2cbc4=""
                                        >
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <rect x="9" y="9" width="6" height="6"></rect>
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="spinner-grow align-self-center loader-sm table-loader mb-4" v-if="is_loading"></div>
                                        <p class="w-value" v-else>{{ parseFloat(current_fight.wala_bet) > 0 ? formatNumberString(parseFloat(current_fight.wala_bet)) : '0' }}</p>
                                        <h5>
                                            Wala Current Total Bet
                                            <span class="txt-green">[Payout {{ parseFloat(current_fight.wala_payout) > 0 ? parseFloat(current_fight.wala_payout).toFixed(2) : '0.00' }}]</span>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 layout-spacing">
                        <div class="widget ">
                            <div class="widget-heading">
                                <div class="w-title">
                                    <div class="w-icon icon-fill-success">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="feather feather-stop-circle"
                                            data-v-02c2cbc4=""
                                        >
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <rect x="9" y="9" width="6" height="6"></rect>
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="spinner-grow align-self-center loader-sm table-loader mb-4" v-if="is_loading"></div>

                                        <p class="w-value" v-else>{{ parseFloat(current_fight.draw_bet) > 0 ? formatNumberString(parseFloat(current_fight.draw_bet)) : '0' }}</p>
                                        <h5>Draw Current Total Bet</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-9 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class="widget widget-revenue">
                    <div class="widget-heading">
                        <h5>Revenue</h5>
                        <b-dropdown variant="icon-only" toggle-tag="a" :right="true">
                            <template #button-content>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-more-horizontal"
                                >
                                    <circle cx="12" cy="12" r="1"></circle>
                                    <circle cx="19" cy="12" r="1"></circle>
                                    <circle cx="5" cy="12" r="1"></circle>
                                </svg>
                            </template>
                            <b-dropdown-item>Weekly</b-dropdown-item>
                            <b-dropdown-item>Monthly</b-dropdown-item>
                            <b-dropdown-item>Yearly</b-dropdown-item>
                        </b-dropdown>
                    </div>

                    <div class="widget-content">
                        <div class="chart-title">
                            Total Profit <span class="text-primary ml-1">{{ formatNumberStringDecimal(totalProfit) }}</span>
                        </div>
                        <apexchart v-if="revenue_options" height="325" type="area" :options="revenue_options" :series="revenue_series"></apexchart>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
                <div class="widget widget-active-log">
                    <div class="widget-heading">
                        <h5>Live Bet Log</h5>
                    </div>

                    <div class="widget-content">
                        <div class="w-shadow-top"></div>
                        <perfect-scrollbar class="mt-container mx-auto">
                            <div v-if="is_loading">
                                <div class="timeline-line"><div class="spinner-grow align-self-center loader-sm table-loader mb-4" v-for="n in 10" :key="n"></div></div>
                            </div>
                            <div v-else>
                                <div class="timeline-line" v-for="r in live_bettors" :key="r.id">
                                    <div class="item-timeline">
                                        <div class="t-dot">
                                            <div :class="`${r.bet_select == 1 ? 't-danger' : r.bet_select == 2 ? 't-primary' : r.bet_select == 3 ? 't-success' : ''}`">
                                                <span class="live-bet-icon">{{ r.bet_select == 1 ? 'M' : r.bet_select == 2 ? 'W' : r.bet_select == 3 ? 'D' : '' }}</span>
                                            </div>
                                        </div>
                                        <div class="t-content">
                                            <div class="t-uppercontent">
                                                <h5>
                                                    {{ r.user.username }} : <span>[{{ formatNumberString(r.bet_amount) }}]</span>
                                                </h5>
                                            </div>
                                            <p>{{ r.created_at }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </perfect-scrollbar>
                        <div class="w-shadow-bottom"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueApexCharts from 'vue-apexcharts';
    Vue.use(VueApexCharts);
    Vue.component('apexchart', VueApexCharts);

    import '@/assets/sass/widgets/widgets.scss';
    import { mapState, mapActions, mapGetters } from 'vuex';
    export default {
        metaInfo: { title: 'Dashboard' },
        data() {
            return {
                is_loading: false,
                test_num: 0
            };
        },
        computed: {
            ...mapState('fight', ['data', 'current_fight']),
            ...mapState('report', ['revenue_series']),
            ...mapState('bet', ['live_bettors']),
            ...mapGetters('report', ['totalProfit']),
            //Revenue
            revenue_options() {
                var vm = this;
                const is_dark = this.$store.state.is_dark_mode;
                return {
                    chart: {
                        fontFamily: 'Nunito, sans-serif',
                        zoom: { enabled: false },
                        toolbar: { show: false },
                        events: {
                            // mounted: function(ctx) {
                            //     const highest1 = ctx.getHighestValueInSeries(0);
                            //     // const highest2 = ctx.getHighestValueInSeries(1);
                            //     ctx.addPointAnnotation({
                            //         x: 'Jul',
                            //         y: highest1,
                            //         label: { style: { cssClass: 'd-none' } },
                            //         customSVG: {
                            //             SVG:
                            //                 '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#1b55e2" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>',
                            //             cssClass: undefined,
                            //             offsetX: -8,
                            //             offsetY: 7
                            //         }
                            //     });
                            //     // ctx.addPointAnnotation({
                            //     //     x: 'Jun',
                            //     //     y: highest2,
                            //     //     label: { style: { cssClass: 'd-none' } },
                            //     //     customSVG: {
                            //     //         SVG:
                            //     //             '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#e7515a" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>',
                            //     //         cssClass: undefined,
                            //     //         offsetX: -8,
                            //     //         offsetY: 7
                            //     //     }
                            //     // });
                            // }
                        }
                    },

                    dataLabels: { enabled: false },
                    stroke: { show: true, curve: 'smooth', width: 2, lineCap: 'square' },
                    dropShadow: { enabled: true, opacity: 0.2, blur: 10, left: -7, top: 22 },
                    colors: is_dark ? ['#2196f3', '#e7515a'] : ['#1b55e2', '#e7515a'],
                    markers: {
                        discrete: [
                            { seriesIndex: 0, dataPointIndex: 7, fillColor: '#000', strokeColor: '#000', size: 5 },
                            { seriesIndex: 2, dataPointIndex: 11, fillColor: '#000', strokeColor: '#000', size: 4 }
                        ]
                    },
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    xaxis: {
                        axisBorder: { show: false },
                        axisTicks: { show: false },
                        crosshairs: { show: true },
                        labels: { offsetX: 0, offsetY: 5, style: { fontSize: '12px', fontFamily: 'Nunito, sans-serif', cssClass: 'apexcharts-xaxis-title' } }
                    },
                    yaxis: {
                        tickAmount: 7,
                        labels: {
                            formatter: function(value) {
                                return value.toLocaleString();
                            },
                            offsetX: -10,
                            offsetY: 0,
                            style: { fontSize: '12px', fontFamily: 'Nunito, sans-serif', cssClass: 'apexcharts-yaxis-title' }
                        }
                    },
                    grid: {
                        borderColor: is_dark ? '#191e3a' : '#e0e6ed',
                        strokeDashArray: 5,
                        xaxis: { lines: { show: true } },
                        yaxis: { lines: { show: false } },
                        padding: { top: vm.test_num, right: 0, bottom: 0, left: 0 }
                    },
                    legend: {
                        position: 'top',
                        horizontalAlign: 'right',
                        offsetY: 0,
                        fontSize: '16px',
                        fontFamily: 'Nunito, sans-serif',
                        markers: { width: 10, height: 10, strokeWidth: 0, strokeColor: '#fff', fillColors: undefined, radius: 12, onClick: undefined, offsetX: 0, offsetY: 0 },
                        itemMargin: { horizontal: 20, vertical: 5 }
                    },
                    tooltip: { theme: 'dark', marker: { show: true }, x: { show: false } },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            type: 'vertical',
                            shadeIntensity: 1,
                            inverseColors: !1,
                            opacityFrom: is_dark ? 0.19 : 0.28,
                            opacityTo: 0.05,
                            stops: is_dark ? [100, 100] : [45, 100]
                        }
                    }
                };
            }
        },
        methods: {
            ...mapActions('report', {
                rep_revenue: 'revenueSeries'
            }),
            ...mapActions('schedule', {
                schedule_gc: 'getCurrent'
            }),
            ...mapActions('fight', {
                fight_gc: 'getCurrent'
            }),
            ...mapActions('bet', {
                bet_lb: 'liveBettors'
            }),
            async getCurrentSchedule() {
                var vm = this;
                const sres = await vm.schedule_gc();
                if (sres) {
                    await vm.fight_gc({ schedule_id: sres.id });
                }
            },
            async getRevenueSeries() {
                var vm = this;
                vm.is_loading = true;
                const res = await vm.rep_revenue();

                if (res) {
                    vm.test_num += 1;
                }

                vm.is_loading = false;
            },
            async getLiveBettors() {
                var vm = this;
                vm.is_loading = true;
                await vm.bet_lb();

                vm.is_loading = false;
            }
        },
        mounted() {
            var vm = this;
            vm.getCurrentSchedule();
            vm.getRevenueSeries();
            vm.getLiveBettors();
        }
    };
</script>
