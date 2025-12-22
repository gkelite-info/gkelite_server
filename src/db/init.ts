import sequelizeConnection from "./config";
import User from "./models/user";
import FaqQuestion from "./models/faqquestions";
import ChatSession from "./models/chatsessions";
import RaisedIssue from "./models/raisedissues";
import Message from "./models/message";

async function init() {
    try {
        // 1️⃣ Check database connection
        await sequelizeConnection.authenticate();
        console.log("✅ Database connected successfully!");

        // 2️⃣ Sync models (your existing logic)
        const isDev = false;
        await User.sync({ alter: isDev });
        await FaqQuestion.sync({ alter: isDev });
        await ChatSession.sync({ alter: isDev});
        await RaisedIssue.sync({ alter: isDev});
        await Message.sync({ alter: isDev});

        console.log("✅ Models synced!");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
    }
}

const dbInit = () => {
    init();
};

export default dbInit;
