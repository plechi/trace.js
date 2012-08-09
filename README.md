Trace.js
========
Trace.js is a simple tool to report client sided javascript errors.

##Usage##
It's very simple to use trace.js.

###Client side###
Copy the code of `snippet.js` into a script tag in your HTML file (also jQuery is needed for AJAX Request):
```html
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript">
            var _err=[];
            (function (window,document) {
                window.onerror = function (msg, url, line) {
                    _err.push({
                        m: msg, 
                        u: url, 
                        l: line
                    });  
                    return false;
                };
                var onload = function () {
                    var script = document.createElement("script"), tag = document.getElementsByTagName("script")[0];
                    script.src = "trace.js";
                    tag.parentNode.insertBefore(script, tag);
                };
                // Wait until window.onload before using jquery
                window.addEventListener ? window.addEventListener("load", onload, false) : window.attachEvent("onload", onload);
                
            })(window,document);
        </script>
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    </head>
    <body>
    </body>
</html>
```
Now all errors were POSTed to the tracer.php script.

You can modify this in `trace.js`:

```javascript
var options={
    serverScript:"tracer.php"
};
```

###Server-side###

The script sends all errors to the server with a POST request and following parameters:
 - `m` - the error message
 - `u` - the URL of the javascript file in which the error occured.
 - `l` - the line number
 - `bn` - the name of the browser (e.g. Chrome) 
 - `bv` - the version of the browser
 - `bc` - are Cookies enabled (true/false)
 - `bu` - the UserAgent string

For now, there is no server side script available, but i am working hard to implement one in PHP and MYSQL.

##Copyright and license##

Copyright 2012, Lukas Plechinger

Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements. The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.

File src/trace.js includes BrowserDetect
http://www.quirksmode.org/js/detect.html
Copyright by Peter-Paul Koch

File src/snippet.js is a "fork" of https://gist.github.com/1147102