import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";


const Userauth =(reqrole)=>{
    return async (req, res, next) => {

    const header = req.headers['authorization'];

    if (!header || !header.startsWith('Bearer ')) {
        res.json({ message: "Authorization token missing or malformed" });
        
    } else {
        const token = header.split(' ')[1];

        try {
            const veryfied = jwt.verify(token, process.env.JWT_SECRET);
            req.user = veryfied;
            if (veryfied.role!==reqrole) {
                return res.json({ message: "Access denied: insufficient permissions its for admin " });
            }
            next();
        } catch (err) {
            res.json({ message: "Invalid or expired token" });
        }

        
    }

}
}
export default Userauth;