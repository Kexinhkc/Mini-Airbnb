import { useContext, useState } from "react"
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";

export default function AccountPage(){
    const {user,ready, setUser} = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);
    //console.log('Account page')


    let {subpage} = useParams();

    if (subpage === undefined){
        subpage = 'profile';
    }

   function linkClasses(type=null){ //'type' is a name I chose for the parameter
        
        //console.log('inside linkClass '+ type);
        let classes = 'inline-flex gap-1 py-2 px-6 rounded-full items-center';
        if(type === subpage){

            classes += ' bg-primary text-white rounded-full';

        }else {
            classes += ' bg-gray-100'
        }

        return classes;
   }

   async function logout(){
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
   }
  
    //The ready state is set to wait for the cookie verification conducted in the UserContext component
    if(!ready){
        //console.log('Not ready');
        return 'Loading...';
    }

    //If no user is logged in but navigated to the account page, go to login page
    //If does't have the "ready" state, the login page will always load because this "if" check is executed before the GET request in the UserContext.jsx
    if (ready && !user && !redirect){ 
        //console.log('Not logged in')
        return(
            <Navigate to={'/login'} />
        );

    }

    if (redirect){
        return <Navigate to={redirect}/>;
    }

   

    return (
        <div>
            
            {/* in tut there is 'w-full' that I didn't add below */}
            <nav className="flex justify-center mt-8 gap-2 w-full mb-8"> 
                {/*Passing functions to the 'className' attribute allows you to set the CSS class name based on the returned value of the function. The function is called when the 'Link' tag is rendered, so the code below will call linkClasses 3 times  */}
                <Link className={linkClasses('profile')} to={'/account'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-5  ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>

                    My Profile
                </Link>

                <Link className={linkClasses('bookings')} to={'/account/bookings'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>

                    My bookings
                </Link>
                
                <Link className={linkClasses('places')} to={'/account/places'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>

                    My accommodation
                </Link>
                
            </nav>

            {subpage === 'profile' && (
                <div className="text-center mx-auto max-w-lg">
                    Logged in as {user.name} ({user.email})
                    <button onClick={logout} className="primary mt-2 max-w-sm">
                        Logout
                    </button>

                </div>
            )} 

            {subpage === 'places' && (
                <div>
                    <PlacesPage />
                </div>
            )}
        </div>
    );
}