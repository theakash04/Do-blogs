import React from "react";
import { Link } from "react-router-dom";
import postServices from "../../Appwrite/Posts";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

function PostCards({ title, description, featuredImage, $id }) {
  return (
    <Link to={`/post/${$id}`}>
      <Card sx={{ maxWidth: 700 , maxHeight: 600}}>
        <CardActionArea sx={{width: "700px"}}>
          <CardMedia 
            component="img"
            sx={{height:"140px", backgroundSize: "cover"}}
            image={postServices.getFilePreview(featuredImage)}
            alt={`${$id}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{fontSize: "25px"}}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>

    // <div className="bg-white sm:w-full h-auto rounded-lg flex flex-col items-center justify-center p-1 shadow-sm z-30">
    //   <Link to={`/post/${$id}`}>
    //     <div className="relative w-full h-56 overflow-hidden">
    //       <img src={postServices.getFilePreview(featuredImage)} alt="" className="rounded-md w-full z-40" />
    //       {/* <div className="bg-white/30 absolute right-2 top-2 rounded-md font-bold px-2 text-sm backdrop-blur-md text-white">
    //         {label}
    //       </div> */}
    //     </div>
    //   </Link>
    //   <div className="w-full font-bold text-xl px-2 pt-3">{title}</div>
    //   <div className="w-full text-gray-700 pl-2 text-md pb-3 pt-1">
    //     {description}
    //   </div>
    // </div>
  );
}

export default PostCards;
