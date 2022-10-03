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
                                <li class="breadcrumb-item active" aria-current="page"><span>General</span></li>
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
                                    <h1 style="font-weight: 900">GENERAL REPORT</h1>
                                    <h3 class="mb-0">{{ schedule_details.event_name }}</h3>
                                    <h4 class="mb-0">{{ pickerdate ? formatDateFdY(filters.from) + ' - ' + formatDateFdY(filters.to) : '' }}</h4>
                                    <h4 class="mb-0">{{ schedule_details.arena.name }}</h4>
                                </div>
                                <div class="col-xl-3 col-md-6 col-sm-6 col-12 layout-spacing pb-0 hide-on-print">
                                    <b-form class="simple-example">
                                        <b-form-row>
                                            <div class="col-md-12">
                                                <label for="" style="display:block">Date Range</label>
                                                <flat-pickr v-model="pickerdate" :config="{ mode: 'range' }" class="form-control flatpickr active"></flat-pickr>
                                            </div>
                                        </b-form-row>
                                    </b-form>
                                </div>
                                <div class="col-xl-2 col-md-2 col-sm-2 col-12 hide-on-print">
                                    <b-form class="simple-example">
                                        <b-form-row>
                                            <div class="col-md-6">
                                                <label for="" style="display:block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                                <b-button variant="warning" size="lg" class="mb-4 mr-2" @click="init()" :disabled="!filters.from || !filters.to">Generate</b-button>
                                            </div>
                                        </b-form-row>
                                    </b-form>
                                </div>
                                <div class="col-xl-4 col-md-2 col-sm-2 col-12"></div>
                                <div class="col-xl-3 col-md-2 col-sm-2 col-12 text-right hide-on-print">
                                    <b-form class="simple-example">
                                        <b-form-row>
                                            <div class="col-md-12 mb-4">
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
                                    <h3 style="font-weight: 900">BETTING</h3>

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
                                                        <h4 class="mb-0" style="font-weight: 600">{{ fight_bet_report.meron_count }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">BET COUNT</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ fight_bet_report.wala_count }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">BET COUNT</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ fight_bet_report.draw_count }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">BET COUNT</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ fight_bet_report.total_bet_count }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL BET COUNT</h6>
                                                    </div>
                                                </b-td>
                                            </b-tr>
                                            <b-tr class="text-right">
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0 text-" style="font-weight: 600">{{ formatNumberStringDecimal(fight_bet_report.meron_bet) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">BET AMOUNT</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(fight_bet_report.wala_bet) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">BET AMOUNT</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(fight_bet_report.draw_bet) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">BET AMOUNT</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(fight_bet_report.total_amount) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL BET AMOUNT</h6>
                                                    </div>
                                                </b-td>
                                            </b-tr>
                                            <b-tr class="text-right">
                                                <b-td colspan="2" class=""> </b-td>
                                                <b-td class="">
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(fight_bet_report.total_draw_payout) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL DRAW PAYOUT</h6>
                                                    </div>
                                                </b-td>
                                                <b-td class="">
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 :class="`mb-0 ${parseFloat(fight_bet_report.draw_commission) ? 'text-danger' : ''}`" style="font-weight: 600">
                                                            {{ formatNumberStringDecimal(fight_bet_report.draw_commission) }}
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
                                                            {{ formatNumberStringDecimal(fight_bet_report.total_commission) }}
                                                        </h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL COMMISSION</h6>
                                                    </div>
                                                </b-td>
                                            </b-tr>
                                        </b-tbody>
                                    </b-table-simple>
                                </div>

                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing ">
                                    <h3 style="font-weight: 900">TRANSACTION</h3>
                                    <b-table-simple responsive bordered hover class="text-center">
                                        <b-thead>
                                            <!-- <b-tr style="">
                                                <b-th class=" text-white bg-danger " style="width: 25%; font-size: 1.5em">Meron</b-th>
                                                <b-th class=" text-white bg-primary " style="width: 25%; font-size: 1.5em">Wala</b-th>
                                                <b-th class=" text-white bg-success" style="width: 25%; font-size: 1.5em">Draw</b-th>
                                                <b-th class=" text-white bg-dark " style="width: 25%; font-size: 1.5em">Overall</b-th>
                                            </b-tr> -->
                                        </b-thead>

                                        <b-tbody>
                                            <b-tr class="text-right">
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(transaction_report.money_in) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL MONEY IN</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(transaction_report.pending_money_in) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL PENDING MONEY IN</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(transaction_report.approved_money_in) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL APPROVED MONEY IN</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(transaction_report.cancelled_money_in) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL CANCELLED MONEY IN</h6>
                                                    </div>
                                                </b-td>
                                            </b-tr>
                                            <b-tr class="text-right">
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(transaction_report.money_out) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL MONEY OUT</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(transaction_report.pending_money_out) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL PENDING MONEY OUT</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(transaction_report.approved_money_out) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL APPROVED MONEY OUT</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(transaction_report.cancelled_money_out) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL CANCELLED MONEY OUT</h6>
                                                    </div>
                                                </b-td>
                                            </b-tr>
                                        </b-tbody>
                                    </b-table-simple>
                                </div>
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing ">
                                    <!-- <h3 style="font-weight: 900">TRANSACTION</h3> -->
                                    <b-table-simple responsive bordered hover class="text-center">
                                        <b-thead>
                                            <!-- <b-tr style="">
                                                <b-th class=" text-white bg-danger " style="width: 25%; font-size: 1.5em">Meron</b-th>
                                                <b-th class=" text-white bg-primary " style="width: 25%; font-size: 1.5em">Wala</b-th>
                                                <b-th class=" text-white bg-success" style="width: 25%; font-size: 1.5em">Draw</b-th>
                                                <b-th class=" text-white bg-dark " style="width: 25%; font-size: 1.5em">Overall</b-th>
                                            </b-tr> -->
                                        </b-thead>

                                        <b-tbody>
                                            <b-tr class="text-right">
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ total_events }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL EVENTS</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ total_players }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL PLAYERS</h6>
                                                    </div>
                                                </b-td>
                                            </b-tr>
                                        </b-tbody>
                                    </b-table-simple>
                                </div>
                            </div>
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

    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import '@/assets/sass/forms/custom-flatpickr.css';

    import { mapState, mapActions } from 'vuex';
    export default {
        metaInfo: { title: 'Tables' },
        components: {
            flatPickr
        },
        data() {
            return {
                is_loading: false,
                pickerdate: '',
                filters: {
                    from: '',
                    to: ''
                },
                schedule_details: {
                    event_name: '',
                    datetime: '',
                    arena: {
                        name: ''
                    }
                },

                result_count: [],
                fight_bet_report: {
                    meron_bet: 0,
                    wala_bet: 0,
                    draw_bet: 0,
                    total_amount: 0,
                    meron_count: 0,
                    wala_count: 0,
                    draw_count: 0,
                    total_bet_count: 0,
                    draw_commission: 0,
                    total_commission: 0
                },
                transaction_report: {
                    money_in: 0,
                    money_out: 0,
                    pending_money_in: 0,
                    pending_money_out: 0,
                    approved_money_in: 0,
                    approved_money_out: 0,
                    cancelled_money_in: 0,
                    cancelled_money_out: 0
                },
                total_events: 0,
                total_players: 0
            };
        },
        watch: {
            pickerdate() {
                let pickerdate_split = this.pickerdate.split(' ');
                if (pickerdate_split.length == 3) {
                    this.filters.from = pickerdate_split[0] + ' 00:00:00';
                    this.filters.to = pickerdate_split[2] + ' 23:59:59';
                } else if (pickerdate_split.length == 1) {
                    this.filters.from = pickerdate_split[0] + ' 00:00:00';
                    this.filters.to = pickerdate_split[0] + ' 23:59:59';
                } else {
                    this.filters.from = '';
                    this.filters.to = '';
                }
            }
        },
        computed: {
            ...mapState('transaction', {
                transaction_data: 'data'
            })
        },
        methods: {
            ...mapActions('report', {
                rep_general: 'generalReport'
            }),
            ...mapActions('schedule', {
                schedule_go: 'getOne'
            }),
            ...mapActions('transaction', {
                transaction_gl: 'getList'
            }),
            async init() {
                var vm = this;
                vm.is_loading = true;

                var pl = {};
                if (vm.filters.from && vm.filters.to) {
                    pl.from = vm.filters.from;
                    pl.to = vm.filters.to;
                }

                // report
                const report = await vm.rep_general(pl);
                if (report) {
                    var br = report.fight_bet_report[0];
                    console.log(br);

                    vm.fight_bet_report.meron_bet = br.meron_bet;
                    vm.fight_bet_report.wala_bet = br.wala_bet;
                    vm.fight_bet_report.draw_bet = br.draw_bet;
                    vm.fight_bet_report.total_amount = br.total_amount;
                    vm.fight_bet_report.meron_count = br.meron_count;
                    vm.fight_bet_report.wala_count = br.wala_count;
                    vm.fight_bet_report.draw_count = br.draw_count;
                    vm.fight_bet_report.total_bet_count = parseInt(br.meron_count) + parseInt(br.wala_count) + parseInt(br.draw_count);
                    vm.fight_bet_report.draw_commission = br.draw_commission;
                    vm.fight_bet_report.total_commission = br.total_commission;

                    vm.fight_bet_report.total_draw_bet_win_count = br.total_draw_bet_win_count;
                    vm.fight_bet_report.total_draw_bet_lose_count = vm.fight_bet_report.draw_count - vm.fight_bet_report.total_draw_bet_win_count;
                    vm.fight_bet_report.total_draw_payout = br.total_draw_payout;

                    var tr = report.transaction_report;
                    vm.transaction_report.money_in = tr.total_money_in[0].amount;
                    vm.transaction_report.money_out = tr.total_money_out[0].amount;
                    vm.transaction_report.pending_money_in = tr.total_pending_money_in[0].amount;
                    vm.transaction_report.pending_money_out = tr.total_pending_money_out[0].amount;
                    vm.transaction_report.approved_money_in = tr.total_approved_money_in[0].amount;
                    vm.transaction_report.approved_money_out = tr.total_approved_money_out[0].amount;
                    vm.transaction_report.cancelled_money_in = tr.total_cancelled_money_in[0].amount;
                    vm.transaction_report.cancelled_money_out = tr.total_cancelled_money_out[0].amount;

                    vm.total_events = report.total_events ? vm.formatNumberString(report.total_events) : 0;
                    vm.total_players = report.total_players ? vm.formatNumberString(report.total_players) : 0;
                }

                // fight
                // pl.sort_column = 'id';
                // pl.sort_order = 'asc';
                // await vm.transaction_gl(pl);

                vm.is_loading = false;
            },
            printReport() {
                window.print();
            }
        },
        mounted() {}
    };
</script>
