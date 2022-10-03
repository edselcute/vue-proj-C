<template>
    <div class="layout-px-spacing">
        <portal to="breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Admin</a></li>
                                <li class="breadcrumb-item" aria-current="page"><span>Report</span></li>
                                <li class="breadcrumb-item" aria-current="page">
                                    <router-link tag="a" to="/1_admin/report/schedule">Schedule</router-link>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">
                                    <span>{{ schedule_details.event_name }} - {{ formatDateFdY(schedule_details.datetime) }}</span>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </portal>

        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div id="tableHover" class="col-lg-12 col-12 layout-spacing">
                    <div class="statbox panel box box-shadow">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xl-12 col-md-12 col-sm-12 col-12 layout-spacing text-center pb-0 text-uppercase">
                                    <h1 style="font-weight: 900">EVENT REPORT</h1>
                                    <h3 class="mb-0">{{ schedule_details.event_name }}</h3>
                                    <h4 class="mb-0">{{ formatDateFdY(schedule_details.datetime) }}</h4>
                                    <h4 class="mb-0">{{ schedule_details.arena.name }}</h4>
                                </div>
                                <div class="col-xl-12 col-md-12 col-sm-12 col-12 text-right  hide-on-print">
                                    <b-form class="simple-example">
                                        <b-form-row>
                                            <div class="col-md-12">
                                                <label for="" style="display:block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                                <b-button variant="primary" size="lg" class="mb-4 mr-2 btn-rounded" @click="printReport()"
                                                    ><svg
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                        height="24"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        fill="none"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        class="css-i6dzq1"
                                                    >
                                                        <polyline points="6 9 6 2 18 2 18 9"></polyline>
                                                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                                                        <rect x="6" y="14" width="12" height="8"></rect></svg
                                                    >Print</b-button
                                                >
                                            </div>
                                        </b-form-row>
                                    </b-form>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div class="row widget-statistic">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing pb-4 ">
                                    <b-table-simple responsive bordered hover class="text-center">
                                        <b-thead>
                                            <b-tr style="">
                                                <b-th class=" text-white bg-danger " style="width: 25%; font-size: 1.5em">Meron</b-th>
                                                <b-th class=" text-white bg-primary " style="width: 25%; font-size: 1.5em">Wala</b-th>
                                                <b-th class=" text-white bg-success" style="width: 25%; font-size: 1.5em">Draw</b-th>
                                                <b-th class=" text-white bg-dark " style="width: 25%; font-size: 1.5em">Overall</b-th>
                                            </b-tr>
                                        </b-thead>
                                        <!-- <b-tbody v-if="is_loading">
                                            <b-tr v-for="n in 20" :key="n">
                                                <b-td><div class="spinner-grow align-self-center loader-sm table-loader"></div></b-td>
                                                <b-td><div class="spinner-grow align-self-center loader-sm table-loader"></div></b-td>
                                                <b-td><div class="spinner-grow align-self-center loader-sm table-loader"></div></b-td>
                                                <b-td><div class="spinner-grow align-self-center loader-sm table-loader"></div></b-td>
                                                <b-td><div class="spinner-grow align-self-center loader-sm table-loader"></div></b-td>
                                            </b-tr>
                                        </b-tbody> -->
                                        <b-tbody>
                                            <b-tr class="text-right">
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ total_count.meron_count }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">BET COUNT</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ total_count.wala_count }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">BET COUNT</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ total_count.draw_count }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">BET COUNT</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ total_count.total_bet_count }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL BET COUNT</h6>
                                                    </div>
                                                </b-td>
                                            </b-tr>
                                            <b-tr class="text-right">
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0 text-" style="font-weight: 600">{{ formatNumberStringDecimal(total_count.meron_bet) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">BET AMOUNT</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(total_count.wala_bet) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">BET AMOUNT</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(total_count.draw_bet) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">BET AMOUNT</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(total_count.total_amount) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL BET AMOUNT</h6>
                                                    </div>
                                                </b-td>
                                            </b-tr>
                                            <b-tr class="text-right">
                                                <b-td colspan="2" class=""> </b-td>
                                                <b-td class="">
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(total_count.total_draw_payout) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL DRAW PAYOUT</h6>
                                                    </div>
                                                </b-td>
                                                <b-td class="">
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 :class="`mb-0 ${parseFloat(total_count.draw_commission) ? 'text-danger' : ''}`" style="font-weight: 600">
                                                            {{ formatNumberStringDecimal(total_count.draw_commission) }}
                                                        </h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL DRAW COMMISSION</h6>
                                                    </div>
                                                </b-td>
                                            </b-tr>

                                            <b-tr class="text-right">
                                                <b-td colspan="4" class="">
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">
                                                            {{ formatNumberStringDecimal(total_count.total_commission) }}
                                                        </h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL COMMISSION</h6>
                                                    </div>
                                                </b-td>
                                            </b-tr>
                                        </b-tbody>
                                    </b-table-simple>
                                </div>
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing pb-0">
                                    <h4>ANALYTICS</h4>
                                </div>

                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 layout-spacing pb-0">
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
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <p class="w-value" v-else>{{ result_count[0] ? formatNumberString(result_count[0].total) : '0' }}</p>
                                                    <h5>MERON</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 layout-spacing pb-0">
                                    <div class="widget ">
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
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <p class="w-value" v-else>{{ result_count[1] ? formatNumberString(result_count[1].total) : '0' }}</p>
                                                    <h5>WALA</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 layout-spacing pb-0">
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
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <p class="w-value" v-else>{{ result_count[2] ? formatNumberString(result_count[2].total) : '0' }}</p>
                                                    <h5>DRAW</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <b-table-simple responsive bordered hover class="text-center">
                                <b-thead>
                                    <b-tr>
                                        <b-th>Fight #</b-th>
                                        <b-th>Meron Bet</b-th>
                                        <b-th>Wala Bet</b-th>
                                        <b-th>Draw Bet</b-th>
                                        <b-th>Total Bet</b-th>
                                        <b-th>Result</b-th>
                                    </b-tr>
                                </b-thead>
                                <b-tbody v-if="is_loading">
                                    <b-tr v-for="n in 20" :key="n">
                                        <b-td><div class="spinner-grow align-self-center loader-sm table-loader"></div></b-td>
                                        <b-td><div class="spinner-grow align-self-center loader-sm table-loader"></div></b-td>
                                        <b-td><div class="spinner-grow align-self-center loader-sm table-loader"></div></b-td>
                                        <b-td><div class="spinner-grow align-self-center loader-sm table-loader"></div></b-td>
                                        <b-td><div class="spinner-grow align-self-center loader-sm table-loader"></div></b-td>
                                        <b-td><div class="spinner-grow align-self-center loader-sm table-loader"></div></b-td>
                                    </b-tr>
                                </b-tbody>
                                <b-tbody v-else>
                                    <b-tr v-for="r in fight_data.list" :key="r.id">
                                        <b-td>{{ r.fight_no }}</b-td>
                                        <b-td>{{ parseInt(r.meron_bet) > 0 ? formatNumberString(parseInt(r.meron_bet)) : '0' }}</b-td>
                                        <b-td>{{ parseInt(r.wala_bet) > 0 ? formatNumberString(parseInt(r.wala_bet)) : '0' }}</b-td>
                                        <b-td>{{ parseInt(r.draw_bet) > 0 ? formatNumberString(parseInt(r.draw_bet)) : '0' }}</b-td>
                                        <b-td>{{ parseInt(r.total_amount) > 0 ? formatNumberString(parseInt(r.total_amount)) : '0' }}</b-td>
                                        <b-td :class="`${r.result == 1 ? 'text-danger' : r.result == 2 ? 'text-primary' : r.result == 3 ? 'text-success' : 'text-dark'}`">{{
                                            formatSide(r.result)
                                        }}</b-td>
                                    </b-tr>
                                </b-tbody>
                            </b-table-simple>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .select2 .multiselect__option--highlight {
        background: #fff;
        color: #4361ee;
    }
    .select2 .multiselect__option--selected {
        background-color: rgba(27, 85, 226, 0.23921568627450981);
        color: #4361ee;
        font-weight: normal;
    }
    .select2 .multiselect__option--disabled {
        background: inherit !important;
    }
    .select2 .multiselect__tag {
        color: #000;
        background: #e4e4e4;
    }
    .select2 .multiselect__tag-icon:after {
        color: #000 !important;
    }
    .select2 .multiselect__tag-icon:focus,
    .select2 .multiselect__tag-icon:hover {
        background: inherit;
    }
