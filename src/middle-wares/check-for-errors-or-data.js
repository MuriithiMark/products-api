import { validationResult, matchedData} from "express-validator";

const checkForErrorsORData = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ status: 'fail', errors }).end()
    }
    req.data = matchedData(req)
    next()
}


export default checkForErrorsORData;