<template>
    <div class="player-1">
        <div class="content-header">
            <span class="float-left">Fight #{{ current_fight.fight_no }}</span>
            <span class="float-right"
                >{{ current_fight.status ? 'OPEN' : 'CLOSED' }}
                <div :class="`status ${current_fight.status ? 'open' : 'closed'}`"></div
            ></span>
        </div>
        <div class="content-bet-type">
            <img class="versus" src="@/assets/images/vs.png" alt="" />
            <button class="bet float-left btn-meron " :style="`${current_fight.status == 0 || user_bet.data.length > 0 ? 'pointer-events: none;' : ''}`">
                <div class="bet-label">
                    MERON
                </div>
                <div class="bet-stats">
                    <!-- <img src="@/assets/images/btn-bg-meron.png" alt="" /> -->
                    <span class="bet-total">{{ parseFloat(current_fight.meron_bet) > 0 ? formatNumberString(parseFloat(current_fight.meron_bet)) : '0' }}</span>
                    <span class="bet-payout">{{ parseFloat(current_fight.meron_payout) > 0 ? parseFloat(current_fight.meron_payout).toFixed(2) : '0.00' }}</span>
                    <span class="bet-player active">{{ user_bet.meron.bet_amount > 0 ? formatNumberString(user_bet.meron.bet_amount) : '' }}</span>
                    <span class="bet-choose" @click="submitBet(1)">CHOOSE</span>
                </div>
            </button>
            <button class="bet float-right btn-wala" :style="`${current_fight.status == 0 || user_bet.data.length > 0 ? 'pointer-events: none;' : ''}`">
                <div class="bet-label">
                    WALA
                </div>
                <div class="bet-stats">
                    <!-- <img src="@/assets/images/btn-bg-wala.png" alt="" /> -->
                    <span class="bet-total">{{ parseFloat(current_fight.wala_bet) > 0 ? formatNumberString(parseFloat(current_fight.wala_bet)) : '0' }}</span>
                    <span class="bet-payout">{{ parseFloat(current_fight.wala_payout) > 0 ? parseFloat(current_fight.wala_payout).toFixed(2) : '0.00' }}</span>
                    <span class="bet-player active">{{ user_bet.wala.bet_amount > 0 ? formatNumberString(user_bet.wala.bet_amount) : '' }}</span>
                    <span class="bet-choose" @click="submitBet(2)">CHOOSE</span>
                </div>
            </button>
            <button class="bet-draw" :style="`${current_fight.status == 0 || user_bet.data.length > 0 ? 'pointer-events: none;' : ''}`">
                <div class="bet-label">
                    DRAW
                </div>
                <div class="bet-choose" @click="submitBet(3)">
                    CHOOSE
                </div>
                <span class="bet-player active">{{ user_bet.draw.bet_amount > 0 ? formatNumberString(user_bet.draw.bet_amount) : '' }}</span>
            </button>
        </div>
        <div class="content-user-details">
            <div class="group-detail">
                <span class="float-left">ID :</span>
                <span class="float-right">{{ profile.username }}</span>
            </div>
            <div class="group-detail">
                <span class="float-left">BALANCE :</span>
                <span class="float-right">{{ formatNumberStringDecimal(profile.money) }}</span>
            </div>
            <div class="bet-amount">
                <div class="group-input">
                    <input type="type" name="" id="" placeholder="ENTER AMOUNT" maxlength="11" v-model="params.bet_amount" :disabled="current_fight.status == 0" />
                    <button @click="setAmount(0)" :disabled="current_fight.status == 0">CLEAR</button>
                </div>
                <div class="group-button">
                    <button @click="setAmount(100)" :disabled="current_fight.status == 0">100</button>
                    <button @click="setAmount(200)" :disabled="current_fight.status == 0">200</button>
                    <button @click="setAmount(500)" :disabled="current_fight.status == 0">500</button>
                    <button @click="setAmount(1000)" :disabled="current_fight.status == 0">1,000</button>
                    <button @click="setAmount(5000)" :disabled="current_fight.status == 0">5,000</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
    import Pusher from 'pusher-js';

    export default {
        metaInfo: { title: 'Player' },
        data() {
            return {
                params: {
                    bet_amount: ''
                }
            };
        },
        watch: {
            'params.bet_amount'() {
                this.params.bet_amount = this.formatNumberString(this.params.bet_amount);
            }
        },
        computed: {
            ...mapState('auth', ['profile']),
            ...mapGetters('auth', ['user_id', 'user_type', 'has_money']),
            ...mapState('fight', ['current_fight']),
            ...mapState('bet', ['user_bet'])
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
            ...mapActions('bet', {
                bet_cr: 'create',
                bet_ub: 'userBet'
            }),
            ...mapMutations('fight', {
                fight_sf: 'setCurrentFight',
                fight_st: 'setCurrentFightTotal',
                fight_ss: 'setCurrentFightStatus',
                fight_sa: 'setCurrentFightAnnouncement'
            }),
            ...mapMutations('bet', {
                bet_cu: 'clearUserBet'
            }),

            setAmount(val) {
                this.params.bet_amount = val;
            },
            async submitBet($bet_select) {
                var vm = this;

                if (!vm.params.bet_amount) {
                    vm.$swal('Failed!', `Please enter bet amount`, 'warning');
                    return;
                }

                if (vm.formatStringNumber(vm.params.bet_amount) > vm.profile.money) {
                    vm.$swal('Failed!', `Insufficient funds`, 'warning');
                    return;
                }

                var confirm = await vm
                    .$swal({
                        title: `${$bet_select == 1 ? 'BET MERON' : $bet_select == 2 ? 'BET WALA' : $bet_select == 3 ? 'BET DRAW' : ''}`,
                        text: "You won't be able to revert this!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Confirm',
                        customClass: $bet_select == 1 ? 'modal-bg-red' : $bet_select == 2 ? 'modal-bg-blue' : $bet_select == 3 ? 'modal-bg-green' : '',
                        padding: '2em'
                    })
                    .then(result => {
                        return result.value;
                    });

                if (confirm) {
                    const res = await vm.bet_cr({
                        schedule_id: vm.current_fight.schedule_id,
                        fight_id: vm.current_fight.id,
                        bet_select: $bet_select,
                        bet_amount: vm.formatStringNumber(vm.params.bet_amount)
                    });

                    if (res.success) {
                        vm.$swal('Success!', 'Bet posted successfully.', 'success');
                        vm.auth_gp();
                        vm.bet_ub({ schedule_id: vm.current_fight.schedule_id, fight_id: vm.current_fight.id });
                        vm.reset();
                    }
                }
            },
            async getCurrentSchedule() {
                var vm = this;
                const sres = await vm.schedule_gc();
                if (sres) {
                    const fres = await vm.fight_gc({ schedule_id: sres.id });
                    if (fres) {
                        vm.bet_ub({ schedule_id: fres.id, fight_id: fres.id });
                    }
                }
            },
            reset() {
                this.params.bet_amount = '';
            }
        },
        mounted() {
            var vm = this;
            vm.getCurrentSchedule();

            // window.Echo.channel('channel-fight').listen('FightCurrent', async e => {
            //     await vm.fight_sf(e.data.original.data);
            //     vm.bet_cu();
            // });
            // window.Echo.channel('channel-fight').listen('FightStatus', e => {
            //     vm.fight_ss(e.data.original.status);
            //     // vm.auth_gp();
            // });
            // window.Echo.channel('channel-fight').listen('FightAnnouncement', e => {
            //     vm.fight_sa(e.data.original.announcement);

            //     if (e.data.original.announcement) {
            //         vm.$swal({
            //             title: e.data.original.announcement,
            //             // customClass: $bet_select == 1 ? 'modal-bg-red' : $bet_select == 2 ? 'modal-bg-blue' : $bet_select == 3 ? 'modal-bg-green' : '',
            //             padding: '2em'
            //         });
            //     }

            //     // vm.$swal('Announcement!', e.data.original.announcement, 'info');
            // });
            // window.Echo.channel('channel-fight').listen('FightTotalBet', e => {
            //     vm.fight_st(e.data.original.data);
            // });

            const pusher = new Pusher(process.env.VUE_APP_PUSSHER_APP_KEY, {
                cluster: process.env.VUE_APP_PUSSHER_APP_CLUSTER
            });

            const channel_fight = pusher.subscribe('channel-fight');
            channel_fight.bind('FightCurrent', async e => {
                vm.fight_sf(e.data.original.data);
                vm.bet_cu();
            });
            channel_fight.bind('FightStatus', async e => {
                vm.fight_ss(e.data.original.status);
            });
            channel_fight.bind('FightAnnouncement', async e => {
                vm.fight_sa(e.data.original.announcement);

                if (e.data.original.announcement) {
                    vm.$swal({
                        title: e.data.original.announcement,
                        // customClass: $bet_select == 1 ? 'modal-bg-red' : $bet_select == 2 ? 'modal-bg-blue' : $bet_select == 3 ? 'modal-bg-green' : '',
                        padding: '2em'
                    });
                }
            });
            channel_fight.bind('FightTotalBet', async e => {
                vm.fight_st(e.data.original.data);
            });
        },
        beforeDestroy() {}
    };
</script>

<style lang="scss">
    body {
        background-color: #000;
        margin: 0px;
    }

    .modal-bg-red {
        background-color: rgb(231 118 138) !important;
    }

    .modal-bg-blue {
        background-color: #4361ee !important;
    }

    .modal-bg-orange {
        background-color: #e2a03f !important;
    }

    .modal-bg-green {
        background-color: #1abc9c !important;
    }
</style>
