const vendorShop = require('../model/vendor.model.js');

exports.register = (req, res) => {

    let header = req.get('AuthKey');
    if(header == 'asdfgh'){
        
        if(!req.body.vendorName || !req.body.contactNo || !req.body.shopImage || !req.body.email || !req.body.password || !req.body.shopName || !req.body.shopType || !req.body.address || !req.body.state
            || !req.body.pincode || !req.body.locality|| !req.body.userGivenAddress || !req.body.latitude || !req.body.longitude || !req.body.listed_by ){
            return res.send({ message: "inadequate Owners data" });
        }else if(!req.body.shopTimings.sunday || !req.body.shopTimings.monday || !req.body.shopTimings.tuesday || !req.body.shopTimings.wednesday 
            || !req.body.shopTimings.thursday || !req.body.shopTimings.friday || !req.body.shopTimings.saturday){
                res.send({"status" : 201 , "message" : "please check the timings"})
        }else{

            var regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+[\.](?:[a-zA-Z0-9-]+)*$/;
            var validateemail = regEx.test(req.body.email);

            var regEx3 = /^[6-9]\d{9}$/;
            var validatecontact = regEx3.test(req.body.contact_no);

            if(!validateemail || !validatecontact){
                res.send({"status" : 201 , "message" : "invalid email or contact number"})
            }else{ 

                let vendorName = escapeHtml(req.body.vendorName);
                let contactNo = escapeHtml(req.body.contactNo);
                let password = escapeHtml(req.body.password);
                let email = escapeHtml(req.body.email);
                let shopName = escapeHtml(req.body.shopName);
                let shopType = escapeHtml(req.body.shopType);
                let latitude = escapeHtml(req.body.latitude);
                let longitude = escapeHtml(req.body.longitude);
                let locality = escapeHtml(req.body.locality);
                let state = escapeHtml(req.body.state);
                let pincode = escapeHtml(req.body.pincode);
                let country = escapeHtml(req.body.country);
                let addressLine = escapeHtml(req.body.addressLine);
                let userGivenAddress = escapeHtml(req.body.userGivenAddress);
                let timings = req.body.shop_timings;
                let shopImage = req.body.shopImage;

                shopdetail.find({ $or: [ { email : email } , { contactNo : number } ] })
                .then(data => {

                    if(data != '')
                    {
                        if(data[0].email == email && data[0].contactNo == number){
                            res.send({"status" : 201 , "message" : "email id and contact number already existed!"});
                        }else if(data[0].email == email){
                            res.send({"status" : 201 , "message" : "email id already existed!"});
                        }else if(data[0].contactNo == number){                                                                                                              
                            res.send({"status" : 201 , "message" : "contact number already existed!"});
                        }
                        
                    }else
                    {

                        const shopdetails = new shopdetail({
                            shopId: shopid,
                            ownerName: name,
                            username: username,
                            contactNo: number,
                            email: email,
                            shopName: shopname,
                            shopType: shoptype,
                            shopImage: imagename,
                            location:{
                                type: "Point",
                                coordinates: [longitude , latitude],
                            },
                            shopSelectedCategories: categories,
                            shopAddress:{
                                locality: locality,
                                state: state,
                                pincode: pincode,
                                country: country,
                                addressLine: addressLine,
                                userGivenAddress: userGivenAddress
                            },
                            shopTimings : {
                                monday : {
                                    status:timings.monday.status,
                                    shopOpeningTime : timings.monday.shopOpeningTime,   
                                    shopClosingTime: timings.monday.shopClosingTime
                                },
                                tuesday: {
                                    status: timings.tuesday.status,
                                    shopOpeningTime : timings.tuesday.shopOpeningTime,   
                                    shopClosingTime: timings.tuesday.shopClosingTime
                                },
                                wednesday : {
                                    status: timings.wednesday.status,
                                    shopOpeningTime : timings.wednesday.shopOpeningTime,   
                                    shopClosingTime: timings.wednesday.shopClosingTime
                                },
                                thursday: {
                                    status: timings.thursday.status,
                                    shopOpeningTime : timings.thursday.shopOpeningTime,   
                                    shopClosingTime: timings.thursday.shopClosingTime
                                },
                                friday : {
                                    status: timings.friday.status,
                                    shopOpeningTime : timings.friday.shopOpeningTime,   
                                    shopClosingTime: timings.friday.shopClosingTime
                                },
                                saturday: {
                                    status: timings.saturday.status,
                                    shopOpeningTime : timings.saturday.shopOpeningTime,   
                                    shopClosingTime: timings.saturday.shopClosingTime
                                },
                                sunday : {
                                    status: timings.sunday.status,
                                    shopOpeningTime : timings.sunday.shopOpeningTime,   
                                    shopClosingTime: timings.sunday.shopClosingTime
                                }
                            },
                            listedBy : {
                                classification : listedBy.type,
                                userId : listedBy.userid
                            }
                            
                        });
                        
                    }
                });//insert before here

            }//till here
        }
    
    }

}