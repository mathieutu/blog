export default ({ Vue, isServer }) => {
  Vue.config.devtools = true;

  // unregister actual service worker to remove it.
  if (!isServer) {
    window.navigator.serviceWorker
    .getRegistrations()
    .then(registrations => registrations.forEach(registration => registration.unregister()));
  }
}
