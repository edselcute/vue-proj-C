<template>
    <div class="layout-px-spacing">
        <portal to="breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Admin</a></li>
                                <li class="breadcrumb-item" aria-current="page"><span> Report</span></li>
                                <li class="breadcrumb-item active" aria-current="page"><span> Schedule</span></li>
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
                                <div class="col-xl-2 col-md-2 col-sm-2 col-12">
                                    <b-form class="simple-example">
                                        <b-form-row>
                                            <div class="col-md-12 mb-4">
                                                <label for="arena">Event Name</label>
                                                <b-input id="arena" placeholder="" v-model="filters.search_key"></b-input>
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
                                <div class="col-xl-2 col-md-2 col-sm-2 col-12"></div>
                            </div>
                        </div>

                        <div class="panel-body">
                            <b-table-simple responsive bordered hover class="text-center">
                                <b-thead>
                                    <b-tr>
                                        <b-th>#</b-th>
                                        <b-th style="width:35%">Event Name</b-th>
                                        <b-th>Event Date</b-th>
                                        <b-th>Arena</b-th>
                                        <b-th>Total Fights</b-th>
                                        <b-th>Action</b-th>
                                    </b-tr>
                                </b-thead>
                                <b-tbody v-if="is_loading">
                                    <b-tr v-for="n in 20" :key="n">
                                        <b-td v-for="m in 6" :key="m"><div class="spinner-grow align-self-center loader-sm table-loader"></div></b-td>
                                    </b-tr>
                                </b-tbody>
                                <b-tbody v-else>
                                    <b-tr v-for="(r, index) in data.list" :key="r.id">
                                        <b-td>{{ index + 1 + (data.current_page - 1) * data.per_page }}</b-td>
                                        <b-td>{{ r.event_name }}</b-td>
                                        <b-td>{{ formatDateFdY(r.datetime) }}</b-td>
                                        <b-td>{{ r.arena.name }}</b-td>
                                        <b-td>{{ r.total_fights }}</b-td>
                                        <b-td>
                                            <ul class="table-controls">
                                                <li>
                                                    <router-link tag="button" class="btn btn-warning btn-sm" :to="`/1_admin/report/schedule/${r.id}`">View Report</router-link>
                                                </li>
                                            </ul>
                                        </b-td>
                                    </b-tr>
                                </b-tbody>
                            </b-table-simple>
                        </div>
                        <div class="justify-content-flex-end">
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
        metaInfo: { title: 'Event Report' },
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
                    to: ''
                },
                params: { id: null, name: '', owner_name: '' },
                mode: 0,
                submitted: 0
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
            ...mapState('schedule', ['data'])
        },
        methods: {
            ...mapActions('schedule', {
                gl: 'getList',
                go: 'getOne',
                cr: 'create',
                up: 'update',
                de: 'delete'
            }),
            async paginate(n, isReset) {
                var vm = this;
                vm.is_loading = true;
                var pl = { page_no: n ? n : 1, limit: 50, status: 2 };

                if (isReset) {
                    vm.filters.search_key = '';
                    vm.dateRangePicker = '';
                    vm.filters.from = '';
                    vm.filters.to = '';
                }

                if (vm.filters.search_key) {
                    pl.search_key = vm.filters.search_key;
                }

                if (vm.filters.from && vm.filters.to) {
                    pl.from = vm.filters.from;
                    pl.to = vm.filters.to;
                }

                await vm.gl(pl);
                vm.is_loading = false;
            },
            reset() {
                this.filters.search_key = '';
                this.dateRangePicker = '';
                this.submitted = 0;
                this.params.id = 0;
                this.params.name = '';
                this.params.owner_name = '';
            }
        },
        mounted() {
            this.paginate(1);
        }
    };
</script>
