class GappsDapi{constructor(e=""){this.base=this.getBase(e)||this.createBase(e)}createBase(e){let t={method:"POST",contentType:"application/json",payload:JSON.stringify({mimeType:"application/vnd.google-apps.folder",name:e}),headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}},o=null;try{o=JSON.parse(UrlFetchApp.fetch("https://www.googleapis.com/drive/v3/files/",t).getContentText())}catch(e){console.log(e)}return o}getBase(e){const t=`https://www.googleapis.com/drive/v3/files/?q=name='${e}' and trashed=false and mimeType = 'application/vnd.google-apps.folder'`,o={method:"GET",headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}};let s=null;try{s=JSON.parse(UrlFetchApp.fetch(t,o).getContentText()).files[0]}catch(e){console.log(e)}return s}deleteBase(e=this.base.id){const t=`https://www.googleapis.com/drive/v3/files/${e}`,o={method:"DELETE",headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}};let s=null;try{s=UrlFetchApp.fetch(t,o).getContentText()}catch(e){console.log(e)}}findPosts(e=[],t=20){let o="";return e.forEach((function(t,s){let r="";r+=`fullText contains '%22${function(e){let t="";return Object.entries(e).forEach((([e,o])=>t+=`${e}:${o}`)),t}(t)}%22'`,e.length>1?o+=s+1!=e.length?`(${r}) or `:`(${r})`:o=r})),o={values:`and (${o})`},this.getPosts(t,o)}getPosts(e=20,t=""){let o="";"string"==typeof t?o="orderBy=createdTime desc&":t=t.values;const s=`https://www.googleapis.com/drive/v3/files/?pageSize=${e}&${o}q='${this.base.id}' in parents and trashed%3Dfalse ${t}`,r={method:"GET",headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}};let n=null;try{n=JSON.parse(UrlFetchApp.fetch(s,r).getContentText()).files}catch(e){console.log(e)}return n}getPostById(e){const t=`https://www.googleapis.com/drive/v3/files/${e}?fields=*`,o={method:"GET",headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}};let s=null;try{s=JSON.parse(UrlFetchApp.fetch(t,o).getContentText())}catch(e){console.log(e)}return s}getValuePosts(e){let t={},o=this;return e.forEach((function(e){const s=`https://www.googleapis.com/drive/v3/files/${e}?alt=media`,r={method:"GET",headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}};let n=null,a=o.getPostById(e)?.parents?.includes(o.base.id);if(a)try{n=UrlFetchApp.fetch(s,r).getContentText(),t[e]=JSON.parse(n)}catch{}})),t}createPost(e=""){const t=Utilities.base64Encode((new Date).valueOf())+(o=1e5,s=999999,o=Math.ceil(o),s=Math.floor(s),Math.floor(Math.random()*(s-o))+o);var o,s;const r={contentType:"application/json",method:"POST",payload:JSON.stringify({mimeType:"text/plain",parents:[this.base.id],name:t}),headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}};let n;try{return n=JSON.parse(UrlFetchApp.fetch("https://www.googleapis.com/drive/v3/files/",r).getContentText()),e?this.editPost(n.id,e):n}catch{}}deletePost(e){const t=`https://www.googleapis.com/drive/v3/files/${e}`,o={method:"DELETE",headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}};let s=null,r=this.getPostById(e)?.parents?.includes(this.base.id);if(!r)return s;try{s=UrlFetchApp.fetch(t,o).getResponseCode()}catch(e){console.log(e)}return s}editPost(e,t=""){const o=`https://www.googleapis.com/upload/drive/v3/files/${e}`,s={method:"PATCH",contentType:"text/plain",payload:JSON.stringify(t),headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}};let r=null,n=this.getPostById(e)?.parents?.includes(this.base.id);if(!n)return r;try{r=JSON.parse(UrlFetchApp.fetch(o,s).getContentText())}catch(e){console.log(e)}return r}}function init(e){return new GappsDapi(e)}
