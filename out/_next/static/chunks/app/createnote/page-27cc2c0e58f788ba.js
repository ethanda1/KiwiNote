(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[885],{6356:(e,t,s)=>{Promise.resolve().then(s.bind(s,7142))},7839:(e,t,s)=>{"use strict";s.d(t,{w:()=>o});var a=s(7437),r=s(2265),l=s(6648),n=s(6463),i=s(4714);let o=e=>{let{handleSearch:t}=e,[s,o]=(0,r.useState)(null),[c,d]=(0,r.useState)(""),[u,h]=(0,r.useState)(!1),x=(0,n.useRouter)();(0,r.useEffect)(()=>{(async()=>{let{data:{session:e}}=await i.O.auth.getSession();e?o(e.user):console.log("not signed in")})()},[]);let m=async()=>{let{error:e}=await i.O.auth.signOut();window.location.reload(),e||o(null)};return(0,a.jsxs)("div",{className:"flex justify-between p-2 bg-[#5C4033] items-center drop-shadow-2xl",children:[(0,a.jsxs)("div",{className:"hover:bg-[#3D2B1F] transition-colors duration-200 select-none rounded-full text-xl text-[#F5F5DC] font-bold py-2 px-4",onClick:()=>x.push("/"),children:[(0,a.jsx)("span",{className:"text-[#98FF98]",children:"Kiwi"}),"Note"]}),(0,a.jsx)("div",{children:t&&(0,a.jsx)("input",{type:"text",id:"search",className:"rounded-full p-3 w-full bg-[#F5F5DC] focus:outline-none focus:ring-2 focus:ring-[#98FF98] transition-all",placeholder:"Search",value:c,onChange:e=>{let s=e.target.value;d(s),t(s)}})}),(0,a.jsxs)("div",{className:"flex flex-row items-center gap-5",children:[s&&(0,a.jsx)("button",{className:"bg-[#98FF98] hover:bg-[#7FE87F] transition-colors duration-200 text-[#3D2B1F] font-bold px-4 py-2 rounded-full text-2xl font-extralight",onClick:()=>x.push("/createnote"),children:"+"}),(0,a.jsx)("div",{className:"relative inline-block text-left",children:s?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{children:(0,a.jsx)("button",{type:"button",onClick:()=>{h(!u)},className:"flex items-center",children:(0,a.jsx)(l.default,{src:"/pfp.jpg",alt:"Profile picture",width:40,height:40,className:"rounded-full cursor-pointer hover:opacity-80 transition-opacity"})})}),u&&(0,a.jsx)("div",{className:"absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[#F5F5DC] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",children:(0,a.jsxs)("div",{className:"py-1",role:"menu",children:[(0,a.jsx)("a",{href:"/profile",className:"block px-4 py-2 text-sm text-[#3D2B1F] hover:bg-[#E8E8D0] transition-colors duration-200",role:"menuitem",children:"Profile"}),(0,a.jsx)("a",{href:"/settings",className:"block px-4 py-2 text-sm text-[#3D2B1F] hover:bg-[#E8E8D0] transition-colors duration-200",role:"menuitem",children:"Settings"}),(0,a.jsx)("button",{onClick:m,className:"block w-full px-4 py-2 text-left text-sm text-[#3D2B1F] hover:bg-[#E8E8D0] transition-colors duration-200",role:"menuitem",children:"Sign out"})]})})]}):(0,a.jsx)("button",{onClick:()=>x.push("/login"),className:"inline-flex justify-center gap-x-1.5 rounded-md bg-[#F5F5DC] px-3 py-2 text-sm font-semibold text-[#3D2B1F] shadow-sm ring-1 ring-inset ring-[#3D2B1F] hover:bg-[#E8E8D0] transition-colors duration-200",children:"Login"})})]})]})}},7142:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>x});var a=s(7437),r=s(2265),l=s(9333),n=s(2023),i=s(4392),o=s(2421),c=s(4714),d=s(7839),u=s(8472);let h=()=>{(0,r.useEffect)(()=>{(async()=>{let{data:{session:e}}=await c.O.auth.getSession();e?y(e.user):y(null)})()},[]);let[e,t]=(0,r.useState)(!1),[s,d]=(0,r.useState)(""),[h,x]=(0,r.useState)(!1),m=(0,r.useRef)(null),p=(0,r.useRef)([]),[g,f]=(0,r.useState)(""),[b,j]=(0,r.useState)(""),[w,v]=(0,r.useState)(!1),[N,y]=(0,r.useState)(null),[S,F]=(0,r.useState)("Untitled Document"),[k,E]=(0,r.useState)(!1),[C,D]=(0,r.useState)(!1),I=async()=>{try{d(""),f(""),p.current=[];let e=await navigator.mediaDevices.getUserMedia({audio:!0});m.current=new MediaRecorder(e),m.current.ondataavailable=e=>{e.data.size>0&&p.current.push(e.data)},m.current.start(),t(!0)}catch(e){console.error("Error accessing microphone:",e),alert("Error accessing microphone. Please ensure you have granted microphone permissions.")}},O=async()=>{if(m.current&&e){x(!0);try{let e=await new Promise(e=>{let t=[];m.current.addEventListener("dataavailable",e=>{e.data.size>0&&t.push(e.data)}),m.current.addEventListener("stop",()=>{let s=new Blob(t,{type:"audio/webm"});e(s)}),m.current.stop(),m.current.stream.getTracks().forEach(e=>e.stop())}),t=URL.createObjectURL(e);d(t);let s=new FormData;s.append("file",e),s.append("language","english"),s.append("response_format","json");let a=await fetch("https://api.lemonfox.ai/v1/audio/transcriptions",{method:"POST",headers:{Authorization:"Bearer ao8Yk7j8tlbYNr14FWQr2gikZQuLjaup"},body:s}),r=await a.json();f(r.text)}catch(e){console.error("Error processing audio:",e),alert("Error processing audio: "+e.message)}finally{t(!1),x(!1)}}},Z=async()=>{D(!0);try{let e=(await u.Z.post("http://localhost:3001/createNotes",{text:g})).data;console.log(e),j(e),D(!1)}catch(e){console.error("Error processing audio:",e)}},B=()=>Date.now()+Math.floor(1e6*Math.random());if(!N)return(0,a.jsx)("div",{className:"flex justify-center items-center h-screen",children:(0,a.jsx)("h1",{children:"Please log in to access this feature."})});let J=async()=>{if(k)console.log("Note already saved!");else{var e;let{data:{session:t}}=await c.O.auth.getSession(),s=null==t?void 0:null===(e=t.user)||void 0===e?void 0:e.id,a=B(),r=new Date().toISOString(),{error:l}=await c.O.from("note").insert({id:a,created_at:r,created_by:s,content:b,title:S});l?console.log(l):alert("Successfully Saved"),E(!0),console.log("Note Saved!")}};return b?(0,a.jsx)("div",{className:"flex flex-col justify-center items-center h-screen relative",children:(0,a.jsxs)("div",{className:"w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg absolute top-5",children:[(0,a.jsx)("button",{className:"absolute top-5 right-5  bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-400",onClick:J,children:"Save"}),(0,a.jsx)("input",{className:"text-2xl font-bold mb-4",placeholder:"Title",onChange:e=>F(e.target.value)}),(0,a.jsx)("div",{className:"whitespace-pre-wrap",children:b})]})}):(0,a.jsxs)("div",{className:"relative ",children:[g&&(0,a.jsxs)("div",{className:"absolute top-5 right-5 w-96",children:[(0,a.jsxs)("button",{onClick:()=>{v(!w)},className:"flex items-center justify-between w-full px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)(n.Z,{className:"w-4 h-4 text-blue-500"}),(0,a.jsx)("span",{className:"font-medium",children:"Transcription"})]}),w?(0,a.jsx)(i.Z,{className:"w-4 h-4 text-gray-500"}):(0,a.jsx)(o.Z,{className:"w-4 h-4 text-gray-500"})]}),w&&(0,a.jsx)("div",{className:"absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg overflow-hidden",children:(0,a.jsx)("div",{className:"p-4 space-y-4",children:(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)("h3",{className:"flex items-center gap-2 text-sm font-semibold text-gray-700",children:[(0,a.jsx)(n.Z,{className:"w-4 h-4"}),"Full Transcription"]}),(0,a.jsx)("p",{className:"text-gray-600 text-sm whitespace-pre-wrap",children:g})]})})})]}),(0,a.jsxs)("div",{className:"flex flex-col justify-center items-center h-screen ",children:[(0,a.jsx)("div",{className:"flex",children:e?(0,a.jsx)("button",{onClick:O,className:"flex items-center bg-red-500 text-white p-5 rounded-full hover:bg-red-400 transition-colors",children:(0,a.jsx)(l.Z,{className:"w-10 h-10"})}):(0,a.jsx)("button",{onClick:I,className:"flex items-center bg-green-500 text-white p-5 rounded-full hover:bg-green-400 transition-colors",disabled:h,children:(0,a.jsx)(l.Z,{className:"w-10 h-10"})})}),h&&(0,a.jsx)("div",{className:"text-gray-600",children:"Processing audio..."}),s&&!h&&(0,a.jsx)("div",{className:"flex flex-col items-center gap-2",children:(0,a.jsx)("audio",{src:s,controls:!0,className:"mt-4"})}),!C&&g&&(0,a.jsx)("button",{onClick:Z,className:"flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-blue-400 transition-colors font-bold",children:"Generate Notes"}),C&&(0,a.jsx)("div",{children:"Loading..."})]})]})};function x(){return(0,a.jsxs)("main",{className:"max-h-screen",children:[(0,a.jsx)(d.w,{handleSearch:!1}),(0,a.jsx)(h,{})]})}},4714:(e,t,s)=>{"use strict";s.d(t,{O:()=>a});let a=(0,s(4593).eI)("https://rujbsnjnkwfytroypmmh.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1amJzbmpua3dmeXRyb3lwbW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5OTg0NDIsImV4cCI6MjA0NTU3NDQ0Mn0.QxlmHfEZKwGp8AGmIpshIwuRMUNcIOe7ml_J0ZSi814")}},e=>{var t=t=>e(e.s=t);e.O(0,[16,648,851,130,215,744],()=>t(6356)),_N_E=e.O()}]);