const home = async (req, res) =>{
    try {
        res.status(200).send("Welcome to cputek")
    } catch (error) {
        console.log("error");
    }
}


module.exports = { home }