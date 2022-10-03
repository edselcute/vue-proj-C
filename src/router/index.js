import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [

    {
        path: '*',
        component: () =>
            import ( /* webpackChunkName: "404" */ '../views/404.vue'),
        name: 'NotFound',
        meta: { layout: 'auth' }
    },

    { path: '/', redirect: '/1_auth' },

    // AUTH

    { path: '/1_auth', redirect: '/1_auth/login' },
    {
        path: '/1_auth/login',
        name: 'login',
        component: () =>
            import ( /* webpackChunkName: "auth-login" */ '../views/1_auth/login.vue'),
        meta: { layout: 'auth', requiresVisitor: true }
    },
    {
        path: '/1_auth/register',
        name: 'register',
        component: () =>
            import ( /* webpackChunkName: "auth-register" */ '../views/1_auth/register.vue'),
        meta: { layout: 'auth', requiresVisitor: true }
    },

    // ADMIN

    { path: '/1_admin', redirect: '/1_admin/dashboard' },
    {
        path: '/1_admin/dashboard',
        name: 'dashboard',
        component: () =>
            import ( /* webpackChunkName: "dashboard" */ '../views/1_admin/dashboard.vue'),
        meta: { layout: 'admin', requiresAuth: true }
    },
    {
        path: '/1_admin/schedules',
        name: 'schedules',
        component: () =>
            import ( /* webpackChunkName: "schedule-list" */ '../views/1_admin/schedules.vue'),
        meta: { layout: 'admin', requiresAuth: true }
    },

    {
        path: '/1_admin/fight-control/:id',
        name: 'fight-control',
        component: () =>
            import ( /* webpackChunkName: "fight-control" */ '../views/1_admin/fight-control.vue'),
        meta: { layout: 'admin', requiresAuth: true }
    },



    {
        path: '/1_admin/arenas',
        name: 'arenas',
        component: () =>
            import ( /* webpackChunkName: "arenas" */ '../views/1_admin/arenas.vue'),
        meta: { layout: 'admin', requiresAuth: true }
    },


    {
        path: '/1_admin/users',
        name: 'users',
        component: () =>
            import ( /* webpackChunkName: "users" */ '../views/1_admin/users.vue'),
        meta: { layout: 'admin', requiresAuth: true }
    },

    {
        path: '/1_admin/group',
        name: 'group',
        component: () =>
            import ( /* webpackChunkName: "group" */ '../views/1_admin/group.vue'),
        meta: { layout: 'admin', requiresAuth: true }
    },
    {
        path: '/1_admin/bet-logs',
        name: 'bet-logs',
        component: () =>
            import ( /* webpackChunkName: "bet-logs" */ '../views/1_admin/bet-logs.vue'),
        meta: { layout: 'admin', requiresAuth: true }
    },

    {
        path: '/1_admin/profile/:id',
        name: 'profile',
        component: () =>
            import ( /* webpackChunkName: "profile" */ '../views/1_admin/profile.vue'),
        meta: { layout: 'admin', requiresAuth: true }
    },

    {
        path: '/1_admin/money-logs/',
        name: 'money-logs',
        component: () =>
            import ( /* webpackChunkName: "money-logs" */ '../views/1_admin/money-logs.vue'),
        meta: { layout: 'admin', requiresAuth: true }
    },
    {
        path: '/1_admin/transactions/',
        name: 'admin-transactions',
        component: () =>
            import ( /* webpackChunkName: "transactions" */ '../views/1_admin/transactions.vue'),
        meta: { layout: 'admin', requiresAuth: true }
    },
    {
        path: '/1_admin/activities/',
        name: 'activities',
        component: () =>
            import ( /* webpackChunkName: "activities" */ '../views/1_admin/activities.vue'),
        meta: { layout: 'admin', requiresAuth: true }
    },
    {
        path: '/1_admin/settings/',
        name: 'settings',
        component: () =>
            import ( /* webpackChunkName: "settings" */ '../views/1_admin/settings.vue'),
        meta: { layout: 'admin', requiresAuth: true }
    },

    {
        path: '/1_admin/report/general',
        name: 'report-general',
        component: () =>
            import ( /* webpackChunkName: "report-general" */ '../views/1_admin/report-general.vue'),
        meta: { layout: 'admin', requiresAuth: true }
    },
    {
        path: '/1_admin/report/schedule',
        name: 'report-schedule',
        component: () =>
            import ( /* webpackChunkName: "report-schedule" */ '../views/1_admin/report-schedule.vue'),
        meta: { layout: 'admin', requiresAuth: true }
    },
    {
        path: '/1_admin/report/schedule/:id',
        name: 'report-schedule-id',
        component: () =>
            import ( /* webpackChunkName: "report-schedule-id" */ '../views/1_admin/report-schedule-id.vue'),
        meta: { layout: 'admin', requiresAuth: true }
    },
    {
        path: '/1_admin/report/transaction',
        name: 'report-transaction',
        component: () =>
            import ( /* webpackChunkName: "report-transaction" */ '../views/1_admin/report-transaction.vue'),
        meta: { layout: 'admin', requiresAuth: true }
    },

    // {
    //     path: '/1_admin/monthly-report',
    //     name: 'monthly-report',
    //     component: () =>
    //         import ( /* webpackChunkName: "monthly-report" */ '../views/1_admin/monthly-report.vue'),
    //     meta: { layout: 'admin', requiresAuth: true }
    // },

    // CASHIER

    { path: '/1_cashier', redirect: '/1_cashier/betting' },
    {
        path: '/1_cashier/betting',
        name: 'betting',
        component: () =>
            import ( /* webpackChunkName: "betting" */ '../views/1_cashier/betting.vue'),
        meta: { layout: 'cashier', requiresAuth: true }
    },
    {
        path: '/1_cashier/claiming',
        name: 'claiming',
        component: () =>
            import ( /* webpackChunkName: "payout" */ '../views/1_cashier/claiming.vue'),
        meta: { layout: 'cashier', requiresAuth: true }
    },
    {
        path: '/1_cashier/nocash',
        name: 'nocash',
        component: () =>
            import ( /* webpackChunkName: "payout" */ '../views/1_cashier/nocash.vue'),
        meta: { layout: 'cashier', requiresAuth: true }
    },
    {
        path: '/1_cashier/transactions',
        name: 'cashier-transactions',
        component: () =>
            import ( /* webpackChunkName: "payout" */ '../views/1_cashier/transactions.vue'),
        meta: { layout: 'cashier', requiresAuth: true }
    },


    // BOARD

    {
        path: '/1_board',
        name: 'board',
        component: () =>
            import ( /* webpackChunkName: "board" */ '../views/1_board/board.vue'),
        meta: { layout: 'board', requiresAuth: true }
    },

    // PLAYER

    {
        path: '/1_player/player',
        name: 'player',
        component: () =>
            import ( /* webpackChunkName: "player" */ '../views/1_player/player.vue'),
        meta: { layout: 'player', requiresAuth: true }
    },
    {
        path: '/1_player/deposit',
        name: 'deposit',
        component: () =>
            import ( /* webpackChunkName: "deposit" */ '../views/1_player/deposit.vue'),
        meta: { layout: 'player', requiresAuth: true }
    },
    {
        path: '/1_player/withdraw',
        name: 'withdraw',
        component: () =>
            import ( /* webpackChunkName: "withdraw" */ '../views/1_player/withdraw.vue'),
        meta: { layout: 'player', requiresAuth: true }
    },
    {
        path: '/1_player/history',
        name: 'history',
        component: () =>
            import ( /* webpackChunkName: "history" */ '../views/1_player/history.vue'),
        meta: { layout: 'player', requiresAuth: true }
    },

];

