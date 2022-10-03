<template>
    <div class="player-1">
        <div class="content-header">
            <span class="float-left">Withdraw</span>
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
                    <input type="type" name="" id="" placeholder="ENTER AMOUNT" maxlength="11" v-model="cash_payload.amount" />
                    <button @click="setAmount(0)">CLEAR</button>
                </div>
                <div class="group-button">
                    <button @click="setAmount(100)">100</button>
                    <button @click="setAmount(200)">200</button>
                    <button @click="setAmount(500)">500</button>
                    <button @click="setAmount(1000)">1,000</button>
                    <button @click="setAmount(5000)">5,000</button>
                </div>
                <div class="group-button submit">
                    <button @click="submit()">SUBMIT</button>
                </div>
            </div>
        </div>
        <div class="content-transaction-history">
            <table>
                <thead>
                    <tr>
                        <th>AMOUNT</th>
                        <th>STATUS</th>
                        <th>DATE</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- <tr>
                        <td>1,000,000</td>
                        <td><span class="text-danger">Cancelled</span></td>
                        <td>May 25, 2022</td>
                    </tr>
                    <tr>
                        <td>1,000,000</td>
                        <td><span class="text-warning">Pending</span></td>
                        <td>May 25, 2022</td>
                    </tr>
                    <tr>
                        <td>1,000,000</td>
                        <td><span class="text-primary">Complete</span></td>
                        <td>May 25, 2022</td>
                    </tr> -->
                    <tr v-for="r in data.list" :key="r.id">
                        <td>{{ formatNumberString(parseFloat(r.amount)) }}</td>
                        <td>
                            <span :class="`${r.status == 1 ? 'text-success' : r.status == 2 ? 'text-danger' : 'text-warning'}`">{{
                                r.status == 1 ? 'Approved' : r.status == 2 ? 'Cancelled' : 'Pending'
                            }}</span>
                        </td>
                        <td>{{ formatDateFdY(r.created_at) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState, mapGetters } from 'vuex';
    import Pusher from 'pusher-js';
    export default {
        metaInfo: { title: 'Player' },
        data() {
            return {
                cash_payload: {
                    amount: ''
                }
            };
        },
        watch: {
            'cash_payload.amount'() {
                this.cash_payload.amount = this.formatNumberString(this.cash_payload.amount);
            }
        },
        computed: {
            ...mapState('auth', ['profile']),
            ...mapState('transaction', ['data']),
            ...mapGetters('auth', ['user_id', 'user_type', 'has_money'])
        },
        methods: {
            ...mapActions('transaction', {
                transaction_gl: 'getList',
                transaction_wd: 'withdraw'
            }),
            ...mapActions('auth', {
                auth_gp: 'getProfile'
            }),
            setAmount(val) {
                this.cash_payload.amount = val;
            },
            async submit() {
                var vm = this;
                if (!vm.cash_payload.amount) return;

                if (vm.formatStringNumber(vm.cash_payload.amount) > vm.profile.money) {
                    vm.$swal('Failed!', `Insufficient funds`, 'warning');
                    return;
                }
                const confirmed = await vm
                    .$swal({
                        title: 'Are you sure?',
                        text: `Withdraw ₱${vm.cash_payload.amount}`,
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: `Withdraw`,
                        padding: '2em'
                    })
                    .then(result => {
                        return result.isConfirmed;
                    });
                if (confirmed) {
                    const res = await vm.transaction_wd({ id: vm.user_id, amount: vm.formatStringNumber(vm.cash_payload.amount), status: 0 });
                    if (res.success) {
                        vm.$swal('Success!', `Transaction successfully made.`, 'success');
                        vm.auth_gp();
                        vm.getWithdraws();
                    } else {
                        vm.$swal('Failed!', `Transaction failed.`, 'warning');
                    }
                }
            },
            getWithdraws() {
                this.transaction_gl({ page_no: 1, type: 2, user_id: this.user_id });
            }
        },
        mounted() {
            var vm = this;
            vm.getWithdraws();

            // window.Echo.channel('channel-transaction').listen('TransactionStatus', async e => {
            //     if (e.data.original.data.user_id == vm.profile.id) {
            //         vm.getWithdraws();
            //     }
            // });

            const pusher = new Pusher(process.env.VUE_APP_PUSSHER_APP_KEY, {
                cluster: process.env.VUE_APP_PUSSHER_APP_CLUSTER
            });

            const channel_fight = pusher.subscribe('channel-transaction');
            channel_fight.bind('TransactionStatus', async e => {
                if (e.data.original.data.user_id == vm.profile.id) {
                    vm.getWithdraws();
                }
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
</style>
