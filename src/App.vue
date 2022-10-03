<template>
    <div :class="[$store.state.layout_style, $store.state.menu_style]">
        <component v-bind:is="layout"></component>
    </div>
</template>
<script>
    // layouts
    import appLayout from './layouts/app-layout.vue';
    import authLayout from './layouts/auth-layout.vue';
    import adminLayout from './layouts/admin-layout.vue';
    import cashierLayout from './layouts/cashier-layout.vue';
    import boardLayout from './layouts/board-layout.vue';
    import playerLayout from './layouts/player-layout.vue';

    import '@/assets/sass/app.scss';
    import { mapActions, mapState } from 'vuex';

    import Pusher from 'pusher-js';
    export default {
        metaInfo: {
            title: 'COLISEUM'
            // titleTemplate: ''
        },
        components: {
            app: appLayout,
            auth: authLayout,
            admin: adminLayout,
            cashier: cashierLayout,
            board: boardLayout,
            player: playerLayout
        },
        computed: {
            layout() {
                return this.$store.getters.layout;
            },
            ...mapState('auth', ['profile'])
        },
        data() {
            return {};
        },
        methods: {
            ...mapActions('auth', {
                auth_gp: 'getProfile'
            }),
            ...mapActions('schedule', {
                schedule_gc: 'getCurrent'
            }),
            ...mapActions('fight', {
                fight_gc: 'getCurrent'
            }),
            async getCurrentSchedule() {
                const res = await this.schedule_gc();
                if (res) {
                    this.fight_gc({ schedule_id: res.id });
                }
            }
        },
        mounted() {
            var vm = this;
            // window.Echo.channel('channel-fight').listen('FightPlayerWin', async () => {
            //     if (vm.profile.user_type_id == 5) {
            //         vm.auth_gp();
            //     }
            // });
            // window.Echo.channel('channel-transaction').listen('TransactionStatus', async e => {
            //     if (e.data.original.data.user_id == vm.profile.id) {
            //         vm.auth_gp();
            //     }
            // });

            // window.Echo.channel('channel-schedule').listen('ScheduleStatus', async () => {
            //     vm.getCurrentSchedule();
            // });

            const pusher = new Pusher(process.env.VUE_APP_PUSSHER_APP_KEY, {
                cluster: process.env.VUE_APP_PUSSHER_APP_CLUSTER
            });

            const channel_fight = pusher.subscribe('channel-fight');
            channel_fight.bind('FightPlayerWin', () => {
                if (vm.profile.user_type_id == 5) {
                    vm.auth_gp();
                }
            });

            const channel_transaction = pusher.subscribe('channel-transaction');
            channel_transaction.bind('TransactionStatus', e => {
                if (e.data.original.data.user_id == vm.profile.id) {
                    vm.auth_gp();
                }
            });
            const channel_schedule = pusher.subscribe('channel-schedule');
            channel_schedule.bind('ScheduleStatus', () => {
                vm.getCurrentSchedule();
            });
        }
    };
</script>

<style>
    .table-loader {
        color: #bfc9d4 !important;
        border-radius: 0 !important;
        width: 100% !important;
    }

    .table-bordered td,
    .table-bordered th {
        border: 1px solid #dee2e6 !important;
    }

    .dark .pagination .page-link {
        background-color: #191e3a !important;
    }

    @media print {
        .hide-on-print {
            display: none;
        }
    }
</style>
