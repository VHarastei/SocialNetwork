(this.webpackJsonpsocialnetwork=this.webpackJsonpsocialnetwork||[]).push([[4],{100:function(t,e,n){t.exports={posts:"MyPosts_posts__2Nc1u",postsBlock:"MyPosts_postsBlock__3dQYh",fieldControl:"MyPosts_fieldControl__1xh7g",error:"MyPosts_error__Hzje4"}},101:function(t,e,n){t.exports={item:"Post_item__2S8TC",icon:"Post_icon__WGWMq"}},102:function(t,e,n){t.exports={descriptionBlock:"ProfileInfo_descriptionBlock__3oFI0"}},106:function(t,e,n){"use strict";n.r(e);var r=n(2),s=n(1),o=n(0),c=n(16),i=n(39),a=n(100),u=n.n(a),l=n(101),d=n.n(l),j=function(t){return Object(s.jsxs)("div",{className:d.a.item,children:[Object(s.jsx)("img",{className:d.a.icon,src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzdCnMXv32Be239UIoWX0J4CZZIdZkfDljCw&usqp=CAU",alt:"img"}),t.message,Object(s.jsx)("button",{children:"like"}),t.likesCount]})},f=n(94),b=n(93),p=function(t){return Object(s.jsx)(f.b,{onSubmit:function(e){t.addPost(e.newPostText),e.newPostText=""},children:function(t){var e=t.handleSubmit;return Object(s.jsxs)("form",{onSubmit:e,children:[Object(s.jsx)(f.a,{name:"newPostText",validate:Object(b.b)(300),children:function(t){var e=t.input,n=t.meta;return Object(s.jsxs)("div",{className:u.a.fieldControl+" "+u.a.error,children:[Object(s.jsx)("textarea",Object(r.a)({type:"text",placeholder:"Write new post"},e)),n.error&&n.touched&&Object(s.jsx)("span",{children:n.error})]})}}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"Post"})})]})}})},h=function(t){var e=t.profilePage.posts.map((function(t){return Object(s.jsx)(j,{id:t.id,message:t.message,likesCount:t.likesCount})}));return Object(s.jsxs)("div",{className:u.a.postsBlock,children:[Object(s.jsx)("h2",{children:"my posts"}),Object(s.jsx)("div",{children:Object(s.jsx)(p,{addPost:t.addPost})}),Object(s.jsx)("div",{className:u.a.posts,children:e})]})},O=Object(c.b)((function(t){return{profilePage:t.profilePage}}),(function(t){return{addPost:function(e){t(Object(i.a)(e))}}}))(h),m=n(32),x=n(102),v=n.n(x),g=n(97),y=function(t){var e=Object(o.useState)(!1),n=Object(g.a)(e,2),r=n[0],c=n[1],i=Object(o.useState)(t.status),a=Object(g.a)(i,2),u=a[0],l=a[1];return Object(o.useEffect)((function(){l(t.status)}),[t.status]),Object(s.jsx)("div",{children:r?Object(s.jsx)("input",{onChange:function(t){l(t.target.value)},autoFocus:!0,onBlur:function(){c(!1),t.updateStatus(u)},value:u}):Object(s.jsx)("span",{onDoubleClick:function(){c(!0)},children:t.status||"No status"})})},P=n(95),_=function(t){if(!t.profile)return Object(s.jsx)(m.a,{});return Object(s.jsx)("div",{children:Object(s.jsxs)("div",{className:v.a.descriptionBlock,children:[Object(s.jsx)("img",{className:v.a.icon,src:t.profile.photos.large||P.a,alt:"icon"}),t.isOwner&&Object(s.jsx)("input",{type:"file",onChange:function(e){e.target.files.length&&t.savePhoto(e.target.files[0])}}),Object(s.jsx)(y,{updateStatus:t.updateStatus,status:t.status})]})})},k=function(t){return Object(s.jsxs)("div",{children:[Object(s.jsx)(_,Object(r.a)({},t)),Object(s.jsx)(O,{})]})},S=n(4),w=n(15);e.default=Object(w.d)(Object(c.b)((function(t){return{profile:t.profilePage.profile,status:t.profilePage.status,authorizedUserId:t.auth.userId,isAuth:t.auth.isAuth}}),{getUserProfile:i.d,getStatus:i.c,updateStatus:i.f,savePhoto:i.e}),S.g)((function(t){return Object(o.useEffect)((function(){var e=t.match.params.userId;e||(e=t.authorizedUserId)||t.history.push("/login"),e&&(t.getStatus(e),t.getUserProfile(e))}),[t.match.params.userId]),Object(s.jsx)(k,Object(r.a)(Object(r.a)({},t),{},{isOwner:!t.match.params.userId}))}))},93:function(t,e,n){"use strict";n.d(e,"c",(function(){return r})),n.d(e,"b",(function(){return s})),n.d(e,"a",(function(){return o}));var r=function(t){return t?void 0:"Required"},s=function(t){return function(e){return e&&e.length>=t?"Maximum length is ".concat(t," symbols"):void 0}},o=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(t){return e.reduce((function(e,n){return e||n(t)}),void 0)}}},95:function(t,e,n){"use strict";e.a=n.p+"static/media/person.8b9cd9e1.png"},97:function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));var r=n(38);function s(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,s=!1,o=void 0;try{for(var c,i=t[Symbol.iterator]();!(r=(c=i.next()).done)&&(n.push(c.value),!e||n.length!==e);r=!0);}catch(a){s=!0,o=a}finally{try{r||null==i.return||i.return()}finally{if(s)throw o}}return n}}(t,e)||Object(r.a)(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}}}]);
//# sourceMappingURL=4.91c1b481.chunk.js.map