'use strict'
import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage)

export default {
  data: () => ({
    sideNav: false,
    isLogin: false,
    dialog3: false,
    cloudinaryImageUrl: process.env.cloudinaryImageUrl,
    menuItems: [
      {title: 'Login', link: '/login'},
      {title: 'News', link: '/categories/news'},
      {title: 'Tech', link: '/categories/technology'},
      {title: 'Videos', link: '/videos'},
      {title: 'opinion', link: '/categories/opinion'},
      {title: 'finance', link: '/finance'}
    ],
    upperMenu: [],
    superadmin: [
      {title: 'MY POSTS', link: '/myposts'},
      {title: 'SCHEDULED POSTS', link: '/scheduledposts'},
      {title: 'Author Submissions', link: '/authorSubmissions'},
      {title: 'Pending Post', link: '/pending-post'},
      {title: 'Accounts', link: '/accounts'},
      {title: 'SIGN OUT', link: '/logout'}
    ],
    editor: [
      {title: 'MY POSTS', link: '/myposts'},
      {title: 'SCHEDULED POSTS', link: '/scheduledposts'},
      {title: 'Author Submissions', link: '/authorSubmissions'},
      {title: 'SIGN OUT', link: '/logout'}
    ],
    subconauth: [
      {title: 'MY POSTS', link: '/myposts'},
      {title: 'SCHEDULED POSTS', link: '/scheduledposts'},
      {title: 'SIGN OUT', link: '/logout'}
    ],
    txtsearch: ''
  }),
  methods: {
    onSearch () {
      this.dialog3 = false
      this.$router.push({path: '/search', query: { q: this.txtsearch }})
    }
  },
  mounted () {
    if (Vue.localStorage.get('user')) {
      this.menuItems.shift()
      this.menuItems.unshift({title: 'Create Post', link: '/post'})
      this.isLogin = true
      let username = JSON.parse(Vue.localStorage.get('user')).username
      var storageUser = JSON.parse(Vue.localStorage.get('user'))
      let image = (storageUser.profileImagePreference === 'gravatar') ? storageUser.gravatar : (storageUser.profileImagePreference.search('cloudinary') > 0 ? storageUser.profileImagePreference : this.cloudinaryImageUrl + storageUser.profileImagePreference)
      let rolevalue = JSON.parse(Vue.localStorage.get('user'))._role
      switch (rolevalue) {
        case '57db549862e4711c9dd1eed6':
        case '57db549862e4711c9dd1eed7':
          this.superadmin[0] = {title: 'MY POSTS', link: '/' + username + '/myposts'}
          this.superadmin.push({
            title: `logged in as ` + username + ` <img src=` + image + ` height=30px width=30px>`,
            link: `/profile`
          })
          this.upperMenu = this.superadmin
          break
        case '57db549862e4711c9dd1eed8':
          this.editor[0] = {title: 'MY POSTS', link: '/' + username + '/myposts'}
          this.editor.push({
            title: `logged in as ` + username + ` <img src=` + image + ` height=30px width=30px>`,
            link: `/profile`
          })
          this.upperMenu = this.editor
          break
        default:
          this.subconauth[0] = {title: 'MY POSTS', link: '/' + username + '/myposts'}
          this.subconauth.push({
            title: `logged in as ` + username + ` <img src=` + image + ` height=30px width=30px>`,
            link: `/profile`
          })
          this.upperMenu = this.subconauth
          break
      }
    } else {
      this.isLogin = false
    }
  }
}
