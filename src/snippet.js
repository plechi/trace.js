/*!
 * trace.js - Simple client side javascript error logging
 * Version 0.1
 * http://github.com/plechi/trace.js
 *
 * Copyright 2012, Lukas Plechinger
 * 
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 * This is a "fork" of https://gist.github.com/1147102
 */

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