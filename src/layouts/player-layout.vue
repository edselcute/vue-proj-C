<template>
    <div>
        <div class="topnav" id="myTopnav">
            <router-link tag="a" to="/1_player/player" @click="closeNav()">Home</router-link>
            <router-link tag="a" to="/1_player/deposit" @click="closeNav()">Deposit</router-link>
            <router-link tag="a" to="/1_player/withdraw" @click="closeNav()">Withdraw</router-link>
            <router-link tag="a" to="/1_player/history" @click="closeNav()">History</router-link>
            <a href="#" class="text-danger" @click="logout()">Logout</a>
            <a href="javascript:void(0);" class="icon" @click="myNav()">
                <svg viewBox="0 0 100 80" width="40" height="20" fill="#fff">
                    <rect width="100" height="20"></rect>
                    <rect y="30" width="100" height="20"></rect>
                    <rect y="60" width="100" height="20"></rect>
                </svg>
            </a>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        methods: {
            ...mapActions('auth', {
                auth_lo: 'logoutUser'
            }),
            async logout() {
                var vm = this;
                const res = await vm.auth_lo();
                if (res) {
                    window.location.reload();
                }
            },
            async myNav() {
                var x = document.getElementById('myTopnav');
                if (x.className === 'topnav') {
                    x.className += ' responsive';
                } else {
                    x.className = 'topnav';
                }
            },

            async closeNav() {
                console.log(1);
                var x = document.getElementById('myTopnav');
                x.className = 'topnav';
            }
        },
        mounted() {
            this.$appSetting.toggleMode('dark');
        }
    };
