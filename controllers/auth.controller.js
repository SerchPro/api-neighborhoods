const { response } = require('express');
const bcryptjs = require("bcryptjs");

const User = require("../models/User.model"); // Require the User model in order to interact with the database
const { createJWT } = require('../helpers/jwt');
const { sendEmail } = require('../helpers/send-email');
const { validateDataUser } = require('../helpers/validate-user');

const saltRounds = 10; // How many rounds should bcrypt run the salt (default [10 - 12 rounds])

const login = async(req, res= response) =>{
    try {
        const { username, password } = req.body;
        user = await User.findOne({ username, active: true })
        .populate('_address', '_id neighborhood description');
        if (!user || !bcryptjs.compareSync(password, user.password)) {
            return res.status(400).json({
              ok:false,
              msg: "Wrong credentials."
            });
        }
        const {jwtResponse:token} = await createJWT(user._id);
        const userSend = validateDataUser(user);
        // cokies
        return res.json({
          ok: true,
          user:userSend,
          token
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
        });
    }
};

const signup = async(req, res = response) =>{
    try {
        const { username, birthday, email,  password, confirmPassword } = req.body;
        if(password !== confirmPassword) return res.status(406).json({ok:false, msg:" your passwords are different "})
        const salt = bcryptjs.genSaltSync(saltRounds);
        const hashedPassword = bcryptjs.hashSync(password, salt);
        const user = await User.create({
            username,
            email,
            birthday,
            password: hashedPassword,
          });
        const {jwtResponse:token} = await createJWT(user._id);
        const userSend = validateDataUser(user);
        res.status(201).json({
          ok: true,
          user:userSend,
          token
        });;

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
        });
    }
};

const logout = (req, res = response) => {
    req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }
    res.json({ 
      ok: true,
      msg: "Done"
    });
  });
};

const recreateToken = async (req, res = response, next) => {

  const {uid}  = req;
  user = await User.findOne({ _id:uid, active: true })
  .populate('_address', '_id neighborhood description');

  const {jwtResponse:token} = await createJWT(uid);
  const userSend = validateDataUser(user);

    return res.json({
      ok: true,
      token,
      user:userSend
    });
};


const forgotPassword = async (req, res = response) => {
  try {
    const {email } = req.body;
    const user = await User.findOne({ email });

    if (!user)  return res.status(403).json({ok:false, msg:" cant find a user "})

    const data = { url: `${process.env.ANIME_URI}/auth/reset_password/${user.id}` }
    const emailSent = await sendEmail(email, data, 'd-eb14ae8bf8924318a727ec3390616d61');

    return res.json({
      ok: true,
      msg:"email sent",
      emailSent
    })

  } catch (error) {
    return res.status(500).json({
      ok:false,
      msg: error
  });
  }

};

const resetPassword = async( req, res= response) => {
  try {
    const { id } = req.params;
    const { newPassword, confirmnewPassword } = req.body;

    if(newPassword !== confirmnewPassword) return res.status(406).json({ok:false, msg:" your passwords are different "})

    const user = await User.findOne({ _id:id, active: true });

    const salt = bcryptjs.genSaltSync(saltRounds);
    const newPasswordHash = bcryptjs.hashSync(newPassword, salt);
    const newUSer = await User.findByIdAndUpdate(id, {password : newPasswordHash}, {new:true})

    return res.json({
      ok:true,
      msg: 'Password saved successfully'
    })

  } catch (error) {
      return res.status(500).json({
        ok:false,
        msg: error
    });
  }
}


const changeOfPassword = async (req, res = response) => {
  try{
    const {uid}  = req;
    if(!uid){
      return res.status(500).json({
        ok:false,
        msg: "Sometihing went wrong"
      });
    }

    const { currentPassword, newPassword, confirmnewPassword } = req.body;

    if(newPassword !== confirmnewPassword) return res.status(406).json({ok:false, msg:" your passwords are different "});

    user = await User.findOne({ _id:uid, active: true });

    if (!user || !bcryptjs.compareSync(currentPassword, user.password)) {
        return res.status(400).json({
          ok:false,
          msg: "Wrong credentials."
        });
    }

    const salt = bcryptjs.genSaltSync(saltRounds);
    const newPasswordHash = bcryptjs.hashSync(newPassword, salt);
    await User.findByIdAndUpdate(uid, {password : newPasswordHash}, {new:true})

    return res.json({
      ok:true,
      msg: 'Password saved successfully'
    })


  } catch (error) {
    console.log(error)
      return res.status(500).json({
        ok:false,
        msg: 'Sometihing went wrong'
    });
  }

}



module.exports = {
    login,
    signup,
    logout,
    recreateToken,
    forgotPassword,
    resetPassword,
    changeOfPassword
};