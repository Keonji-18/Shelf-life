import {app} from "./app";
import {env, logger} from "./config";
import {sendEmailTask} from "./utils/dailyMail.util";


sendEmailTask.start()
app.listen(env.PORT, () => {

    logger.info(`Server Running at http://localhost:${env.PORT}`);
})