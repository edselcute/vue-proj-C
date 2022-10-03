<template>
    <div class="board-1">
        <div class="event-header">
            <span>{{ current_fight.schedule.event_name }}</span>
            <!-- <h1>{{ formatDateFdY(current_fight.schedule.datetime) }} FIGHT #{{ current_fight.fight_no }}</h1> -->
            <h1>FIGHT #{{ current_fight.fight_no }}</h1>
            <span>Minimum Bet 100</span>
        </div>
        <div class="event-game-fight">
            <div class="row">
                <div class="col-xl-5 col-lg-4 col-md-4 col-sm-4 col-12 layout-spacing box-mron">
                    <div class="img-chicken img-meron">
                        <img src="@/assets/images/mron.png" alt="" />
                    </div>
                    <div class="board-bet bet-meron">
                        <h2>MERON</h2>
                        <!-- <h2>MERON WIN</h2> -->
                        <h1>{{ parseFloat(current_fight.meron_bet) > 0 ? formatNumberString(parseFloat(current_fight.meron_bet)) : '0' }}</h1>
                        <span>{{ formatNumberStringDecimal(current_fight.meron_payout) }}</span>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-4 col-md-4 col-sm-4 col-12 layout-spacing">
                    <div class="board-bet bet-draw">
                        <h2>DRAW</h2>
                        <!-- <h2>DRAW WIN</h2> -->
                        <!-- <span>{{ parseFloat(current_fight.draw_bet) > 0 ? formatNumberString(parseFloat(current_fight.draw_bet)) : '0' }}</span> -->
                        <span>{{ formatDrawRake(current_schedule.draw_rake) }}</span>
                    </div>
                </div>
                <div class="col-xl-5 col-lg-4 col-md-4 col-sm-4 col-12 layout-spacing box-wala">
                    <div class="img-chicken img-wala">
                        <img src="@/assets/images/wala.png" alt="" />
                    </div>
                    <div class="board-bet bet-wala">
                        <h2>WALA</h2>
                        <!-- <h2>WALA WIN</h2> -->
                        <h1>{{ parseFloat(current_fight.wala_bet) > 0 ? formatNumberString(parseFloat(current_fight.wala_bet)) : '0' }}</h1>
                        <span>{{ formatNumberStringDecimal(current_fight.wala_payout) }}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div :class="`event-call ${current_fight.status == 0 ? 'close' : current_fight.status == 1 ? 'open' : ''}`">
            <h1>{{ current_fight.status == 0 ? 'CLOSE BETTING' : current_fight.status == 1 ? 'OPEN BETTING' : '' }}</h1>
        </div> -->
        <div
            :class="
                `event-call ${
                    current_fight.announcement == 'CLOSE BETTING'
                        ? 'close'
                        : current_fight.announcement == 'OPEN BETTING'
                        ? 'open'
                        : current_fight.announcement == 'MERON WINS'
                        ? 'meron'
                        : current_fight.announcement == 'WALA WINS'
                        ? 'wala'
                        : current_fight.announcement == 'DRAW WINS'
                        ? 'draw'
                        : current_fight.announcement == 'CANCEL GAME'
                        ? 'cancel'
                        : ''
                }`
            "
            v-if="current_fight.announcement"
        >
            <h1>{{ current_fight.announcement }}</h1>
        </div>
    </div>
</template>

