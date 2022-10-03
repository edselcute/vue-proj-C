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
                                <li class="breadcrumb-item active" aria-current="page"><span>Transaction</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </portal>

        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div id="tableHover" class="col-lg-12 col-12 layout-spacing">
                    <div id="" class="statbox panel box box-shadow ">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xl-12 col-md-12 col-sm-12 col-12 layout-spacing text-center pb-0 text-uppercase">
                                    <h1 style="font-weight: 900">TRANSACTION REPORT</h1>
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
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing ">
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
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(total_count.money_in) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL MONEY IN</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(total_count.pending_money_in) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL PENDING MONEY IN</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(total_count.approved_money_in) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL APPROVED MONEY IN</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(total_count.cancelled_money_in) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL CANCELLED MONEY IN</h6>
                                                    </div>
                                                </b-td>
                                            </b-tr>
                                            <b-tr class="text-right">
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(total_count.money_out) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL MONEY OUT</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(total_count.pending_money_out) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL PENDING MONEY OUT</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(total_count.approved_money_out) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL APPROVED MONEY OUT</h6>
                                                    </div>
                                                </b-td>
                                                <b-td>
                                                    <div class="spinner-grow align-self-center loader-sm table-loader" v-if="is_loading"></div>
                                                    <div v-else>
                                                        <h4 class="mb-0" style="font-weight: 600">{{ formatNumberStringDecimal(total_count.cancelled_money_out) }}</h4>
                                                        <h6 class="mb-0" style="color: #888ea8">TOTAL CANCELLED MONEY OUT</h6>
                                                    </div>
                                                </b-td>
                                            </b-tr>
                                        </b-tbody>
                                    </b-table-simple>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <b-table-simple responsive bordered hover class="text-center">
                                <b-thead>
                                    <b-tr>
                                        <b-th>#</b-th>
                                        <b-th>Username</b-th>
                                        <b-th>User Type</b-th>
                                        <b-th>Transaction</b-th>
                                        <b-th>Amount</b-th>
                                        <b-th>Note</b-th>
                                        <b-th>Created At</b-th>
                                        <b-th>Status</b-th>
                                    </b-tr>
                                </b-thead>
                                <b-tbody v-if="is_loading">
                                    <b-tr v-for="n in 20" :key="n">
                                        <b-td v-for="m in 8" :key="m"><div class="spinner-grow align-self-center loader-sm table-loader"></div></b-td>
                                    </b-tr>
                                </b-tbody>
                                <b-tbody v-else>
                                    <b-tr v-for="(r, index) in transaction_data.list" :key="r.id">
                                        <b-td>{{ index + 1 + (transaction_data.current_page - 1) * transaction_data.per_page }}</b-td>
                                        <b-td>{{ r.user.username }}</b-td>
                                        <b-td>{{ formatUserType(r.user_type_id) }}</b-td>
                                        <b-td>
                                            <div v-if="r.type == 1">Cash In</div>
                                            <div v-if="r.type == 2">Cash Out</div>
                                        </b-td>
                                        <b-td>{{ formatNumberStringDecimal(r.amount) }}</b-td>
                                        <b-td>{{ r.note }}</b-td>
                                        <b-td>{{ formatDateFdY(r.created_at) }}</b-td>

                                        <b-td
                                            ><b-badge :variant="r.status == 1 ? 'success' : r.status == 2 ? 'danger' : 'warning'">
                                                {{ r.status == 1 ? 'Approved' : r.status == 2 ? 'Cancelled' : 'Pending' }}
                                            </b-badge>
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
</template>

<script>
    import '@/assets/sass/scrollspyNav.scss';
    import '@/assets/sass/tables/table-basic.scss';
    import '@/assets/sass/widgets/widgets.scss';

    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import '@/assets/sass/forms/custom-flatpickr.css';

    import { mapState, mapActions, mapMutations } from 'vuex';
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
                total_count: {
                    money_in: 0,
                    money_out: 0,
                    pending_money_in: 0,
                    pending_money_out: 0,
                    approved_money_in: 0,
                    approved_money_out: 0,
                    cancelled_money_in: 0,
                    cancelled_money_out: 0
                }
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
                rep_transaction: 'transactionReport'
            }),
            ...mapActions('schedule', {
                schedule_go: 'getOne'
            }),
            ...mapActions('transaction', {
                transaction_gl: 'getList'
            }),
            ...mapMutations('transaction', {
                trasaction_cd: 'clearData'
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
                const report = await vm.rep_transaction(pl);
                console.log(report);
                if (report) {
                    vm.total_count.money_in = report.total_money_in[0].amount ? vm.formatNumberString(parseFloat(report.total_money_in[0].amount)) : 0;
                    vm.total_count.money_out = report.total_money_out[0].amount ? vm.formatNumberString(parseFloat(report.total_money_out[0].amount)) : 0;
                    vm.total_count.pending_money_in = report.total_pending_money_in[0].amount ? vm.formatNumberString(parseFloat(report.total_pending_money_in[0].amount)) : 0;
                    vm.total_count.pending_money_out = report.total_pending_money_out[0].amount ? vm.formatNumberString(parseFloat(report.total_pending_money_out[0].amount)) : 0;
                    vm.total_count.approved_money_in = report.total_approved_money_in[0].amount ? vm.formatNumberString(parseFloat(report.total_approved_money_in[0].amount)) : 0;
                    vm.total_count.approved_money_out = report.total_approved_money_out[0].amount ? vm.formatNumberString(parseFloat(report.total_approved_money_out[0].amount)) : 0;
                    vm.total_count.cancelled_money_in = report.total_cancelled_money_in[0].amount ? vm.formatNumberString(parseFloat(report.total_cancelled_money_in[0].amount)) : 0;
                    vm.total_count.cancelled_money_out = report.total_cancelled_money_out[0].amount ? vm.formatNumberString(parseFloat(report.total_cancelled_money_out[0].amount)) : 0;
                }

                // fight
                pl.sort_column = 'id';
                pl.sort_order = 'asc';
                await vm.transaction_gl(pl);

                vm.is_loading = false;
            },
            printReport() {
                window.print();
            }
        },
        mounted() {
            this.trasaction_cd();
        }
    };
</script>
