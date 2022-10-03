<template>
    <div class="layout-px-spacing">
        <portal to="breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Admin</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Fight Control</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
            <!-- <b-button variant="warning" right @click="init()" class="mr-2">Refresh</b-button> -->
        </portal>
        <div class="helpdesk">
            <div class="helpdesk layout-spacing">
                <div class="hd-tab-section">
                    <div class="row mb-5 mt-5">
                        <div class="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                            <div class="statbox panel box box-shadow">
                                <div class="panel-body">
                                    <div class="widget widget-wallet-balance">
                                        <div class="widget-heading d-block">
                                            <div class="widget-content">
                                                <div class="bills-stats  ">
                                                    <span class="text-success" v-if="current_fight.status == 1">Open</span>
                                                    <span class="text-danger" v-if="current_fight.status == 0">Close</span>
                                                    <span class="text-primary" v-if="current_fight.status == 2">Finished</span>
                                                </div>
                                            </div>
                                            <div class="wallet-balance">
                                                <p>{{ current_fight.schedule.event_name }}</p>
                                                <!-- <h5>FIGHT #{{ current_fight.fight_no }} {{ formatDateFdY(current_fight.schedule.datetime) }}</h5> -->
                                                <h5>FIGHT #{{ current_fight.fight_no }}</h5>
                                            </div>
                                        </div>
                                        <div class="widget-amount monitor">
                                            <div class="w-a-info funds-received mr-3">
                                                <h2 class="text-center text-danger">MERON</h2>
                                                <h1 class="text-center">{{ parseFloat(current_fight.meron_bet) > 0 ? formatNumberString(parseFloat(current_fight.meron_bet)) : '0' }}</h1>
                                                <p>{{ formatNumberStringDecimal(current_fight.meron_payout) }}</p>
                                            </div>
                                            <div class="w-a-info funds-spent mr-3">
                                                <h2 class="text-center text-success">DRAW</h2>
                                                <h1 class="text-center">{{ parseFloat(current_fight.draw_bet) > 0 ? formatNumberString(parseFloat(current_fight.draw_bet)) : '0' }}</h1>

                                                <p>{{ formatDrawRake(current_schedule.draw_rake) }}</p>
                                            </div>
                                            <div class="w-a-info funds-spent">
                                                <h2 class="text-center text-primary">WALA</h2>
                                                <h1 class="text-center">{{ parseFloat(current_fight.wala_bet) > 0 ? formatNumberString(parseFloat(current_fight.wala_bet)) : '0' }}</h1>
                                                <p>{{ formatNumberStringDecimal(current_fight.wala_payout) }}</p>
                                            </div>
                                        </div>
                                        <div class="widget-content">
                                            <div class="bills-stats  ">
                                                <div class="row layout-top-spacing game-control">
                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <b-button variant="warning" block class="mb-4 mr-2" @click="updateStatus(1)" :disabled="current_fight.status == 1 || current_fight.status == 2"
                                                            >OPEN BETTING</b-button
                                                        >
                                                    </div>
                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <b-button variant="danger" block class="mb-4 mr-2" @click="updateStatus(0)" :disabled="current_fight.status == 0 || current_fight.status == 2"
                                                            >CLOSE BETTING</b-button
                                                        >
                                                    </div>
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div class="row">
                                                            <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                                                <h4>Game Result</h4>
                                                            </div>
                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <b-button
                                                                    variant="danger"
                                                                    block
                                                                    class="mb-4 mr-2"
                                                                    @click="updateResult(1)"
                                                                    :disabled="current_fight.status == 1 || current_fight.status == 2 || cancelledFight"
                                                                    >MERON</b-button
                                                                >
                                                            </div>
                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <b-button
                                                                    variant="primary"
                                                                    block
                                                                    class="mb-4 mr-2"
                                                                    @click="updateResult(2)"
                                                                    :disabled="current_fight.status == 1 || current_fight.status == 2 || cancelledFight"
                                                                    >WALA</b-button
                                                                >
                                                            </div>
                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <b-button
                                                                    variant="success"
                                                                    block
                                                                    class="mb-4 mr-2"
                                                                    @click="updateResult(3)"
                                                                    :disabled="current_fight.status == 1 || current_fight.status == 2 || cancelledFight"
                                                                    >DRAW</b-button
                                                                >
                                                            </div>
                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <b-button
                                                                    variant="dark"
                                                                    block
                                                                    class="mb-4 mr-2"
                                                                    @click="updateResult(4)"
                                                                    :disabled="current_fight.status == 1 || current_fight.status == 2"
                                                                    >CANCEL</b-button
                                                                >
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <b-button variant="secondary" block class="mb-4 mr-2" @click="init()" :disabled="current_fight.status != 2">NEXT FIGHT</b-button>
                                                    </div>
                                                </div>

                                                <div class="row announcement">
                                                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-12">
                                                        <h4>Announcement</h4>
                                                    </div>
                                                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-12">
                                                        <b-select v-model="announcement">
                                                            <b-select-option value="" selected disabled>SELECT ANNOUNCEMENT</b-select-option>
                                                            <b-select-option value="STANDBY FOR THE NEXT FIGHT">STANDBY FOR THE NEXT FIGHT</b-select-option>
                                                            <b-select-option value="LAST CALL TO PLACE YOUR BETS">LAST CALL TO PLACE YOUR BETS</b-select-option>
                                                            <b-select-option value="LAST FIGHT">LAST FIGHT</b-select-option>
                                                        </b-select>
                                                    </div>
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
                                                        <!-- <b-button variant="info" block size="lg" class="mb-4 mr-2" @click="showModal('result', 'modal-bg-red', 1)">Submit</b-button> -->
                                                        <b-button-group block>
                                                            <b-button variant="outlined-success" @click="setAnnouncement(announcement)">Submit</b-button>
                                                            <b-button variant="outlined-danger" @click="setAnnouncement()">Clear</b-button>
                                                        </b-button-group>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                            <div class="widget widget-recent-activity">
                                <div class="widget-heading">
                                    <h5>Results</h5>
                                </div>
                                <div class="widget-content">
                                    <perfect-scrollbar class="timeline-line table-declarator">
                                        <b-table-simple responsive>
                                            <b-thead>
                                                <b-tr>
                                                    <b-th><div class="th-content">Fight No.</div></b-th>
                                                    <b-th><div class="th-content">Result</div></b-th>
                                                    <b-th><div class="th-content th-heading">Payout</div></b-th>
                                                    <b-th><div class="th-content th-heading">Claiming</div></b-th>
                                                    <b-th><div class="th-content th-heading">Action</div></b-th>
                                                </b-tr>
                                            </b-thead>
                                            <b-tbody>
                                                <b-tr v-for="r in data.list" :key="r.id">
                                                    <b-td
                                                        ><div class="td-content">{{ r.fight_no }}</div></b-td
                                                    >
                                                    <b-td
                                                        ><div
                                                            :class="
                                                                `td-content ${
                                                                    r.result == 1
                                                                        ? 'text-danger'
                                                                        : r.result == 2
                                                                        ? 'text-primary'
                                                                        : r.result == 3
                                                                        ? 'text-success'
                                                                        : r.result == 3
                                                                        ? 'text-default'
                                                                        : ''
                                                                }`
                                                            "
                                                        >
                                                            {{ r.result == 1 ? 'MERON' : r.result == 2 ? 'WALA' : r.result == 3 ? 'DRAW' : r.result == 4 ? 'CANCELLED' : '--' }}
                                                        </div></b-td
                                                    >
                                                    <b-td
                                                        ><div class="td-content">
                                                            <span>{{
                                                                r.result == 1
                                                                    ? parseFloat(r.meron_payout).toFixed(2)
                                                                    : r.result == 2
                                                                    ? parseFloat(r.wala_payout).toFixed(2)
                                                                    : r.result == 3
                                                                    ? formatNumberStringDecimal(current_schedule.draw_rake)
                                                                    : ''
                                                            }}</span>
                                                        </div></b-td
                                                    >
                                                    <b-td>
                                                        <div class="td-content text-center">
                                                            <button
                                                                :disabled="r.claim_status == 1"
                                                                type="button"
                                                                :class="`btn ${r.claim_status == 1 ? 'btn-danger' : 'btn-success'} btn-sm`"
                                                                @click="toggleClaim(r)"
                                                            >
                                                                {{ r.claim_status == 1 ? 'Enabled' : 'Enable' }}
                                                            </button>
                                                        </div>
                                                    </b-td>
                                                    <b-td>
                                                        <div class="td-content">
                                                            <button type="button" class="btn btn-warning btn-sm" @click="showRegrade(r)" :disabled="r.claim_status == 1">Regrade</button>
                                                        </div>
                                                    </b-td>
                                                </b-tr>
                                            </b-tbody>
                                        </b-table-simple>
                                    </perfect-scrollbar>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <b-modal centered id="resultConfirm" :body-class="modalItem.bgBody" :header-class="modalItem.bgHeader" :static="true" size="md">
            <div class="add-contact-box">
                <div class="add-contact-content danger">
                    <b-form id="resultConfirmTitle">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group align-self-center align-center">
                                    <h5 :class="`${modalItem.type == 'result' ? 'text-center text-white' : 'text-center'}`">{{ modalItem.title }}</h5>
                                    <h1 :class="`${modalItem.type == 'result' ? 'text-center text-white' : 'text-center'}`">{{ modalItem.contentText }}</h1>
                                    <!-- <h1>Confirmation for Game CLOSE BET</h1> -->
                                </div>
                            </div>
                        </div>
                    </b-form>
                </div>
            </div>
            <template #modal-footer>
                <b-button variant="default" data-dismiss="modal" @click="$bvModal.hide('resultConfirm')"><i class="flaticon-cancel-12"></i>NO</b-button>
                <b-button variant="default" id="btn-add" @click="updateResult()">YES</b-button>
            </template>
        </b-modal>

        <b-modal centered id="statusConfirm" :body-class="modalItem.bgBody" :header-class="modalItem.bgHeader" :static="true" size="md">
            <div class="add-contact-box">
                <div class="add-contact-content danger">
                    <b-form id="statusConfirmTitle">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group align-self-center align-center">
                                    <h5 :class="`${modalItem.type == 'result' ? 'text-center text-white' : 'text-center'}`">{{ modalItem.title }}</h5>
                                    <h1 :class="`${modalItem.type == 'result' ? 'text-center text-white' : 'text-center'}`">{{ modalItem.contentText }}</h1>
                                    <!-- <h1>Confirmation for Game CLOSE BET</h1> -->
                                </div>
                            </div>
                        </div>
                    </b-form>
                </div>
            </div>

            <template #modal-footer>
                <b-button variant="default" data-dismiss="modal" @click="$bvModal.hide('statusConfirm')"><i class="flaticon-cancel-12"></i>NO</b-button>
                <b-button variant="default" id="btn-add" @click="updateStatus()">YES</b-button>
            </template>
        </b-modal>

        <b-modal centered id="regradeConfirmation" body-class="modal-bg-red" :static="true" size="md">
            <div class="add-contact-box">
                <div class="add-contact-content danger">
                    <b-form id="regradeConfirmationTitle">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group align-self-center align-center">
                                    <h5 class="text-center text-white">Do you want to Re enter the result Fight #1</h5>
                                    <!-- <h1>Confirmation for Game CLOSE BET</h1> -->
                                </div>
                            </div>
                        </div>
                    </b-form>
                </div>
            </div>

            <template #modal-footer>
                <b-button variant="default" data-dismiss="modal" @click="$bvModal.hide('regradeConfirmation')"><i class="flaticon-cancel-12"></i>NO</b-button>
                <b-button variant="default" id="btn-add" @click="showResult()">YES</b-button>
            </template>
        </b-modal>

        <b-modal centered id="reResult" :static="true" size="md">
            <div class="add-contact-box">
                <div class="add-contact-content danger">
                    <b-form id="reResultTitle">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="widget-content">
                                    <div class="bills-stats  ">
                                        <div class="row layout-top-spacing game-control">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="row">
                                                    <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                                        <h4>Re Enter Game Result Fight # {{ regrade_payload.fight_no }}</h4>
                                                    </div>
                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <b-button variant="danger" block class="mb-4 mr-2" @click="regradeResult(1)">MERON</b-button>
                                                    </div>
                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <b-button variant="primary" block class="mb-4 mr-2" @click="regradeResult(2)">WALA</b-button>
                                                    </div>
                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <b-button variant="success" block class="mb-4 mr-2" @click="regradeResult(3)">DRAW</b-button>
                                                    </div>
                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <b-button variant="dark" block class="mb-4 mr-2" @click="regradeResult(4)">CANCEL</b-button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-form>
                </div>
            </div>

            <template #modal-footer>
                <b-button variant="default" data-dismiss="modal" @click="$bvModal.hide('reResult')"><i class="flaticon-cancel-12"></i>Close</b-button>
            </template>
        </b-modal>
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
        metaInfo: { title: 'Fight Control' },
        data() {
            return {
                polling: null,
                modalItem: { bgBody: null, bgheader: null, title: null, contentText: null, type: null, id: null },
                fightItem: {},
                fightGame: {},
                regrade_payload: {
                    id: 0,
                    fight_no: 0,
                    result: 0,
                    regrade_count: 0
                },
                announcement: '',
                disable_next_fight: true
            };
        },
        watch: {},
        computed: {
            ...mapState('schedule', ['current_schedule']),
            ...mapState('fight', ['data', 'current_fight']),
            cancelledFight() {
                var vm = this;
                return parseFloat(vm.current_fight.meron_payout) <= 140 || parseFloat(vm.current_fight.wala_payout) <= 140;
            }
        },
        methods: {
            ...mapActions('schedule', {
                schedule_gc: 'getCurrent'
            }),

            ...mapActions('fight', {
                fight_gl: 'getList',
                fight_gc: 'getCurrent',
                fight_us: 'updateStatus',
                fight_ur: 'updateResult',
                fight_ub: 'updateBet',
                fight_ua: 'updateAnnouncement',
                fight_uc: 'updateClaimStatus',
                fight_rg: 'regrade',
                fight_dp: 'distributePlayerWin'
            }),
            ...mapMutations('fight', {
                fight_sf: 'setCurrentFight',
                fight_st: 'setCurrentFightTotal',
                fight_ss: 'setCurrentFightStatus',
                fight_sa: 'setCurrentFightAnnouncement'
            }),

            async setAnnouncement(announcement) {
                var vm = this;
                if (!announcement) {
                    vm.announcement = '';
                }
                const res = await vm.fight_ua({
                    id: vm.current_fight.id,
                    announcement: announcement ? announcement : vm.announcement
                });

                if (res.success) {
                    setTimeout(() => {
                        vm.fight_ua({
                            id: vm.current_fight.id,
                            announcement: ''
                        });
                        vm.announcement = '';
                    }, 15000);
                }
            },
            async showModal(type, value, id) {
                var vm = this;
                console.log(vm.fightGame);
                vm.modalItem.type = type;
                vm.modalItem.id = id;
                if (type == 'game') {
                    vm.modalItem.bgBody = null;
                    vm.modalItem.bgHeader = value;
                    vm.modalItem.title = 'Confirmation for Game Status';
                    switch (id) {
                        case 0:
                            vm.modalItem.contentText = 'BET CLOSE';
                            break;
                        case 1:
                            vm.modalItem.contentText = 'BET OPEN';
                            break;
                        case 2:
                            vm.modalItem.contentText = 'BET FINISH';
                            break;
                        default:
                            break;
                    }
                }
                if (type == 'result') {
                    vm.modalItem.bgBody = value;
                    vm.modalItem.bgHeader = null;
                    vm.modalItem.title = 'Confirmation for Game Result';
                    switch (id) {
                        case 1:
                            vm.modalItem.contentText = 'MERON WIN';
                            break;
                        case 2:
                            vm.modalItem.contentText = 'WALA WIN';
                            break;
                        case 3:
                            vm.modalItem.contentText = 'DRAW WIN';
                            break;
                        case 4:
                            vm.modalItem.contentText = 'CANCEL GAME';
                            break;
                        default:
                            break;
                    }
                }
                vm.params.id = 1;
                vm.params.status = id;
                vm.fighResult.id = 1;
                vm.fighResult.result = id;

                // vm.mode = id ? 1 : 0;
                // if (vm.mode) {
                //     const res = await vm.go({ id: id });
                //     if (res) {
                //         vm.params.id = id;
                //         vm.params.name = res.name;
                //     }
                // }
                // vm.ub({ id: vm.params.id });
                await vm.$bvModal.hide('reResult');
                await vm.$bvModal.show('resultConfirm');
            },
            async showResult(type, value, id) {
                var vm = this;
                console.log(vm.fightGame);
                vm.modalItem.type = type;
                vm.modalItem.id = id;
                if (type == 'game') {
                    vm.modalItem.bgBody = null;
                    vm.modalItem.bgHeader = value;
                    vm.modalItem.title = 'Confirmation for Game Status';
                    switch (id) {
                        case 0:
                            vm.modalItem.contentText = 'BET CLOSE';
                            break;
                        case 1:
                            vm.modalItem.contentText = 'BET OPEN';
                            break;
                        case 2:
                            vm.modalItem.contentText = 'BET FINISH';
                            break;
                        default:
                            break;
                    }
                }
                if (type == 'result') {
                    vm.modalItem.bgBody = value;
                    vm.modalItem.bgHeader = null;
                    vm.modalItem.title = 'Confirmation for Game Result';
                    switch (id) {
                        case 1:
                            vm.modalItem.contentText = 'MERON WIN';
                            break;
                        case 2:
                            vm.modalItem.contentText = 'WALA WIN';
                            break;
                        case 3:
                            vm.modalItem.contentText = 'DRAW WIN';
                            break;
                        case 4:
                            vm.modalItem.contentText = 'CANCEL GAME';
                            break;
                        default:
                            break;
                    }
                }
                vm.params.id = vm.fightItem.id;
                vm.params.status = id;
                vm.fighResult.id = vm.current_fight.id;
                vm.fighResult.result = id;
                await vm.$bvModal.show('reResult');
                await vm.$bvModal.hide('regradeConfirmation');
            },
            async showRegrade($fight) {
                var vm = this;
                vm.regrade_payload.id = $fight.id;
                vm.regrade_payload.fight_no = $fight.fight_no;
                vm.regrade_payload.regrade_count = $fight.regrade_count;
                await vm.$bvModal.show('reResult');
            },
            // Functions
            async toggleClaim($fight) {
                var vm = this;
                const confirmed = await vm
                    .$swal({
                        title: 'Are you sure?',
                        text: `${$fight.claim_status ? 'Disable' : 'Enable'} claiming for Fight No. ${$fight.fight_no}`,
                        type: 'warning',
                        showCancelButton: true,
                        padding: '2em'
                    })
                    .then(result => {
                        return result.isConfirmed;
                    });

                if (confirmed) {
                    var pl = {
                        id: $fight.id,
                        claim_status: $fight.claim_status ? 0 : 1
                    };

                    const res = await vm.fight_uc(pl);
                    if (res.success) {
                        vm.fight_dp({ fight_id: $fight.id, schedule_id: $fight.schedule_id });
                        await vm.$swal('Success!', `Enabled claiming for Fight No. ${$fight.fight_no}`, 'success');
                    } else {
                        await vm.$swal('Failed!', `An error occured.`, 'warning');
                    }
                }
                // this.$refs.claimToggle[0].checked = false
                await vm.fight_gl({ page_no: 1, limit: 1000, sort_order: 'desc', sort_column: 'fight_no', schedule_id: parseInt(this.$route.params.id), status: 2 });
                // API
            },
            async updateStatus($status) {
                var vm = this;
                const confirmed = await vm
                    .$swal({
                        title: `<h1 style="color:#fff;">${$status == 1 ? 'OPEN' : 'CLOSE'} BETTING</h1>`,
                        text: 'Confirm betting status',
                        width: 500,
                        // padding: '3em',
                        customClass: $status == 1 ? 'modal-bg-orange' : 'modal-bg-red',
                        showCancelButton: true
                    })
                    .then(result => {
                        return result.isConfirmed;
                    });

                if (confirmed) {
                    var payload = { id: vm.current_fight.id, status: $status };
                    const res = await vm.fight_us(payload);
                    if (res.success) {
                        vm.setAnnouncement($status == 1 ? 'OPEN BETTING' : 'CLOSE BETTING');
                        vm.fight_ss(payload.status);
                    } else {
                        await vm.$swal('Failed!', res.message, 'warning');
                    }
                }
            },
            async updateResult($result) {
                var vm = this;

                const confirmed = await vm
                    .$swal({
                        title: `<h1 style="color:#fff; font-weight: 900">${$result == 1 ? 'MERON WINS' : $result == 2 ? 'WALA WINS' : $result == 3 ? 'DRAW WINS' : 'CANCEL GAME'}</h1>`,
                        text: `Confirm result`,
                        width: 600,
                        padding: '7em',
                        customClass: $result == 1 ? 'modal-bg-red' : $result == 2 ? 'modal-bg-blue' : $result == 3 ? 'modal-bg-green' : 'modal-bg-gray',
                        showCancelButton: true
                    })
                    .then(result => {
                        return result.isConfirmed;
                    });

                if (confirmed) {
                    var payload = { id: vm.current_fight.id, result: $result };
                    const res = await vm.fight_ur(payload);
                    if (res.success) {
                        vm.setAnnouncement($result == 1 ? 'MERON WINS' : $result == 2 ? 'WALA WINS' : $result == 3 ? 'DRAW WINS' : 'CANCEL GAME');
                        vm.$swal('Success!', 'Game has been updated.', 'success');
                    } else {
                        vm.$swal('Failed!', res.message, 'warning');
                    }
                }
                await vm.fight_gl({ page_no: 1, limit: 1000, sort_order: 'desc', sort_column: 'fight_no', schedule_id: parseInt(this.$route.params.id), status: 2 });
            },
            async regradeResult($result) {
                var vm = this;
                await vm.$bvModal.hide('reResult');

                vm.regrade_payload.result = $result;
                const confirmed = await vm
                    .$swal({
                        title: `<h1 style="color:#fff; font-weight: 900">${$result == 1 ? 'MERON WINS' : $result == 2 ? 'WALA WINS' : $result == 3 ? 'DRAW WINS' : 'CANCEL GAME'}</h1>`,
                        text: `Regrade result for Fight No. ${vm.regrade_payload.fight_no}`,
                        width: 600,
                        padding: '7em',
                        customClass: $result == 1 ? 'modal-bg-red' : $result == 2 ? 'modal-bg-blue' : $result == 3 ? 'modal-bg-green' : 'modal-bg-gray',
                        showCancelButton: true
                    })
                    .then(result => {
                        return result.isConfirmed;
                    });

                if (confirmed) {
                    const res = await vm.fight_rg(vm.regrade_payload);
                    if (res.success) {
                        vm.$swal('Success!', 'Game has been updated.', 'success');
                    } else {
                        vm.$swal('Failed!', res.message, 'warning');
                    }
                }
                await vm.fight_gl({ page_no: 1, limit: 1000, sort_order: 'desc', sort_column: 'fight_no', schedule_id: parseInt(this.$route.params.id), status: 2 });
            },
            async init() {
                await this.fight_gl({ page_no: 1, limit: 1000, sort_order: 'desc', sort_column: 'fight_no', schedule_id: parseInt(this.$route.params.id), status: 2 });
                await this.fight_gc({ schedule_id: parseInt(this.$route.params.id) });
            }
        },
        mounted() {

            var vm = this
            vm.init();
            vm.schedule_gc();



            // window.Echo.channel('channel-fight').listen('FightTotalBet', e => {
            //     this.fight_st(e.data.original.data);
            // });

            // window.Echo.channel('channel-fight').listen('FightStatus', e => {
            //     this.fight_ss(e.data.original.status);
            // });

            
            const pusher = new Pusher(process.env.VUE_APP_PUSSHER_APP_KEY, {
                cluster: process.env.VUE_APP_PUSSHER_APP_CLUSTER
            });

            const channel_fight = pusher.subscribe('channel-fight');
            channel_fight.bind('FightTotalBet', (e) => {
                vm.fight_st(e.data.original.data);
            });
            channel_fight.bind('FightStatus', (e) => {
                vm.fight_ss(e.data.original.status);
            });
        }
    };
</script>

<style lang="scss">
    /* .panel-body {
        padding: 1em 15em !important;
    } */
    .button-grid {
        display: grid;
        grid-gap: 1em;
        grid-template-columns: 2fr 2fr 2fr 2fr;
    }
    .widget.widget-wallet-balance .widget-amount .w-a-info {
        width: 30%;
    }

    .widget.widget-recent-activity .widget-content .timeline-line.table-declarator {
        height: 625px;
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

    .modal-bg-gray {
        background-color: #3b3f5c !important;
    }
    .modal-bg-gray h1,
    .modal-bg-gray h5 {
        color: #fff !important;
    }

    .modal-bg-purple {
        background-color: #805dca !important;
    }

    .game-control button {
        font-size: 25px;
        font-weight: bolder;
    }

    .announcement select,
    .announcement button {
        font-size: 1.5em;
    }
</style>
