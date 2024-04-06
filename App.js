import React, { useEffect, useState } from "react";
import AppNavigation from "./navigation/AppNavigation";
// import { User, onAuthStateChanged } from "firebase/auth";
// import { Firebase_auth } from " ./firebase";
import RootNavigation from "./navigation/RootNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";


const App = () => {
//   const [user, setUser] = (useState < User) | null>(null)
  
  
//   useEffect(()=>{ onAuthStateChanged(Firebase_auth,(user)=>{
//   console.log("Userdude",user); 
//   setUser(user)
//   });
// },[]);

  return (
    <AppNavigation />
  //   <SafeAreaProvider>
  //   <RootNavigation />
  // </SafeAreaProvider>

    // <TabNavigation/>
  );
};

export default App;