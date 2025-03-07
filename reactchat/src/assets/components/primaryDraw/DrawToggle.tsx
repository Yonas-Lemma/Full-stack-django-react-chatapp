import { Box, IconButton } from "@mui/material";
import React from "react";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";

type  props={
open: boolean;
handleDrawerClose:()=>void
handleDrawerOpen:()=>void
}

const DrawerToggle : React.FC<props> =({open, handleDrawerClose,handleDrawerOpen}) =>{
    return(
        <Box sx={{height: "50px", 
        display: "flex", 
        alignItem: "center", 
        justifyContent: "ceneter",
        }}
        >
            <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
                {open ? <ChevronLeft/>: <ChevronRight/>}
            </IconButton>

        </Box>
    )
};

export default DrawerToggle;