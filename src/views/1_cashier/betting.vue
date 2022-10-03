<template>
    <div class="layout-px-spacing dash_1">
        <portal to="breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Cashier</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Betting</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>

            <marquee class="announcement text-warning" direction="left" v-if="current_fight.announcement" scrollamount="10">
                {{ current_fight.announcement }}
            </marquee>

            <!-- <ul class="navbar-nav flex-row ml-auto">
                <li class="nav-item more-dropdown">
                    <a href="javascript:void(0);" class="text-danger mr-3" v-if="profile.money > 0" @click="cashOut()">Cash-out</a>
                </li>
            </ul> -->
        </portal>
        <div class="row layout-top-spacing" v-if="profile.money > 0">
            <!-- ROW 1 -->
            <div class="col-xl-9 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing hide-on-print">
                <div class="widget widget-wallet-balance">
                    <div class="widget-heading d-block">
                        <div class="wallet-usr-info">
                            <div class="usr-name">
                                <span><img src="@/assets/images/mron.png" alt="admin-profile" class="img-fluid" /> {{ current_fight.arena.name }}</span>
                            </div>
                        </div>
                        <div class="wallet-balance">
                            <p>{{ current_fight.schedule.event_name }}</p>
                            <!-- <h5>{{ formatDateFdY(current_fight.schedule.datetime) }}</h5> -->
                        </div>
                    </div>

                    <div class="widget-amount monitor">
                        <div class="w-a-info funds-received mr-3">
                            <h2 :class="`text-center text-danger ${current_fight.announcement == 'MERON WINS' ? 'glow' : ''}`">MERON</h2>
                            <h1 class="text-center">{{ parseFloat(current_fight.meron_bet) > 0 ? formatNumberString(parseFloat(current_fight.meron_bet)) : '0' }}</h1>
                            <p>{{ parseFloat(current_fight.meron_payout) > 0 ? parseFloat(current_fight.meron_payout).toFixed(2) : '0.00' }}</p>
                        </div>
                        <div class="w-a-info funds-spent mr-3">
                            <h2 :class="`text-center text-success  ${current_fight.announcement == 'DRAW WINS' ? 'glow' : ''}`">DRAW</h2>
                            <h1 class="text-center">{{ parseFloat(current_fight.draw_bet) > 0 ? formatNumberString(parseFloat(current_fight.draw_bet)) : '0' }}</h1>

                            <p>1-8</p>
                        </div>
                        <div class="w-a-info funds-spent">
                            <h2 :class="`text-center text-primary  ${current_fight.announcement == 'WALA WINS' ? 'glow' : ''}`">WALA</h2>
                            <h1 class="text-center">{{ parseFloat(current_fight.wala_bet) > 0 ? formatNumberString(parseFloat(current_fight.wala_bet)) : '0' }}</h1>
                            <p>{{ parseFloat(current_fight.wala_payout) > 0 ? parseFloat(current_fight.wala_payout).toFixed(2) : '0.00' }}</p>
                        </div>
                    </div>

                    <div class="widget-content">
                        <!-- <div class="bills-stats  ">
                            <span class="text-danger">Close Betting</span>
                            <span class="text-success">Open Betting</span>
                            <span class="text-info">Stand-by</span>
                        </div> -->
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing hide-on-print">
                <div class="widget widget-recent-activity">
                    <div class="widget-heading">
                        <h5>Fight Details</h5>
                    </div>
                    <div class="widget-content">
                        <div class="invoice-address-client-fields">
                            <div class="form-group row">
                                <label for="client-name" class="col-sm-4 col-form-label col-form-label-sm">Fight No.</label>
                                <div class="col-sm-7">
                                    <b-input size="sm" id="client-name" disabled :value="current_fight.fight_no"></b-input>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="client-email" class="col-sm-4 col-form-label col-form-label-sm">Status</label>
                                <div class="col-sm-7">
                                    <b-input
                                        size="sm"
                                        id="client-email"
                                        disabled
                                        :value="current_fight.status == 0 ? 'CLOSED' : current_fight.status == 1 ? 'OPEN' : 'FINISHED'"
                                        :class="`status ${current_fight.status == 0 ? 'closed' : current_fight.status == 1 ? 'open' : 'finished'}`"
                                    ></b-input>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="client-email" class="col-sm-4 col-form-label col-form-label-sm">Meron Bets</label>
                                <div class="col-sm-7">
                                    <b-input size="sm" id="client-email" disabled :value="current_fight.meron_count"></b-input>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="client-email" class="col-sm-4 col-form-label col-form-label-sm">Wala Bets</label>
                                <div class="col-sm-7">
                                    <b-input size="sm" id="client-email" disabled :value="current_fight.wala_count"></b-input>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="client-email" class="col-sm-4 col-form-label col-form-label-sm">Draw Bets</label>
                                <div class="col-sm-7">
                                    <b-input size="sm" id="client-email" disabled :value="current_fight.draw_count"></b-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ROW 2 -->

            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing">
                <div class="doc-container">
                    <div class="invoice-content">
                        <div class="invoice-detail-body pt-0">
                            <div class="invoice-detail-title"></div>
                            <div class="invoice-detail-total">
                                <div id="ct" class="">
                                    <div class="user-info-list">
                                        <div class="">
                                            <ul class="contacts-block list-unstyled">
                                                <li class="contacts-block__item text-center">
                                                    <h6 class="text-center">BET SLIP</h6>
                                                    <h5 class="text-center">{{ current_schedule.event_name ? current_schedule.event_name : '--------------' }}</h5>
                                                    <h6 class="text-center mb-4">{{ formatDateFdY(current_schedule.datetime) }}</h6>
                                                </li>
                                                <li class="contacts-block__item">
                                                    <div class="receipt">
                                                        <div class="label">Fight No.</div>
                                                        <div class="value">{{ current_fight.fight_no ? current_fight.fight_no : '-------' }}</div>
                                                    </div>
                                                </li>
                                                <li class="contacts-block__item">
                                                    <div class="receipt">
                                                        <div class="label">Side</div>
                                                        <div class="value">{{ params.bet_select == 1 ? 'MERON' : params.bet_select == 2 ? 'WALA' : params.bet_select == 3 ? 'DRAW' : '-------' }}</div>
                                                    </div>
                                                </li>
                                                <li class="contacts-block__item">
                                                    <div class="receipt">
                                                        <div class="label">Amount</div>
                                                        <div class="value">
                                                            <span class="amount">{{ params.bet_amount ? params.bet_amount : '-------' }}</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <br />
                                    <div class="totals-row">
                                        <small class="text-center text-block">Date Printed: {{ params.date_printed }}</small>
                                        <br />
                                        <small class="text-center">Cashier: {{ profile.username }}</small>
                                        <barcode :value="params.barcode" fontSize="12" height="30" class="bcode text-center">
                                            *** barcode ***
                                        </barcode>
                                        <small class="text-center mb-0">Please keep this for claiming</small>
                                    </div>
                                </div>

                                <button class="btn btn-block btn-info mt-4" :disabled="!params.bet_select || !params.bet_amount" @click="submitBet()">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing">
                <b-card class="component-card_1">
                    <h5 class="text-right mb-3">
                        Cash: <span class="text-warning">{{ formatNumberStringDecimal(profile.money) }}</span>
                    </h5>
                    <div class="numpad-grid">
                        <button class="btn btn-danger" :disabled="current_fight.status == 0" @click="setBetSide(1)">MERON</button>
                        <button class="btn btn-success" :disabled="current_fight.status == 0" @click="setBetSide(3)">DRAW</button>
                        <button class="btn btn-primary" :disabled="current_fight.status == 0" @click="setBetSide(2)">WALA</button>
                    </div>
                    <br />
                    <b-input-group class="mb-4">
                        <b-input
                            placeholder="Amount"
                            :disabled="current_fight.status == 0"
                            v-model="params.bet_amount"
                            maxlength="9"
                            onkeypress=" return event.charCode >= 48 && event.charCode <= 57"
                        ></b-input>
                        <b-input-group-append>
                            <b-button variant="danger" :disabled="current_fight.status == 0" @click="setBetAmount('')">Clear</b-button>
                        </b-input-group-append>
                    </b-input-group>
                    <div class="numpad-grid">
                        <button class="btn btn-rounded btn-outline-secondary" :disabled="current_fight.status == 0" @click="setBetAmount(100)">100</button>
                        <button class="btn btn-rounded btn-outline-secondary" :disabled="current_fight.status == 0" @click="setBetAmount(200)">200</button>
                        <button class="btn btn-rounded btn-outline-secondary" :disabled="current_fight.status == 0" @click="setBetAmount(300)">300</button>
                        <button class="btn btn-rounded btn-outline-secondary" :disabled="current_fight.status == 0" @click="setBetAmount(400)">400</button>
                        <button class="btn btn-rounded btn-outline-secondary" :disabled="current_fight.status == 0" @click="setBetAmount(500)">500</button>
                        <button class="btn btn-rounded btn-outline-secondary" :disabled="current_fight.status == 0" @click="setBetAmount(600)">600</button>
                        <button class="btn btn-rounded btn-outline-secondary" :disabled="current_fight.status == 0" @click="setBetAmount(700)">700</button>
                        <button class="btn btn-rounded btn-outline-secondary" :disabled="current_fight.status == 0" @click="setBetAmount(800)">800</button>
                        <button class="btn btn-rounded btn-outline-secondary" :disabled="current_fight.status == 0" @click="setBetAmount(900)">900</button>
                        <button class="btn btn-rounded btn-outline-secondary" :disabled="current_fight.status == 0" @click="setBetAmount(1000)">1000</button>
                        <button class="btn btn-rounded btn-outline-secondary" :disabled="current_fight.status == 0" @click="setBetAmount(2000)">2000</button>
                        <button class="btn btn-rounded btn-outline-secondary" :disabled="current_fight.status == 0" @click="setBetAmount(3000)">3000</button>
                        <button class="btn btn-rounded btn-outline-secondary" :disabled="current_fight.status == 0" @click="setBetAmount(4000)">4000</button>
                        <button class="btn btn-rounded btn-outline-secondary" :disabled="current_fight.status == 0" @click="setBetAmount(5000)">5000</button>
                        <button class="btn btn-rounded btn-outline-secondary" :disabled="current_fight.status == 0" @click="setBetAmount(6000)">6000</button>
                    </div>
                </b-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
                <div class="widget widget-recent-activity">
                    <div class="widget-heading">
                        <h5>Results</h5>
                    </div>
                    <div class="widget-content">
                        <perfect-scrollbar class="timeline-line">
                            <b-table-simple responsive>
                                <b-thead>
                                    <b-tr>
                                        <b-th><div class="th-content">Fight No.</div></b-th>
                                        <b-th><div class="th-content">Result</div></b-th>
                                        <b-th><div class="th-content th-heading">Payout</div></b-th>
                                    </b-tr>
                                </b-thead>
                                <b-tbody>
                                    <b-tr v-for="r in data.list" :key="r.index">
                                        <b-td
                                            ><div class="td-content">{{ r.fight_no }}</div></b-td
                                        >
                                        <b-td
                                            ><div
                                                :class="
                                                    `td-content ${
                                                        r.result == 1 ? 'text-danger' : r.result == 2 ? 'text-primary' : r.result == 3 ? 'text-success' : r.result == 3 ? 'text-default' : ''
                                                    }`
                                                "
                                            >
                                                {{ r.result == 1 ? 'MERON' : r.result == 2 ? 'WALA' : r.result == 3 ? 'DRAW' : r.result == 4 ? 'CANCELLED' : '--' }}
                                            </div></b-td
                                        >
                                        <b-td
                                            ><div class="td-content">
                                                <span>{{
                                                    r.result == 1 ? parseFloat(r.meron_payout).toFixed(2) : r.result == 2 ? parseFloat(r.wala_payout).toFixed(2) : r.result == 3 ? '1-8' : '--'
                                                }}</span>
                                            </div></b-td
                                        >
                                    </b-tr>
                                </b-tbody>
                            </b-table-simple>
                        </perfect-scrollbar>
                        <!-- 
                        <div class="tm-action-btn">
                            <b-button variant="default">
                                <span>View All</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-arrow-right"
                                >
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </b-button>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="row layout-top-spacing" v-else>
            <div class="col-xl-12 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing">
                <b-card class="component-card_1 mx-auto " style="width:500px">
                    <h5 class="text-left ">CASH-IN</h5>
                    <div class="mb-1">Cash-in to proceed</div>
                    <b-input-group class="mb-4">
                        <b-input v-model="cashin_details.amount" placeholder="Amount" maxlength="9" onkeypress=" return event.charCode >= 48 && event.charCode <= 57"></b-input>
                        <b-input-group-append>
                            <b-button variant="success" @click="cashIn()">Submit</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueApexCharts from 'vue-apexcharts';
    Vue.use(VueApexCharts);
    Vue.component('apexchart', VueApexCharts);

    import VueBarcode from 'vue-barcode';

    import '@/assets/sass/widgets/widgets.scss';
    import '@/assets/sass/components/custom-modal.scss';
    import '@/assets/sass/apps/invoice-add.scss';
    import '@/assets/sass/apps/invoice-preview.scss';
    import '@/assets/sass/users/user-profile.scss';

    import { mapGetters, mapMutations, mapState, mapActions } from 'vuex';

    import Pusher from 'pusher-js';
    export default {
        metaInfo: { title: 'Betting' },
        components: {
            barcode: VueBarcode
        },
        data() {
            return {
                cashin_details: {
                    id: '',
                    amount: ''
                },
                params: {
                    fight_no: '',
                    bet_select: '',
                    bet_amount: '',
                    barcode: '',
                    date_printed: '',
                    user_id: ''
                },
                schedule: {},
                fightGame: {}
            };
        },
        computed: {
            ...mapGetters('auth', ['profile', 'user_id']),
            ...mapState('fight', ['data', 'current_fight']),
            ...mapState('schedule', ['current_schedule'])
        },
        watch: {
            'cashin_details.amount'() {
                this.cashin_details.amount = this.formatNumberString(this.cashin_details.amount);
            },
            'params.bet_amount'() {
                this.params.bet_amount = this.formatNumberString(this.params.bet_amount);
            }
        },
        methods: {
            ...mapMutations('auth', ['setMoney']),
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
            ...mapActions('bet', {
                bet_cr: 'create'
            }),
            ...mapActions('user', {
                user_ci: 'cashIn'
            }),
            ...mapActions('auth', {
                auth_gp: 'getProfile'
            }),
            setBetSide(val) {
                this.params.bet_select = val;
            },
            setBetAmount(val) {
                this.params.bet_amount = val;
            },
            async cashOut() {
                var vm = this;

                const confirmed = await vm
                    .$swal({
                        title: 'Are you sure?',
                        text: `Cash-out`,
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Cash-out',
                        padding: '2em'
                    })
                    .then(result => {
                        return result.isConfirmed;
                    });
                if (confirmed) {
                    vm.setMoney(-vm.profile.money);
                    vm.$swal('Success!', 'Cashed-out successfully.', 'success');
                }
            },
            async cashIn() {
                var vm = this;
                if (!vm.cashin_details.amount) return;

                const confirmed = await vm
                    .$swal({
                        title: 'Are you sure?',
                        text: `Cash-in ₱${vm.cashin_details.amount}`,
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Cash-in',
                        padding: '2em'
                    })
                    .then(result => {
                        return result.isConfirmed;
                    });
                if (confirmed) {
                    const res = await vm.user_ci({ id: vm.user_id, amount: vm.formatStringNumber(vm.cashin_details.amount) });
                    if (res.success) {
                        vm.auth_gp();
                        vm.$swal('Success!', 'Cash-in successfully.', 'success');
                        vm.cashin_amt = '';
                    } else {
                        vm.$swal('Failed!', 'Cash-in failed.', 'warning');
                        vm.cashin_details.amount = '';
                    }
                }
            },
            async submitBet() {
                var vm = this;
                var confirm = await vm
                    .$swal({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Confirm',
                        padding: '2em'
                    })
                    .then(result => {
                        return result.value;
                    });

                if (confirm) {
                    const res = await vm.bet_cr({
                        schedule_id: vm.current_fight.schedule_id,
                        fight_id: vm.current_fight.id,
                        bet_select: vm.params.bet_select,
                        bet_amount: vm.formatStringNumber(vm.params.bet_amount)
                    });

                    if (res.success) {
                        vm.params.barcode = res.barcode;
                        vm.params.date_printed = new Date().toLocaleString('en-US');
                        vm.params.user_id = res.user_id;
                        vm.$swal('Success!', 'Bet posted successfully.', 'success').then(() => {
                            setTimeout(() => {
                                window.print();
                                vm.auth_gp();
                                vm.reset();
                            }, 500);
                        });
                    }
                }
            },
            async getCurrentSchedule() {
                const res = await this.schedule_gc();
                if (res) {
                    this.fight_gc({ schedule_id: res.id });
                }
            },
            reset() {
                var vm = this;
                vm.params.bet_select = '';
                vm.params.bet_amount = '';
                vm.params.barcode = '';
                vm.params.date_printed = '';
                vm.params.user_id = '';
            }
        },
        mounted() {
            var vm = this;
            vm.getCurrentSchedule();

            // WEBSOCKET LISTENERS
            // window.Echo.channel('channel-fight').listen('FightCurrent', async e => {
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
        }
    };
