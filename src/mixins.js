import Vue from 'vue'

Vue.mixin({
    methods: {
        formatResult(result, select) {
            var str = ''
            if ([1, 2].includes(result)) {
                if (result == select) {
                    str = 'WIN'
                } else {
                    str = 'LOSE'
                }
            } else {
                str = 'RETURN'
                if (result == select) {
                    str = 'WIN'
                } else {
                    str = 'RETURN'
                }

            }
            return str

        },
        formatDrawRake(val) {
            var f_val = parseInt(val)
            return f_val ? '1-' + f_val : ''
        },
        formatFightStatus(val) {
            var status = ''
            if (val > 1) {
                status = "FINISHED"
            } else {
                status = "ON-GOING"
            }
            return status
        },
        formatSide(val) {
            var side = ''
            switch (val) {
                case 1:
                    side = 'MERON'
                    break
                case 2:
                    side = 'WALA'
                    break
                case 3:
                    side = 'DRAW'
                    break
                case 4:
                    side = 'CANCELLED'
                    break
            }
            return side
        },
        formatUserType(val) {
            var type = ''
            switch (val) {
                case 1:
                    type = 'Master Admin'
                    break
                case 2:
                    type = 'Admin'
                    break
                case 3:
                    type = 'Declarator'
                    break
                case 4:
                    type = 'Cashier'
                    break
                case 5:
                    type = 'Player'
                    break
                case 6:
                    type = 'Manager'
                    break
            }
            return type
        },
        formatDateFdY(val) {
            //convert to date time string
            var date = new Date(val);
            return date.toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })
        },
        formatDateInt(val) {
            //convert to date time int
            var date = new Date(val);
            var s = date.toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })
            return new Date(s).toLocaleDateString('en-CA')
        },
        formatDateYmD(val) {
            var date = new Date(val);
            const offset = date.getTimezoneOffset()
            date = new Date(date.getTime() - (offset * 60 * 1000))
            return date.toISOString().split('T')[0]
        },
        formatDecimal(val) {
            // var type = isNaN(val);
            if (!isNaN(val)) {
                var int = parseFloat(val);
                return int.toFixed(2)
            } else {
                return '0'
            }
        },
        formatNoDecimal(val) {
            // var type = isNaN(val);
            if (!isNaN(val)) {
                var int = parseFloat(val);
                return int.toFixed(0)
            } else {
                return '0'
            }
        },
        formatNumberString(val) {
            var str = val ? val.toString() : ''

            // check if have decimal

            return (val < 0 ? '-' : '') + str.replace(/^0+/, '')
                .replace(/[^0-9]/g, '')
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        },

        formatNumberStringDecimal(val) {
            var str = val ? parseFloat(val.toString().replace(/,/g, '')) : 0.00
            return str.toFixed(2)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        },
        formatStringNumber(val) {
            return parseInt(val.replace(/[^0-9]/g, ''))
        },
    },
})