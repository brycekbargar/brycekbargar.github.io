document
    .getElementById('Email')
    .onclick = function() {
        mixpanel.track('email_clicked');
    };
