<template>
    <div class="layout-px-spacing apps-invoice-add">
        <portal to="breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Cashier</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Claiming</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </portal>

        <div class="doc-container-2">
            <div class="form-group ">
                <!-- <label for="barcode" class="col-sm-3 col-form-label col-form-label-sm">Barcode</label> -->
                <input class="form-control input-sm" id="barcode" ref="barcode" @keyup.enter="scanBarcode($event.target.value)" placeholder="Barcode" />
            </div>
            <div class="invoice-content">
                <div class="invoice-detail-body pt-0">
                    <div class="invoice-detail-title"></div>
                    <div class="invoice-detail-total">
                        <div id="ct" class="">
                            <div class="user-info-list">
                                <div class="">
                                    <ul class="contacts-block list-unstyled">
                                        <li class="contacts-block__item ">
                                            <h6 class="text-center">CLAIM RECEIPT</h6>
                                            <h5 class="text-center">{{ claim_details.event_name ? claim_details.event_name : '--------------' }}</h5>
                                            <h6 class="text-center mb-4">{{ claim_details.event_date ? formatDateFdY(claim_details.event_date) : '----------' }}</h6>
                                        </li>
                                        <li class="contacts-block__item">
                                            <div class="receipt">
                                                <div class="label">Fight No.</div>
                                                <div class="value">{{ claim_details.fight_no ? claim_details.fight_no : '-------' }}</div>
                                            </div>
                                        </li>
                                        <li class="contacts-block__item">
                                            <div class="receipt">
                                                <div class="label">Fight Result</div>
                                                <div class="value">
                                                    {{ claim_details.result == 1 ? 'MERON' : claim_details.result == 2 ? 'WALA' : claim_details.result == 3 ? 'DRAW' : '-------' }}
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="totals-row">
                                <div class="invoice-totals-row invoice-summary-subtotal">
                                    <div class="invoice-summary-label">Bet Select</div>
                                    <div class="invoice-summary-value">
                                        <div class="subtotal-amount">
                                            <span class="amount">{{
                                                claim_details.bet_select == 1 ? 'MERON' : claim_details.bet_select == 2 ? 'WALA' : claim_details.bet_select == 3 ? 'DRAW' : '-------'
                                            }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="invoice-totals-row invoice-summary-subtotal">
                                    <div class="invoice-summary-label">Bet Amount</div>
                                    <div class="invoice-summary-value">
                                        <div class="subtotal-amount">
                                            <span class="currency" v-if="claim_details.bet_amount">₱</span
                                            ><span class="amount">{{ claim_details.bet_amount ? formatNumberString(claim_details.bet_amount) : '-------' }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="invoice-totals-row invoice-summary-tax">
                                    <div class="invoice-summary-label">Status</div>
                                    <div class="invoice-summary-value">
                                        <div class="tax-amount">
                                            <span>{{ claim_details.bet_status ? formatResult(claim_details.result, claim_details.bet_select) : '-------' }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="invoice-totals-row invoice-summary-tax">
                                    <div class="invoice-summary-label">Payout</div>
                                    <div class="invoice-summary-value">
                                        <div class="tax-amount">
                                            <span>{{ claim_details.bet_payout ? formatNumberStringDecimal(claim_details.bet_payout) : '-------' }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="invoice-totals-row invoice-summary-balance-due">
                                    <div class="invoice-summary-label">Total</div>
                                    <div class="invoice-summary-value">
                                        <div class="balance-due-amount">
                                            <span class="currency" v-if="claim_details.result_amount">₱</span
                                            ><span>{{ claim_details.result_amount ? formatNumberString(claim_details.result_amount) : '-------' }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="totals-row">
                                <small class="text-center text-block">Date Printed: {{ claim_details.date_printed }}</small>
                                <br />
                                <small class="text-center">Cashier ID: {{ claim_details.user_id }}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="invoice-actions-btn">
                <div class="invoice-action-btn">
                    <div class="row">
                        <div class="col-xl-12 col-md-4">
                            <b-button tag="a" variant="danger" class="btn-send" @click="reset()">Reset</b-button>
                        </div>
                        <div class="col-xl-12 col-md-4">
                            <b-button :disabled="!printable" tag="a" variant="secondary" class="btn-print btn-block action-print" @click="claimBet()">Claim</b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal centered id="cashoutModal" :static="true" title="Cash Out" size="sm" @hidden="reset()">
            <div class="add-contact-box">
                <div class="add-contact-content">
                    <b-form id="cashoutModalTitle">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <b-input v-model="cashout_payload.amount" placeholder="Amount" maxlength="9" onkeypress=" return event.charCode >= 48 && event.charCode <= 57"></b-input>
                                </div>
                            </div>
                        </div>
                    </b-form>
                </div>
            </div>

            <template #modal-footer>
                <b-button variant="default" data-dismiss="modal" @click="$bvModal.hide('cashoutModal')"><i class="flaticon-cancel-12"></i> Discard</b-button>
                <b-button variant="default" id="btn-add" @click="submit()">Cash Out</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import '@/assets/sass/apps/invoice-edit.scss';
    import '@/assets/sass/users/user-profile.scss';
    //flatpickr
    import 'flatpickr/dist/flatpickr.css';
    import '@/assets/sass/forms/custom-flatpickr.css';

    import { mapActions } from 'vuex';
    export default {
        metaInfo: { title: 'Claiming' },
        data() {
            return {
                printable: false,
                barcode: '',
                claim_details: {
                    event_name: '',
                    event_date: '',
                    fight_no: '',
                    result: '',
                    bet_select: '',
                    bet_amount: '',
                    bet_status: '',
                    bet_payout: '',
                    result_amount: '',
                    date_printed: '',
                    user_id: '',
                    barcode: ''
                },
                cashout_payload: {
                    amount: ''
                }
            };
        },
        watch: {
            'cashout_payload.amount'() {
                this.cashout_payload.amount = this.formatNumberString(this.cashout_payload.amount);
            }
        },

        methods: {
            ...mapActions('bet', {
                bet_sc: 'scanBarcode',
                bet_cl: 'claimBet'
            }),
            ...mapActions('auth', {
                auth_gp: 'getProfile'
            }),
            async scanBarcode(val) {
                var vm = this;
                const res = await vm.bet_sc({
                    barcode: val
                });

                if (res.status) {
                    console.log(res.data);
                    vm.claim_details.event_name = res.data.schedule.event_name;
                    vm.claim_details.event_date = res.data.schedule.datetime;
                    vm.claim_details.fight_no = res.data.fight.fight_no;
                    vm.claim_details.result = res.data.result;
                    vm.claim_details.bet_select = res.data.bet_select;
                    vm.claim_details.bet_amount = res.data.bet_amount;
                    vm.claim_details.bet_status = res.data.status;
                    if (res.data.status == 1) {
                        vm.claim_details.bet_payout =
                            res.data.bet_select == 1 && res.data.bet_select == res.data.result
                                ? parseFloat(res.data.fight.meron_payout) / 100
                                : res.data.bet_select == 2 && res.data.bet_select == res.data.result
                                ? parseFloat(res.data.fight.wala_payout) / 100
                                : res.data.bet_select == 3 && res.data.bet_select == res.data.result
                                ? parseFloat(res.data.schedule.draw_rake)
                                : '';
                        vm.claim_details.result_amount = parseInt(res.data.result_amount);
                    } else {
                        vm.claim_details.bet_payout = 0;
                        vm.claim_details.result_amount = 0;
                    }
                    vm.claim_details.date_printed = new Date().toLocaleString('en-US');
                    vm.claim_details.user_id = res.data.user_id;
                    vm.claim_details.barcode = res.data.barcode;

                    vm.$refs.barcode.value = null;

                    vm.printable = res.data.status == 1;
                } else {
                    await vm.$swal('Failed!', res.messaage, 'warning');
                    vm.$refs.barcode.value = null;
                }
            },
            async claimBet() {
                var vm = this;
                const confirmed = await vm
                    .$swal({
                        title: 'Are you sure?',
                        text: `Claim`,
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Claim',
                        padding: '2em'
                    })
                    .then(result => {
                        return result.isConfirmed;
                    });

                if (confirmed) {
                    const res = await vm.bet_cl({
                        barcode: vm.claim_details.barcode
                    });

                    if (res.success) {
                        await vm.$swal('Success!', 'Bet claimed successfully.', 'success').then(() => {
                            setTimeout(async () => {
                                await window.print();
                                await vm.auth_gp();
                                await vm.reset();
                            }, 500);
                        });
                    } else {
                        await vm.$swal('Failed!', res.message, 'warning');
                        await vm.reset();
                    }
                }
            },

            reset() {
                this.printable = false;
                this.claim_details.fight_no = '';
                this.claim_details.bet_select = '';
                this.claim_details.bet_amount = '';
                this.claim_details.bet_payout = '';
                this.claim_details.result_amount = '';
                this.claim_details.date_printed = '';
                this.claim_details.user_id = '';
                this.claim_details.barcode = '';
                this.claim_details.result = '';
                this.claim_details.bet_status = '';
            },
            mounted() {
                this.$nextTick(() => this.$refs.barcode.focus());
            }
        }
    };
</script>

<style lang="scss">
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

    .doc-container-2 {
        margin-top: 2em !important;
        min-width: 26em !important;
        width: 26em !important;
    }

    @media print {
        body {
            background: #fff !important;
        }
        body * {
            visibility: hidden;
            font-family: Helvetica !important;
            color: #000 !important;
        }

        #ct {
            visibility: visible;

            * {
                visibility: visible;
            }
        }

        .doc-container-2 {
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

        .form-group {
            display: none;
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
