import ChatSession from "./models/chatsessions";
import FaqQuestion from "./models/faqquestions";
import Message from "./models/message";
import RaisedIssue from "./models/raisedissues";
import Reviews from "./models/reviews";
import User from "./models/user"


async function dbinit() {
    const isDev = false

    await User.sync({ alter: isDev });
    await Message.sync({ alter: isDev });
    await ChatSession.sync({ alter: isDev });
    await FaqQuestion.sync({ alter: isDev });
    await RaisedIssue.sync({ alter: isDev });
    await Reviews.sync({ alter: isDev });

}

const dbInit = () => {
    dbinit();
}

export default dbInit;