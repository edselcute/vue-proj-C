<template>
    <div class="layout-px-spacing">
        <portal to="breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Admin</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Arenas</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
            <div>
                <b-button variant="success" class="mr-2" @click="showModal()">Create Arena</b-button>
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
                                                <label for="arena">Arena Name</label>
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
                                        <b-th style="width:60%">Name</b-th>
                                        <b-th>Owner</b-th>
                                        <b-th>Created At</b-th>
                                        <b-th>Action</b-th>
                                    </b-tr>
                                </b-thead>
                                <b-tbody v-if="is_loading">
                                    <b-tr v-for="n in 20" :key="n">
                                        <b-td v-for="m in 5" :key="m"><div class="spinner-grow align-self-center loader-sm table-loader"></div></b-td>
                                    </b-tr>
                                </b-tbody>
                                <b-tbody v-else>
                                    <b-tr v-for="(r, index) in data.list" :key="r.id">
                                        <b-td>{{ index + 1 + (data.current_page - 1) * data.per_page }}</b-td>
                                        <b-td>{{ r.name }}</b-td>
                                        <b-td>{{ r.owner_name }}</b-td>
                                        <b-td>{{ formatDateFdY(r.created_at) }}</b-td>
                                        <b-td>
                                            <ul class="table-controls">
                                                <li>
                                                    <button class="btn btn-primary btn-sm" @click="showModal(r.id)">Edit</button>
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
        <b-modal centered id="arenaModal" :static="true" :title="params.id ? 'Edit Arena' : 'Add Arena'" size="sm" @hidden="reset()">
            <div class="add-contact-box">
                <div class="add-contact-content">
                    <b-form id="arenaModalTitle">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <b-input v-model="params.name" placeholder="Arena Name"></b-input>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <b-input v-model="params.owner_name" placeholder="Owner"></b-input>
                                </div>
                            </div>
                        </div>
                    </b-form>
                </div>
            </div>

            <template #modal-footer>
                <b-button variant="default" data-dismiss="modal" @click="$bvModal.hide('arenaModal')"><i class="flaticon-cancel-12"></i> Discard</b-button>
                <b-button variant="default" id="btn-add" @click="submit()" :disabled="is_loading">
                    <span class="spinner-grow text-dark mr-2 align-self-center loader-sm" v-if="is_loading"></span>{{ params.id ? 'Update' : 'Add' }}</b-button
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
                is_loading: true,
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
            ...mapState('arena', ['data'])
        },
        methods: {
            ...mapActions('arena', {
                gl: 'getList',
                go: 'getOne',
                cr: 'create',
                up: 'update',
                de: 'delete'
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
                    vm.is_loading = true;
                    const res = await vm.de({ id: $id });
                    if (res.success) {
                        vm.paginate(1)
                        vm.$swal('Success!', 'Arena has been deleted.', 'success');
                    } else {
                        vm.$swal('Failed!', 'Failed to delete arena.', 'warning');
                    }
                }
            },
            async paginate(n, isReset) {
                var vm = this;
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

                vm.is_loading = true;
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
