<template>
    <div class="layout-px-spacing">
        <portal to="breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Cashier</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>No Cash</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
            <div class="mr-4">
                <button class="btn btn-danger btn-rounded" @click="$bvModal.show('cashoutModal')">Cash Out</button>
            </div>
        </portal>
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
                    fight_id: '',
                    bet_select: '',
                    bet_amount: '',
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
            async scanBarcode(val) {
                var vm = this;
                const res = await vm.bet_sc({
                    barcode: val
                });
                if (res) {
                    vm.claim_details.fight_id = res.fight_id;
                    vm.claim_details.bet_select = res.bet_select;
                    vm.claim_details.bet_amount = res.bet_amount;
                    vm.claim_details.bet_payout = 198.0;
                    vm.claim_details.result_amount = parseFloat(res.result_amount);
                    vm.claim_details.date_printed = new Date().toLocaleString('en-US');
                    vm.claim_details.user_id = res.user_id;
                    vm.claim_details.barcode = res.barcode;

                    vm.$refs.barcode.value = null;
                    vm.printable = true;
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
                                // await vm.auth_gp();
                                await vm.reset();
                            }, 500);
                        });
                    }
                }
            },

            reset() {
                this.printable = false;
                this.claim_details.fight_id = '';
                this.claim_details.bet_select = '';
                this.claim_details.bet_amount = '';
                this.claim_details.bet_payout = '';
                this.claim_details.result_amount = '';
                this.claim_details.date_printed = '';
                this.claim_details.user_id = '';
                this.claim_details.barcode = '';
            },
            mounted() {
                this.$nextTick(() => this.$refs.barcode.focus());
            }
        }
    };
</script>
