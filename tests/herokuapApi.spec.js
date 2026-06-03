import {test,expect} from '@playwright/test';
import fs from 'fs';

const requestBody={
    "firstname" : "Himani",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
}

test('create booking',async({request})=>{
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  

    const response=await request.post('https://restful-booker.herokuapp.com/booking',{data:requestBody});
    
    const responseJson=await response.json();
    console.log(responseJson);
    expect (response.status()).toBe(200);
    expect (responseJson).toHaveProperty('bookingid')



});

