//All the Business logic Goes Here.....
const userModel = require('../model/Users.model')

class userService {

    static async users(){
        let response = {}
        console.log('response')
        connection.query("SELECT * FROM users", function (err, result, fields) {
            if (err) throw err;
            console.log('result:  ');
            console.log(result);
        });
        console.log(response);
        return JSON.stringify(response);
    }

    static async paginatedResult(page, limit) {

        let paginatedResults = {}
        const startIndex = (page - 1) * limit;
        const endIndex = (page * limit);
        let total = await userModel.countDocuments().exec()
        paginatedResults.total_Data = total
        paginatedResults.total_pages = Math.ceil((total / limit))
        //previous page 
        if (startIndex > 0) {
            let shown = startIndex
            if (startIndex > total)
                shown = total;
            paginatedResults.previous = {
                page: page - 1,
                limit: limit,
                shown: shown
            }
        }
        //next Page
        if (endIndex < await userModel.countDocuments().exec()) {
            paginatedResults.next = {
                page: page + 1,
                limit: limit,
                remaining: total - endIndex
            }
        }

        // paginatedResults.data = model.slice(startIndex, endIndex) --> for array data
        // res.paginatedResult = paginatedResults;
        try {
            paginatedResults.results = await userModel.find()
                .limit(limit)
                .skip(startIndex)
            // paginatedResults = paginatedResults;

        } catch (error) {
            console.log(error.message);
        }
        return paginatedResults;

    }

    static async createUser(body) {
        try {
            const newUser = new userModel(body)

            newUser.save()
            // console.log(newUser)
            return newUser;

        } catch (error) {
            console.log(error.message)
        }
    }

    static async getAllUsers(page, limit) {
        let response = {}
        let total = await userModel.countDocuments().exec();
        try {
            if (page && limit)
                response.data = await this.paginatedResult(page, limit)
            else {
                response.total_Data = total;
                response.data = await userModel.find()
            }
            return response

        } catch (error) {
            console.log(error.message);
        }
    }

    static async getUserById(id) {

        try {
            let response = {}
            const user = await userModel.findById(id);

            if (user) {
                let { fName, lName, email, phone, age } = user;
                response.status = 200;
                response.data = { fName, lName, email, phone, age };
                response.message = "user found";
            } else {
                response.status = 400;
                response.data = {};
                response.message = "user not found!!"
            }

            return response;

        } catch (error) {
            console.log(error.message);
        }
    }

    static async updateUser(id, body) {

        try {
            let response = {}
            let found = await userModel.findById(id);
            //userModel.findByIdAndUpdate(id,body ,{returnOrginal:false});

            if (found) {
                const updUser = body;
                let user = found;

                user.fName = updUser.fName ? updUser.fName : user.fName;
                user.lName = updUser.lName ? updUser.lName : user.lName;
                user.email = updUser.email ? updUser.email : user.email;
                user.phone = updUser.phone ? updUser.phone : user.phone;
                user.age = updUser.age ? updUser.age : user.age;
                user.save();

                let { fName, lName, email,phone, age } = user;

                response.status = 200;
                response.updated_user = { fName, lName, email, phone, age };
                response.message = `${user.fName} updated succesfully.`

            } else {
                response.status = 400;
                response.data = {};
                response.message = `no user with ${id} found!!.`
            }
            return response;

        } catch (error) {
            console.log(error.message);
        }

    }

    static async deleteUser(id) {
        try {
            let response = {}
            const user = await userModel.findById(id);
            if (user) {
                user.delete();
                response.status = 200;
                response.data = {};
                response.message = `${user.fName} is deleted from the database.`;
            } else {
                response.status = 400;
                response.data = {}
                response.message = "User Not Found!!."
            }
            return response;
        } catch (error) {
            console.log(error.message)
        }
    }

    static async searchInAll(key) {

        try {

            var regex = new RegExp(key, 'i') //i makes it non case sensitive.
            let result = {}

            result = await userModel.find(
                {
                    $or: [
                        { "fName": regex }, // { "fName": {$regex : key }}
                        { "lName": regex },
                        { "email": regex },
                    ]
                }
            )
            return result

        } catch (error) {
            console.log(error.message)
        }

    }

    static async searchWithQuery(query) {

        try {
            let response = {};
            let { fName, lName, email, phone, age } = query;
            // console.log(query) 
            var regex = new RegExp(fName, 'i')
            var regex2 = new RegExp(lName, 'i')
            var regex3 = new RegExp(email, 'i')

            // console.log(query.fName);
            // console.log(regex)

            const found = await userModel.find({
                $or: [

                    {
                        $or: [
                            { fName: regex },
                        ]
                    },
                    {
                        $or: [
                            { lName: regex2 }
                        ]
                    },
                    {
                        $or: [
                            { email: regex3 }
                        ]
                    }

                ]

            })
            // console.log(found)
            if (found === null) {
                response.status = 500;
                response.query = {};
                response.message = "Result not Found!!."

            }
            else {
                response.status = 200;
                response.query = found
                response.message = "Result Found."
            }
            return response;

        } catch (error) {
            console.log(error.message);
        }
    }

}

module.exports = userService;
