(this.webpackJsonpsocialnetwork=this.webpackJsonpsocialnetwork||[]).push([[5],{100:function(e,t,n){e.exports={userPhoto:"Users_userPhoto__1_D-2",pagination:"Users_pagination__fX1M4",pageSelector:"Users_pageSelector__3rzKj",selectedPage:"Users_selectedPage__zLzQ3",userItem:"Users_userItem__2To9X",userContainer:"Users_userContainer__grOSd",followBtn:"Users_followBtn__2bIeU"}},107:function(e,t,n){"use strict";n.r(t);var r=n(1),o=n(25),s=n(26),i=n(28),u=n(27),a=n(0),c=n.n(a),l=n(16),p=n(52),f=n(2),g=n(100),h=n.n(g),d=n(95),j=function(e){for(var t=Math.ceil(e.totalItemsCount/e.pageSize),n=[],o=1;o<=t;o++)n.push(o);var s=Math.ceil(t/e.portionSize),i=Object(a.useState)(1),u=Object(d.a)(i,2),c=u[0],l=u[1],p=(c-1)*e.portionSize+1,f=c*e.portionSize;return Object(r.jsxs)("div",{className:e.styles.pagination,children:[c>1&&Object(r.jsx)("button",{onClick:function(){l(c-1)},children:"PREV"}),n.filter((function(e){return e>=p&&e<=f})).map((function(t){return Object(r.jsx)("span",{onClick:function(n){e.onChangeCurrentPage(t)},className:"".concat(e.currentPage===t&&e.styles.selectedPage," ").concat(e.styles.pageSelector),children:t},t)})),s>c&&Object(r.jsx)("button",{onClick:function(){l(c+1)},children:"NEXT"})]})},b=n(97),v=n(12),m=function(e){var t=e.user,n=e.followingInProgress,o=e.toggleFollow;return Object(r.jsx)("div",{children:Object(r.jsxs)("div",{className:h.a.userItem,children:[Object(r.jsxs)("div",{className:h.a.userContainer,children:[Object(r.jsx)(v.b,{to:"/profile/".concat(t.id),children:Object(r.jsx)("img",{src:null!=t.photos.small?t.photos.small:b.a,alt:"userPhoto",className:h.a.userPhoto})}),Object(r.jsx)("button",{disabled:n.some((function(e){return e===t.id})),onClick:function(){return o(t.id,t.followed)},className:h.a.followBtn,children:t.followed?"Unfollow":"Follow"})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("div",{children:t.name}),Object(r.jsx)("div",{children:t.status})]})]},t.id)})},P=function(e){return Object(r.jsxs)("div",{children:[Object(r.jsx)(j,{styles:h.a,totalItemsCount:e.totalItemsCount,pageSize:e.pageSize,pages:e.pages,onChangeCurrentPage:e.onChangeCurrentPage,currentPage:e.currentPage,portionSize:10}),e.users.map((function(t){return Object(r.jsx)(m,Object(f.a)(Object(f.a)({},e),{},{user:t}),t.id)}))]})},y=n(32);function O(e,t){return e===t}function C(e,t,n){if(null===t||null===n||t.length!==n.length)return!1;for(var r=t.length,o=0;o<r;o++)if(!e(t[o],n[o]))return!1;return!0}function w(e){var t=Array.isArray(e[0])?e[0]:e;if(!t.every((function(e){return"function"===typeof e}))){var n=t.map((function(e){return typeof e})).join(", ");throw new Error("Selector creators expect all input-selectors to be functions, instead received the following types: ["+n+"]")}return t}var S=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return function(){for(var t=arguments.length,r=Array(t),o=0;o<t;o++)r[o]=arguments[o];var s=0,i=r.pop(),u=w(r),a=e.apply(void 0,[function(){return s++,i.apply(null,arguments)}].concat(n)),c=e((function(){for(var e=[],t=u.length,n=0;n<t;n++)e.push(u[n].apply(null,arguments));return a.apply(null,e)}));return c.resultFunc=i,c.dependencies=u,c.recomputations=function(){return s},c.resetRecomputations=function(){return s=0},c}}((function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:O,n=null,r=null;return function(){return C(t,n,arguments)||(r=e.apply(null,arguments)),n=arguments,r}}));var x=S((function(e){return e.usersPage.users}),(function(e){return e.filter((function(e){return!0}))})),_=function(e){return e.usersPage.pageSize},I=function(e){return e.usersPage.totalUsersCount},z=function(e){return e.usersPage.currentPage},U=function(e){return e.usersPage.isFetching},k=function(e){return e.usersPage.followingInProgress},F=function(e){Object(i.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(o.a)(this,n);for(var r=arguments.length,s=new Array(r),i=0;i<r;i++)s[i]=arguments[i];return(e=t.call.apply(t,[this].concat(s))).onChangeCurrentPage=function(t){e.props.setCurrentPage(t),e.props.requestUsers(t,e.props.pageSize)},e}return Object(s.a)(n,[{key:"componentDidMount",value:function(){this.props.requestUsers(this.props.currentPage,this.props.pageSize)}},{key:"render",value:function(){return Object(r.jsxs)(r.Fragment,{children:[this.props.isFetching?Object(r.jsx)(y.a,{}):null,Object(r.jsx)(P,{users:this.props.users,pageSize:this.props.pageSize,totalItemsCount:this.props.totalItemsCount,currentPage:this.props.currentPage,toggleFollow:this.props.toggleFollow,onChangeCurrentPage:this.onChangeCurrentPage,followingInProgress:this.props.followingInProgress})]})}}]),n}(c.a.Component),A=Object(l.b)((function(e){return{users:x(e),pageSize:_(e),totalItemsCount:I(e),currentPage:z(e),isFetching:U(e),followingInProgress:k(e)}}),{toggleFollow:p.d,setCurrentPage:p.c,requestUsers:p.b})(F);t.default=A},95:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(39);function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,s=void 0;try{for(var i,u=e[Symbol.iterator]();!(r=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(a){o=!0,s=a}finally{try{r||null==u.return||u.return()}finally{if(o)throw s}}return n}}(e,t)||Object(r.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},97:function(e,t,n){"use strict";t.a=n.p+"static/media/person.8b9cd9e1.png"}}]);
//# sourceMappingURL=5.09b434f8.chunk.js.map