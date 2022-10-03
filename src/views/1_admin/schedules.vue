<template>
    <div class="layout-px-spacing">
        <portal to="breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Admin</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Schedule</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
            <div>
                <b-button variant="success" class="mr-2" @click="showModal()" v-if="[1, 2].includes(user_type)">Create Schedule</b-button>
            </div>
        </portal>

        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div id="tableHover" class="col-lg-12 col-12 layout-spacing">
                    <div class="statbox panel box box-shadow">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xl-4 col-md-4 col-sm-12 col-12">
                                    <b-form class="simple-example">
                                        <b-form-row>
                                            <div class="col-md-12 mb-4">
                                                <label for="" style="display:block">Date Range</label>
                                                <flat-pickr v-model="dateRangePicker" :config="{ mode: 'range' }" class="form-control flatpickr active"></flat-pickr>
                                            </div>
                                        </b-form-row>
                                    </b-form>
                                </div>
                                <div class="col-xl-4 col-md-4 col-sm-12 col-12">
                                    <b-form class="simple-example">
                                        <b-form-row>
                                            <div class="col-md-12 mb-4">
                                                <label for="arena">Event Name</label>
                                                <b-input id="arena" placeholder="" v-model="filters.search_key"></b-input>
                                            </div>
                                        </b-form-row>
                                    </b-form>
                                </div>
                                <div class="col-xl-2 col-md-4 col-sm-6 col-12">
                                    <b-form class="simple-example">
                                        <b-form-row>
                                            <div class="col-xl-6 col-md-6 col-sm-6 col-6">
                                                <label for="" style="display:block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                                <b-button variant="primary" size="lg" class="mb-4 mr-2" @click="paginate(1)">Search</b-button>
                                            </div>
                                            <div class="col-xl-6 col-md-6 col-sm-6 col-6">
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
                                        <b-th>#</b-th>
                                        <b-th style="width:35%">Event Name</b-th>
                                        <b-th>Event Date</b-th>
                                        <b-th>Arena</b-th>
                                        <b-th>Profit %</b-th>
                                        <b-th>Draw Odds</b-th>
                                        <b-th>Total Fights</b-th>
                                        <b-th>Status</b-th>
                                        <b-th style="width:25%">Action</b-th>
                                    </b-tr>
                                </b-thead>
                                <b-tbody v-if="is_loading">
                                    <b-tr v-for="n in 20" :key="n">
                                        <b-td v-for="m in 9" :key="m"><div class="spinner-grow align-self-center loader-sm table-loader"></div></b-td>
                                    </b-tr>
                                </b-tbody>
                                <b-tbody v-else>
                                    <b-tr v-for="(r, index) in data.list" :key="r.id">
                                        <b-td>{{ index + 1 + (data.current_page - 1) * data.per_page }}</b-td>
                                        <b-td>{{ r.event_name }}</b-td>
                                        <b-td>{{ formatDateFdY(r.datetime) }}</b-td>
                                        <b-td>{{ r.arena.name }}</b-td>
                                        <b-td>{{ r.rake_percentage }}</b-td>
                                        <b-td>{{ r.draw_rake }}</b-td>
                                        <b-td>{{ r.total_fights }}</b-td>
                                        <b-td>
                                            <b-badge :variant="`${r.status == 0 ? 'danger' : r.status == 1 ? 'warning' : r.status == 2 ? 'primary' : ''}`">
                                                {{ r.status == 0 ? 'Pending' : r.status == 1 ? 'On-going' : r.status == 2 ? 'Finished' : 'Undefined' }}
                                            </b-badge>
                                        </b-td>
                                        <b-td>
                                            <ul class="table-controls">
                                                <!-- <li>
                                                    <router-link tag="button" class="btn btn-info btn-sm" :to="`/1_admin/schedule/fights/${r.id}`">Results</router-link>
                                                </li> -->
                                                <li>
                                                    <button class="btn btn-warning btn-sm" @click="updateStatus(r, 1)" v-if="r.status == 0">Open</button>
                                                    <button class="btn btn-secondary btn-sm" @click="updateStatus(r, 2)" v-if="r.status == 1 && [6].includes(user_type)">Finish</button>
                                                </li>
                                                <li>
                                                    <button class="btn btn-primary btn-sm" @click="showModal(r.id)" v-if="[1, 2].includes(user_type)">Edit</button>
                                                </li>
                                                <li>
                                                    <button class="btn btn-danger btn-sm" @click="remove(r.id)" v-if="[1, 2].includes(user_type)">Delete</button>
                                                </li>
                                                <li v-if="r.status == 1">
                                                    <!-- <button class="btn btn-success btn-sm" @click="remove(r.id)">Control</button> -->
                                                    <router-link tag="button" class="btn btn-success btn-sm" :to="`/1_admin/fight-control/${r.id}`">Control</router-link>
                                                </li>
                                            </ul>
                                        </b-td>
                                    </b-tr>
                                </b-tbody>
                            </b-table-simple>
                        </div>
                        <!-- <div class="panel-body">
                            <b-pagination :value="data.current_page" :total-rows="data.total" :per-page="data.per_page" prev-text="Prev" next-text="Next" first-number last-number class="f-right"></b-pagination>
                        </div> -->
                        <div class="justify-content-flex-end">
                            <pagination v-if="data.list.length > 0" :data="data" @emitpage="paginate" />
                            <!-- <b-pagination v-model="currentPage" :total-rows="data.total" class="pull-right"></b-pagination> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal centered id="scheduleModal" :static="true" :title="params.id ? 'Edit Schedule' : 'Add Schedule'" size="lg" @hidden="reset()">
            <div class="add-contact-box">
                <div class="add-contact-content">
                    <b-form id="scheduleModalTitle">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <!-- <b-input v-model="params.name" placeholder="Arena Id"></b-input> -->
                                    <b-form-row class=" mb-4">
                                        <b-form-group class=" col-md-6 " label="Event name">
                                            <b-input v-model="params.event_name" type="text" placeholder="Event Name"></b-input>
                                        </b-form-group>
                                        <b-form-group class="col-md-6" label="Event Date">
                                            <flat-pickr
                                                v-model="dateRangePickerModal"
                                                :config="{ mode: 'single', static: true, dateFormat: 'F d, Y' }"
                                                class="form-control flatpickr active"
                                                placeholder="Event Date"
                                            ></flat-pickr>
                                            <!-- <b-input v-model="params.datetime" type="date" placeholder="Event Date" format="yyyy-mm-dd"></b-input> -->
                                        </b-form-group>
                                        <b-form-group class="col-md-6" label="Arena">
                                            <!-- <b-input v-model="params.arena_id" type="text" placeholder="Arena Id"></b-input> -->
                                            <b-select v-model="params.arena_id">
                                                <b-select-option value="" selected disabled>Select Arena</b-select-option>
                                                <b-select-option :value="r.id" v-for="r in arenas" :key="r.id">{{ r.name }}</b-select-option>
                                            </b-select>
                                        </b-form-group>
                                        <!-- <b-form-group class="col-md-6" label="Admin Id">
                                            <b-input v-model="params.admin_id" type="text" placeholder="Admin Id"></b-input>
                                        </b-form-group> -->
                                        <b-form-group class="col-md-6" label="Profit %">
                                            <b-input v-model="params.rake_percentage" type="number" placeholder="Profit %"></b-input>
                                        </b-form-group>
                                        <b-form-group class="col-md-6" label="Draw Odds">
                                            <b-input v-model="params.draw_rake" type="number" placeholder="Draw Odds"></b-input>
                                        </b-form-group>
                                        <b-form-group class="col-md-6" label="Total Fights">
                                            <b-input v-model="params.total_fights" type="number" placeholder="Total Fights"></b-input>
                                        </b-form-group>

                                        <b-form-group class="col-md-6" label="Status" v-if="mode">
                                            <b-select v-model="params.status">
                                                <b-select-option value="" selected disabled>Select Status</b-select-option>
                                                <b-select-option value="0">Pending</b-select-option>
                                                <b-select-option value="1">On-going</b-select-option>
                                                <b-select-option value="2">Finished</b-select-option>
                                            </b-select>
                                        </b-form-group>
                                    </b-form-row>
                                </div>
                            </div>
                        </div>
                    </b-form>
                </div>
            </div>

            <template #modal-footer>
                <b-button variant="default" data-dismiss="modal" @click="$bvModal.hide('scheduleModal')"><i class="flaticon-cancel-12"></i> Discard</b-button>
                <b-button variant="default" id="btn-add" @click="submit()">{{ params.id ? 'Update' : 'Add' }}</b-button>
            </template>
        </b-modal>
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

    import { mapState, mapActions, mapGetters } from 'vuex';
    export default {
        metaInfo: { title: 'Schedules' },
        name: 'Schedules',
        components: {
            flatPickr,
            pagination
        },
        data() {
            return {
                is_loading: false,
                dateRangePicker: '',
                dateRangePickerModal: '',
                filters: {
                    search_key: '',
                    from: '',
                    to: ''
                },
                params: { id: null, event_name: '', arena_id: '', admin_id: '', total_fights: '', status: 0, datetime: '', rake_percentage: '', draw_rake: '' },
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
            },
            dateRangePickerModal() {
                if (this.dateRangePickerModal) {
                    this.params.datetime = this.formatDateYmD(this.dateRangePickerModal);
                } else {
                    this.params.datetime = '';
                }
            }
        },
        computed: {
            ...mapGetters('auth', ['user_type']),
            ...mapState('schedule', ['data']),
            ...mapState('arena', ['arenas'])
        },
        methods: {
            ...mapActions('schedule', {
                ga: 'getList',
                go: 'getOne',
                cr: 'create',
                up: 'update',
                us: 'updateStatus',
                de: 'delete'
            }),
            ...mapActions('arena', {
                garenas: 'getArenas'
            }),
            async showModal(id) {
                var vm = this;
                vm.mode = id ? 1 : 0;
                if (vm.mode) {
                    const res = await vm.go({ id: id });
                    if (res) {
                        vm.params.id = id;
                        vm.params.event_name = res.event_name;
                        vm.params.arena_id = res.arena_id;
                        vm.params.admin_id = res.admin_id;
                        vm.params.total_fights = res.total_fights;
                        vm.params.status = res.status;
                        vm.params.rake_percentage = res.rake_percentage;
                        vm.params.draw_rake = res.draw_rake;
                        vm.dateRangePickerModal = new Date(res.datetime);
                    }
                }
                await vm.$bvModal.show('scheduleModal');
            },
            async updateStatus($schedule, $status) {
                var vm = this;
                const confirmed = await vm
                    .$swal({
                        title: `Are you sure?`,
                        text: `${$status == 1 ? 'Open ' : $status == 2 ? 'Finish ' : ''} this schedule`,
                        showCancelButton: true
                    })
                    .then(result => {
                        return result.isConfirmed;
                    });

                if (confirmed) {
                    var payload = { id: $schedule.id, status: $status };
                    const res = await vm.us(payload);
                    if (res.success) {
                        vm.$swal('Success!', `Schedule has been ${$status == 1 ? 'opened ' : $status == 2 ? 'finished ' : ''}.`, 'success');
                    } else {
                        vm.$swal('Failed!', `Failed to ${$status == 1 ? 'open ' : $status == 2 ? 'finish' : ''} schedule.`, 'warning');
                    }
                    await vm.paginate(1);
                }
            },
            async submit() {
                var vm = this;
                const cures = vm.mode ? await vm.up(vm.params) : await vm.cr(vm.params);
                if (cures.success) {
                    vm.ga({ page_no: 1, limit: 50 });
                    await vm.$bvModal.hide('scheduleModal');
                    vm.$swal('Success!', vm.mode ? 'Schedule has been updated.' : 'Schedule has been added.', 'success');
                } else {
                    console.log(cures);
                    vm.$swal('Failed!', cures.message, 'warning');
                }
            },
            async remove($id) {
                var vm = this;
                const confirmed = await vm
                    .$swal({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Delete',
                        padding: '2em'
                    })
                    .then(result => {
                        return result.isConfirmed;
                    });
                if (confirmed) {
                    const res = await vm.de({ id: $id });
                    if (res.success) {
                        vm.ga({ page_no: 1, limit: 50 });
                        vm.$swal('Success!', 'Arena has been deleted.', 'success');
                    } else {
                        vm.$swal('Failed!', 'Failed to delete arena.', 'warning');
                    }
                }
            },
            async paginate(n, isReset) {
                var vm = this;
                vm.is_loading = true;
                var pl = { page_no: n ? n : 1, limit: 50 };

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

                await this.ga(pl);

                vm.is_loading = false;
            },
            reset() {
                this.filters.search_key = '';
                this.dateRangePicker = '';
                this.submitted = 0;
                this.params.id = '';
                this.params.event_name = '';
                this.params.arena_id = '';
                this.params.admin_id = '';
                this.params.total_fights = '';
                this.params.status = 0;
                this.params.datetime = '';
                this.params.rake_percentage = '';
                this.params.draw_rake = '';
                this.dateRangePickerModal = null;
            }
        },
        mounted() {
            this.paginate(1);
            this.garenas();
        }
    };
</script>

<style>
    .flatpickr-wrapper {
        width: 100% !important;
    }

    input.flatpickr[readonly] {
        color: #3b3f5c !important;
    }
</style>
