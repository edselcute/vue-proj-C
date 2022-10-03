<template>
    <div class="layout-px-spacing">
        <portal to="breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Admin</a></li>
                                <li class="breadcrumb-item"><router-link to="/1_admin/users" tag="a" href="javascript:;">Users</router-link></li>

                                <li class="breadcrumb-item active" aria-current="page"><span>Profile</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </portal>

        <div class="row layout-spacing">
            <!-- Content -->
            <div class="col-xl-3 col-lg-6 col-md-5 col-sm-12 layout-top-spacing">
                <div class="user-profile layout-spacing">
                    <div class="panel">
                        <div class="panel-body">
                            <div class="d-flex justify-content-between">
                                <h3 class="">User Record</h3>
                            </div>
                            <div class="text-center user-info">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="75"
                                    height="75"
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
                                <div class="spinner-grow align-self-center loader-sm table-loader df" v-if="is_loading"></div>
                                <p class="" v-else>{{ user.username }}</p>
                            </div>
                            <div class="user-info-list">
                                <div class="">
                                    <ul class="contacts-block list-unstyled w-100">
                                        <li class="contacts-block__item">
                                            <div class="spinner-grow align-self-center loader-sm table-loader df" v-if="is_loading"></div>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" v-else>
                                                <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                <path
                                                    d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"
                                                />
                                            </svg>

                                            {{ user.fullname }}
                                        </li>
                                        <li class="contacts-block__item">
                                            <div class="spinner-grow align-self-center loader-sm table-loader df" v-if="is_loading"></div>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" v-else>
                                                <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                <path
                                                    d="M336 64h-53.88C268.9 26.8 233.7 0 192 0S115.1 26.8 101.9 64H48C21.5 64 0 85.48 0 112v352C0 490.5 21.5 512 48 512h288c26.5 0 48-21.48 48-48v-352C384 85.48 362.5 64 336 64zM192 64c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S160 113.7 160 96C160 78.33 174.3 64 192 64zM192 192c35.35 0 64 28.65 64 64s-28.65 64-64 64S128 291.3 128 256S156.7 192 192 192zM288 448H96c-8.836 0-16-7.164-16-16C80 387.8 115.8 352 160 352h64c44.18 0 80 35.82 80 80C304 440.8 296.8 448 288 448z"
                                                />
                                            </svg>
                                            {{ formatUserType(user.user_type_id) }}
                                        </li>

                                        <li class="contacts-block__item">
                                            <div class="spinner-grow align-self-center loader-sm table-loader df" v-if="is_loading"></div>

                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" v-else>
                                                <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                <path
                                                    d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z"
                                                />
                                            </svg>
                                            {{ user.email }}
                                        </li>
                                        <li class="contacts-block__item">
                                            <div class="spinner-grow align-self-center loader-sm table-loader df" v-if="is_loading"></div>

                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" v-else>
                                                <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                <path
                                                    d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z"
                                                />
                                            </svg>
                                            {{ user.phone }}
                                        </li>

                                        <li class="contacts-block__item">
                                            <div class="spinner-grow align-self-center loader-sm table-loader df" v-if="is_loading"></div>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" v-else>
                                                <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                <path
                                                    d="M470.6 425.4C483.1 437.9 483.1 458.1 470.6 470.6C458.1 483.1 437.9 483.1 425.4 470.6L412.1 458.2C369.6 491.9 315.2 512 255.1 512C196.8 512 142.4 491.9 99.02 458.2L86.63 470.6C74.13 483.1 53.87 483.1 41.37 470.6C28.88 458.1 28.88 437.9 41.37 425.4L53.76 412.1C20.07 369.6 0 315.2 0 255.1C0 196.8 20.07 142.4 53.76 99.02L41.37 86.63C28.88 74.13 28.88 53.87 41.37 41.37C53.87 28.88 74.13 28.88 86.63 41.37L99.02 53.76C142.4 20.07 196.8 0 255.1 0C315.2 0 369.6 20.07 412.1 53.76L425.4 41.37C437.9 28.88 458.1 28.88 470.6 41.37C483.1 53.87 483.1 74.13 470.6 86.63L458.2 99.02C491.9 142.4 512 196.8 512 255.1C512 315.2 491.9 369.6 458.2 412.1L470.6 425.4zM309.3 354.5C293.4 363.1 275.3 368 255.1 368C236.7 368 218.6 363.1 202.7 354.5L144.8 412.5C176.1 434.9 214.5 448 255.1 448C297.5 448 335.9 434.9 367.2 412.5L309.3 354.5zM448 255.1C448 214.5 434.9 176.1 412.5 144.8L354.5 202.7C363.1 218.6 368 236.7 368 256C368 275.3 363.1 293.4 354.5 309.3L412.5 367.2C434.9 335.9 448 297.5 448 256V255.1zM255.1 63.1C214.5 63.1 176.1 77.14 144.8 99.5L202.7 157.5C218.6 148.9 236.7 143.1 255.1 143.1C275.3 143.1 293.4 148.9 309.3 157.5L367.2 99.5C335.9 77.14 297.5 63.1 256 63.1H255.1zM157.5 309.3C148.9 293.4 143.1 275.3 143.1 255.1C143.1 236.7 148.9 218.6 157.5 202.7L99.5 144.8C77.14 176.1 63.1 214.5 63.1 255.1C63.1 297.5 77.14 335.9 99.5 367.2L157.5 309.3zM255.1 207.1C229.5 207.1 207.1 229.5 207.1 255.1C207.1 282.5 229.5 303.1 255.1 303.1C282.5 303.1 304 282.5 304 255.1C304 229.5 282.5 207.1 255.1 207.1z"
                                                />
                                            </svg>
                                            {{ user.status == 0 ? 'Inactive' : user.status == 1 ? 'Active' : '' }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <div class="education layout-spacing ">
                    <div class="panel">
                        <div class="widget widget-summary-1">
                            <div class="widget-heading">
                                <h5>Monthly Total Bet</h5>
                            </div>
                            <div class="widget-content">
                                <div class="order-summary">
                                    <div class="summary-list summary-income bg-red-summary">
                                        <div class="summery-info">
                                            <div class="w-icon">
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
                                                    data-v-02c2cbc4=""
                                                    class="feather feather-stop-circle"
                                                >
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <rect x="9" y="9" width="6" height="6"></rect>
                                                </svg>
                                            </div>
                                            <div class="w-summary-details">
                                                <div class="w-summary-info">
                                                    <h6>MERON <span class="summary-count">$92,600 </span></h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="summary-list summary-profit">
                                        <div class="summery-info">
                                            <div class="w-icon">
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
                                                    data-v-02c2cbc4=""
                                                    class="feather feather-stop-circle"
                                                >
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <rect x="9" y="9" width="6" height="6"></rect>
                                                </svg>
                                            </div>
                                            <div class="w-summary-details">
                                                <div class="w-summary-info">
                                                    <h6>WALA <span class="summary-count">$37,515</span></h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="summary-list summary-expenses bg-green-summary">
                                        <div class="summery-info">
                                            <div class="w-icon">
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
                                                    data-v-02c2cbc4=""
                                                    class="feather feather-stop-circle"
                                                >
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <rect x="9" y="9" width="6" height="6"></rect>
                                                </svg>
                                            </div>
                                            <div class="w-summary-details">
                                                <div class="w-summary-info">
                                                    <h6>DRAW <span class="summary-count">$55,085</span></h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>

            <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 layout-top-spacing">
                <!-- <div class="skills layout-spacing ">
                    <div class="panel">
                        <div class="panel-body">
                            <h3 class="">Today Total Summary</h3>

                            <div class="row widget-statistic">
                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 layout-spacing">
                                    <div class="widget ">
                                        <div class="widget-heading">
                                            <div class="w-title">
                                                <div class="w-icon icon-fill-danger">
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
                                                        class="feather feather-stop-circle"
                                                        data-v-02c2cbc4=""
                                                    >
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <rect x="9" y="9" width="6" height="6"></rect>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p class="w-value">330,000</p>
                                                    <h5>Meron Total Bet</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 layout-spacing">
                                    <div class="widget">
                                        <div class="widget-heading">
                                            <div class="w-title">
                                                <div class="w-icon icon-fill-primary">
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
                                                        class="feather feather-stop-circle"
                                                        data-v-02c2cbc4=""
                                                    >
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <rect x="9" y="9" width="6" height="6"></rect>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p class="w-value">230,000</p>
                                                    <h5>Wala Total Bet</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 layout-spacing">
                                    <div class="widget ">
                                        <div class="widget-heading">
                                            <div class="w-title">
                                                <div class="w-icon icon-fill-success">
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
                                                        class="feather feather-stop-circle"
                                                        data-v-02c2cbc4=""
                                                    >
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <rect x="9" y="9" width="6" height="6"></rect>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p class="w-value">10,000</p>
                                                    <h5>Draw Total Bet</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 layout-spacing">
                                    <div class="widget ">
                                        <div class="widget-heading">
                                            <div class="w-title">
                                                <div class="w-icon icon-fill-secondary">
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
                                                        class="feather feather-stop-circle"
                                                        data-v-02c2cbc4=""
                                                    >
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <rect x="9" y="9" width="6" height="6"></rect>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p class="w-value">10,000</p>
                                                    <h5>Total Profit</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->

                <div class="bio layout-spacing ">
                    <div class="panel br-6 p-0">
                        <div class="custom-table">
                            <!-- <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xl-3 col-md-2 col-sm-2 col-12">
                                        <b-form class="simple-example">
                                            <b-form-row>
                                                <div class="col-md-12 mb-4">
                                                    <label for="" style="display:block">Date Range</label>
                                                    <flat-pickr v-model="date3" :config="{ mode: 'range' }" class="form-control flatpickr active"></flat-pickr>
                                                </div>
                                            </b-form-row>
                                        </b-form>
                                    </div>
                                    <div class="col-xl-2 col-md-2 col-sm-2 col-12">
                                        <b-form class="simple-example">
                                            <b-form-row>
                                                <div class="col-md-12 mb-4">
                                                    <label for="" style="display:block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                                    <b-button variant="primary" size="lg" class="mb-4 mr-2">Submit</b-button>
                                                </div>
                                            </b-form-row>
                                        </b-form>
                                    </div>
                                </div>
                            </div> -->

                            <div class="panel-body">
                                <b-tabs nav-class="mb-3 mt-3 nav-fill">
                                    <b-tab title="Bet History" active>
                                        <b-table-simple responsive bordered hover class="text-center">
                                            <b-thead>
                                                <b-tr>
                                                    <b-th>ID</b-th>
                                                    <b-th>BARCODE ID</b-th>
                                                    <b-th>FIGHT NO.</b-th>
                                                    <b-th>AMOUNT</b-th>
                                                    <b-th>SELECT</b-th>
                                                    <b-th>STATUS</b-th>
                                                    <b-th>DATE</b-th>
                                                </b-tr>
                                            </b-thead>
                                            <b-tbody v-if="is_loading">
                                                <b-tr v-for="n in 20" :key="n">
                                                    <b-td v-for="m in 7" :key="m"><div class="spinner-grow align-self-center loader-sm table-loader"></div></b-td>
                                                </b-tr>
                                            </b-tbody>
                                            <b-tbody v-else>
                                                <b-tr v-for="r in bet_history.list" :key="r.id">
                                                    <b-td>{{ r.id }}</b-td>
                                                    <b-td>{{ r.barcode }}</b-td>
                                                    <b-td>{{ r.fight.fight_no }}</b-td>
                                                    <b-td>{{ formatNumberString(r.bet_amount) }}</b-td>
                                                    <b-td :class="`text-${r.bet_select == 1 ? 'danger' : r.bet_select == 2 ? 'primary' : r.bet_select == 3 ? 'success' : ''}`">{{
                                                        formatSide(r.bet_select)
                                                    }}</b-td>
                                                    <b-td :class="`${r.status == 1 ? 'text-warning' : r.status == 2 ? 'text-dark' : ''}`">
                                                        {{ r.status == 1 ? 'WIN' : r.status == 2 ? 'LOSE' : '' }}
                                                    </b-td>
                                                    <b-td>{{ formatDateFdY(r.created_at) }}</b-td>
                                                </b-tr>
                                            </b-tbody>
                                        </b-table-simple>
                                        <pagination v-if="bet_history.list.length > 0" :data="bet_history" @emitpage="getBetHistory" />
                                    </b-tab>
                                    <b-tab title="Transaction" >
                                        <b-table-simple responsive bordered hover class="text-center">
                                            <b-thead>
                                                <b-tr>
                                                    <b-th>ID</b-th>
                                                    <b-th>TYPE</b-th>
                                                    <b-th>AMOUNT</b-th>
                                                    <b-th>CREATED AT</b-th>
                                                    <b-th>STATUS</b-th>
                                                </b-tr>
                                            </b-thead>
                                            <b-tbody v-if="is_loading">
                                                <b-tr v-for="n in 20" :key="n">
                                                    <b-td v-for="m in 5" :key="m"><div class="spinner-grow align-self-center loader-sm table-loader"></div></b-td>
                                                </b-tr>
                                            </b-tbody>
                                            <b-tbody v-else>
                                                <b-tr v-for="r in transaction_history.list" :key="r.id">
                                                    <b-td>{{ r.id }}</b-td>
                                                    <b-td
                                                        ><span :class="`${r.type == 1 ? 'text-success' : r.type == 2 ? 'text-danger' : ''}`">{{
                                                            r.type == 1 ? 'CASH IN' : r.type == 2 ? 'CASH OUT' : ''
                                                        }}</span></b-td
                                                    >
                                                    <b-td>{{ formatNumberString(r.amount) }}</b-td>
                                                    <b-td>{{ r.created_at }}</b-td>
                                                    <b-td
                                                        ><b-badge :variant="r.status == 1 ? 'success' : r.status == 2 ? 'danger' : 'warning'">
                                                            {{ r.status == 1 ? 'Approved' : r.status == 2 ? 'Cancelled' : 'Pending' }}
                                                        </b-badge></b-td
                                                    >
                                                    <!-- <b-td>{{ r.barcode }}</b-td>
                                                    <b-td>{{ r.fight.fight_no }}</b-td>
                                                    <b-td :class="`text-${r.bet_select == 1 ? 'danger' : r.bet_select == 2 ? 'primary' : r.bet_select == 3 ? 'success' : ''}`">{{
                                                        formatSide(r.bet_select)
                                                    }}</b-td>
                                                    <b-td>{{ formatNumberString(r.bet_amount) }}</b-td>

                                                    <b-td :class="`${r.status == 1 ? 'text-warning' : r.status == 2 ? 'text-dark' : ''}`">
                                                        {{ r.status == 1 ? 'WIN' : r.status == 2 ? 'LOSE' : '' }}
                                                    </b-td>
                                                    <b-td>{{ formatDateFdY(r.created_at) }}</b-td> -->
                                                </b-tr>
                                            </b-tbody>
                                        </b-table-simple>
                                        <pagination v-if="transaction_history.list.length > 0" :data="transaction_history" @emitpage="getTransactionHistory" />
                                    </b-tab>
                                </b-tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //flatpickr
    // import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import '@/assets/sass/forms/custom-flatpickr.css';
    import '@/assets/sass/scrollspyNav.scss';
    import '@/assets/sass/users/user-profile.scss';
    import '@/assets/sass/widgets/widgets.scss';
    import '@/assets/sass/tables/table-basic.scss';
    import pagination from '@/components/pagination';
    import { mapActions, mapState } from 'vuex';
    export default {
        metaInfo: { title: 'User Profile' },
        components: {
            // flatPickr,
            pagination
        },
        data() {
            return {
                is_loading: false,
                user: {
                    id: '',
                    username: '',
                    fullname: '',
                    user_type_id: '',
                    email: '',
                    phone: '',
                    status: null
                },
                bet_history: {
                    list: [],
                    links: [],
                    current_page: 0,
                    last_page: 0,
                    per_page: 0,
                    total: 0
                },
                transaction_history: {
                    list: [],
                    links: [],
                    current_page: 0,
                    last_page: 0,
                    per_page: 0,
                    total: 0
                }
            };
        },

        computed: {
            ...mapState('bet', {
                bet_data: 'data'
            })
        },
        methods: {
            ...mapActions('user', {
                user_go: 'getOne'
            }),
            ...mapActions('report', {
                rep_userBetHistory: 'userBetHistory',
                rep_userTransactionHistory: 'userTransactionHistory'
            }),
            async init() {
                var vm = this;
                vm.is_loading = true;
                const user = await vm.user_go({ id: this.$route.params.id });
                if (user) {
                    vm.user.id = user.id;
                    vm.user.username = user.username;
                    vm.user.fullname = user.firstname + ' ' + user.lastname;
                    vm.user.user_type_id = user.user_type_id;
                    vm.user.email = user.email;
                    vm.user.phone = user.phone;
                    vm.user.status = user.status;

                    await vm.getBetHistory();
                    await vm.getTransactionHistory();
                }

                vm.is_loading = false;
            },
            async getBetHistory(n) {
                console.log(n);
                var vm = this;
                var pl = { page_no: n ? n : 1, limit: 20, user_id: vm.user.id, sort_column: 'created_at', sort_order: 'desc' };

                const bet_history = await vm.rep_userBetHistory(pl);
                if (bet_history) {
                    vm.bet_history.list = bet_history.data;
                    vm.bet_history.links = bet_history.links;
                    vm.bet_history.current_page = bet_history.current_page;
                    vm.bet_history.last_page = bet_history.last_page;
                    vm.bet_history.per_page = bet_history.per_page;
                    vm.bet_history.total = bet_history.total;
                }
            },
            async getTransactionHistory(n) {
                var vm = this;
                var pl = { page_no: n ? n : 1, limit: 20, user_id: vm.user.id, sort_column: 'created_at', sort_order: 'desc' };
                const transaction_history = await vm.rep_userTransactionHistory(pl);

                if (transaction_history) {
                    vm.transaction_history.list = transaction_history.data;
                    vm.transaction_history.links = transaction_history.links;
                    vm.transaction_history.current_page = transaction_history.current_page;
                    vm.transaction_history.last_page = transaction_history.last_page;
                    vm.transaction_history.per_page = transaction_history.per_page;
                    vm.transaction_history.total = transaction_history.total;
                }
            }
        },
        mounted() {
            this.init();
        }
    };
</script>
<style lang="scss">
    .user-profile .user-info-list ul.contacts-block svg {
        width: 21px;
        margin-right: 15px;
        color: #888ea8;
        vertical-align: middle;
        fill: rgb(165 174 187);
    }

    .panel-body h3:after,
    .user-profile h3:after {
        display: none;
    }

    .table-loader.df {
        width: 90% !important;
    }

    .user-profile .user-info-list ul.contacts-block {
        max-width: 290px !important;
    }
</style>
