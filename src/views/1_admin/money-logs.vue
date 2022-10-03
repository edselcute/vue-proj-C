<template>
    <div class="layout-px-spacing">
        <portal to="breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Admin</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Money Logs</span></li>
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
                                            <div class="col-md-6">
                                                <label for="" style="display:block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                                <b-button variant="danger" size="lg" class="mb-4 mr-2" @click="paginate(1, true)">Reset</b-button>
                                            </div>
                                        </b-form-row>
                                    </b-form>
                                </div>
                                <div class="col-xl-2 col-md-2 col-sm-2 col-12"></div>
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
                                        <b-th>ID</b-th>
                                        <b-th>Username</b-th>
                                        <b-th>User Type</b-th>
                                        <b-th>Before Money</b-th>
                                        <b-th>Amount</b-th>
                                        <b-th>After Money</b-th>
                                        <b-th>Transaction Type</b-th>
                                        <b-th>Date</b-th>
                                    </b-tr>
                                </b-thead>
                                <b-tbody>
                                    <!-- <b-tr v-for="r in data.list" :key="r.id"> -->
                                    <b-tr>
                                        <!-- <b-td>{{ r.id }}</b-td>
                                        <b-td>{{ r.username }}</b-td>
                                        <b-td>{{ r.type == 1 ? 'Admin' : r.type == 2 ? 'Declarator' : r.type == 3 ? 'Cashier' : r.type == '4' ? 'Board' : 'Undefined' }}</b-td> -->
                                        <b-td>1</b-td>
                                        <b-td>Cash 1</b-td>
                                        <b-td>Cashier</b-td>
                                        <b-td>1,000</b-td>
                                        <b-td>+1,000</b-td>
                                        <b-td>2,000</b-td>
                                        <b-td>BET</b-td>
                                        <b-td>2022-05-11 24:24:24</b-td>
                                    </b-tr>
                                    <b-tr>
                                        <b-td>1</b-td>
                                        <b-td>play 1</b-td>
                                        <b-td>Player</b-td>
                                        <b-td>0</b-td>
                                        <b-td>+1,000</b-td>
                                        <b-td>1,000</b-td>
                                        <b-td>Deposit</b-td>
                                        <b-td>2022-05-11 24:24:24</b-td>
                                    </b-tr>
                                    <b-tr>
                                        <b-td>1</b-td>
                                        <b-td>cash 2</b-td>
                                        <b-td>Cashier</b-td>
                                        <b-td>10,000</b-td>
                                        <b-td>-10,000</b-td>
                                        <b-td>0</b-td>
                                        <b-td>Cash out</b-td>
                                        <b-td>2022-05-11 24:24:24</b-td>
                                    </b-tr>
                                    <b-tr>
                                        <b-td>1</b-td>
                                        <b-td>cash 2</b-td>
                                        <b-td>Cashier</b-td>
                                        <b-td>0</b-td>
                                        <b-td>+10,000</b-td>
                                        <b-td>10,000</b-td>
                                        <b-td>Cash in</b-td>
                                        <b-td>2022-05-11 24:24:24</b-td>
                                    </b-tr>
                                    <b-tr>
                                        <b-td>1</b-td>
                                        <b-td>play 2</b-td>
                                        <b-td>Player</b-td>
                                        <b-td>5,000</b-td>
                                        <b-td>-50,000</b-td>
                                        <b-td>0</b-td>
                                        <b-td>Withdraw</b-td>
                                        <b-td>2022-05-11 24:24:24</b-td>
                                    </b-tr>
                                    <b-tr>
                                        <b-td>1</b-td>
                                        <b-td>cash 2</b-td>
                                        <b-td>Cashier</b-td>
                                        <b-td>10,000</b-td>
                                        <b-td>-1000</b-td>
                                        <b-td>9,000</b-td>
                                        <b-td>Claim</b-td>
                                        <b-td>2022-05-11 24:24:24</b-td>
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
        <b-modal centered id="userModal" :static="true" :title="params.id ? 'Edit User' : 'Add User'" size="lg" @hidden="reset()">
            <div class="add-contact-box">
                <div class="add-contact-content">
                    <b-form id="userModalTitle">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <h5 class="text-success mb-3">User Information</h5>
                                    <b-form-row class=" mb-4">
                                        <b-form-group class=" col-md-6 " label="First Name">
                                            <b-input v-model="params.firstname" type="text" placeholder="First Name"></b-input>
                                        </b-form-group>
                                        <b-form-group class=" col-md-6 " label="Last Name">
                                            <b-input v-model="params.lastname" type="text" placeholder="Last Name"></b-input>
                                        </b-form-group>
                                        <b-form-group class=" col-md-4 " label="Email">
                                            <b-input v-model="params.email" type="text" placeholder="Email"></b-input>
                                        </b-form-group>
                                        <b-form-group class=" col-md-4 " label="Phone">
                                            <b-input v-model="params.phone" type="text" placeholder="Phone"></b-input>
                                        </b-form-group>

                                        <b-form-group class="col-md-4" label="Birth Date">
                                            <flat-pickr
                                                v-model="birthdatePicker"
                                                :config="{ mode: 'single', static: true, dateFormat: 'F d, Y' }"
                                                class="form-control flatpickr active"
                                                placeholder="Birth Date"
                                            ></flat-pickr>
                                        </b-form-group>
                                    </b-form-row>
                                    <h5 class="text-success mb-3">Account</h5>
                                    <b-form-row class=" mb-4">
                                        <b-form-group class="col-md-6" label="Type">
                                            <b-select v-model="params.type">
                                                <b-select-option value="" selected disabled>Select Type</b-select-option>
                                                <b-select-option value="1">Admin</b-select-option>
                                                <b-select-option value="2">Declarator</b-select-option>
                                                <b-select-option value="3">Cashier</b-select-option>
                                                <b-select-option value="4">Board</b-select-option>
                                            </b-select>
                                        </b-form-group>
                                        <b-form-group class="col-md-6" label="Group">
                                            <b-select v-model="params.group_id">
                                                <b-select-option value="" selected disabled>Select Group</b-select-option>
                                                <b-select-option :value="r.id" v-for="r in groups" :key="r.id">{{ r.name }}</b-select-option>
                                            </b-select>
                                        </b-form-group>
                                        <b-form-group class=" col-md-6 " label="Username">
                                            <b-input v-model="params.username" type="text" placeholder="Username"></b-input>
                                        </b-form-group>
                                        <b-form-group class=" col-md-6 " label="Password" v-if="!params.id">
                                            <b-input v-model="params.password" type="password" placeholder="Password"></b-input>
                                        </b-form-group>
                                        <b-form-group class=" col-md-6 " label="Confirm Password" v-if="!params.id">
                                            <b-input v-model="params.password_confirmation" type="password" placeholder="Confirm Password"></b-input>
                                        </b-form-group>
                                        <b-form-group class="col-md-6" label="Status">
                                            <b-select v-model="params.status">
                                                <b-select-option value="" selected disabled>Select Status</b-select-option>
                                                <b-select-option value="1">Active</b-select-option>
                                                <b-select-option value="0">Inactive</b-select-option>
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
                <b-button variant="default" data-dismiss="modal" @click="$bvModal.hide('userModal')"><i class="flaticon-cancel-12"></i> Discard</b-button>
                <b-button variant="default" id="btn-add" @click="submit()">{{ params.id ? 'Update' : 'Add' }}</b-button>
            </template>
        </b-modal>
        <b-modal centered id="passwordModal" :static="true" title="Change Password" size="sm" @hidden="reset()">
            <div class="add-contact-box">
                <div class="add-contact-content">
                    <b-form id="passwordModalTitle">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <b-input v-model="password_payload.password" placeholder="New Password" type="password"></b-input>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <b-input v-model="password_payload.password_confirmation" placeholder="Confirm New Password" type="password"></b-input>
                                </div>
                            </div>
                        </div>
                    </b-form>
                </div>
            </div>

            <template #modal-footer>
                <b-button variant="default" data-dismiss="modal" @click="$bvModal.hide('passwordModal')"><i class="flaticon-cancel-12"></i> Discard</b-button>
                <b-button variant="default" id="btn-add" @click="updatePassword()">Update</b-button>
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
        metaInfo: { title: 'Users' },
        name: 'Users',
        components: {
            flatPickr,
            pagination
        },
        data() {
            return {
                loading: false,
                dateRangePicker: '',
                birthdatePicker: '',
                filters: {
                    search_key: '',
                    from: '',
                    to: ''
                },

                params: {
                    id: null,
                    firstname: '',
                    lastname: '',
                    birthdate: '',
                    email: '',
                    phone: '',
                    type: '',
                    username: '',
                    password: '',
                    password_confirmation: '',
                    status: '',
                    group_id: ''
                },
                password_payload: {
                    id: 0,
                    password: '',
                    password_confirmation: ''
                },
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
            birthdatePicker() {
                if (this.birthdatePicker) {
                    this.params.birthdate = this.formatDateYmD(this.birthdatePicker);
                } else {
                    this.params.birthdate = '';
                }
            }
        },
        computed: {
            ...mapState('user', ['data']),
            ...mapState('group', ['groups'])
        },
        methods: {
            ...mapActions('user', {
                user_gl: 'getList',
                user_go: 'getOne',
                user_cr: 'create',
                user_up: 'update',
                user_cp: 'updatePassword',
                user_de: 'delete'
            }),
            ...mapActions('group', {
                ggroups: 'getGroups'
            }),
            showPasswordModal(id) {
                var vm = this;
                vm.password_payload.id = id;
                vm.$bvModal.show('passwordModal');
            },
            async updatePassword() {
                var vm = this;

                if (!vm.password_payload.password || !vm.password_payload.password_confirmation) return;
                if (vm.password_payload.password != vm.password_payload.password_confirmation) return;

                const res = await vm.user_cp(vm.password_payload);
                if (res.success) {
                    vm.user_gl({ page_no: 1, limit: 50 });
                    vm.$swal('Success!', 'Password has been updated.', 'success');
                } else {
                    vm.$swal('Failed!', 'Failed to update password.', 'warning');
                }

                await vm.$bvModal.hide('passwordModal');
            },
            async showModal(id) {
                var vm = this;
                vm.mode = id ? 1 : 0;
                if (vm.mode) {
                    const res = await vm.user_go({ id: id });
                    if (res) {
                        console.log(res);
                        vm.params.id = id;
                        vm.params.firstname = res.firstname;
                        vm.params.lastname = res.lastname;
                        vm.params.email = res.email;
                        vm.params.phone = res.phone;
                        vm.params.birthdate = res.birthdate;
                        vm.params.type = res.type;
                        vm.params.group_id = res.group_id;
                        vm.params.username = res.username;
                        // vm.params.password = res.password;
                        vm.params.status = res.status;
                    }
                }
                await vm.$bvModal.show('userModal');
            },
            async submit() {
                var vm = this;
                const cures = vm.mode ? await vm.user_up(vm.params) : await vm.user_cr(vm.params);
                if (cures.success) {
                    vm.user_gl({ page_no: 1, limit: 50 });
                    await vm.$bvModal.hide('userModal');
                    vm.$swal('Success!', vm.mode ? 'User has been updated.' : 'User has been added.', 'success');
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
                    const res = await vm.user_de({ id: $id });
                    if (res.success) {
                        vm.user_gl({ page_no: 1, limit: 50 });
                        vm.$swal('Success!', 'User has been deleted.', 'success');
                    } else {
                        vm.$swal('Failed!', 'Failed to delete User.', 'warning');
                    }
                }
            },
            async paginate(n, isReset) {
                var vm = this;
                vm.loading = true;
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

                if (vm.filters.from && vm.filters.to && vm.filters.to) {
                    pl.from = vm.filters.from;
                    pl.to = vm.filters.to;
                }

                const res = await vm.user_gl(pl);
                if (res) {
                    vm.loading = false;
                }
            },
            reset() {
                var vm = this;
                vm.filters.search_key = '';
                vm.submitted = 0;
                vm.params.id = 0;
                vm.params.firstname = '';
                vm.params.lastname = '';
                vm.params.lastname = '';
                vm.params.email = '';
                vm.params.phone = '';
                vm.params.birthdate = '';
                vm.params.type = '';
                vm.params.group_id = '';
                vm.params.username = '';
                vm.params.password = '';
                vm.params.password_confirmation = '';
                vm.params.status = '';

                vm.password_payload.id = 0;
                vm.password_payload.password = '';
                vm.password_payload.password_confirmation = '';
            }
        },
        mounted() {
            this.paginate(1);
            this.ggroups();
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
