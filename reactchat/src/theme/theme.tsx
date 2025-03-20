
import { createTheme, responsiveFontSizes} from "@mui/material";


declare module "@mui/material/styles"{
    interface Theme {
        PrimaryAppBar:{
            height: number;
        };
        PrimaryDraw: {
            width: number;
            closed:number;
        };
        SecondaryDraw: {
            width: number;
        };
    }
    interface ThemeOptions {
        PrimaryAppBar: {
             height: number;
        };
        PrimaryDraw: {
            width: number;
            closed:number;
        };
        SecondaryDraw: {
            width: number;
        };
    }
}

export const CreateMuiTheme = (mode: "light" | "dark") => {
    const fontFamilies = ["IBM Plex Sans", "sans-serif"]
    let theme = createTheme({
        typography: {
            fontFamily: fontFamilies.join(", "),
            body1: {
                fontWeight: 500,
                letterSpacing: "-0.5px",
              },
            body2: {
                fontWeight: 500,
                fontSize: "15px",
                letterSpacing: "-0.5px",
              },
            
        },
      
        
        PrimaryAppBar: {
            height: 50,
        },
        PrimaryDraw:{
            width:240,
            closed:165,
        },
        SecondaryDraw: {
            width: 240,
         },
         palette: {
            mode,
          },
        components: {
            MuiAppBar: {
                defaultProps:{
                    color: "default",
                    elevation: 0,

                },
            },
        },
    });
    theme = responsiveFontSizes(theme);
    return theme;
};
export default CreateMuiTheme;

