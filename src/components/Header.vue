<template>
    <nav class="header">
        <div class="head-mask container">
            <button class="mobile-element left-menu" v-on:click="switchMenuVisibility()">
                ☰
            </button>

            <button class="theme-switch auto-switch" :class="{ switched: appTheme != 'default' }" v-on:click="switchTheme()">
                <img src="@/data/images/theme-switch.png">
            </button>

            <span class="sign-separator desktop-element">
                |
            </span>

            <span class='lg-text'>
                <a :href='headerData.link' class="header-item">{{ headerData.name }}</a>
                <img class="header-item header-title" :class="{ 'no-depends': !headerData.depends }" :src="headerData.icon"/>
            </span>

            <span class="sign-separator desktop-element">
                |
            </span>

            <head-buttons/>
        </div>
    </nav>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import Buttons from './header/Buttons';

    export default {
        name: 'v-header',

        components: {
            'head-buttons': Buttons
        },

        methods: mapActions([ 'switchTheme', 'switchMenuVisibility' ]),

        computed: mapGetters([ 'appTheme', 'headerData' ])
    }
</script>

<style>
    .header {
        width: 100%;
        height: 4.5em;
        position: fixed;
        display: block;
        padding: 0.5rem;
        z-index: 9;
        left: 0;
        top: 0;
        background-color: var(--default-color);
    }

    .theme-switch {
        grid-area: theme;
    }

    .head-mask {
        display: grid;
        grid-area: mask;
        grid-template-areas: 'theme . lg . buttons';
        grid-template-rows: 3.5rem;
        grid-template-columns: max-content max-content max-content max-content auto;
        background-color: var(--default-color);
        line-height: 3.5rem;
        height: 3.5rem;
        user-select: none;
        gap: 0.25rem;
    }

    .header-item {
        height: 100%;
    }

    .head-mask > * {
        height: 100%;
    }

    .head-mask > .left-menu {
        grid-area: menu;
    }

    .head-mask > .lg-text {
        grid-area: lg;
        width: fit-content;
        display: grid;
        grid-template-areas: '. .';
        grid-template-columns: calc(100% - 2.5rem) 2.5rem;
    }

    .head-mask > .lg-text > a {
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .head-mask > .lg-text > img {
        margin: auto;
    }

    .head-mask .header-title {
        width: 2.5rem;
        height: 2.5rem;
    }

    .head-mask > span.sign-separator {
        width: 1.5rem;
        max-width: 1.5rem;
        text-align: center;
    }

    .head-mask .theme-switch {
        height: 2.5rem;
        display: grid;
        width: 2rem;
        margin: 0.55rem;
        filter: var(--imgs-def-filter);
        overflow: hidden;
        grid-area: theme;
        padding: 0;
        border: none;
        background-color: transparent;
        outline: none;
        cursor: default;
        border-radius: 0.5rem;
    }

    .head-mask .theme-switch img {
        width: 4rem;
        height: 2rem;
        top: 0.25rem;
        left: 0;
        position: relative;
        pointer-events: none;
        transition: var(--base-transition);
    }

    .head-mask .theme-switch.switched img {
        left: -2rem;
    }

    .head-mask .div-name {
        line-height: 1rem;
        font-size: 3rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .head-mask .renderpath {
        margin-top: auto;
        display: grid;
        text-transform: uppercase;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        width: fit-content;
        padding: 0.25rem;
    }

    .head-mask .left-menu {
        width: 2.5rem;
        text-align: center;
        font-size: 1.5rem;
        height: 2.5rem;
        line-height: normal;
        grid-area: menu;
        margin: auto;
        background-color: transparent;
        border: none;
        outline: none;
        border-radius: 0.5rem;
    }

    a {
        text-decoration: none;
        background-color: transparent;
        color: var(--sub-color);
    }

    img.header-item {
        filter: var(--imgs-def-filter);
    }

    img.header-item.no-depends {
        filter: none;
    }

    .container[ui='mobile'] .caret {
        display: none;
    }

    .container[ui='mobile'] .left-menu {
        margin-right: 0.5rem;
    }

    .container[ui='mobile'] .head-mask {
        grid-template-areas: 'menu lg . buttons theme';
        grid-template-columns: max-content auto max-content;
    }

    .container[ui='mobile'] .header .theme-switch {
        margin-left: auto;
        margin-right: 0.5rem;
    }
</style>