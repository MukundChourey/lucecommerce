const User = require("../model/user.model.js");
const VendorShop = require("../model/vendor.model.js");
const Items = require("../model/items.model.js");
const Orders = require("../model/orders.model.js");

var escapeHtml = require("escape-html");
var GeoPoint = require("geopoint");

//login
exports.login = (req, res) => {
  let header = req.get("Authkey");
  if (header == "asdfgh") {
    if (!req.body.parameter || !req.body.password) {
      return res.send({ status: 201, message: "inadequate login data" });
    } else {
      let password = escapeHtml(req.body.password);
      let parameter = escapeHtml(req.body.parameter);

      User.findOne({
        $or: [{ email: { $eq: parameter } }, { contactNo: { $eq: parameter } }],
      })
        .then((note) => {
          if (!note) {
            return res.status(201).send({
              status: 201,
              message: "No user with these data exist",
            });
          } else {
            if (password == note.password) {
              return res.status(200).send({
                status: 200,
                message: note.userId,
              });
            } else {
              return res.status(201).send({
                status: 201,
                message: "Invalid Password",
              });
            }
          }
        })
        .catch((err) => {
          return res.status(201).send({
            status: 201,
            message: "there was an error",
          });
        });
    }
  } else {
    res.send({ status: 201, message: "Your aren't authorized" });
  }
};

//register
exports.register = (req, res) => {
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
      !req.body.address.addressLine
    ) {
      return res.send({ status: 201, message: "inadequate Owners data" });
    } else {
      var regEx =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+[\.](?:[a-zA-Z0-9-]+)*$/;
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
              },
            });

            user
              .save()
              .then((data) => {
                res.send({
                  status: 200,
                  message: newuserid,
                });
              })
              .catch((err) => {
                res.send({
                  status: 201,
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

exports.listShops = (req, res) => {
  let dist = escapeHtml(req.body.dist);
  dist = Number(dist);
  let latitude = escapeHtml(req.body.location.latitude);
  let longitude = escapeHtml(req.body.location.longitude);

  var response = [];

  var userLocation = {
    lat: latitude,
    lon: longitude,
  };
  lat1 = Number(latitude);
  long1 = Number(longitude);
  point1 = new GeoPoint(lat1, long1);

  //   VendorShop.find({}).then((data) => {
  //     if (data == "") {
  //       res.send({
  //         status: 201,
  //         message: "No data yet",
  //       });
  //     } else {
  //       data.forEach((shop) => {
  //         shopLocation = {
  //           lat: shop.location.latitude,
  //           lon: shop.location.longitude
  //         }
  //         // if (Distance.between(userLocation, shopLocation).human_readable().distance < dist) {
  //           response.push(Distance.between(userLocation, shopLocation).human_readable().distance);
  //         // }
  //       });
  //       res.send(response);
  //     }
  //   });
  // };

  VendorShop.find({}, { password: 0 }).then((data) => {
    if (data == "") {
      res.send({
        status: 201,
        message: "No data yet",
      });
    } else {
      data.forEach((shop) => {
        lat2 = Number(shop.location.latitude);
        long2 = Number(shop.location.longitude);
        shopLocation = new GeoPoint(lat2, long2);

        if (point1.distanceTo(shopLocation, true) <= dist) {
          response.push({
            distance: point1.distanceTo(shopLocation, true),
            shopDetails: shop,
          });
        }
      });
      res.send(response);
    }
  });
};

exports.order = (req, res) => {
  let header = req.get("AuthKey");
  if (header == "asdfgh") {
    if (
      !req.body.custName ||
      !req.body.shopId ||
      !req.body.userId ||
      !req.body.amount ||
      !req.body.address.locality ||
      !req.body.address.city ||
      !req.body.address.state ||
      !req.body.address.pincode ||
      !req.body.address.addressLine
    ) {
      return res.send({ status: 201, message: "inadequate data" });
    } else {
      var itemDetails = req.body.itemDetails;
      var shopId = req.body.shopId;
      var amount = req.body.amount;
      var userId = req.body.userId;
      var custName = req.body.custName;
      var address = req.body.address;

      var BreakException = {};

      let query = { shopId: shopId };
      VendorShop.find(query).then((data) => {
        if (data == "") {
          res.send({
            status: 200,
            message: "No such shop found",
          });
        } else {
          // res.send(data);
          try {
            var flag = 1;
            var c = 0;
            console.log(itemDetails.length);
            itemDetails.forEach((element) => {
              let query = { itemId: element.id };
              Items.find(query).then((data) => {
                if (data == "") {
                  flag = -1;
                  console.log("-1");
                  c++;
                  if (c == itemDetails.length) {
                    place();
                  }
                  throw BreakException;
                } else if (data[0].shopId != shopId) {
                  flag = 0;
                  console.log("0");
                  c++;
                  if (c == itemDetails.length) {
                    place();
                  }
                  throw BreakException;
                } else {
                  c++;
                  console.log("c value: " + c);
                  if (c == itemDetails.length - 1) {
                    place();
                  }
                }
              });
            });
          } catch (e) {
            if (e !== BreakException) throw e;
          }
          if (c == itemDetails.length) {
            place();
          }
          function place() {
            if (flag == -1) {
              res.send({
                status: 200,
                message: "No such item found",
              });
            } else if (flag == 0) {
              res.send({
                status: 200,
                message: "All items should be from the same shop",
              });
            } else {
              //---------------------users aur vendors ke db me add karne ke liye data ka code idhar likh dena
              let d = new Date();
              let n = d.getTime();
              var orderId = "order" + userId + n;

              const order = new Orders({
                orderId: orderId,
                itemDetails: itemDetails,
                custName: custName,
                address: address,
                shopId: shopId,
                status: "Pending",
                amount: amount,
                userId: userId,
              });

              order
                .save()
                .then((data) => {
                  res.send({
                    status: 200,
                    message: "Order Placed",
                  });
                })
                .catch((err) => {
                  res.send({
                    status: 201,
                    message: err.message || "Some error occured",
                  });
                });
            }
          }
        }
      });
    }
  }
};

exports.orderList = (req, res) => {
  let header = req.get("Authkey");
  if (header == "asdfgh") {
    let userId = req.body.userId;
    var query = { userId: userId };
    Orders.find(query).then((data) => {
      if (data == "") {
        res.send({
          status: 200,
          message: "No current orders",
        });
      } else {
        res.send({
          status: 200,
          data: data,
        });
      }
    });
  } else {
    res.send({ status: 201, message: "Your aren't authorized" });
  }
};

exports.orderCancel = (req, res) => {
  let header = req.get("Authkey");
  if (header == "asdfgh") {
    let orderId = req.body.orderId;
    var myquery = { orderId: orderId };
    var newvalue = {
      $set: {
        status: "Cancelled",
      },
    };
    Orders.updateOne(myquery, newvalue, function (err, resa) {
      if (err) throw err;
      res.send({
        status: 200,
        msg: "Order Cancelled",
      });
    });
  } else {
    res.send({ status: 201, message: "Your aren't authorized" });
  }
};
