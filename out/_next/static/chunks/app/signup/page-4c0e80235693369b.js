(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[966],{213:(e,s,t)=>{Promise.resolve().then(t.bind(t,1922))},1922:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>n});var a=t(7437),l=t(2265),i=t(4714),r=t(6463);function n(){let[e,s]=(0,l.useState)(""),[t,n]=(0,l.useState)(""),o=(0,r.useRouter)(),[c,m]=(0,l.useState)(!1),d=async s=>{s.preventDefault();let{data:a,error:l}=await i.O.auth.signUp({email:e,password:t,options:{emailRedirectTo:"ethanda1.xyz"}});if(console.log(a),l)console.error(l);else{let{data:s,error:a}=await i.O.auth.signInWithPassword({email:e,password:t});console.log(s,a),m(!0)}};return(0,a.jsxs)("main",{className:"min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8",children:[(0,a.jsxs)("div",{className:"sm:mx-auto sm:w-full sm:max-w-md",children:[(0,a.jsxs)("h2",{className:"mt-6 text-center text-3xl font-bold tracking-tight text-gray-900",children:[(0,a.jsx)("span",{className:"text-green-400",children:"Kiwi"}),"Note"]}),(0,a.jsx)("h3",{className:"mt-6 text-center text-2xl font-bold tracking-tight text-gray-900",children:"Create your account"})]}),(0,a.jsx)("div",{className:"mt-8 sm:mx-auto sm:w-full sm:max-w-md",children:(0,a.jsxs)("div",{className:"bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10",children:[(0,a.jsxs)("form",{className:"space-y-6",onSubmit:d,children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700",children:"Email address"}),(0,a.jsx)("div",{className:"mt-1",children:(0,a.jsx)("input",{id:"email",name:"email",type:"email",required:!0,className:"block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border",value:e,onChange:e=>s(e.target.value)})})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700",children:"Password"}),(0,a.jsx)("div",{className:"mt-1",children:(0,a.jsx)("input",{id:"password",name:"password",type:"password",required:!0,className:"block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border",value:t,onChange:e=>n(e.target.value)})})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("button",{type:"submit",className:"flex w-full justify-center rounded-md bg-green-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600",children:"Sign up"}),c&&(0,a.jsx)("p",{className:"text-xs mt-2",children:"We’ve sent a verification email to your account. Please check your inbox and follow the instructions to verify your email address."})]})]}),(0,a.jsx)("div",{className:"mt-6",children:(0,a.jsx)("div",{className:"relative",children:(0,a.jsx)("div",{className:"relative flex justify-center text-sm",children:(0,a.jsxs)("span",{className:"bg-white px-2 text-gray-500",children:["Already have an account?"," ",(0,a.jsx)("button",{onClick:()=>o.push("/login"),className:"font-semibold text-green-400 hover:text-green-500",children:"Sign in"})]})})})})]})})]})}},4714:(e,s,t)=>{"use strict";t.d(s,{O:()=>a});let a=(0,t(4593).eI)("https://rujbsnjnkwfytroypmmh.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1amJzbmpua3dmeXRyb3lwbW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5OTg0NDIsImV4cCI6MjA0NTU3NDQ0Mn0.QxlmHfEZKwGp8AGmIpshIwuRMUNcIOe7ml_J0ZSi814")}},e=>{var s=s=>e(e.s=s);e.O(0,[16,130,215,744],()=>s(213)),_N_E=e.O()}]);