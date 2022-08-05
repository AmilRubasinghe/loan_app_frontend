
export default function ({ app, $axios, store, $notifier, $auth, $config }) {

  // $axios.defaults.headers.common['tenant'] = `${$config.realam}`;

  // $axios.interceptors.request.use((config) => {
  //   console.log('******');
  //   console.log(config);


  //   return config;
  // }, function (error) {
  //   return Promise.reject(error);
  // });



  $axios.onRequest((config) => {
    store._vm.$nextTick(() => {
      store.commit('setLoader', true)
      return config
    })
  })

  $axios.onResponse((response) => {
    store._vm.$nextTick(() => {
      store.commit('setLoader', false)
      return response
    })
  })
  $axios.onResponseError((error) => {
    const code = parseInt(error.response && error.response.status)
    // app.$loader.stop()
    store._vm.$nextTick(() => {
      store.commit('setLoader', false)
    })
    console.log('**'+error.response.data.message);
    console.log(code);

    if (code === 401) {
      $notifier.showMessage({
        content: error.response.data.message,
        color: "error"
      });
    }
    if (code === 400) {
      console.log(error);
      $notifier.showMessage({
        content: error.response.data.message,
        color: "error"
      });
      return;


    } else if (code === 409) {
      $notifier.showMessage({
        content: error.response.data.message,
        color: "error"
      });
      return;
    }
    else if (code === 404) {
      $notifier.showMessage({
        content: error.response.data.message,
        color: "error"
      });
      return;
    }

    else if (code === 403) {
      $notifier.showMessage({ content: "Forbidden Action", color: "error" });
      return;
    } else if (code === 500) {
      $notifier.showMessage({
        content: error.response.data.message,
        color: "error"
      });
      return;
    }
  })

}
