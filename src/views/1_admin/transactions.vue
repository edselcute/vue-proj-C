<template>
    <div class="layout-px-spacing">
        <portal to="breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Admin</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Transactions</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
            <div>
                <b-button variant="success" class="mr-2" @click="showModal()" v-if="user_type==6">Create Transaction</b-button>
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
                                        <b-th>Username</b-th>
                                        <b-th>Type</b-th>
                                        <b-th>Amount</b-th>
                                        <b-th>Created At</b-th>
                                        <b-th>Status</b-th>
                                        <b-th>Action</b-th>
                                    </b-tr>
                                </b-thead>
                                <b-tbody v-if="is_loading">
                                    <b-tr v-for="n in 20" :key="n">
                                        <b-td v-for="m in 7" :key="m"><div class="spinner-grow align-self-center loader-sm table-loader"></div></b-td>
                                    </b-tr>
                                </b-tbody>
                                <b-tbody v-else>
                                    <b-tr v-for="r in data.list" :key="r.id">
                                        <b-td>{{ r.id }}</b-td>
                                        <b-td>{{ r.user.username }}</b-td>
                                        <b-td
                                            ><span :class="`${r.type == 1 ? 'text-success' : r.type == 2 ? 'text-danger' : ''}`">{{
                                                r.type == 1 ? 'DEPOSIT' : r.type == 2 ? 'WITHDRAW' : ''
                                            }}</span></b-td
                                        >
                                        <b-td>{{ formatNumberStringDecimal(r.amount) }}</b-td>
                                        <b-td>{{ formatDateFdY(r.created_at) }}</b-td>
                                        <b-td
                                            ><b-badge :variant="r.status == 1 ? 'success' : r.status == 2 ? 'danger' : 'warning'">
                                                {{ r.status == 1 ? 'Approved' : r.status == 2 ? 'Cancelled' : 'Pending' }}
                                            </b-badge></b-td
                                        >
                                        <b-td>
                                            <ul class="table-controls">
                                                <li>
                                                    <button class="btn btn-secondary btn-sm" @click="imageModal(r)">View Image</button>
                                                </li>
                                                <li>
                                                    <button class="btn btn-info btn-sm" v-if="profile.user_type_id == 6 && r.status == 0" @click="showModal(r.id)">Edit</button>
                                                </li>
                                                <li>
                                                    <button class="btn btn-success btn-sm" @click="updateStatus(r, 1)" v-if="profile.user_type_id == 6 && r.status == 0">Approve</button>
                                                </li>
                                                <li>
                                                    <button class="btn btn-danger btn-sm" @click="updateStatus(r, 2)" v-if="profile.user_type_id == 6 && r.status == 0">Cancel</button>
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
        <b-modal centered id="transactionModal" :static="true" :title="transaction_payload.id ? 'Edit Transaction' : 'Create Transaction'" size="lg" @hidden="reset()">
            <div class="add-contact-box">
                <div class="add-contact-content">
                    <b-form id="transactionModalTitle">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="row">
                                    <div class="col-md-12">
                                        <b-form-group class="mb-4" label="Username">
                                            <!-- <b-input v-model="transaction_payload.username" placeholder="Player Username"></b-input> -->
                                            <b-select v-model="transaction_payload.user_id">
                                                <b-select-option value="" disabled selected>Select User</b-select-option>
                                                <b-select-option v-for="r in users" :key="r.id" :value="r.id" v-show="[4, 5, 6].includes(r.user_type_id)">{{
                                                    r.username + ' (' + formatUserType(r.user_type_id) + ')'
                                                }}</b-select-option>
                                            </b-select>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-12">
                                        <b-form-group class="mb-4" label="Amount">
                                            <b-input v-model="transaction_payload.amount" placeholder="Amount" maxlength="9"></b-input>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-12">
                                        <b-form-group class="mb-4" label="Type">
                                            <b-select v-model="transaction_payload.type">
                                                <b-select-option value="" selected disabled>Select Type</b-select-option>
                                                <b-select-option value="1">Deposit</b-select-option>
                                                <b-select-option value="2">Withdraw</b-select-option>
                                            </b-select>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-12">
                                        <b-form-group class="mb-4" label="Note">
                                            <b-textarea v-model="transaction_payload.note" rows="3" no-resize placeholder="Note"></b-textarea>
                                        </b-form-group>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="row">
                                    <div class="col-md-12">
                                        <b-form-group class="mb-4" label="Attachment">
                                            <!-- <b-file accept="image/*" @change="displayAttachment($event)" v-model="transaction_payload.image"  ></b-file> -->
                                            <b-form-file
                                                v-if="!mode"
                                                accept="image/*"
                                                v-model="transaction_payload.image"
                                                :state="Boolean(transaction_payload.image)"
                                                @change="displayAttachment($event)"
                                            ></b-form-file>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-12">
                                        <b-img center thumbnail fluid :src="attachment ? attachment : require('@/assets/images/no-image.png')" alt="No Image" style="max-height: 341px;"></b-img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-form>
                </div>
            </div>

            <template #modal-footer>
                <b-button variant="default" data-dismiss="modal" @click="$bvModal.hide('transactionModal')"><i class="flaticon-cancel-12"></i> Cancel</b-button>
                <b-button variant="default" id="btn-add" @click="submit()" :disabled="is_loading">
                    <span class="spinner-grow text-dark mr-2 align-self-center loader-sm" v-if="is_loading"></span>{{ mode ? 'Update' : 'Create' }}</b-button
                >
            </template>
        </b-modal>
        <b-modal centered id="imageModal" :static="true" title="View Image" size="lg" @hidden="reset()" :hide-footer="profile.user_type_id != 6">
            <div class="add-contact-box">
                <div class="add-contact-content">
                    <div class="row">
                        <div class="col-md-12" v-if="profile.user_type_id == 6">
                            <b-form-group class="mb-4" label="Attachment">
                                <!-- <b-file accept="image/*" @change="displayAttachment($event)" v-model="transaction_payload.image"  ></b-file> -->
                                <b-form-file accept="image/*" v-model="transaction_payload.image" :state="Boolean(transaction_payload.image)" @change="displayAttachment($event)"></b-form-file>
                            </b-form-group>
                        </div>
                        <div class="col-md-12">
                            <b-img center thumbnail fluid :src="attachment ? attachment : require('@/assets/images/no-image.png')" alt="No Image" style="max-height: 500px;"></b-img>
                        </div>
                    </div>
                </div>
            </div>
            <template #modal-footer>
                <b-button variant="default" data-dismiss="modal" @click="$bvModal.hide('imageModal')"><i class="flaticon-cancel-12"></i> Cancel</b-button>
                <b-button variant="default" id="btn-add" @click="uploadImage()" :disabled="!transaction_payload.image || is_loading">
                    <span class="spinner-grow text-dark mr-2 align-self-center loader-sm" v-if="is_loading"></span>Save</b-button
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

    import { mapState, mapActions, mapGetters } from 'vuex';
    export default {
        metaInfo: { title: 'Transactions' },
        name: 'Transactions',
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
                transaction_payload: { id: null, user_id: '', amount: '', type: '', image: null, note: '' },
                attachment: '',
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
            'transaction_payload.amount'() {
                this.transaction_payload.amount = this.formatNumberString(this.transaction_payload.amount);
            }
        },
        computed: {
            ...mapGetters('auth', ['user_type']),
            ...mapState('auth', ['profile']),
            ...mapState('transaction', ['data']),
            ...mapState('user', ['users']),
            user() {
                var vm = this;
                const u = vm.users.find(user => user.id == vm.transaction_payload.user_id);
                return u ? u : null;
            }
        },
        methods: {
            ...mapActions('auth', {
                auth_gp: 'getProfile'
            }),
            ...mapActions('transaction', {
                transaction_gl: 'getList',
                transaction_go: 'getOne',
                transaction_cr: 'create',
                transaction_up: 'update',
                transaction_ui: 'uploadImage'
            }),
            ...mapActions('user', {
                user_ga: 'getUsers'
            }),
            displayAttachment(e) {
                var vm = this;
                var files = e.target.files;
                console.log(vm.transaction_payload.image);
                console.log(files[0]);

                if (FileReader && files && files.length) {
                    var fr = new FileReader();
                    fr.onload = function() {
                        vm.attachment = fr.result;
                    };
                    fr.readAsDataURL(files[0]);
                }

                // Not supported
                else {
                    // fallback -- perhaps submit the input to an iframe and temporarily store
                    // them on the server until the user's session ends.
                }
            },
            imageModal($transaction) {
                var vm = this;
                vm.attachment = $transaction.image ? process.env.VUE_APP_API_URL + /images/ + $transaction.image : '';
                vm.transaction_payload.id = $transaction.id;
                vm.$bvModal.show('imageModal');
            },
            async uploadImage() {
                var vm = this;
                vm.is_loading = true;
                var fd = new FormData();
                fd.append('id', vm.transaction_payload.id);
                fd.append('image', vm.transaction_payload.image);

                const res = await vm.transaction_ui(fd);
                if (res.success) {
                    await vm.$bvModal.hide('imageModal');
                    vm.$swal('Success!', vm.mode ? 'Transaction has been updated.' : 'Transaction has been added.', 'success');
                    vm.paginate(1);
                } else {
                    console.log(res);
                    vm.$swal('Failed!', res.message, 'warning');
                }
                vm.is_loading = false;
            },

            async showModal($id) {
                var vm = this;
                vm.mode = $id ? 1 : 0;
                if (vm.mode) {
                    const res = await vm.transaction_go({ id: $id });
                    if (res) {
                        vm.transaction_payload.id = $id;
                        vm.transaction_payload.user_id = res.user_id;
                        vm.transaction_payload.type = res.type;
                        vm.transaction_payload.amount = parseInt(res.amount);
                        vm.transaction_payload.note = res.note;
                        // vm.transaction_payload.image = res.image;
                        vm.attachment = res.image ? process.env.VUE_APP_API_URL + /images/ + res.image : '';
                    }
                }
                await vm.$bvModal.show('transactionModal');
            },
            async submit() {
                var vm = this;
                if (!vm.transaction_payload.amount) return;
                const confirmed = await vm
                    .$swal({
                        title: `${vm.mode ? 'Update' : 'Create'} transaction`,
                        html: `<h6>Type: ${vm.transaction_payload.type == 1 ? 'Deposit' : 'Withdraw'}<h6><h6>Username: ${vm.user.username}<h6><h6>Amount: ${vm.transaction_payload.amount}<h6>`,
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: `Proceed`,
                        padding: '2em'
                    })
                    .then(result => {
                        return result.isConfirmed;
                    });
                if (confirmed) {
                    var fd = new FormData();

                    if (vm.mode) {
                        fd.append('id', vm.transaction_payload.id);
                    }

                    fd.append('user_id', vm.transaction_payload.user_id);

                    fd.append('type', vm.transaction_payload.type);

                    fd.append('amount', vm.formatStringNumber(vm.transaction_payload.amount));

                    if (vm.transaction_payload.image) {
                        fd.append('image', vm.transaction_payload.image);
                    }
                    if (vm.transaction_payload.note) {
                        fd.append('note', vm.transaction_payload.note);
                    }

                    const cures = vm.mode ? await vm.transaction_up(fd) : await vm.transaction_cr(fd);
                    if (cures.success) {
                        await vm.$bvModal.hide('transactionModal');
                        vm.$swal('Success!', vm.mode ? 'Transaction has been updated.' : 'Transaction has been added.', 'success');
                        vm.paginate(1);
                    } else {
                        console.log(cures);
                        vm.$swal('Failed!', cures.message, 'warning');
                    }
                }
                vm.is_loading = false;
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
                var pl = { page_no: n ? n : 1, limit: 50 };

                if (vm.profile.user_type_id == 6) {
                    pl.user_type_id = 4;
                }

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
                this.transaction_payload.id = 0;
                this.transaction_payload.user_id = '';
                this.transaction_payload.amount = '';
                this.transaction_payload.type = '';
                this.transaction_payload.note = '';
                this.transaction_payload.image = null;
                this.attachment = null;
            }
        },
        mounted() {
            this.paginate(1);
            this.user_ga();
        }
    };
</script>
