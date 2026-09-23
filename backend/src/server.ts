import {app} from "./app";
import {env, logger} from "./config";


app.listen(env.PORT, () => {

    logger.info(`Server Running at http://localhost:${env.PORT}`);
})