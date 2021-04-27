const User = require("../model/user.model.js");
var escapeHtml = require("escape-html");

//login
exports.login = (req, res) => {
    let header = req.get("Authkey");
    if (header == "asdfgh") {
      if (!req.body.parameter || !req.body.password ) {
        return res.send({ status:201, message: "inadequate login data" });
      }else{
        let password = escapeHtml(req.body.password);
        let parameter = escapeHtml(req.body.parameter);
  
        User.findOne({ $or: [ {email: {$eq: parameter} }, {contact: {$eq: parameter}} ] })
        .then(note => {
            if(!note) {
                
              return res.status(201).send({
                status: 201,
                  message: "No user with these data exist"
              }); 
                            
            }else{   
              
              if (password == note.password) {
                return res.status(200).send({
                  status: 200,
                    message: note.userId
                });
              } else {
                return res.status(201).send({
                  status: 201,
                    message: "Invalid Password"
                });
              }
                       
            }
            
        }).catch(err => {        
            return res.status(201).send({
                status: 201,
                message: "there was an error"
            });
        });
  
      }
    } else {
      res.send({ status: 201, message: "Your aren't authorized" });
    }
  };

//register
exports.register = (req,res) => {
    
  let header = req.get("AuthKey");
  if (header == "asdfgh") {
    if (
      !req.body.userName ||
      !req.body.contactNo ||
      !req.body.email ||
      !req.body.password ||
      !req.body.address.locality ||
      !req.body.address.city ||
      !req.body.address.state ||
      !req.body.address.pincode ||
      !req.body.address.addressLine ||
      !req.body.address.userGivenAddress
    ) {
      return res.send({ status:201, message: "inadequate Owners data" });
    } else {
      var regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+[\.](?:[a-zA-Z0-9-]+)*$/;
      var validateemail = regEx.test(req.body.email);

      var regEx3 = /^[6-9]\d{9}$/;
      var validatecontact = regEx3.test(req.body.contactNo);

      if (!validateemail || !validatecontact) {
        res.send({ status: 201, message: "invalid email or contact number" });
      } else {
        // let shopId = escapeHtml(req.body.shopId);
        let userName = escapeHtml(req.body.ownerName);
        let email = escapeHtml(req.body.email);
        let password = escapeHtml(req.body.password);
        let contactNo = escapeHtml(req.body.contactNo);
        let latitude = escapeHtml(req.body.location.latitude);
        let longitude = escapeHtml(req.body.location.longitude);
        let locality = escapeHtml(req.body.address.locality);
        let city = escapeHtml(req.body.address.city);
        let state = escapeHtml(req.body.address.state);
        let pincode = escapeHtml(req.body.address.pincode);
        let addressLine = escapeHtml(req.body.address.addressLine);
        let userGivenAddress = escapeHtml(req.body.address.userGivenAddress);

        User.find({
          $or: [{ email: email }, { contactNo: contactNo }],
        }).then((data) => {
          if (data != "") {
            if (data[0].email == email && data[0].contactNo == contactNo) {
              res.send({
                status: 201,
                message: "email id and contact number already existed!",
              });
            } else if (data[0].email == email) {
              res.send({ status: 201, message: "email id already existed!" });
            } else if (data[0].contactNo == contactNo) {
              res.send({
                status: 201,
                message: "contact number already existed!",
              });
            }
          } else {
            var d = new Date();
            var n = d.getTime();
            newuserid = "user" + n + "";
            const user = new User({
              userId: "user" + n + "",
              userName: userName,
              email: email,
              password: password,
              contactNo: contactNo,
              location: {
                latitude: latitude,
                longitude: longitude,
              },
              address: {
                locality: locality,
                city: city,
                state: state,
                pincode: pincode,
                addressLine: addressLine,
                userGivenAddress: userGivenAddress,
              }
            });


            user
              .save()
              .then((data) => {
                res.send({
                  status: 201,
                  message: newuserid,
                });
              })
              .catch((err) => {
                res.send({
                  status:201,
                  message: err.message || "Some error occured",
                });
              });
          }
        }); //insert before here
      } //till here
    }
  } else {
    res.send({ status: 201, message: "Your aren't authorized" });
  }

};




exports.order = (req,res) => {
  var d = new Date();
  var n = d.getTime();
  res.send({
    status: 200,
    msg: n
  });
};
