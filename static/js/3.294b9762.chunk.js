(this["webpackJsonpreact-complete-guide"]=this["webpackJsonpreact-complete-guide"]||[]).push([[3],{64:function(e,t,n){e.exports={card:"Card_card__1m44e"}},65:function(e,t,n){e.exports={form:"NewHotelForm_form__1hjg6",loading:"NewHotelForm_loading__3Ts7w",control:"NewHotelForm_control__1RA6K",actions:"NewHotelForm_actions__2qgvm",warning:"NewHotelForm_warning__3hkEo"}},68:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),r=n(5),c=n(3),o=n(4),i=n(64),l=n.n(i),u=n(1),d=function(e){return Object(u.jsx)("div",{className:l.a.card,children:e.children})},j=n(35),b=n(11),m=n(21),f=s.a.forwardRef((function(e,t){return Object(u.jsxs)("div",{children:[Object(u.jsx)("label",{htmlFor:e.input.id,children:e.label}),Object(u.jsx)("input",Object(m.a)(Object(m.a)({required:!0,ref:t},e.input),{},{onChange:e.onChange}))]})})),p=n(65),O=n.n(p),h=function(e){var t=Object(a.useState)(!1),n=Object(o.a)(t,2),r=n[0],i=n[1],l=Object(a.useRef)(),m=Object(a.useRef)();function p(){i(!1)}if("pending"===e.statusType.status)return Object(u.jsx)("div",{className:"centered",children:Object(u.jsx)(j.a,{})});var h=Object(u.jsx)(b.a,{className:"add",type:"submit",onClick:p,children:"EKLE"});return"completed"===e.statusType.status&&(h=Object(u.jsx)(b.a,{className:"addConfirm",type:"submit",onClick:p,children:"\u2713 EKLEND\u0130"})),Object(u.jsxs)(s.a.Fragment,{children:[Object(u.jsx)(c.a,{when:r,message:"Are you sure, you want to leave? Entered data will be lost!!"}),Object(u.jsx)(d,{children:Object(u.jsxs)("form",{className:O.a.form,onSubmit:function(t){t.preventDefault();var n=l.current.value,a=m.current.value,s=new Date;e.onAddHotel({name:n,score:a,logTime:Date.parse(s),editTime:Date.parse(s)})},onFocus:function(){i(!0)},children:["pending"===e.status&&Object(u.jsx)("div",{className:O.a.loading,children:Object(u.jsx)(j.a,{})}),Object(u.jsx)("div",{className:O.a.control,children:Object(u.jsx)(f,{className:O.a.control,ref:l,label:"Otel Ad\u0131",input:{htmlFor:"name",id:"name",type:"text"}})}),Object(u.jsx)("div",{className:O.a.control,children:Object(u.jsx)(f,{ref:m,label:"Puan",input:{htmlFor:"score",id:"score",type:"number",min:"1",max:"10",step:".1"}})}),h,"error"===e.statusType.status&&Object(u.jsx)("div",{className:O.a.warning,children:e.statusType.error})]})})]})},x=n(17),g=n(18),v=n(10),_=n(14);t.default=function(){var e=Object(x.a)(g.d),t=e.sendRequest,n=e.status,o=e.error,i=Object(r.b)(),l=Object(c.h)();Object(a.useEffect)((function(){if("completed"===n){var e=setTimeout((function(){l.push("/hotels-list")}),600);return function(){clearTimeout(e)}}}),[n,l]);return Object(u.jsx)(s.a.Fragment,{children:Object(u.jsx)(h,{statusType:{status:n,error:o},onAddHotel:function(e){i(_.b.sort(!1)),t(e),i(v.b.addHotelToList(e))}})})}}}]);
//# sourceMappingURL=3.294b9762.chunk.js.map