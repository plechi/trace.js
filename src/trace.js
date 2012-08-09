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
 * This File Includes BrowserDetect
 * http://www.quirksmode.org/js/detect.html
 * Copyright by Peter-Paul Koch
 *
 */

(function(){
    
    //the options
    var options={
        serverScript:"tracer.php" //you can use your own script
    };
    
    //BrowserDetect
    var BrowserDetect = {
        get: function () {
            this.browser = this.searchString(this.dataBrowser) || "unknown";
            this.version = this.searchVersion(navigator.userAgent)
            || this.searchVersion(navigator.appVersion)
            || "unknown";
            this.OS = this.searchString(this.dataOS) || "unknown";
            return this;
        },
        searchString: function (data) {
            for (var i=0;i<data.length;i++)	{
                var dataString = data[i].string;
                var dataProp = data[i].prop;
                this.versionSearchString = data[i].versionSearch || data[i].identity;
                if (dataString) {
                    if (dataString.indexOf(data[i].subString) != -1)
                        return data[i].identity;
                }
                else if (dataProp)
                    return data[i].identity;
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index == -1) return;
            return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
        },
        dataBrowser: [
        {
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        },
        {
            string: navigator.userAgent,
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "OmniWeb"
        },
        {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
        },
        {
            prop: window.opera,
            identity: "Opera",
            versionSearch: "Version"
        },
        {
            string: navigator.vendor,
            subString: "iCab",
            identity: "iCab"
        },
        {
            string: navigator.vendor,
            subString: "KDE",
            identity: "Konqueror"
        },
        {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        },
        {
            string: navigator.vendor,
            subString: "Camino",
            identity: "Camino"
        },
        {		// for newer Netscapes (6+)
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "Netscape"
        },
        {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer",
            versionSearch: "MSIE"
        },
        {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
        },
        { 		// for older Netscapes (4-)
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
        }
        ],
        dataOS : [
        {
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
        },
        {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
        },
        {
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "iPhone/iPod"
        },
        {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
        }
        ]

    };  
    
    //send error via AJAX
    var send=function(e){
        var b= BrowserDetect.get();
        e.bn=b.browser;//browser name
        e.bv=b.version;//browser version
        e.bo=b.OS; //browser os
        e.bc = navigator.cookieEnabled; //are cokies enabled
        e.bu = navigator.userAgent; //user agent string
        $.post(options.serverScript,e);
    } 
    
    //send old errors
    for (var i=0;i<_err.length;i++){
        send(_err[i]);
    }
    
    //save push function
    _err.p=Array.prototype.push;
    //overwrite push to send errors imedeatly
    _err.push=function(e){
        _err.p(e);
        console.log(_err);
        send(e);
    }
    
})();