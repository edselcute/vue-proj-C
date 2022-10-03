<template>
    <div class="layout-px-spacing">
        <portal to="breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Admin</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Monthly Report</span></li>
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
                                <div class="col-xl-12 col-md-12 col-sm-12 col-12 layout-spacing">
                                    <h4>Month of May 2022 Report</h4>
                                </div>
                                <div class="col-xl-2 col-md-2 col-sm-2 col-12">
                                    <b-form class="simple-example">
                                        <b-form-row>
                                            <div class="col-md-12 mb-4">
                                                <label for="Month">Month</label>
                                                <b-select :value="5">
                                                    <b-select-option value="0">Open this select menu</b-select-option>
                                                    <b-select-option value="1">January</b-select-option>
                                                    <b-select-option value="2">February</b-select-option>
                                                    <b-select-option value="3">March</b-select-option>
                                                    <b-select-option value="4">April</b-select-option>
                                                    <b-select-option value="5">May</b-select-option>
                                                    <b-select-option value="6">June</b-select-option>
                                                    <b-select-option value="7">July</b-select-option>
                                                    <b-select-option value="8">August</b-select-option>
                                                    <b-select-option value="9">September</b-select-option>
                                                    <b-select-option value="10">October</b-select-option>
                                                    <b-select-option value="11">November</b-select-option>
                                                    <b-select-option value="12">December</b-select-option>
                                                </b-select>
                                            </div>
                                        </b-form-row>
                                    </b-form>
                                </div>
                                <div class="col-xl-2 col-md-2 col-sm-2 col-12">
                                    <b-form class="simple-example">
                                        <b-form-row>
                                            <div class="col-md-12 mb-4">
                                                <label for="Year">Year</label>
                                                <b-input id="fullName" value="2022"></b-input>
                                            </div>
                                        </b-form-row>
                                    </b-form>
                                </div>
                                <div class="col-xl-2 col-md-2 col-sm-2 col-12">
                                    <b-form class="simple-example">
                                        <b-form-row>
                                            <div class="col-md-12 mb-4">
                                                <label for="" style="display:block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                                <b-button variant="primary" size="lg" class="mb-4 mr-2">Submit</b-button>
                                            </div>
                                        </b-form-row>
                                    </b-form>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div class="row widget-statistic">
                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 layout-spacing">
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
                                                    <p class="w-value">{{ summary.meron_total_bet > 0 ? formatNumberString(summary.meron_total_bet) : '0' }}</p>
                                                    <h5>Meron Total Bet</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 layout-spacing">
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
                                                    <p class="w-value">{{ summary.wala_total_bet > 0 ? formatNumberString(summary.wala_total_bet) : '0' }}</p>
                                                    <h5>Wala Total Bet</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 layout-spacing">
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
                                                    <p class="w-value">{{ summary.draw_total_bet > 0 ? formatNumberString(summary.draw_total_bet) : '0' }}</p>
                                                    <h5>Draw Total Bet</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 layout-spacing">
                                    <div class="widget ">
                                        <div class="widget-heading">
                                            <div class="w-title">
                                                <div class="w-icon icon-fill-secondary">
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
                                                    <p class="w-value">{{ summary.total_bet > 0 ? formatNumberString(summary.total_bet) : '0' }}</p>
                                                    <h5>Total Bet</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 layout-spacing">
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
                                                    <p class="w-value">{{ summary.meron_total_count > 0 ? formatNumberString(summary.meron_total_count) : '0' }}</p>
                                                    <h5>Meron Total Count</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 layout-spacing">
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
                                                    <p class="w-value">{{ summary.wala_total_count > 0 ? formatNumberString(summary.wala_total_count) : '0' }}</p>
                                                    <h5>Wala Total Count</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 layout-spacing">
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
                                                    <p class="w-value">{{ summary.draw_total_count > 0 ? formatNumberString(summary.draw_total_count) : '0' }}</p>
                                                    <h5>Draw Total Count</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 layout-spacing">
                                    <div class="widget ">
                                        <div class="widget-heading">
                                            <div class="w-title">
                                                <div class="w-icon icon-fill-secondary">
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
                                                    <p class="w-value">{{ summary.total_count > 0 ? formatNumberString(summary.total_count) : '0' }}</p>
                                                    <h5>Total Count</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing">
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
                                                    <p class="w-value">{{ summary.draw_win_total > 0 ? formatNumberString(summary.draw_win_total) : '0' }}</p>
                                                    <h5>Draw win Total</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing">
                                    <div class="widget ">
                                        <div class="widget-heading">
                                            <div class="w-title">
                                                <div class="w-icon icon-fill-secondary">
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
                                                    <p class="w-value">{{ summary.total_profit > 0 ? formatNumberString(summary.total_profit) : '0' }}</p>
                                                    <h5>Total Profit</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <b-table-simple responsive bordered hover>
                                <b-thead>
                                    <b-tr>
                                        <b-th></b-th>
                                        <b-th colspan="4" class="text-center">Amount</b-th>
                                        <b-th colspan="4" class="text-center">Count</b-th>
                                        <b-th></b-th>
                                        <b-th></b-th>
                                    </b-tr>
                                    <b-tr>
                                        <b-th>Day</b-th>
                                        <b-th>Meron Bet</b-th>
                                        <b-th>Wala Bet</b-th>
                                        <b-th>Draw Bet</b-th>
                                        <b-th>Total Bet</b-th>
                                        <b-th>Meron Bet</b-th>
                                        <b-th>Wala Bet</b-th>
                                        <b-th>Draw Bet</b-th>
                                        <b-th>Total Bet</b-th>
                                        <b-th>Draw Total Win</b-th>
                                        <b-th>Profit</b-th>
                                    </b-tr>
                                </b-thead>
                                <b-tbody>
                                    <!-- <b-tr  v-for="(row, index) in items" :key="index"> -->
                                    <b-tr v-for="(r, index) in report" :key="r.id">
                                        <b-td class="text-right">{{ index + 1 }}</b-td>
                                        <b-td class="text-right">{{ r.meron_bet > 0 ? formatNumberString(parseFloat(r.meron_bet)) : '0' }}</b-td>
                                        <b-td class="text-right">{{ r.wala_bet > 0 ? formatNumberString(parseFloat(r.wala_bet)) : '0' }}</b-td>
                                        <b-td class="text-right">{{ r.draw_bet > 0 ? formatNumberString(parseFloat(r.draw_bet)) : '0' }}</b-td>
                                        <b-td class="text-right">{{ r.total_amount > 0 ? formatNumberString(parseFloat(r.total_amount)) : '0' }}</b-td>
                                        <b-td class="text-right">{{ r.meron_count > 0 ? formatNumberString(parseFloat(r.meron_count)) : '0' }}</b-td>
                                        <b-td class="text-right">{{ r.wala_count > 0 ? formatNumberString(parseFloat(r.wala_count)) : '0' }}</b-td>
                                        <b-td class="text-right">{{ r.draw_count > 0 ? formatNumberString(parseFloat(r.draw_count)) : '0' }}</b-td>
                                        <b-td class="text-right">{{ r.total_amount > 0 ? formatNumberString(parseFloat(r.total_amount)) : '0' }}</b-td>
                                        <b-td class="text-right">{{ r.draw_commission > 0 ? formatNumberString(parseFloat(r.draw_commission)) : '0' }}</b-td>
                                        <b-td class="text-right">{{ r.total_commission > 0 ? formatNumberString(parseFloat(r.total_commission)) : '0' }}</b-td>
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
                code_arr: [],
                table_1: [],
                table_2: [],
                options1: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                inputs: [],
                value: { name: 'orange' },

                report: [],
                summary: {
                    meron_total_bet: 0,
                    wala_total_bet: 0,
                    draw_total_bet: 0,
                    total_bet: 0,
                    meron_total_count: 0,
                    wala_total_count: 0,
                    draw_total_count: 0,
                    total_count: 0,
                    draw_win_total: 0,
                    total_profit: 0
                }
            };
        },

        computed: {
            ...mapState('report', ['data'])
        },
        methods: {
            ...mapActions('report', {
                gl: 'getList',
                go: 'getOne'
            }),
            toggleCode(name) {
                if (this.code_arr.includes(name)) {
                    this.code_arr = this.code_arr.filter(d => d != name);
                } else {
                    this.code_arr.push(name);
                }
            },
            init_tables() {},
            random_class(index) {
                if (index == 0) {
                    return 'default';
                } else if (index == 1) {
                    return 'primary';
                } else if (index == 2) {
                    return 'secondary';
                } else if (index == 3) {
                    return 'success';
                } else if (index == 4) {
                    return 'dark';
                } else if (index == 5) {
                    return 'danger';
                } else if (index == 6) {
                    return 'info';
                } else if (index == 7) {
                    return 'warning';
                }
                return 'dark';
            },
            // async getDate(id) {
            //     var vm = this;
            //     const res = await vm.go({ id: id });
            //     if (res) {
            //         vm.params.id = id;
            //         vm.params.name = res.name;
            //     }
            //     // await vm.$bvModal.show('arenaModal');
            // },
            async getReport() {
                const currentMonth = new Date().getMonth() + 1;
                const currentYear = new Date().getFullYear();
                // console.log(currentMonth);
                // console.log(currentYear);
                var vm = this;
                const res = await vm.go({ month: currentMonth, year: currentYear });
                if (res) {
                    // console.log(res)
                    vm.report = res;
                    vm.report.forEach(r => {
                        vm.summary.meron_total_bet += parseFloat(r.meron_bet);
                        vm.summary.wala_total_bet += parseFloat(r.wala_bet);
                        vm.summary.draw_total_bet += parseFloat(r.draw_bet);
                        vm.summary.total_bet += parseFloat(r.total_amount);
                        vm.summary.meron_total_count += parseFloat(r.meron_count);
                        vm.summary.wala_total_count += parseFloat(r.wala_count);
                        vm.summary.draw_total_count += parseFloat(r.draw_count);
                        vm.summary.total_count += parseFloat(r.total_amount);
                        vm.summary.draw_win_total += parseFloat(r.draw_commission);
                        vm.summary.total_profit += parseFloat(r.total_commission);
                    });
                }
                // await vm.$bvModal.show('arenaModal');
            }
            // async test() {
            //     console.log(data);
            // }
        },
        mounted() {
            this.getReport();
        }
    };
</script>
