var onprojectclick = function(type) {
    return function(){ 
        mixpanel.track('projectlink_clicked', {
            Type: type,
            Project: this.innerHTML
        });
    };
};

var projectLinks = document.getElementsByClassName('ProjectSite')
for(var i=0; i < projectLinks.length; i++) {
    var thisProjectLink = projectLinks[i];
    thisProjectLink.onclick = onprojectclick('direct');
}

var projectImageLinks = document.getElementsByClassName('ProjectSite--image')
for(var i=0; i < projectImageLinks.length; i++) {
    var thisProjectImageLink = projectImageLinks[i];
    thisProjectImageLink .onclick = onprojectclick('image');
}

var githubLinks = document.getElementsByClassName('GithubSite');
for(var i=0; i < githubLinks.length; i++) {
    var thisGithubLink = githubLinks[i];
    thisGithubLink.onclick = function() {
        mixpanel.track('githublink_clicked', {
            Project: /https:.*brycekbargar\/(.*)/.exec(this.href)[1]
        });
    };
}


