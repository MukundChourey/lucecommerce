const VendorShop = require("../model/vendor.model.js");
const Items = require("../model/items.model.js");
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

      VendorShop.findOne({ $or: [ {email: {$eq: parameter} }, {contact: {$eq: parameter}} ] })
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
                  message: note.shopId
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

//shop register
exports.register = (req, res) => {
  let header = req.get("AuthKey");
  if (header == "asdfgh") {
    if (
      !req.body.ownerName ||
      !req.body.contactNo ||
      !req.body.shopImage ||
      !req.body.email ||
      !req.body.password ||
      !req.body.shopName ||
      !req.body.shopType
    ) {
      return res.send({ status:201, message: "inadequate Owners data" });
    } else if (
      !req.body.shopTimings.sunday ||
      !req.body.shopTimings.monday ||
      !req.body.shopTimings.tuesday ||
      !req.body.shopTimings.wednesday ||
      !req.body.shopTimings.thursday ||
      !req.body.shopTimings.friday ||
      !req.body.shopTimings.saturday
    ) {
      res.send({ status: 201, message: "please check the timings" });
    } else {
      var regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+[\.](?:[a-zA-Z0-9-]+)*$/;
      var validateemail = regEx.test(req.body.email);

      var regEx3 = /^[6-9]\d{9}$/;
      var validatecontact = regEx3.test(req.body.contactNo);

      if (!validateemail || !validatecontact) {
        res.send({ status: 201, message: "invalid email or contact number" });
      } else {
        // let shopId = escapeHtml(req.body.shopId);
        let ownerName = escapeHtml(req.body.ownerName);
        let shopName = escapeHtml(req.body.shopName);
        let email = escapeHtml(req.body.email);
        let password = escapeHtml(req.body.password);
        let contactNo = escapeHtml(req.body.contactNo);
        let shopType = escapeHtml(req.body.shopType);
        let shopImage = escapeHtml(req.body.shopImage);
        let latitude = escapeHtml(req.body.location.latitude);
        let longitude = escapeHtml(req.body.location.longitude);
        let locality = escapeHtml(req.body.shopAddress.locality);
        let city = escapeHtml(req.body.shopAddress.city);
        let state = escapeHtml(req.body.shopAddress.state);
        let pincode = escapeHtml(req.body.shopAddress.pincode);
        let addressLine = escapeHtml(req.body.shopAddress.addressLine);
        let userGivenAddress = escapeHtml(
          req.body.shopAddress.userGivenAddress
        );
        let timings = req.body.shopTimings;

        VendorShop.find({
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
            newshopid = "shop" + n + "";
            const vendorShops = new VendorShop({
              shopId: "shop" + n + "",
              ownerName: ownerName,
              shopName: shopName,
              email: email,
              password: password,
              contactNo: contactNo,
              shopType: shopType,
              shopImage: shopImage,
              location: {
                latitude: latitude,
                longitude: longitude,
              },
              shopAddress: {
                locality: locality,
                city: city,
                state: state,
                pincode: pincode,
                addressLine: addressLine,
                userGivenAddress: userGivenAddress,
              },
              shopTimings: {
                monday: {
                  status: timings.monday.status,
                  shopOpeningTime: timings.monday.shopOpeningTime,
                  shopClosingTime: timings.monday.shopClosingTime,
                },
                tuesday: {
                  status: timings.tuesday.status,
                  shopOpeningTime: timings.tuesday.shopOpeningTime,
                  shopClosingTime: timings.tuesday.shopClosingTime,
                },
                wednesday: {
                  status: timings.wednesday.status,
                  shopOpeningTime: timings.wednesday.shopOpeningTime,
                  shopClosingTime: timings.wednesday.shopClosingTime,
                },
                thursday: {
                  status: timings.thursday.status,
                  shopOpeningTime: timings.thursday.shopOpeningTime,
                  shopClosingTime: timings.thursday.shopClosingTime,
                },
                friday: {
                  status: timings.friday.status,
                  shopOpeningTime: timings.friday.shopOpeningTime,
                  shopClosingTime: timings.friday.shopClosingTime,
                },
                saturday: {
                  status: timings.saturday.status,
                  shopOpeningTime: timings.saturday.shopOpeningTime,
                  shopClosingTime: timings.saturday.shopClosingTime,
                },
                sunday: {
                  status: timings.sunday.status,
                  shopOpeningTime: timings.sunday.shopOpeningTime,
                  shopClosingTime: timings.sunday.shopClosingTime,
                },
              },
            });

            //   res.send(vendorShops);

            vendorShops
              .save()
              .then((data) => {
                res.send({
                  status: 201,
                  message: newshopid,
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

//item detail
exports.additem = (req, res) => {
  let header = req.get("Authkey");
  if (header == "asdfgh") {
    if (
      !req.body.shopId ||
      !req.body.itemName ||
      !req.body.itemInStock ||
      !req.body.price ||
      !req.body.itemImage ||
      !req.body.itemType ||
      !req.body.itemUnit ||
      !req.body.sellingQuantity
    ) {
      return res.send({status:201, message: "inadequate item details" });
    } else {
      let shopId = escapeHtml(req.body.shopId);
      let itemName = escapeHtml(req.body.itemName);
      let itemInStock = escapeHtml(req.body.itemInStock);
      let itemImage = escapeHtml(req.body.itemImage);
      let itemType = escapeHtml(req.body.itemType);
      let itemUnit = escapeHtml(req.body.itemUnit);
      let sellingQuantity = escapeHtml(req.body.sellingQuantity);
      let sellingPrice = escapeHtml(req.body.price.sellingPrice);
      let MRP = escapeHtml(req.body.price.MRP);
      let itemDescription = escapeHtml(req.body.itemDescription);

      const item = new Items({
        shopId: shopId,
        itemId: itemName + shopId,
        itemName: itemName,
        itemInStock: itemInStock,
        price: {
          sellingPrice: sellingPrice,
          MRP: MRP,
        },
        itemImage: itemImage,
        itemType: itemType,
        itemUnit: itemUnit,
        sellingQuantity: sellingQuantity,
        itemDescription: itemDescription,
      });

      item
        .save()
        .then((data) => {
          res.send({
            status: 201,
            message: "success",
          });
        })
        .catch((err) => {
          res.send({
            status: 201,
            message: err.message || "Some error occured",
          });
        });
    }
  } else {
    res.send({ status: 201, message: "Your aren't authorized" });
  }
};

exports.itemdetail = (req, res) => {
  let header = req.get("Authkey");
  if (header == "asdfgh") {

    let shopId = escapeHtml(req.body.shopId);
    var query = { shopId: shopId };
    Items.find(query).then((data) => {
      if (data == "") {
        res.send({
          status: 201,
          message: "No shop found with this Id",
        });
      }else{
        res.send(data);
      }

    });

  }
};
