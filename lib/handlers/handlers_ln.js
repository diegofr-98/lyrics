const path = require('path')

exports.buscadorEventos = (req,res)=>{
    res.sendFile('index.html')
}
exports.atiende404 = (req,res)=>{
    let url = `${req.protocol}://${req.hostname}:${req.app.get("port")}${req.path}`
    res.status(404)
    res.render('404',{url:url})
}
exports.atiende500 = (err, req, res, next)=>{
    res.status(404)
    res.render('500',{error:err})
}