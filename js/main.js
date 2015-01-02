if (!('Notification' in window)) {
  document.getElementById('wn-unsupported').classList.remove('hidden');
  document.getElementById('button-wn-show-preset').setAttribute('disabled', 'disabled');
  document.getElementById('button-wn-show-custom').setAttribute('disabled', 'disabled');
} else {
  var log = document.getElementById('log');
  var notificationEvents = ['onclick', 'onshow', 'onerror', 'onclose'];

  function notifyUser(event) {
    var title;
    var options;

    event.preventDefault();

    if (event.target.id === 'button-wn-show-preset') {
      title = 'Email received';
      options = {
        body: 'You have a total of 3 unread emails',
        tag: 'preset',
        icon: 'https://slack.global.ssl.fastly.net/21506/img/icons/ios-96.png'
      };
    } else {
      title = document.getElementById('title').value;
      options = {
        body: document.getElementById('body').value,
        tag: 'custom'
      };
    }

    Notification.requestPermission(function(permission) {
      if (permission === "granted") {
        var notification = new Notification(title, options);

        notificationEvents.forEach(function(eventName) {
          notification[eventName] = function(event) {
            log.innerHTML = 'Event "' + event.type + '" triggered for notification "' + notification.tag + '"<br />' + log.innerHTML;
          };
        });
      }
    });
  }

  document.getElementById('button-wn-show-preset').addEventListener('click', notifyUser);
  document.getElementById('button-wn-show-custom').addEventListener('click', notifyUser);
  document.getElementById('clear-log').addEventListener('click', function() {
    log.innerHTML = '';
  });
}