<script>
    import '@/assets/sass/pages/helpdesk.scss';
    import '@/assets/sass/widgets/widgets.scss';
    import '@/assets/sass/components/custom-modal.scss';
    import '@/assets/sass/apps/invoice-add.scss';
    import '@/assets/sass/apps/invoice-preview.scss';
    import '@/assets/sass/users/user-profile.scss';

    import { mapState, mapActions, mapMutations } from 'vuex';
    import Pusher from 'pusher-js';
    export default {
        metaInfo: { title: 'Board' },
        data() {
            return {
                polling: null,
                modalItem: { bgBody: null, bgheader: null, title: null, contentText: null, type: null, id: null },
                fightItem: {},
                fightGame: {},
                params: { id: null, status: null, result: null }
            };
        },
        watch: {},
        computed: {
            ...mapState('fight', ['data', 'current_fight']),
            ...mapState('schedule', ['current_schedule'])
        },
        methods: {
            ...mapMutations('fight', {
                fight_sf: 'setCurrentFight',
                fight_st: 'setCurrentFightTotal',
                fight_ss: 'setCurrentFightStatus',
                fight_sa: 'setCurrentFightAnnouncement'
            }),
            ...mapActions('schedule', {
                schedule_gc: 'getCurrent'
            }),
            ...mapActions('fight', {
                fight_gl: 'getList',
                fight_gc: 'getCurrent'
            }),
            async getCurrentSchedule() {
                var vm = this;
                const sres = await vm.schedule_gc();
                if (sres) {
                    await vm.fight_gc({ schedule_id: sres.id });
                }
            }
        },
        mounted() {
            var vm = this;
            vm.getCurrentSchedule();

            // WEBSOCKET LISTENERS
            // window.Echo.channel('channel-fight').listen('FightCurrent', async e => {
            //     console.log(e.data.original.data);
            //     await vm.fight_sf(e.data.original.data);
            //     await vm.fight_gl({ page_no: 1, limit: 1000, sort_order: 'desc', sort_column: 'fight_no', schedule_id: parseInt(vm.current_fight.schedule_id), status: 2 });
            // });
            // window.Echo.channel('channel-fight').listen('FightStatus', e => {
            //     vm.fight_ss(e.data.original.status);
            // });
            // window.Echo.channel('channel-fight').listen('FightAnnouncement', e => {
            //     vm.fight_sa(e.data.original.announcement);
            // });
            // window.Echo.channel('channel-fight').listen('FightTotalBet', e => {
            //     vm.fight_st(e.data.original.data);
            // });

            const pusher = new Pusher(process.env.VUE_APP_PUSSHER_APP_KEY, {
                cluster: process.env.VUE_APP_PUSSHER_APP_CLUSTER
            });

            const channel_fight = pusher.subscribe('channel-fight');
            channel_fight.bind('FightCurrent', async e => {
                await vm.fight_sf(e.data.original.data);
                await vm.fight_gl({ page_no: 1, limit: 1000, sort_order: 'desc', sort_column: 'fight_no', schedule_id: parseInt(vm.current_fight.schedule_id), status: 2 });
            });
            channel_fight.bind('FightStatus', async e => {
                vm.fight_ss(e.data.original.status);
            });
            channel_fight.bind('FightAnnouncement', async e => {
                vm.fight_sa(e.data.original.announcement);
            });
            channel_fight.bind('FightTotalBet', async e => {
                vm.fight_st(e.data.original.data);
            });

            
        },
        beforeDestroy() {}
    };
</script>

<style lang="scss">
    .board-1 {
        margin: 0px;
        width: 100%;
        height: 100%;
        position: fixed;
        background: url('~@/assets/images/bg_basic.jpg'), #000;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
    }

    .board-1::before {
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: #121212;
        opacity: 0.5;
    }

    .event-header {
        width: 100%;
        text-align: center;
        font-weight: bolder;
        font-family: Arial, Helvetica, sans-serif;
        padding-top: 2vw;
        text-transform: uppercase;
    }

    .event-header > span {
        color: #a3ff12;
        font-size: 1vw;
        font-weight: bolder;
    }

    .event-header > h1 {
        color: #fff;
        font-size: 60px;
        font-weight: bolder;
    }

    .event-game-fight {
        text-align: center;
    }

    .img-chicken {
        width: 25vw;
        height: 150%;
        margin: 0 auto;
        background-color: #000;
        border-radius: 50%;
        border: 5px solid;
        position: relative;
        display: block;
    }

    .img-chicken > img {
        width: 70%;
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .img-chicken.img-meron {
        border: 5px solid #ff120e;
        float: right;
    }

    .img-chicken.img-wala {
        border: 5px solid #0b71ff;
        float: left;
    }

    .board-bet {
        display: block;
        width: 25vw;
        font-family: Arial, Helvetica, sans-serif;
    }

    .board-bet.bet-draw {
        width: 100%;
        padding-top: 40%;
    }

    .board-bet.bet-meron {
        float: right;
    }

    .board-bet.bet-wala {
        float: left;
    }

    .board-bet > h2 {
        font-size: 3.5vw;
        font-weight: bolder;
        margin-bottom: 0px;
    }

    .board-bet.bet-meron > h2 {
        color: #ff120e;
    }

    .board-bet.bet-wala > h2 {
        color: #0b71ff;
    }

    .board-bet.bet-draw > h2 {
        color: #a3ff12;
    }

    .board-bet.bet-draw > span {
        color: #a3ff12;
        font-size: 4vw;
    }

    .board-bet > h1 {
        font-size: 5vw;
        font-weight: bolder;
        color: #a3ff12;
        margin-bottom: 0px;
    }

    .board-bet > span {
        font-size: 3vw;
        font-weight: bolder;
        color: #fff;
        margin-bottom: 0px;
    }

    .event-call {
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 150px;
        bottom: 0px;
        border-top: 5px solid #fff;
        text-align: center;
        // display: none;
    }

    .event-call.open {
        background-color: rgb(52 173 2 / 51%);
    }

    .event-call.closed {
        background-color: rgb(173 2 2 / 51%);
    }

    .event-call.meron {
        background-color: rgb(231 118 138) !important;
    }
    .event-call.wala {
        background-color: #4361ee !important;
    }
    .event-call.draw {
        background-color: #1abc9c !important;
    }
    .event-call.cancel {
        background-color: #3b3f5c !important;
    }

    .event-call > h1 {
        font-size: 5vw;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bolder;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
    }
</style>
