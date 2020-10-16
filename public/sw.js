self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    'body': "Ini adalah Notifikasi",
    'requireInteraction': true,
    'icon': '/images/mu.jpg',
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});