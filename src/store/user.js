import firebase from "firebase/app"

export default {
  namespaced: true,
  state: () => ({
    user: {
      uid: "",
      name: "",
      email: "",
    }
  }),
  getters: {
    isSignedIn: () => !!(firebase.auth().currentUser)
  },
  mutations: {
    set(state, data) {
      state.user.name = data.name
      state.user.email = data.email
      state.user.uid = data.uid
      localStorage.setItem("expectToSignIn", "YES")
    },
    reset(state) {
      state.user.name = state.user.email = ""
      localStorage.setItem("expectToSignIn", "")
    }
  },
  actions: {
    async register({ commit }, data) {
      try {
        const credential = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        await firebase.firestore().collection('users').doc(credential.user?.uid).set({
          name: data.name,
          email: data.email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        return { success: true, message: "登入成功。" }
      } catch (error) {
        if (error.code == "auth/email-already-in-use") {
          return { success: false, message: "邮箱已注册。" }
        } else if (error.code == "auth/invalid-email") {
          return { success: false, message: "邮箱格式错误。" }
        } else if (error.code == "auth/weak-password") {
          return { success: false, message: "密码错误。" }
        }
        return { success: false, message: "服务器错误。" }
      }
    },
    async login({ commit }, data) {
      try {
        await firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        return { success: true, message: "登入成功。" }
      } catch (error) {
        if (error.code == "auth/wrong-password") {
          return { success: false, message: "密码错误。" }
        } else if (error.code == "auth/invalid-email") {
          return { success: false, message: "邮箱错误。" }
        } else if (error.code == "auth/user-not-found") {
          return { success: false, message: "此用户不存在。" }
        }
        return { success: false, message: "此用户已被封锁。" }
      }
    },
    async loginWithProvider({ commit }, provider) {
      this.dispatch('loading', true, { root: true })
      try {
        const credential = await firebase.auth().signInWithPopup(provider)
        await firebase.firestore().collection('users').doc(credential.user?.uid).set({
          name: credential.user?.displayName,
          email: credential.user?.email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        this.dispatch('loading', false, { root: true })
        return { success: true, message: "登入成功。" }
      } catch (error) {
        this.dispatch('loading', false, { root: true })
        if (error.code == "auth/account-exists-with-different-credential") {
          return { succes: false, message: "另一个登入方式已有帐户，请使用其他登入方式。" }
        } else {
          return { success: false, message: "服务器错误。" }
        }
      }
      
    },
    async loginWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/userinfo.email")
      provider.addScope("https://www.googleapis.com/auth/userinfo.profile")
      return await this.dispatch('user/loginWithProvider', provider)
    },
    async loginWithFacebook() {
      const provider = new firebase.auth.FacebookAuthProvider();
      return await this.dispatch('user/loginWithProvider', provider)
    },
    reset({ commit }) {
      commit('reset')
    }
  }
}