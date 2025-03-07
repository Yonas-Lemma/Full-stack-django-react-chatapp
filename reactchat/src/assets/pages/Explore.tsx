import { Box, CssBaseline} from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDraw from "./templates/PrimaryDraw";
import SecondaryDraw from "./templates/SecondaryDraw";
import Main from "./templates/Main";
import PopularChannels from "../components/primaryDraw/PopularChannels";
import ExploreCategories from "../components/SecondaryDraw/ExploreCategories";
import ExploreSevers from "../components/Main/ExploreServer";




const Home = () => {

    return (<Box sx={{display: "flex"}}>
        <CssBaseline/>
        <PrimaryAppBar/>
        <PrimaryDraw>
            <PopularChannels open={false}/>
        </PrimaryDraw>
        <SecondaryDraw>
            <ExploreCategories />
        </SecondaryDraw>
        <Main>
            <ExploreSevers/>
        </Main>
        </Box>
    );
};

export default Home;