</script>

<style lang="scss">
    .glow {
        -webkit-animation: glow 1s ease-in-out infinite alternate;
        -moz-animation: glow 1s ease-in-out infinite alternate;
        animation: glow 1s ease-in-out infinite alternate;
    }

    @keyframes glow {
        from {
            text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
        }
        to {
            text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
        }
    }
    .announcement {
        height: auto;
        width: 80%;
        margin: 0 auto;
        font-size: 20px;
    }

    .monitor .w-a-info {
        width: 30% !important;
    }

    .numpad-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1em;
    }

    .layout-spacing {
        padding-left: 0.5em;
        padding-right: 0.5em;
        padding-bottom: 1em !important;
    }
    .bet-action {
        display: flex;
        justify-content: space-evenly;
    }

    .user-profile .user-info-list ul.contacts-block {
        max-width: 300px;
    }

    .status:disabled.open {
        color: #1abc9c !important;
    }

    .status:disabled.closed {
        color: #e7515a !important;
    }

    .status:disabled.finished {
        color: #4361ee !important;
    }

    .totals-row {
        max-width: 20rem;
        margin: 0 auto;
    }

    .receipt {
        display: flex;
        justify-content: space-between;
        font-size: 16px;

        // .label {
        //     color: #e0e6ed;
        // }
        max-width: 20rem;
        margin: 0 auto;
        color: #888ea8 !important;
    }
    .tear-here {
        margin-top: 2em;
        display: none;
    }
    // .invoice-content {
    //     height: 100% !important;
    // }
    .invoice-detail-body {
        background-color: #0e1726 !important;
        border: 1px solid #0e1726 !important;
    }
    .bcode {
        margin-top: 1em;
        width: 100%;
    }

    .bcode > svg {
        text-align: center;
        width: 100%;
        margin: 0 auto;
    }

    // .doc-container {
    //     min-width: 26em !important;
    //     width: 26em !important;
    // }

    @media print {
        body {
            background: #fff !important;
        }
        body * {
            visibility: hidden;
            font-family: Helvetica !important;
            color: #000 !important;
        }

        .hide-on-print {
            display: none;
        }

        #ct {
            visibility: visible;

            * {
                visibility: visible;
            }
        }

        .doc-container {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            min-width: 26em !important;
            width: 29em !important;
        }

        .invoice-detail-title {
            margin: 0 !important;
        }

        .invoice-detail-total {
            padding: 0 48px !important;
            margin: 0 !important;
        }

        .main-content {
            margin: 0 !important;
        }

        .apps-invoice-add {
            padding: 0 !important;
        }

        .tear-here {
            display: block;
        }

        .tear-here:before {
            content: '-----------------------------------------';
        }
    }

    @page {
        size: auto;
        margin: 0mm;
    }
</style>
