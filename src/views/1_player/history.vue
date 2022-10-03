<template>
    <div class="player-1">
        <div class="content-header">
            <span class="float-left">History</span>
        </div>
        <div class="content-transaction-history bet-history">
            <table>
                <thead>
                    <tr>
                        <th>BET / AMOUNT</th>
                        <th>STATUS / PAYOUT</th>
                        <th># / DATE</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- <tr>
                        <td><span class="text-danger">MERON</span><span>1,000,000</span></td>
                        <td><span class="text-danger">LOSE</span><span>198.6</span></td>
                        <td><span>Fight #7</span><span>May 25, 2022</span></td>
                    </tr>
                    <tr>
                        <td><span class="text-primary">WALA</span><span>1,000,000</span></td>
                        <td><span class="text-danger">LOSE</span><span>198.6</span></td>
                        <td><span>Fight #6</span><span>May 25, 2022</span></td>
                    </tr>
                    <tr>
                        <td><span class="text-danger">MERON</span><span>1,000,000</span></td>
                        <td><span class="text-primary">WIN</span><span>198.6</span></td>
                        <td><span>Fight #5</span><span>May 25, 2022</span></td>
                    </tr> -->
                    <tr v-for="r in data.list" :key="r.id">
                        <td>
                            <span :class="`${r.bet_select == 1 ? 'text-danger' : r.bet_select == 2 ? 'text-primary' : r.bet_select == 3 ? 'text-success' : ''}`">{{
                                r.bet_select == 1 ? 'MERON' : r.bet_select == 2 ? 'WALA' : r.bet_select == 3 ? 'DRAW' : ''
                            }}</span
                            ><span>{{ formatNumberString(r.bet_amount) }}</span>
                        </td>
                        <td>
                            <span :class="`${r.status == 1 ? 'text-success' : r.status == 2 ? 'text-danger' : ''}`">{{ r.status == 1 ? 'WIN' : r.status == 2 ? 'LOSE' : '' }}</span
                            ><span v-if="r.status > 0">198.6</span>
                        </td>
                        <td><span>Fight #6</span><span>May 25, 2022</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    export default {
        metaInfo: { title: 'Player' },
        data() {
            return {};
        },
        watch: {},
        computed: {
            ...mapState('bet', ['data'])
        },
        methods: {
            ...mapActions('bet', {
                bet_gl: 'getList'
            }),
            getHistories() {
                this.bet_gl({ page_no: 1, user_id: this.user_id });
            }
        },
        mounted() {
            this.getHistories();
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
