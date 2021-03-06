// c router

export default {
    SubsystemName: 'c',
    // icon: '', // 子系统的图标，不添加有默认图标
    // hide: true,
    // 此处添加 则 ‘c’ 子系统均不会在主菜单中显示
    Modules: [
        { path: 'About', name: 'about', component: async () => await import(/* webpackChunkName: "about" */'@/pages/About.vue'),},
        { path: 'Default', name: 'default', component: async () => await import(/* webpackChunkName: "default" */'@/pages/Default.vue'), hide: true},
        {
            SubsystemName: 'cb1',
            // hide: true,
            // 此处添加 则 ‘cb1’ 子系统均不会在主菜单中显示
            Modules: [
                { path: 'About', name: 'about', component: async () => await import(/* webpackChunkName: "about" */'@/pages/About.vue'), hide: true},
                { path: 'Default', name: 'default', component: async () => await import(/* webpackChunkName: "default" */'@/pages/Default.vue'),},
            ]
        },
        {
            SubsystemName: 'cb2',
            Modules: [
                { path: 'About', name: 'about', component: async () => await import(/* webpackChunkName: "about" */'@/pages/About.vue'),},
                { path: 'Default', name: 'default', component: async () => await import(/* webpackChunkName: "default" */'@/pages/Default.vue'),},
            ]
        }
    ]
}
