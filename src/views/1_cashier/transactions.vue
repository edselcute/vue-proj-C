<template>
    <div class="layout-px-spacing">
        <portal to="breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Cashier</a></li>
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
                    <div class="statbox panel box box-shadow">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xl-3 col-md-2 col-sm-2 col-12">
                                    <b-form class="simple-example">
                                        <b-form-row>
                                            <div class="col-md-12 mb-4">
                                                <label for="" style="display:block">Date Range</label>
                                                <flat-pickr v-model="pickerdate" :config="{ mode: 'range' }" class="form-control flatpickr active"></flat-pickr>
                                            </div>
                                        </b-form-row>
                                    </b-form>
                                </div>
                                <div class="col-xl-2 col-md-2 col-sm-2 col-12">
                                    <b-form class="simple-example">
                                        <b-form-row>
                                            <div class="col-md-12 mb-4">
                                                <label for="arena">Username</label>
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
                                            <!-- <div class="col-md-6">
                                                <label for="" style="display:block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                                <b-button variant="danger" size="lg" class="mb-4 mr-2" @click="paginate(1, true)">Reset</b-button>
                                            </div> -->
                                        </b-form-row>
                                    </b-form>
                                </div>
                                <div class="col-xl-2 col-md-2 col-sm-2 col-12"></div>
                                <!-- <div class="col-xl-3 col-md-2 col-sm-2 col-12 text-right">
                                    <b-form class="simple-example">
                                        <b-form-row>
                                            <div class="col-md-12 mb-4">
                                                <label for="" style="display:block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                                <b-button variant="success" size="lg" class="mb-4 mr-2 btn-rounded" @click="showModal()">Create Transaction</b-button>
                                            </div>
                                        </b-form-row>
                                    </b-form>
                                </div> -->
                                <!-- <div class="col-xl-3 col-md-3 col-sm-3 col-12 text-sm-right text-center layout-spacing align-self-center">
                                    <div class="d-flex justify-content-sm-end justify-content-center">
                                        <a href="javascript:;">
                                            <svg
                                                id="btn-add-contact"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="feather feather-user-plus"
                                            >
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="8.5" cy="7" r="4"></circle>
                                                <line x1="20" y1="8" x2="20" y2="14"></line>
                                                <line x1="23" y1="11" x2="17" y2="11"></line>
                                            </svg>
                                        </a>
                                    </div>
                                </div> -->
                            </div>
                        </div>

                        <div class="panel-body">
                            <b-table-simple responsive bordered hover class="text-center">
                                <b-thead>
                                    <b-tr>
                                        <b-th>#</b-th>
                                        <b-th>Username</b-th>
                                        <b-th>Type</b-th>
                                        <b-th>Amount</b-th>
                                        <b-th>Created At</b-th>
                                        <b-th>Status</b-th>
                                        <b-th>Note</b-th>
                                        <b-th>Action</b-th>
                                    </b-tr>
                                </b-thead>
                                <b-tbody v-if="is_loading">
                                    <b-tr v-for="n in 20" :key="n">
                                        <b-td v-for="m in 8" :key="m"><div class="spinner-grow align-self-center loader-sm table-loader"></div></b-td>
                                    </b-tr>
                                </b-tbody>
                                <b-tbody v-else>
                                    <b-tr v-for="(r, index) in data.list" :key="r.id">
                                        <b-td>{{ index + 1 + (data.current_page - 1) * data.per_page }}</b-td>
                                        <b-td>{{ r.user.username }}</b-td>
                                        <b-td
                                            ><span :class="`${r.type == 1 ? 'text-success' : r.type == 2 ? 'text-danger' : ''}`">{{
                                                r.type == 1 ? 'DEPOSIT' : r.type == 2 ? 'WITHDRAW' : ''
                                            }}</span></b-td
                                        >
                                        <b-td>{{ formatNumberStringDecimal(r.amount) }}</b-td>
                                        <b-td>{{ formatDateFdY(r.created_at) }}</b-td>
                                        <b-td>
                                            <b-badge :variant="r.status == 1 ? 'success' : r.status == 2 ? 'danger' : 'warning'">
                                                {{ r.status == 1 ? 'Approved' : r.status == 2 ? 'Cancelled' : 'Pending' }}
                                            </b-badge>
                                        </b-td>
                                        <b-td>{{ r.note }}</b-td>

                                        <b-td>
                                            <ul class="table-controls">
                                                <li>
                                                    <button class="btn btn-success btn-sm" @click="updateStatus(r, 1)" v-if="r.status == 0">Approve</button>
                                                </li>
                                                <li>
                                                    <button class="btn btn-danger btn-sm" @click="updateStatus(r, 2)" v-if="r.status == 0">Cancel</button>
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
        <b-modal centered id="arenaModal" :static="true" title="Create Transaction" size="sm" @hidden="reset()">
            <div class="add-contact-box">
                <div class="add-contact-content">
                    <b-form id="arenaModalTitle">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <b-input v-model="params.name" placeholder="Player Username"></b-input>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <b-input v-model="params.owner_name" placeholder="Amount" maxlength="9"></b-input>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <b-select>
                                        <b-select-option value="" selected disabled>Select Type</b-select-option>
                                        <b-select-option value="1">Deposit</b-select-option>
                                        <b-select-option value="2">Withdraw</b-select-option>
                                    </b-select>
                                </div>
                            </div>
                        </div>
                    </b-form>
                </div>
            </div>

            <template #modal-footer>
                <b-button variant="default" data-dismiss="modal" @click="$bvModal.hide('arenaModal')"><i class="flaticon-cancel-12"></i> Cancel</b-button>
                <b-button variant="default" id="btn-add" @click="submit()" :disabled="is_loading">
                    <span class="spinner-grow text-dark mr-2 align-self-center loader-sm" v-if="is_loading"></span>Create</b-button
                >
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

    import { mapState, mapActions } from 'vuex';
    export default {
        metaInfo: { title: 'Arenas' },
        name: 'Arenas',
        components: {
            flatPickr,
            pagination
        },
        data() {
            return {
                is_loading: false,
                pickerdate: '',
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
            pickerdate() {
                let pickerdate_split = this.pickerdate.split(' ');
                if (pickerdate_split.length == 3) {
                    this.filters.from = pickerdate_split[0];
                    this.filters.to = pickerdate_split[2];
                } else {
                    this.filters.from = '';
                    this.filters.to = '';
                }
            }
        },
        computed: {
            ...mapState('transaction', ['data'])
        },
        methods: {
            ...mapActions('auth', {
                auth_gp: 'getProfile'
            }),
            ...mapActions('transaction', {
                transaction_gl: 'getList',
                transaction_up: 'update'
            }),
            async showModal(id) {
                var vm = this;
                vm.mode = id ? 1 : 0;
                if (vm.mode) {
                    const res = await vm.go({ id: id });
                    if (res) {
                        vm.params.id = id;
                        vm.params.name = res.name;
                        vm.params.owner_name = res.owner_name;
                    }
                }
                await vm.$bvModal.show('arenaModal');
            },
            async submit() {
                var vm = this;
                const cures = vm.mode ? await vm.up(vm.params) : await vm.cr(vm.params);
                if (cures.success) {
                    vm.gl({ page_no: 1, limit: 50 });
                    await vm.$bvModal.hide('arenaModal');
                    vm.$swal('Success!', vm.mode ? 'Arena has been updated.' : 'Arena has been added.', 'success');
                } else {
                    console.log(cures);
                    vm.$swal('Failed!', cures.message, 'warning');
                }
            },
            async updateStatus($transaction, $action) {
                var vm = this;
                const confirmed = await vm
                    .$swal({
                        title: `Are you sure?`,
                        text: `${$action == 1 ? 'Approve' : 'Cancel'} this transaction`,
                        showCancelButton: true
                    })
                    .then(result => {
                        return result.isConfirmed;
                    });

                if (confirmed) {
                    var payload = { id: $transaction.id, status: $action == 1 ? 1 : 2 };
                    const res = await vm.transaction_up(payload);
                    if (res.success) {
                        await vm.auth_gp();
                        await vm.$swal('Success!', `Transaction has been ${$action == 1 ? 'approved' : 'cancelled'}.`, 'success');
                    } else {
                        vm.$swal('Failed!', `Failed to ${$action == 1 ? 'approve' : 'cancel'} transaction.`, 'warning');
                    }
                    await vm.paginate(1);
                }
            },
            async paginate(n, isReset) {
                var vm = this;
                vm.is_loading = true;
                var pl = { page_no: n ? n : 1, limit: 50, user_type_id: 5 };

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

                await vm.transaction_gl(pl);
                vm.is_loading = false;
            },
            reset() {
                this.filters.search_key = '';
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
