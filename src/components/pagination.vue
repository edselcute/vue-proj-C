<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination d-flex justify-content-end pr-2">
            <li :class="`page-item ${l.active ? 'active' : ''}`" v-for="(l, index) of data.links" :key="index">
                <a :class="`page-link ${l.label == '...' ? 'disabled' : ''}`" href="#" @click.prevent="emitpage(l.label)">{{
                    l.label == '&laquo; Previous' ? '‹' : l.label == 'Next &raquo;' ? '›' : l.label
                }}</a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        props: {
            data: { type: Object }
        },
        computed: {},
        methods: {
            emitpage(n) {
                if (n == '&laquo; Previous') {
                    if (this.data.current_page > 1) {
                        this.$emit('emitpage', this.data.current_page - 1);
                    }
                } else if (n == 'Next &raquo;') {
                    if (this.data.current_page < this.data.last_page) {
                        this.$emit('emitpage', this.data.current_page + 1);
                    }
                } else {
                    this.$emit('emitpage', parseInt(n));
                }
            }
        },
        mounted() {}
    };
</script>

<style scoped>
    li.page-item:first-child > a,
    li.page-item:last-child > a {
        font-size: 0;
    }

    li.page-item:first-child > a:before {
        content: '‹';
        font-size: 1pc;
        visibility: visible;
    }
    li.page-item:last-child > a:before {
        content: '›';
        font-size: 1pc;
        visibility: visible;
    }

    a.page-link.disabled {
        /* cursor: not-allowed; */
        pointer-events: none;
    }

  
</style>
