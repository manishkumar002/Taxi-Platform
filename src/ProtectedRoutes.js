import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ Components }) => {

   const Navigation = useNavigate();
   let login = JSON.parse(localStorage.getItem("AccessLogin")) || {};
   useEffect(() => {
      if (Object.entries(login).length <= 0) {
         console.log(`hey i'm Ruunig `)
         return Navigation('/')
      }
   })
   return (
      <>
         <Components />
      </>
   )

}

export default ProtectedRoutes;