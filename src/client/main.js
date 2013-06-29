(function(window) {

    var node,
        url;
    var form = document.createElement("div");
    var topCon = document.createElement("div");
    var botCon = document.createElement("div");
    var label = document.createElement("label");
    var username = document.createElement("input");
    var text = document.createElement("textarea");
    var send = document.createElement("button");

    form.className = "plug-post plug-form";
    username.className = "plug-name";
    text.className = "plug-text";
    send.className = "plug-button";

    label.appendChild(document.createTextNode("Name:"));
    send.appendChild(document.createTextNode("Send"));

    topCon.appendChild(label);
    topCon.appendChild(username);
    topCon.appendChild(text);
    botCon.appendChild(send);

    form.appendChild(topCon);
    form.appendChild(botCon);

    send.onclick = sendPost;


    window.initBoard = function(id, feed) {

        node = document.getElementById(id);
        url = feed;

        // check if valid DOM node
        if(!node) {
            throw new Error("[PLUG-Wall] Not a valid HTML element id");
        }

        node.className = "plug-board";

        xhr({
              method: 'GET',
              url: feed
            }, handleResponse);

    };
    
    function handleResponse() {
        var posts = JSON.parse(this.responseText);
        createPosts(posts);
    }

    function createPosts(posts) {
        var post;
        node.innerHTML = "";

        for(var i = 0; i < posts.length; i++) {
            post = document.createElement("div");
            var body = document.createElement("div");
            var user = document.createElement("span");
            var date = document.createElement("span");

            post.className = "plug-post";
            body.className = "plug-post-body";
            user.className = "plug-post-user";
            date.className = "plug-post-date";

            body.appendChild(document.createTextNode(posts[i].message));
            user.appendChild(document.createTextNode(posts[i].user));
            date.appendChild(document.createTextNode(posts[i].date));

            post.appendChild(body);
            post.appendChild(user);
            post.appendChild(date);

            node.appendChild(post);
        }

        node.appendChild(form);
    }

    function sendPost() {
        var data = {};
        data.user = username.value;
        data.message = text.value; 
        xhr({
            method: "POST",
            url: url,
            data: JSON.stringify(data) 
        }); 

    }

    function xhr(options , callback) {
        var req = new XMLHttpRequest();
        req.open(options.method, options.url, true);
        req.onload = callback;

        req.send(options.data);

    }


})(window);
