/**
 * 
 * @deprecated move to retrieve params directly, no need for middle-ware
 * Maintains compatibility with exisiting code
 */
const retrieveProductId = (req, res, next) => {
    if(!req.params.productId) {
        return res
            .status(400)
            .send({ status: 'fail', message: 'product id is invalid' })
            .end()
    }
    req.productId = req.params.productId;
    next()
}

export default retrieveProductId;