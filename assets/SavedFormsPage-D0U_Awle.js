import{r as n,F as g,k as u,j as t}from"./index-BHDkhMc9.js";const h=()=>{const[r,s]=n.useState([]),a=n.useContext(g),o=u();if(n.useEffect(()=>{const e=localStorage.getItem("savedForms");if(e)try{s(JSON.parse(e))}catch{s([])}},[]),!a)return null;const{setMetadata:i,setSubmittedData:d}=a,c=e=>{i({...e.metadata,id:e.id,viewType:"VIEW"}),d(e.submittedData||null),localStorage.setItem("currentFormId",e.id),o("/view")},x=e=>{const l=r.filter(m=>m.id!==e);s(l),localStorage.setItem("savedForms",JSON.stringify(l))};return t.jsxs("div",{className:"p-6",children:[t.jsx("h2",{className:"text-4xl font-extrabold mb-8 text-center text-gray-800 tracking-wide",children:"Saved Forms"}),r.length===0&&t.jsx("p",{className:"text-center text-gray-500 text-lg",children:"No saved forms yet."}),t.jsx("div",{className:"space-y-6 mt-6",children:r.map(e=>t.jsx("div",{className:"flex justify-center",children:t.jsxs("div",{className:`\r
                relative\r
                w-[800px]\r
                min-h-[180px]\r
                p-10\r
                rounded-2xl\r
                shadow-lg\r
                bg-gradient-to-br from-gray-50 to-gray-100\r
                border border-gray-300\r
                hover:shadow-2xl\r
                hover:from-blue-50 hover:to-blue-100\r
                transition-all duration-300\r
              `,children:[t.jsx("div",{className:"absolute left-0 top-0 h-full w-3 bg-blue-600 rounded-l-2xl"}),t.jsxs("div",{className:"flex justify-between items-center mb-5",children:[t.jsx("h3",{className:"text-2xl font-bold text-gray-900 tracking-wide",children:e.title}),t.jsxs("div",{className:"flex gap-4",children:[t.jsx("button",{className:`\r
                      px-6 py-2\r
                      bg-blue-600\r
                      text-white\r
                      rounded-xl\r
                      text-base\r
                      hover:bg-blue-700\r
                      transition\r
                      font-semibold\r
                    `,onClick:()=>c(e),children:"Open"}),t.jsx("button",{className:`\r
                      px-6 py-2\r
                      bg-red-500\r
                      text-white\r
                      rounded-xl\r
                      text-base\r
                      hover:bg-red-600\r
                      transition\r
                      font-semibold\r
                    `,onClick:()=>x(e.id),children:"Delete"})]})]}),t.jsxs("p",{className:"text-lg text-gray-700 mt-2",children:[t.jsx("span",{className:"font-semibold text-gray-900",children:"Saved at:"})," ",new Date(e.createdAt).toLocaleString()]})]})},e.id))})]})};export{h as SavedFormsPage};
