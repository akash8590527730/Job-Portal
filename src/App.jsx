import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import Landing from "./pages/Landing"
import Onboarding from "./pages/Onboarding"
import JobListing from "./pages/JobListing"
import Job from "./pages/Job"
import PostJob from "./pages/PostJob"
import SavedJob from'./pages/SavedJob'
import MyJobs from "./pages/MyJobs"
import { ThemeProvider } from "./components/theme-provider"
import ProjectedRoute from "./components/ProjectedRoute"





const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children :[
    { 
       path:'/',
      element:<Landing/>
    },
     { 
       path:'/onboarding',
      element:(<ProjectedRoute>
        <Onboarding/>
        </ProjectedRoute>)
    },
     { 
       path:'/jobs',
      element:(
      <ProjectedRoute>
        <JobListing/>
        </ProjectedRoute>
        )
    },
     { 
       path:'/job/:id',
      element:(
      <ProjectedRoute>
        <Job/>
        </ProjectedRoute>
        )
    },
     { 
       path:'/post-job',
      element:(<ProjectedRoute><PostJob/></ProjectedRoute>)
    },
     { 
       path:'/saved-job',
      element:(<ProjectedRoute><SavedJob/></ProjectedRoute>)
    },
     { 
       path:'/my-jobs',
      element:(<ProjectedRoute><MyJobs/></ProjectedRoute>)
    },

    ]
  }
])

function App() {
  return (
     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
 <RouterProvider router={router}/>
    </ThemeProvider>

  )
}

export default App