</script>
<style lang="scss">
    body {
        background-color: #000;
        margin: 0px;
    }
    .topnav {
        background-color: #2a2d3e;
        overflow: hidden;
    }

    .topnav a {
        float: left;
        display: block;
        color: #f2f2f2;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 17px;
    }

    .topnav a:hover {
        background-color: #5d627a;
        color: white;
        font-weight: bolder;
    }

    .topnav a.router-link-active {
        background-color: #454d60;
        color: white;
        font-weight: bold;
    }

    .topnav .icon {
        display: none;
    }

    .player-1 {
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 20px;
    }

    .player-1 > div {
        width: 100%;
    }

    .player-1 > div.content-header {
        height: 45px;
        line-height: 45px;
        margin-bottom: 20px;
        background-color: #2a2d3e;
        font-size: 20px;
        padding-left: 20px;
        padding-right: 20px;
        color: #fff;
        font-weight: bolder;
    }

    .player-1 > div.content-header .status {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        display: inline-block;
        margin-left: 5px;
        line-height: 23px;
        margin-bottom: -4px;
    }

    .player-1 > div.content-header .status.open {
        background-color: green;
    }

    .player-1 > div.content-header .status.closed {
        background-color: red;
    }

    .player-1 > div.content-bet-type {
        position: relative;
    }

    .player-1 > div.content-bet-type > img.versus {
        position: absolute;
        top: 135px;
        left: 50%;
        transform: translateX(-50%);
        width: 70px;
        z-index: 9;
    }

    .player-1 > div.content-bet-type > button.bet {
        width: 49%;
        height: auto;
        border: none;
        background-color: white;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        padding: 0px;
    }

    .player-1 > div.content-bet-type > button.bet.btn-meron {
        background-color: #d72312;
    }

    .player-1 > div.content-bet-type > button.bet.btn-wala {
        background-color: #1f29c9;
    }

    .player-1 > div.content-bet-type > button.bet .bet-label {
        font-size: 30px;
        font-weight: bolder;
        color: #fff;
        background-color: rgb(0 0 0 / 40%);
        height: 60px;
        line-height: 63px;
    }

    .player-1 > div.content-bet-type > button.bet .bet-stats {
        position: relative;
        height: 200px;
    }

    .player-1 > div.content-bet-type > button.bet-draw {
        width: 100%;
        position: relative;
        background-color: #27a914;
        color: #fff;
        margin-top: 5px;
        border: none;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        font-weight: bolder;
        font-size: 20px;
        height: auto;
        text-transform: uppercase;
        padding-bottom: 10px;
        padding-top: 10px;
    }

    .player-1 > div.content-bet-type > button.bet-draw .bet-label {
        text-align: left;
        display: block;
        width: 49%;
        padding: 5px;
        float: left;
    }

    .player-1 > div.content-bet-type > button.bet-draw .bet-choose {
        text-align: right;
        display: block;
        width: auto;
        background-color: #e2e1e6;
        width: auto;
        font-weight: bolder;
        font-size: 20px;
        margin: 0 auto;
        border-radius: 10px;
        padding: 5px;
        color: #27a914;
        float: right;
    }

    .player-1 > div.content-bet-type > button.bet-draw .bet-player {
        text-align: left;
        width: 100%;
        color: #ccff00;
        display: none;
    }

    .player-1 > div.content-bet-type > button.bet-draw .bet-player.active {
        display: block;
    }

    .player-1 > div.content-bet-type > button.bet.btn-wala .bet-stats {
        background-image: url('~@/assets/images/btn-bg-wala.png');
        background-repeat: no-repeat;
        background-position: bottom;
        background-size: contain;
    }

    .player-1 > div.content-bet-type > button.bet.btn-meron .bet-stats {
        background-image: url('~@/assets/images/btn-bg-meron.png');
        background-repeat: no-repeat;
        background-position: bottom;
        background-size: contain;
    }

    .player-1 > div.content-bet-type > button.bet .bet-stats > img {
        position: absolute;
        height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .player-1 > div.content-bet-type > button.bet .bet-stats > span {
        display: block;
        color: #fff;
        font-weight: bolder;
        position: relative;
        z-index: 10;
    }

    .player-1 > div.content-bet-type > button.bet .bet-stats > span.bet-total {
        font-size: 27px;
        margin-top: 20px;
    }

    .player-1 > div.content-bet-type > button.bet .bet-stats > span.bet-payout {
        font-size: 20px;
    }

    .player-1 > div.content-bet-type > button.bet .bet-stats > span.bet-player {
        font-size: 27px;
        color: #ccff00;
        margin-top: 20px;
        font-weight: bolder;
        font-family: sans-serif;
        display: none;
    }

    .player-1 > div.content-bet-type > button.bet .bet-stats > span.bet-player.active {
        display: block;
    }

    .player-1 > div.content-bet-type > button.bet .bet-stats > span.bet-choose {
        background-color: #e2e1e6;
        width: 90%;
        height: 50px;
        line-height: 50px;
        font-weight: bolder;
        font-size: 20px;
        margin: 0 auto;
        border-radius: 10px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 10px;
    }

    .player-1 > div.content-bet-type > button.bet.btn-meron .bet-stats > span.bet-choose {
        color: #d72312;
    }

    .player-1 > div.content-bet-type > button.bet.btn-wala .bet-stats > span.bet-choose {
        color: #1f29c9;
    }

    .player-1 > div.content-user-details {
        width: 100%;
        background-color: #292c33;
        height: auto;
        clear: both;
        margin-top: 5px;
        padding-top: 5px;
    }

    .player-1 > div.content-user-details .group-detail {
        width: 100%;
        display: inline-table;
        padding: 5px 10px;
        color: #fff;
    }

    .player-1 > div.content-user-details .group-detail > span:last-child {
        color: #ccff00;
        font-weight: bolder;
    }

    .player-1 > div.content-user-details .bet-amount {
        width: 100%;
        display: inline-table;
        padding: 5px 10px;
    }

    .player-1 > div.content-user-details .bet-amount > .group-input {
        display: inline-table;
        width: 100%;
        margin-bottom: 10px;
    }

    .player-1 > div.content-user-details .bet-amount > .group-input input {
        height: 40px;
        line-height: 50px;
        border: none;
        width: 80%;
        float: left;
        background-color: #32323a;
        color: #fff;
        border-left: 1px solid #37383d;
        border-top: 1px solid #37383d;
        border-bottom: 1px solid #37383d;
        padding-left: 10px;
    }

    .player-1 > div.content-user-details .bet-amount > .group-input input::placeholder {
        color: #384567;
        font-weight: bolder;
        padding-left: 10px;
        opacity: 1;
    }

    .player-1 > div.content-user-details .bet-amount > .group-input button {
        border: none;
        height: 40px;
        width: 20%;
        float: right;
        background-color: #1e2023;
        border: 1px solid #3a3f45;
        color: #384567;
        font-weight: bolder;
    }

    .player-1 > div.content-user-details .bet-amount > .group-button {
        margin-bottom: 10px;
        margin-top: 5px;
        display: inline-table;
        width: 100%;
    }

    .player-1 > div.content-user-details .bet-amount > .group-button button {
        height: 40px;
        width: 20%;
        float: left;
        background-color: #454d60;
        border: 1px solid #5a688b;
        color: #ffffff;
        font-weight: bolder;
    }

    .player-1 > div.content-user-details .bet-amount > .group-button.submit button {
        width: 100%;
    }

    .player-1 > div.content-transaction-history {
        width: 100%;
        background-color: #292c33;
        height: auto;
        clear: both;
        margin-top: 0px;
        padding-top: 0px;
    }

    .player-1 > div.content-transaction-history table {
        width: 100%;
        text-align: center;
        padding: 10px 5px;
    }

    .player-1 > div.content-transaction-history table > thead > tr > th {
        width: 33.33%;
        font-weight: bolder;
        padding: 10px;
        color: #fff;
        border: 1px solid #454d60;
    }

    .player-1 > div.content-transaction-history table > tbody > tr > td {
        width: 33.33%;
        font-weight: bolder;
        padding: 10px;
        color: #dbdbdb;
        border: 1px solid #454d60;
        font-size: 12px;
    }

    .player-1 > div.content-transaction-history table > tbody > tr > td span {
        display: block;
    }

    .player-1 > div.content-transaction-history table > tbody > tr > td span:first-child {
        color: #ccff00;
    }

    @media screen and (max-width: 600px) {
        .topnav a:not(:first-child) {
            display: none;
        }
        .topnav a.icon {
            float: right;
            display: block;
            background-color: transparent;
        }
    }

    @media screen and (max-width: 600px) {
        .topnav.responsive {
            position: relative;
        }
        .topnav.responsive a.icon {
            position: absolute;
            right: 0;
            top: 0;
        }
        .topnav.responsive a {
            float: none;
            display: block;
            text-align: left;
        }
    }
</style>
