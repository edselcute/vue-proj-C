<template>
    <div class="layout-px-spacing">
        <portal to="breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Admin</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Users</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
             <div>
                <b-button variant="success" class="mr-2"  @click="showModal()">Create User</b-button>
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
                                                <label for="arena">Username</label>
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
                                        <b-th>ID</b-th>
                                        <b-th>Full Name</b-th>
                                        <b-th>Username</b-th>
                                        <b-th>Type</b-th>
                                        <b-th>Current Points</b-th>
                                        <b-th>Last Login</b-th>
                                        <b-th>Status</b-th>
                                        <b-th style="width:35%">Action</b-th>
                                    </b-tr>
                                </b-thead>
                                <b-tbody v-if="is_loading">
                                    <b-tr v-for="n in 20" :key="n">
                                        <b-td v-for="m in 8" :key="m"><div class="spinner-grow align-self-center loader-sm table-loader"></div></b-td>
                                    </b-tr>
                                </b-tbody>
                                <b-tbody v-else>
                                    <b-tr v-for="r in data.list" :key="r.id">
                                        <b-td>{{ r.id }}</b-td>
                                        <b-td>{{ (r.firstname ? r.firstname : '') + ' ' + (r.lastname ? r.lastname : '') }}</b-td>
                                        <b-td>{{ r.username }}</b-td>
                                        <b-td>{{ formatUserType(r.user_type_id) }}</b-td>
                                        <b-td>{{ formatNumberStringDecimal(r.money) }}</b-td>
                                        <b-td>{{ r.last_login }}</b-td>
                                        <b-td>
                                            <b-badge :variant="r.status == 1 ? 'success' : 'danger'">
                                                {{ r.status == 1 ? 'Active' : 'Inactive' }}
                                            </b-badge>
                                        </b-td>
                                        <b-td>
                                            <ul class="table-controls">
                                                <li>
                                                    <!-- <button class="btn btn-dark btn-sm" @click="viewProfile(1)">View</button> -->
                                                    <!-- <router-link tag="button" class="btn btn-info btn-sm" :to="`/1_admin/profile/${r.id}`">View</router-link> -->
                                                    <router-link tag="button" class="btn btn-info btn-sm" :to="`/1_admin/profile/${r.id}`">View</router-link>
                                                </li>
                                                <li>
                                                    <button class="btn btn-secondary btn-sm" @click="showModal(r.id)">Edit</button>
                                                </li>
                                                <li>
                                                    <button :class="`btn ${!r.status ? 'btn-success' : 'btn-danger'} btn-sm`" @click="updateStatus(r)">
                                                        {{ !r.status ? 'Activate' : 'Deactivate' }}
                                                    </button>
                                                </li>
                                                <li>
                                                    <button class="btn btn-warning btn-sm" @click="showPasswordModal(r)">Change Password</button>
                                                </li>
                                                <li>
                                                    <button class="btn btn-danger btn-sm" @click="remove(r.id)">Delete</button>
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
                                        <b-form-group class=" col-md-6 " label="Email">
                                            <b-input v-model="params.email" type="text" placeholder="Email"></b-input>
                                        </b-form-group>
                                        <b-form-group class=" col-md-6 " label="Phone">
                                            <b-input v-model="params.phone" type="text" placeholder="Phone"></b-input>
                                        </b-form-group>

                                        <!-- <b-form-group class="col-md-4" label="Birth Date">
                                            <flat-pickr
                                                v-model="birthdatePicker"
                                                :config="{ mode: 'single', static: true, dateFormat: 'F d, Y' }"
                                                class="form-control flatpickr active"
                                                placeholder="Birth Date"
                                            ></flat-pickr>
                                        </b-form-group> -->
                                    </b-form-row>
                                    <h5 class="text-success mb-3">Account</h5>
                                    <b-form-row class=" mb-4">
                                        <b-form-group class="col-md-6" label="Type">
                                            <b-select v-model="params.user_type_id">
                                                <b-select-option value="" selected disabled>Select Type</b-select-option>
                                                <!-- <b-select-option value="1">Master Admin</b-select-option> -->
                                                <b-select-option value="2">Admin</b-select-option>
                                                <b-select-option value="3">Declarator</b-select-option>
                                                <b-select-option value="4">Cashier</b-select-option>
                                                <b-select-option value="5">Player</b-select-option>
                                                <b-select-option value="6">Manager</b-select-option>
                                            </b-select>
                                        </b-form-group>
                                        <!-- <b-form-group class="col-md-6" label="Group">
                                            <b-select v-model="params.group_id">
                                                <b-select-option value="" selected disabled>Select Group</b-select-option>
                                                <b-select-option :value="r.id" v-for="r in groups" :key="r.id">{{ r.name }}</b-select-option>
                                            </b-select>
                                        </b-form-group> -->
                                        <b-form-group class=" col-md-6 " label="Username">
                                            <b-input v-model="params.username" type="text" placeholder="Username"></b-input>
                                        </b-form-group>
                                        <b-form-group class=" col-md-6 " label="Password" v-if="!params.id">
                                            <b-input v-model="params.password" type="password" placeholder="Password"></b-input>
                                        </b-form-group>
                                        <b-form-group class=" col-md-6 " label="Confirm Password" v-if="!params.id">
                                            <b-input v-model="params.password_confirmation" type="password" placeholder="Confirm Password"></b-input>
                                        </b-form-group>
                                        <!-- <b-form-group class="col-md-6" label="Status">
                                            <b-select v-model="params.status">
                                                <b-select-option value="" selected disabled>Select Status</b-select-option>
                                                <b-select-option value="1">Active</b-select-option>
                                                <b-select-option value="0">Inactive</b-select-option>
                                            </b-select>
                                        </b-form-group> -->
                                    </b-form-row>
                                </div>
                            </div>
                        </div>
                    </b-form>
                </div>
            </div>

            <template #modal-footer>
                <b-button variant="default" data-dismiss="modal" @click="$bvModal.hide('userModal')"><i class="flaticon-cancel-12"></i> Discard</b-button>
                <b-button variant="default" id="btn-add" @click="submit()" :disabled="is_loading">
                    <span class="spinner-grow text-dark mr-2 align-self-center loader-sm" v-if="is_loading"></span>{{ params.id ? 'Update' : 'Add' }}</b-button
                >
            </template>
        </b-modal>
        <b-modal centered id="passwordModal" :static="true" title="Change Password" size="sm" @hidden="reset()">
            <div class="add-contact-box">
                <div class="add-contact-content">
                    <b-form id="passwordModalTitle">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">Username: {{ password_username }}</div>
                            </div>
                        </div>
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
                <b-button variant="default" id="btn-add" @click="updatePassword()" :disabled="is_loading">
                    <span class="spinner-grow text-dark mr-2 align-self-center loader-sm" v-if="is_loading"></span>
                    Update
                </b-button>
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
                is_loading: false,
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
                    email: '',
                    phone: '',
                    user_type_id: '',
                    username: '',
                    password: '',
                    password_confirmation: '',
                    group_id: 1
                },
                password_username: '',
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
                user_us: 'updateStatus',
                user_cp: 'updatePassword',
                user_de: 'delete'
            }),
            ...mapActions('group', {
                ggroups: 'getGroups'
            }),
            showPasswordModal($user) {
                var vm = this;
                vm.password_username = $user.username;
                vm.password_payload.id = $user.id;
                vm.$bvModal.show('passwordModal');
            },
            async updatePassword() {
                var vm = this;
                vm.is_loading = true;
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
                vm.is_loading = false;
            },
            async updateStatus($user) {
                var vm = this;
                const confirmed = await vm
                    .$swal({
                        title: `Are you sure?`,
                        text: `${!$user.status ? 'Activate' : 'Deactivate'} this user`,
                        showCancelButton: true
                    })
                    .then(result => {
                        return result.isConfirmed;
                    });

                if (confirmed) {
                    var payload = { id: $user.id, status: $user.status ? 0 : 1 };
                    const res = await vm.user_us(payload);
                    if (res.success) {
                        vm.$swal('Success!', `User has been ${!$user.status ? 'activated' : 'deactivated'}.`, 'success');
                    } else {
                        vm.$swal('Failed!', `Failed to ${!$user.status ? 'activated' : 'deactivated'} user.`, 'warning');
                    }
                    await vm.paginate(1);
                }
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
                        vm.params.user_type_id = res.user_type_id;
                        // vm.params.group_id = res.group_id;
                        vm.params.username = res.username;
                        // vm.params.password = res.password;
                        // vm.params.status = res.status;
                    }
                }
                await vm.$bvModal.show('userModal');
            },
            async submit() {
                var vm = this;
                vm.is_loading = true;
                const cures = vm.mode ? await vm.user_up(vm.params) : await vm.user_cr(vm.params);
                if (cures.success) {
                    vm.paginate(1);
                    await vm.$bvModal.hide('userModal');
                    vm.$swal('Success!', vm.mode ? 'User has been updated.' : 'User has been added.', 'success');
                } else {
                    console.log(cures);
                    vm.$swal('Failed!', cures.message, 'warning');
                }
                vm.is_loading = false;
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
                        vm.paginate(1);
                        vm.$swal('Success!', 'User has been deleted.', 'success');
                    } else {
                        vm.$swal('Failed!', 'Failed to delete User.', 'warning');
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

                if (vm.filters.from && vm.filters.to && vm.filters.to) {
                    pl.from = vm.filters.from;
                    pl.to = vm.filters.to;
                }

                await vm.user_gl(pl);
                vm.is_loading = false;
            },
            reset() {
                var vm = this;
                vm.filters.search_key = '';
                vm.dateRangePicker = '';
                vm.submitted = 0;
                vm.params.id = 0;
                vm.params.firstname = '';
                vm.params.lastname = '';
                vm.params.lastname = '';
                vm.params.email = '';
                vm.params.phone = '';
                vm.params.user_type_id = '';
                // vm.params.group_id = '';
                vm.params.username = '';
                vm.params.password = '';
                vm.params.password_confirmation = '';
                // vm.params.status = '';

                vm.password_username = '';
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
