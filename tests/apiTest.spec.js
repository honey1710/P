const{test,expect}=require('@playwright/test');
let userid;

test('Create new user',async({request})=>{
const response=await request.post('https://gorest.co.in/public/v1/users',
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer c350a0d38e9375445dae6ce4ede10e4a6c1d651226c08194a6b154691b062e57'
        },
        data: {
            "name": "ramaaaa",
           "email": `ram.${Date.now()}@example.com`,
            "gender": "male",
            "status": "active"
        }
    }
)
console.log(await response.json());
expect(response.status()).toBe(201);
userid=(await response.json()).data.id;
console.log("User ID:",userid);
})

test('Get User Details',async({request})=>{
    const response=await request.get(`https://gorest.co.in/public/v1/users/${userid}`,
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer c350a0d38e9375445dae6ce4ede10e4a6c1d651226c08194a6b154691b062e57'
        }
    }
)  ;
console.log(await response.json());
expect(response.status()).toBe(200);
})

test('Edit User',async({request})=>{
    const response=await request.put(`https://gorest.co.in/public/v1/users/${userid}`,
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer c350a0d38e9375445dae6ce4ede10e4a6c1d651226c08194a6b154691b062e57'
        },
        data: {
            "name": "raman",
            "status": "Inactive"
        }
    }
)
console.log(await response.json());
expect(response.status()).toBe(200);
})

test('Delete User',async({request})=>{
    const response=await request.delete(`https://gorest.co.in/public/v1/users/${userid}`,
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer c350a0d38e9375445dae6ce4ede10e4a6c1d651226c08194a6b154691b062e57'
        }
    } )  ;

expect(response.status()).toBe(204);

})