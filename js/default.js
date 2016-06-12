document
    .getElementById('RSS')
    .onclick = function() {
        mixpanel.track('rss_clicked');
    };

document
    .getElementById('All')
    .onclick = function() {
        mixpanel.track('all_clicked');
    };

document
    .getElementById('Top5')
    .onclick = function() {
        mixpanel.track('top5_clicked');
    };


