export default ({ Vue, isServer }) => {
  Vue.config.devtools = true;

  if (!isServer) {
    window.navigator.serviceWorker
    .getRegistrations()
    .then(registrations => registrations.forEach(registration => registration.unregister()));
  }
}
