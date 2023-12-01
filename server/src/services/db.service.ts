import mongoose from "mongoose";

class DBService {
 
    async connect() {
        await mongoose.connect(process.env.MONGO_URL);
    }

}

export default new DBService();