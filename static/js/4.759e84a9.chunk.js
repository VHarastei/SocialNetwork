(this.webpackJsonpsocialnetwork=this.webpackJsonpsocialnetwork||[]).push([[4],{101:function(t,e,n){t.exports={posts:"MyPosts_posts__2Nc1u",postsBlock:"MyPosts_postsBlock__3dQYh",fieldControl:"MyPosts_fieldControl__1xh7g",error:"MyPosts_error__Hzje4"}},102:function(t,e,n){t.exports={item:"Post_item__2S8TC",icon:"Post_icon__WGWMq"}},106:function(t,e,n){"use strict";n.r(e);var r=n(2),c=n(1);function s(t,e){if(null==t)return{};var n,r,c=function(t,e){if(null==t)return{};var n,r,c={},s=Object.keys(t);for(r=0;r<s.length;r++)n=s[r],e.indexOf(n)>=0||(c[n]=t[n]);return c}(t,e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(r=0;r<s.length;r++)n=s[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(c[n]=t[n])}return c}var i=n(0),o=n(16),a=n(40),u=n(101),l=n.n(u),j=n(102),b=n.n(j),d=function(t){return Object(c.jsxs)("div",{className:b.a.item,children:[Object(c.jsx)("img",{className:b.a.icon,src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzdCnMXv32Be239UIoWX0J4CZZIdZkfDljCw&usqp=CAU",alt:"img"}),t.message,Object(c.jsx)("button",{children:"like"}),t.likesCount]})},f=n(94),O=n(93),p=function(t){return Object(c.jsx)(f.b,{onSubmit:function(e){t.addPost(e.newPostText),e.newPostText=""},children:function(t){var e=t.handleSubmit;return Object(c.jsxs)("form",{onSubmit:e,children:[Object(c.jsx)(f.a,{name:"newPostText",validate:Object(O.b)(300),children:function(t){var e=t.input,n=t.meta;return Object(c.jsxs)("div",{className:l.a.fieldControl+" "+l.a.error,children:[Object(c.jsx)("textarea",Object(r.a)({type:"text",placeholder:"Write new post"},e)),n.error&&n.touched&&Object(c.jsx)("span",{children:n.error})]})}}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"Post"})})]})}})},h=function(t){var e=t.profilePage.posts.map((function(t){return Object(c.jsx)(d,{id:t.id,message:t.message,likesCount:t.likesCount},t.id)}));return Object(c.jsxs)("div",{className:l.a.postsBlock,children:[Object(c.jsx)("h2",{children:"my posts"}),Object(c.jsx)("div",{children:Object(c.jsx)(p,{addPost:t.addPost})}),Object(c.jsx)("div",{className:l.a.posts,children:e})]})},x=Object(o.b)((function(t){return{profilePage:t.profilePage}}),(function(t){return{addPost:function(e){t(Object(a.a)(e))}}}))(h),m=n(3),v=n.n(m),g=n(38),y=n(6),k=n(95),P=n(32),S=n(99),_=n.n(S),w=function(t){var e=Object(i.useState)(!1),n=Object(k.a)(e,2),r=n[0],s=n[1],o=Object(i.useState)(t.status),a=Object(k.a)(o,2),u=a[0],l=a[1];return Object(i.useEffect)((function(){l(t.status)}),[t.status]),Object(c.jsx)("div",{children:r?Object(c.jsx)("input",{onChange:function(t){l(t.target.value)},autoFocus:!0,onBlur:function(){s(!1),t.updateStatus(u)},value:u}):Object(c.jsxs)("span",{onDoubleClick:function(){s(!0)},children:["Status: ",t.status||"No status"]})})},I=n(97),C=function(t){var e=t.profile,n=t.onSubmit;return Object(c.jsx)(f.b,{initialValues:e,onSubmit:n,render:function(t){var n=t.submitError,s=t.handleSubmit;return Object(c.jsxs)("form",{onSubmit:s,children:[Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"Save"})}),n&&Object(c.jsx)("div",{className:_.a.error,children:n}),Object(c.jsx)(f.a,{name:"fullName",children:function(t){var e=t.input;return Object(c.jsxs)("div",{children:[Object(c.jsx)("div",{children:"Full name: "}),Object(c.jsx)("input",Object(r.a)({type:"text",placeholder:"Full name"},e))]})}}),Object(c.jsx)(f.a,{name:"lookingForAJob",type:"checkbox",children:function(t){var e=t.input;return Object(c.jsxs)("div",{children:[Object(c.jsx)("div",{children:"Looking for a job: "}),Object(c.jsx)("input",Object(r.a)({type:"checkbox"},e))]})}}),Object(c.jsx)(f.a,{name:"lookingForAJobDescription",children:function(t){var e=t.input;return Object(c.jsxs)("div",{children:[Object(c.jsx)("div",{children:"My professional skills: "}),Object(c.jsx)("textarea",Object(r.a)({placeholder:"My professional skills"},e))]})}}),Object(c.jsx)(f.a,{name:"aboutMe",children:function(t){var e=t.input;return Object(c.jsxs)("div",{children:[Object(c.jsx)("div",{children:"About me: "}),Object(c.jsx)("textarea",Object(r.a)({placeholder:"About me"},e))]})}}),Object(c.jsxs)("div",{children:["Contacts:",Object.keys(e.contacts).map((function(t){return Object(c.jsxs)("div",{className:_.a.contactItem,children:[t,":",Object(c.jsx)(f.a,{name:"contacts."+t,children:function(e){var n=e.input;return Object(c.jsx)("div",{children:Object(c.jsx)("input",Object(r.a)({placeholder:t,type:"text"},n))})}})]},t)}))]})]})}})},A=n(96),N=function(t){var e=t.profile,n=t.isOwner,r=t.toggleEditMode;return Object(c.jsxs)("div",{children:[n&&Object(c.jsx)("button",{onClick:r,children:"edit"}),Object(c.jsxs)("div",{children:["Fullname: ",e.fullName]}),Object(c.jsxs)("div",{children:["Looking for a job: ",e.lookingForAJob?"yes":"no"]}),e.lookingForAJob&&Object(c.jsxs)("div",{children:["My professional skills: ",e.lookingForAJobDescription]}),Object(c.jsxs)("div",{children:["About me: ",e.aboutMe]}),Object(c.jsxs)("div",{children:["Contacts:",Object.keys(e.contacts).map((function(t){return Object(c.jsx)(M,{contactTitle:t,contactValue:e.contacts[t]},t)}))]})]})},M=function(t){var e=t.contactTitle,n=t.contactValue;return Object(c.jsxs)("div",{className:_.a.contactItem,children:[e," : ",n]})},F=function(t){var e=t.profile,n=t.isOwner,r=t.savePhoto,s=t.updateStatus,o=t.status,a=t.saveProfile,u=Object(i.useState)(!1),l=Object(k.a)(u,2),j=l[0],b=l[1];if(!e)return Object(c.jsx)(P.a,{});var d=function(){var t=Object(y.a)(v.a.mark((function t(e){var n;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a(e);case 2:return 0===(n=t.sent).resultCode&&b(!1),t.abrupt("return",Object(g.a)({},A.a,n.messages[0]));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(c.jsx)("div",{children:Object(c.jsxs)("div",{className:_.a.descriptionBlock,children:[Object(c.jsx)("img",{className:_.a.icon,src:e.photos.large||I.a,alt:"icon"}),n&&Object(c.jsx)("input",{type:"file",onChange:function(t){t.target.files.length&&r(t.target.files[0])}}),j?Object(c.jsx)(C,{profile:e,onSubmit:d}):Object(c.jsx)(N,{profile:e,isOwner:n,toggleEditMode:function(){b(!0)}}),Object(c.jsx)(w,{updateStatus:s,status:o})]})})},B=function(t){return Object(c.jsxs)("div",{children:[Object(c.jsx)(F,Object(r.a)({},t)),Object(c.jsx)(x,{})]})},J=n(4),T=n(15);e.default=Object(T.d)(Object(o.b)((function(t){return{profile:t.profilePage.profile,status:t.profilePage.status,authorizedUserId:t.auth.userId,isAuth:t.auth.isAuth}}),{getUserProfile:a.d,getStatus:a.c,updateStatus:a.g,savePhoto:a.e,saveProfile:a.f}),J.g)((function(t){var e=t.match,n=t.authorizedUserId,o=t.history,a=t.getStatus,u=t.getUserProfile,l=s(t,["match","authorizedUserId","history","getStatus","getUserProfile"]);return Object(i.useEffect)((function(){var t=e.params.userId;t||(t=n)||o.push("/login"),t&&(a(t),u(t))}),[e,n,a,u,o]),Object(c.jsx)(B,Object(r.a)(Object(r.a)({},l),{},{isOwner:!e.params.userId}))}))},93:function(t,e,n){"use strict";n.d(e,"c",(function(){return r})),n.d(e,"b",(function(){return c})),n.d(e,"a",(function(){return s}));var r=function(t){return t?void 0:"Required"},c=function(t){return function(e){return e&&e.length>=t?"Maximum length is ".concat(t," symbols"):void 0}},s=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(t){return e.reduce((function(e,n){return e||n(t)}),void 0)}}},95:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var r=n(39);function c(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,c=!1,s=void 0;try{for(var i,o=t[Symbol.iterator]();!(r=(i=o.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(a){c=!0,s=a}finally{try{r||null==o.return||o.return()}finally{if(c)throw s}}return n}}(t,e)||Object(r.a)(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},97:function(t,e,n){"use strict";e.a=n.p+"static/media/person.8b9cd9e1.png"},99:function(t,e,n){t.exports={descriptionBlock:"ProfileInfo_descriptionBlock__3oFI0",contactItem:"ProfileInfo_contactItem__tZB5x",error:"ProfileInfo_error__3Vssu"}}}]);
//# sourceMappingURL=4.759e84a9.chunk.js.map