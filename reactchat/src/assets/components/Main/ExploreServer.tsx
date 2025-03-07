import { 
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Typography,
    Container,
 } 
from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import useCrud from "../../../hooks/useCrud";
import { ReactNode, useEffect } from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { MEDIA_URL } from "../../../config";
import { data, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Block } from "@mui/icons-material";

interface Server{
    id: number;
    name: string;
    description: string;
    icon: string;
    category: string;
    banner: string;
 
}

const ExploreSevers =()=>{
    const {categoryName} = useParams();
    const url = categoryName ? `/server/select/?category=${categoryName}` : "/server/select";
    const {dataCRUD, fetchData} = useCrud<Server>([],url);
    
    useEffect(()=>{
        fetchData();
     },[categoryName]);

    return ( <>
    <Container maxWidth="lg">
        <Box sx={{pt:4}}>
            <Typography 
            variant="h3" 
            noWrap 
            component="h1" 
            sx={{
                display :{
                    sm:"block", 
                    fontWeight:700, 
                    letterSpacing:"-2px",
                    textTransform:"capitalize",
                    },
                    textAlign: {xs: "center", sm:"left"}
                    }}
                    >
                        {categoryName ? categoryName : "Popular Channels"}   
            </Typography>

        </Box>
        <Box>
            <Typography 
            variant="h6" 
            noWrap 
            color="textSecondary"
            component="h2" 
            sx={{
                display :{
                    sm:"block", 
                    fontWeight:700, 
                    letterSpacing:"-1px",
                    },
                    textAlign: {xs: "center", sm:"left"}
                    }}
                    >
                        {categoryName ? `Channels talking about ${categoryName} `
                        : "Check out our popular Channels"}   
            </Typography>
        </Box>
        <Typography variant="h6" sx={{pt: 1, fontWeight:700, letterSpacing:"-1px"}}>Recommedned Channels </Typography>
        <Grid container spacing={{ xs:0, sm:2}}>
            {dataCRUD.map((item)=>(
                <Grid item key={item.id} xs={12} sm={6} md={6} lg={3}>
                    <Card sx={{
                        height: "100%", 
                        display:"flex", 
                        flexDirection:"column",
                        boxShadow:"none",
                        backgroundImage: "none",
                        borderRadius:0,
                    }}
                    >
                    <Link to={`/server/${item.id}`} style={{textDecoration:"none", color:"inherit"}}>

                    <CardMedia 
                    component="img" 
                    image={item.banner ? `${MEDIA_URL}${item.banner}` : "https://unsplash.com/s/photos/random"} 
                    alt="randmom" 
                    sx={{display : {xs:"none",sm:"block"}}}
                    />
                    <CardContent
                    sx={{flexGrow:1, p:0, "&:last-child": {paddingBottom:0},}}>
                        <List>
                        <ListItem disablePadding>
                            <ListItemIcon sx={{minWidth:0}}>
                            <ListItemAvatar sx={{minWidth:"50px"}}>
                                <Avatar alt="Server Icon" src={`${MEDIA_URL}${item.icon}`}>

                                </Avatar>
                            </ListItemAvatar>
                            </ListItemIcon>

                            <ListItemText 
                            primary={
                            <Typography 
                            variant="body2"
                            textAlign="start"
                             sx={{
                                textOverflow:"ellipsis",
                                overflow:"hidden",
                                whiteSpace:"nowrap",
                                fontWeight: 700,
                                }}
                                >
                                 {item.name} 
                                </Typography>
                            }
                            secondary={
                            <Typography 
                            variant="body2" 
                                >
                                    {item.category} 
                                </Typography>}
                            />  
                           
                        </ListItem>
                        </List>
                    </CardContent>
                    </Link>
                    </Card>
                </Grid>
            )
            
            )}


        </Grid>

    </Container>
    
    </>
    );

};
export default ExploreSevers;