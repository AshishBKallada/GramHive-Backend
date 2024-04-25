import { Request,Response,NextFunction } from "express";
import adminModel from "../data/data-sources/mongodb/models/admin";
const jwt = require("jsonwebtoken");

const adminAuth = (req:Request,res:Response,next:NextFunction): void =>{
    const token : string | undefined = req.cookies.adminToken;
    if(!token)
        {
            return res.json({statu:false});
        }
        jwt.verify(token,'shaantha_UK',async(err: any,data: any) =>{
            if(err)
                {
                    return res.json({statu:false});
                }else{
                    try {
                        const adminId = data.adminId.toString();
                        const isAdmin = await adminModel.findOne({email:adminId})
                        if(isAdmin){
                            console.log('Admin found',isAdmin);
                            next();
                        }else{
                            return res.json({ status: false });
                        } 
                    } catch (error) {
                        console.error('Error finding admin:', error);
                        return res.json({ status: false });
                    }
                }

        })
}

export default adminAuth;