const router = new VueRouter({
    mode: 'history',
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});

// router.beforeEach((to, from, next) => {
//     //temporary
//     // if (to.meta && to.meta.layout && to.meta.layout == 'auth') {
//     //     store.commit('setLayout', 'auth');
//     // } else {
//     //     if (to.meta && to.meta.layout && to.meta.layout == 'cashier') {
//     //         store.commit('setLayout', 'cashier');
//     //     } else {
//     //         store.commit('setLayout', 'admin');
//     //     }
//     // }

//     if (to.meta && to.meta.layout) {
//         store.commit('setLayout', to.meta.layout)
//     }
//     // else {
//     //     store.commit('setLayout', 'admin')
//     // }

//     next(true);
// });



const sg = store.getters
const restrictions = require('../restrictions')
const chkprofile = store.dispatch('auth/getProfile')

function getRestriction(user_type) {
    // 1 => "masteradmin",
    //         2 => "admin",
    //         3 => "declarator",
    //         4 => "cashier",
    //         5 => "player",
    //         6 => "manager",
    var access = []
    switch (user_type) {
        case 1:
            console.log('masteradmin')
            access = restrictions.admin
            break
        case 2:
            console.log('admin')
            access = restrictions.admin
            break
        case 3:
            console.log('declarator')
            access = restrictions.declarator
            break
        case 4:
            console.log('cashier')
            access = restrictions.cashier
            break
        case 5:
            console.log('player')
            access = restrictions.player
            break
        case 6:
            console.log('manager')
            access = restrictions.manager
            break
    }
    return access
}

router.beforeEach(async(to, from, next) => {
    var access = []
    if (await chkprofile && to.matched.some(record => record.meta.requiresAuth)) {
        if (!sg['auth/authenticated']) {
            console.log('requiresAuth 1')
            next({
                name: 'login',
            })
        } else {
            console.log('requiresAuth 2')
            access = getRestriction(sg['auth/user_type'])
            if (!access.includes(to.name)) {
                next({ name: access[0] })
            } else {
                next()
            }
        }
    } else if (await chkprofile && to.matched.some(record => record.meta.requiresVisitor)) {
        if (sg['auth/authenticated']) {
            console.log('requiresVisitor 1', sg['auth/authenticated'])
            access = getRestriction(sg['auth/user_type'])
            next({ name: access[0] })
        } else {
            console.log('requiresVisitor 2')
            next()
        }
    } else {
        next() // make sure to always call next()!
    }

    if (to.meta && to.meta.layout) {
        store.commit('setLayout', to.meta.layout)
    }
})

export default router;