(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var o=t(0),a=t.n(o),r=t(13),u=t.n(r),c=(t(19),t(2)),l=function(e){return a.a.createElement("li",null,e.person.name," ",e.person.number,a.a.createElement("button",{onClick:function(n){return e.deletePerson(n,e.person.id)}},"Delete "))},i=function(e){return a.a.createElement("ul",null,e.persons.filter((function(n){return n.name.toUpperCase().includes(e.phonebookFilterString.toUpperCase())})).map((function(n){return a.a.createElement(l,{key:n.id,person:n,deletePerson:e.deletePerson})})))},s=function(e){return a.a.createElement("div",null," Find name: ",a.a.createElement("input",{value:e.phonebookFilterString,onChange:e.handleFilterChange}))},m=function(e){return a.a.createElement("form",{onSubmit:e.addName},a.a.createElement("div",null,"Name: ",a.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})),a.a.createElement("div",null,"Number: ",a.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"Add entry")))},d=function(e){var n=e.message;return null===n?null:a.a.createElement("div",{className:"notification"},n)},f=function(e){var n=e.message;return null===n?null:a.a.createElement("div",{className:"error"},n)},h=t(3),p=t.n(h),g="/api/persons",b=function(){return p.a.get(g).then((function(e){return e.data}))},v=function(e){return p.a.post(g,e).then((function(e){return e.data}))},E=function(e){return p.a.delete("".concat(g,"/").concat(e)).then((function(e){console.log(e)}))},w=function(e,n){return console.log("update function called"),p.a.put("".concat(g,"/").concat(e),n).then((function(e){return e.data}))},k=function(){var e=Object(o.useState)([]),n=Object(c.a)(e,2),t=n[0],r=n[1],u=Object(o.useState)(""),l=Object(c.a)(u,2),h=l[0],p=l[1],g=Object(o.useState)(""),k=Object(c.a)(g,2),N=k[0],j=k[1],O=Object(o.useState)(""),y=Object(c.a)(O,2),C=y[0],S=y[1],F=Object(o.useState)(null),T=Object(c.a)(F,2),P=T[0],A=T[1],D=Object(o.useState)(null),J=Object(c.a)(D,2),U=J[0],x=J[1];Object(o.useEffect)((function(){b().then((function(e){r(e)}))}),[]);return a.a.createElement("div",null,a.a.createElement("h1",null,"Phonebook"),a.a.createElement(d,{message:P}),a.a.createElement(f,{message:U}),a.a.createElement(s,{phonebookFilterString:C,handleFilterChange:function(e){console.log(e.target.value),S(e.target.value)}}),a.a.createElement("h2",null,"Add new entries"),a.a.createElement(m,{addName:function(e){if(e.preventDefault(),t.find((function(e){return e.name===h}))){if(window.confirm("".concat(h," is already added to phonebook.\n          Would you like to update the number to ").concat(N,"?"))){var n=t.find((function(e){return e.name===h})).id;console.log("attempting to update number");var o={name:h,number:N};return w(n,o).then((function(e){console.log("update promise succesful"),r(t.map((function(t){return t.id!==n?t:e}))),A("".concat(o.name,"'s number was changed to ").concat(o.number,"."))})).catch((function(e){console.log("error caught"),x("That person was already removed from the server."),b().then((function(e){return r(e)})),console.log("persons:",t),setTimeout((function(){x(null)}),5e3)})),p(""),j(""),void setTimeout((function(){A(null)}),5e3)}console.log("update cancelled")}else{v({name:h,number:N}).then((function(e){r(t.concat(e)),A("".concat(e.name," was added to the directory.")),p(""),j(""),setTimeout((function(){A(null)}),5e3)})).catch((function(e){console.log(e.response.data),x(e.response.data.error),setTimeout((function(){x(null)}),5e3)}))}},handleNameChange:function(e){console.log(e.target.value),p(e.target.value)},newName:h,newNumber:N,handleNumberChange:function(e){console.log(e.target.value),j(e.target.value)}}),a.a.createElement("h2",null,"Entries"),a.a.createElement(i,{persons:t,phonebookFilterString:C,deletePerson:function(e,n){if(window.confirm("Are you sure you want to remove ".concat(t.find((function(e){return e.id===n})).name,"?"))){var o=t.find((function(e){return e.id===n})).name;console.log("Attempting to delete entry ".concat(n)),E(n).then((function(e){r(t.filter((function(e){return e.id!==n})))})),A("".concat(o," deleted from the directory.")),setTimeout((function(){A(null)}),5e3)}else console.log("He chickened out, sir!")}}))};u.a.render(a.a.createElement(k,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.60440c6a.chunk.js.map