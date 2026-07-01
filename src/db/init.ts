import ApplicationAnalyticsLog from "./models/badrukaCollege/leads/applicationAnalyticLogs";
import Applications from "./models/badrukaCollege/leads/applications";
import EducationQualifications from "./models/badrukaCollege/leads/education";
import EntranceExams from "./models/badrukaCollege/leads/entranceExams";
import Payments from "./models/badrukaCollege/leads/payments";
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

    // Badruka College
    await Applications.sync({ alter: isDev });
    await EducationQualifications.sync({ alter: isDev });
    await EntranceExams.sync({ alter: isDev });
    await Payments.sync({ alter: isDev });
    await ApplicationAnalyticsLog.sync({ alter: isDev });
    // Badruka College


}

const dbInit = () => {
    dbinit();
}

export default dbInit;