</style>

<script>
    import '@/assets/sass/scrollspyNav.scss';
    import '@/assets/sass/tables/table-basic.scss';
    import '@/assets/sass/widgets/widgets.scss';

    import { mapState, mapActions } from 'vuex';
    export default {
        metaInfo: { title: 'Tables' },
        components: {},
        data() {
            return {
                is_loading: false,
                schedule_details: {
                    event_name: '',
                    datetime: '',
                    arena: {
                        name: ''
                    }
                },

                result_count: [],
                total_count: {
                    meron_bet: 0,
                    wala_bet: 0,
                    draw_bet: 0,
                    total_amount: 0,
                    meron_count: 0,
                    wala_count: 0,
                    draw_count: 0,
                    total_bet_count: 0,
                    draw_commission: 0,
                    total_commission: 0,
                    total_draw_bet_win_count: 0,
                    total_draw_bet_lose_count: 0,
                    total_draw_payout: 0
                }
            };
        },

        computed: {
            ...mapState('report', ['data']),
            ...mapState('fight', {
                fight_data: 'data'
            })
        },
        methods: {
            ...mapActions('report', {
                gl: 'getList',
                go: 'getOne',
                rep_schedule: 'scheduleReport'
            }),
            ...mapActions('schedule', {
                schedule_go: 'getOne'
            }),
            ...mapActions('fight', {
                fight_gl: 'getList'
            }),
            async init() {
                var vm = this;
                vm.is_loading = true;
                //  schedule
                const schedule = await vm.schedule_go({ id: parseInt(vm.$route.params.id) });
                if (schedule) {
                    vm.schedule_details.event_name = schedule.event_name;
                    vm.schedule_details.datetime = schedule.datetime;
                    vm.schedule_details.arena.name = schedule.arena.name;
                }

                // report
                const report = await vm.rep_schedule({ schedule_id: parseInt(vm.$route.params.id) });

                if (report) {
                    vm.result_count = report.result_count;

                    vm.total_count.meron_bet = report.total_count.meron_bet;
                    vm.total_count.wala_bet = report.total_count.wala_bet;
                    vm.total_count.draw_bet = report.total_count.draw_bet;
                    vm.total_count.total_amount = report.total_count.total_amount;
                    vm.total_count.meron_count = report.total_count.meron_count;
                    vm.total_count.wala_count = report.total_count.wala_count;
                    vm.total_count.draw_count = report.total_count.draw_count;
                    vm.total_count.total_bet_count = parseInt(report.total_count.meron_count) + parseInt(report.total_count.wala_count) + parseInt(report.total_count.draw_count);
                    vm.total_count.draw_commission = report.total_count.draw_commission;
                    vm.total_count.total_commission = report.total_count.total_commission;

                    vm.total_count.total_draw_bet_win_count = report.total_count.total_draw_bet_win_count;
                    vm.total_count.total_draw_bet_lose_count = vm.total_count.draw_count - vm.total_count.total_draw_bet_win_count;
                    vm.total_count.total_draw_payout = report.total_count.total_draw_payout;
                }

                // fight
                await vm.fight_gl({ schedule_id: parseInt(vm.$route.params.id), limit: 1000, sort_column: 'fight_no', sort_order: 'asc', status: 2 });

                vm.is_loading = false;
            },
            printReport() {
                window.print();
            }
        },
        mounted() {
            this.init();
        }
    };
</script>
