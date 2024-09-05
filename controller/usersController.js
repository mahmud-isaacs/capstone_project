import { getUsersDb,getUserDb,addUserDb,deleteUserDb,updateUserDb, loginUserDb} from "../model/usersDB.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const fetchUsers = async(req,res)=>{
    res.json(await getUsersDb())
}

const fetchUser = async(req,res)=>{
    res.json(await getUserDb(req.params.id))
}

const addUser = async (req, res) => {
    console.log("Received registration request with data:", req.body);
    
    let { firstName, lastName, userName, userAge, gender, userRole, userAdd, userPass, userProfile } = req.body;

    try {
        const hashedPassword = await hash(userPass, 10); // Hash password
        console.log("Password hashed successfully.");

        await addUserDb(firstName, lastName, userName, userAge, gender, userRole, userAdd, hashedPassword, userProfile);
        console.log("User inserted into database.");

        const user = await loginUserDb(userName);
        console.log("User retrieved from database:", user);

        const token = jwt.sign({ id: user.userID, userName: user.userName }, process.env.SECRET_KEY, {
            expiresIn: "7d",
        });
        console.log("Token generated successfully.");

        res.status(201).json({
            msg: "Registration successful",
            token,
            user: {
                id: user.userID,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                userRole: user.userRole,
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ msg: "Registration failed", error: error.message });
    }
};


const deleteUser = async(req,res)=>{
    await deleteUserDb(req.params.id)
    res.status(200).send('User was deleted successfully')
};

const updateUser = async (req, res) => {
    try {
        let { firstName, lastName, userName, userAge, gender, userRole, userAdd, userPass, userProfile } = req.body;
        let users = await getUserDb(req.params.id);

        firstName?firstName=firstName:firstName = users.firstName
        lastName?lastName=lastName:lastName = users.lastName
        userName?userName=userName:userName = users.userName
        userAge?userAge=userAge:userAge = users.userAge
        gender?gender=gender:gender = users.gender
        userRole?userRole=userRole:userRole = users.userRole
        userAdd?userAdd=userAdd:userAdd = users.userAdd
        userPass?userPass=userPass:userPass = users.userPass
        userProfile?userProfile=userProfile:userProfile = users.userProfile

        if (userPass) {
            hash(userPass, 10, async (err, hashedP) => {
                if (err) {
                    return res.status(500).send('Error with password');
                }
                userPass = hashedP;
                await updateUserDb(firstName, lastName, userName, userAge, gender, userRole, userAdd, userPass, userProfile, req.params.id);
                return res.status(200).send('User was updated successfully');
            });
        } else {
            userPass = users.userPass;
            await updateUserDb(firstName, lastName, userName, userAge, gender, userRole, userAdd, userPass, userProfile, req.params.id);
            res.status(200).send('User was updated successfully');
        }
    } catch (error) {
        res.status(500).send('An error occurred while updating the user');
    }
};   


const loginUser = async (req, res) => {
    const { userName, userPass } = req.body;

    try {
        const user = await loginUserDb(userName);
        if (!user) {
            return res.status(401).json({ msg: "User not found" });
        }

        const isPasswordMatch = await compare(userPass, user.userPass);
        if (!isPasswordMatch) {
            return res.status(401).json({ msg: "Invalid password" });
        }

        // Generate token
        const token = jwt.sign({ id: user.userID, userName: user.userName }, process.env.SECRET_KEY, {
            expiresIn: "7d",
        });

        res.status(200).json({
            msg: "Login successful",
            token,
            user: {
                id: user.userID,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                userRole: user.userRole,
            }
        });
    } catch (error) {
        res.status(500).json({ msg: "Login failed", error: error.message });
    }
};

export{fetchUsers,fetchUser,addUser,deleteUser,updateUser,loginUser}