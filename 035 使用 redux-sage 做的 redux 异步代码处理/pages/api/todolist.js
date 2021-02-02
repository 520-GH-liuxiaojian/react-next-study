export default (req, res) => {
    res.statusCode = 200
    res.json({
        code: 200,
        message: 'data success',
        data: ['hello', 'liu', 'xiao', 'jian']
    })
}
