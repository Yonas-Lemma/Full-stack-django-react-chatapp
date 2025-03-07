import { Box } from "@mui/material"
import {useTheme} from"@mui/material/styles";
import React from "react";


type SecondaryDrawProps = {
    children: React.ReactNode;
};


const SecondaryDraw =({children}: SecondaryDrawProps)=>{
    const theme = useTheme();


    return (
    <Box sx={{minWidth: `${theme.SecondaryDraw.width}px`,
        height: `calc(100vh - ${theme.PrimaryAppBar.height}px)`,
        mt: `${theme.PrimaryAppBar.height}px`,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: { xs: "none", sm:"block"},
        overflow: "auto",
    }}>
       {children}
    </Box>
    )
}

export default SecondaryDraw