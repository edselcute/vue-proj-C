<template>
    <div class="layout-px-spacing">
        <portal to="breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Admin</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Settings</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </portal>
        <div class="row layout-top-spacing" v-if="is_loading">
            <div class="col-xl-4 col-lg-4 col-sm-4 mb-2 px-1" v-for="n in 24" :key="n">
                <b-card class="component-card_1">
                    <div class="row">
                        <div class="col-12 text-center">
                            <div class="spinner-grow align-self-center loader-sm table-loader mb-4"></div>
                        </div>
                    </div>
                </b-card>
            </div>
        </div>
        <div class="row layout-top-spacing" v-else>
            <div class="col-xl-4 col-lg-4 col-sm-4 mb-2 px-1" v-for="r in data.list" :key="r.id">
                <b-card class="component-card_1">
                    <div class="row">
                        <div class="col-3">
                            <label class="switch s-icons s-outline s-outline-primary mb-0">
                                <input type="checkbox" :checked="r.status" @change="updateStatus(r, $event)" />
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <div class="col-9 text-center">
                            <b-card-title title-tag="h6" class="mb-0">{{ r.name }}</b-card-title>
                        </div>
                    </div>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    export default {
        metaInfo: { title: 'Setting' },
        name: 'Setting',
        components: {},
        data() {
            return {
                is_loading: false
            };
        },
        computed: {
            ...mapState('setting', ['data'])
        },
        methods: {
            ...mapActions('setting', {
                setting_gl: 'getList',
                setting_up: 'update'
            }),
            async updateStatus($setting, e) {
                var vm = this;
                vm.is_loading = true;

                const confirmed = await vm
                    .$swal({
                        title: `Are you sure?`,
                        text: `${!$setting.status ? 'Turn on' : 'Turn off'} ${$setting.name}`,
                        showCancelButton: true
                    })
                    .then(result => {
                        return result.isConfirmed;
                    });

                if (confirmed) {
                    var payload = { id: $setting.id, status: $setting.status ? 0 : 1 };
                    const res = await vm.setting_up(payload);
                    if (res.success) {
                        vm.$swal('Success!', `${$setting.name} ${!$setting.status ? 'turned on' : 'turned off'}.`, 'success');
                    } else {
                        vm.$swal('Failed!', `Failed to ${!$setting.status ? 'turn on' : 'turn off'} ${$setting.name}.`, 'warning');
                    }
                } else {
                    e.target.checked = (await $setting.status) ? true : false;
                }

                vm.init();
                vm.is_loading = false;
            },
            async init() {
                var vm = this;
                vm.is_loading = true;
                await this.setting_gl({ page_no: 1, limit: 1000 });
                vm.is_loading = false;
            }
        },

        mounted() {
            this.init();
        }
    };
</script>

<style></style>
