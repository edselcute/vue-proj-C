<template>
    <div class="layout-px-spacing">
        <portal to="breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Admin</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Bet Logs</span></li>
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
                                <div class="col-xl-3 col-md-2 col-sm-2 col-12">
                                    <b-form class="simple-example">
                                        <b-form-row>
                                            <div class="col-md-12 mb-4">
                                                <label for="" style="display:block">Date Range</label>
                                                <flat-pickr v-model="dateRangePicker" :config="{ mode: 'range' }" class="form-control flatpickr active"></flat-pickr>
                                            </div>
                                        </b-form-row>
                                    </b-form>
                                </div>
                                <div class="col-xl-3 col-md-2 col-sm-2 col-12">
                                    <b-form class="simple-example">
                                        <b-form-row>
                                            <div class="col-md-12 mb-4">
                                                <label for="schedule">Schedule</label>
                                                <b-select v-model="filters.schedule_id">
                                                    <!-- <b-select-option value="" selected disabled>Select Schedule</b-select-option> -->
                                                    <b-select-option :value="r.id" v-for="r in schedules" :key="r.id">{{ r.event_name + ' - ' + formatDateFdY(r.datetime) }}</b-select-option>
                                                </b-select>
                                            </div>
                                        </b-form-row>
                                    </b-form>
                                </div>
                                <div class="col-xl-2 col-md-2 col-sm-2 col-12">
                                    <b-form class="simple-example">
                                        <b-form-row>
                                            <div class="col-md-12 mb-4">
                                                <label for="Username">Barcode</label>
                                                <b-input id="username" placeholder="" v-model="filters.search_key"></b-input>
                                            </div>
                                        </b-form-row>
                                    </b-form>
                                </div>
                                <div class="col-xl-2 col-md-2 col-sm-2 col-12">
                                    <b-form class="simple-example">
                                        <b-form-row>
                                            <div class="col-md-6">
                                                <label for="" style="display:block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                                <b-button variant="primary" size="lg" class="mb-4 mr-2" @click="paginate(1)">Search</b-button>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="" style="display:block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                                <b-button variant="danger" size="lg" class="mb-4 mr-2" @click="paginate(1, true)">Reset</b-button>
                                            </div>
                                        </b-form-row>
                                    </b-form>
                                </div>
                            </div>
                        </div>

                        <div class="panel-body">
                            <b-table-simple responsive bordered hover class="text-center">
                                <b-thead>
                                    <b-tr>
                                        <b-th>ID</b-th>
                                        <b-th>Cashier</b-th>
                                        <b-th>Fight no.</b-th>
                                        <b-th>Barcode ID</b-th>
                                        <b-th>Bet Select</b-th>
                                        <b-th>Bet Amount</b-th>
                                        <b-th>Payout</b-th>
                                        <b-th>Total Win</b-th>
                                        <b-th>Game Status</b-th>
                                        <b-th>Bet Status</b-th>
                                        <b-th>Bet Date</b-th>
                                        <b-th>Claimed Status</b-th>
                                    </b-tr>
                                </b-thead>
                                <b-tbody v-if="is_loading">
                                    <b-tr v-for="n in 20" :key="n">
                                        <b-td v-for="m in 12" :key="m"><div class="spinner-grow align-self-center loader-sm table-loader"></div></b-td>
                                    </b-tr>
                                </b-tbody>
                                <b-tbody v-else>
                                    <b-tr v-for="r in data.list" :key="r.id">
                                        <b-td>{{ r.id }}</b-td>
                                        <b-td>{{ r.user_id }}</b-td>
                                        <b-td>{{ r.fight.fight_no }}</b-td>
                                        <b-td>{{ r.barcode }}</b-td>
                                        <b-td
                                            ><span :class="`${r.bet_select == 1 ? 'text-danger' : r.bet_select == 2 ? 'text-primary' : r.bet_select == 3 ? 'text-success' : ''}`">{{
                                                r.bet_select == 1 ? 'MERON' : r.bet_select == 2 ? 'WALA' : r.bet_select == 3 ? 'DRAW' : ''
                                            }}</span></b-td
                                        >
                                        <b-td>{{ formatNumberString(r.bet_amount) }}</b-td>
                                        <b-td> {{ r.bet_select == 1 ? parseFloat(r.fight.meron_payout).toFixed(2) : r.bet_select == 2 ? parseFloat(r.fight.wala_payout).toFixed(2) : '--' }}</b-td>
                                        <b-td>{{ r.status == 1 ? formatNumberStringDecimal(r.result_amount) : '' }}</b-td>
                                        <b-td
                                            ><span :class="r.fight.status > 1 ? 'text-info' : 'text-warning'">{{ formatFightStatus(r.fight.status) }}</span></b-td
                                        >
                                        <b-td :class="`${r.status == 1 && [1, 2].includes(r.result) ? 'text-warning' : r.status == 1 && [3, 4].includes(r.result) ? 'text-danger' : 'text-dark'}`">
                                            {{ formatResult(r.result, r.status) }}
                                        </b-td>
                                        <b-td>{{ formatDateFdY(r.created_at) }}</b-td>
                                        <b-td>
                                            <b-badge :variant="`${r.claimed ? 'success' : 'danger'}`" v-if="r.status == 1">{{ r.claimed ? 'Claimed' : 'Unclaimed' }}</b-badge>
                                            <!-- <b-badge :variant="`secondary`" v-if="r.status == 2">{{ 'Obtained' }}</b-badge> -->
                                        </b-td>
                                    </b-tr>
                                </b-tbody>
                            </b-table-simple>
                        </div>
                        <div class="panel-body">
                            <pagination v-if="data.list.length > 0" :data="data" @emitpage="paginate" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //flatpickr
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import '@/assets/sass/forms/custom-flatpickr.css';

    import '@/assets/sass/scrollspyNav.scss';
    import '@/assets/sass/tables/table-basic.scss';
    import pagination from '@/components/pagination';
    import { mapState, mapActions } from 'vuex';

    export default {
        metaInfo: { title: 'Bet Logs' },
        components: {
            flatPickr,
            pagination
        },
        data() {
            return {
                is_loading: false,
                dateRangePicker: '',
                filters: {
                    search_key: '',
                    from: '',
                    to: '',
                    schedule_id: ''
                }
            };
        },
        watch: {
            dateRangePicker() {
                let dateRangePicker_split = this.dateRangePicker.split(' ');
                if (dateRangePicker_split.length == 3) {
                    this.filters.from = dateRangePicker_split[0];
                    this.filters.to = dateRangePicker_split[2];
                } else {
                    this.filters.from = '';
                    this.filters.to = '';
                }
            }
        },
        computed: {
            ...mapState('bet', ['data']),
            ...mapState('schedule', ['schedules'])
        },

        methods: {
            ...mapActions('bet', {
                bet_gl: 'getList'
            }),
            ...mapActions('schedule', {
                schedule_gs: 'getSchedules'
            }),
            async paginate(n, isReset) {
                var vm = this;
                vm.is_loading = true;
                var pl = { page_no: n ? n : 1, limit: 50, sort_column: 'id', sort_order: 'desc' };

                if (isReset) {
                    vm.filters.search_key = '';
                    vm.dateRangePicker = '';
                    vm.filters.from = '';
                    vm.filters.to = '';
                    vm.filters.schedule_id = '';
                }

                if (vm.filters.search_key) {
                    pl.search_key = vm.filters.search_key;
                }

                if (vm.filters.from && vm.filters.to && vm.filters.to) {
                    pl.from = vm.filters.from;
                    pl.to = vm.filters.to;
                }

                if (vm.filters.schedule_id) {
                    pl.schedule_id = vm.filters.schedule_id;
                }

                await vm.bet_gl(pl);
                vm.is_loading = false;
            },
            reset() {
                var vm = this;
                vm.filters.search_key = '';
                vm.dateRangePicker = '';
                vm.filters.schedule_id = '';
            }
        },

        mounted() {
            this.paginate(1);
            this.schedule_gs();
        }
    };
</script>
