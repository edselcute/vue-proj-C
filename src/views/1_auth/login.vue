<template>
    <div class="form auth-boxed">
        <div class="form-container outer">
            <div class="form-form">
                <div class="form-form-wrap">
                    <div class="form-container">
                        <div class="form-content">
                            <h1 class="">Sign In</h1>
                            <p class="">Log in to your account to continue.</p>

                            <b-form class="text-left">
                                <div class="form">
                                    <div id="username-field" class="field-wrapper input">
                                        <label for="username">USERNAME</label>
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
                                            class="feather feather-user"
                                        >
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        <b-input v-model="credentials.username" placeholder="Username"></b-input>
                                    </div>

                                    <div id="password-field" class="field-wrapper input mb-2">
                                        <div class="d-flex justify-content-between">
                                            <label for="password">PASSWORD</label>
                                            <!-- <router-link to="/auth/pass-recovery-boxed" class="forgot-pass-link">Forgot Password?</router-link> -->
                                        </div>
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
                                            class="feather feather-lock"
                                        >
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                        <b-input v-model="credentials.password" :type="pwd_type" placeholder="Password"></b-input>
                                        <svg
                                            @click="set_pwd_type"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            id="toggle-password"
                                            class="feather feather-eye"
                                        >
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </div>
                                    <div class="d-sm-flex justify-content-between">
                                        <div class="field-wrapper">
                                            <b-button type="submit" variant="primary" @click.prevent="login()" :disabled="is_loading">
                                                <span class="spinner-grow text-white mr-2 align-self-center loader-sm" v-if="is_loading"></span>
                                                {{ is_loading ? 'Logging in...' : 'Log in' }}
                                            </b-button>
                                        </div>
                                    </div>
                                </div>
                            </b-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-toast id="top-center-toast" header-class="d-none" body-class="toast-danger d-flex justify-content-between" toaster="b-toaster-top-center">
            Wrong username or password.
            <a href="javascript:;" class="text-light ml-2" @click="$bvToast.hide('top-center-toast')">DISMISS</a>
        </b-toast>
    </div>
</template>

<script>
    import '@/assets/sass/authentication/auth-boxed.scss';
    import { mapActions } from 'vuex';

    export default {
        metaInfo: { title: 'Login Boxed' },
        data() {
            return {
                is_loading: false,
                credentials: {
                    username: '',
                    password: ''
                },
                pwd_type: 'password'
            };
        },

        methods: {
            ...mapActions('auth', ['loginUser']),
            set_pwd_type() {
                if (this.pwd_type == 'password') {
                    this.pwd_type = 'text';
                } else {
                    this.pwd_type = 'password';
                }
            },
            async login() {
                var vm = this;

                if (vm.credentials.username == '' || vm.credentials.password == '') return;

                vm.is_loading = true;
                const res = await vm.loginUser({
                    username: vm.credentials.username,
                    password: vm.credentials.password
                });
                vm.is_loading = false;

                if (res.success) {
                    window.location.reload(); //router guard will redirect
                } else {
                    vm.$bvToast.show('top-center-toast');
                }
            }
        },
        mounted() {}
    };
</script>
