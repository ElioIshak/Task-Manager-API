import express from "express";
import config from "./config";


const app = express();
const port = config.PORT || 3000;



app.listen(port, () => {
    console.log("-----------------------------------------------------------------")
    console.log(`- Server is running on port ${port} at http://localhost:${port} -`);
    console.log("-----------------------------------------------------------------")
});