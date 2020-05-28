# Swipe Credit Early Access API


# API

`https://swipe-credit-early.nibse.com/`



#### Add Business Category Name

### POST /api/admin/business
_This endpoint create business categories_

```
    {
        "name": "Banking"
    }
```

A sample of the response body is seen below

```
{
  "status": true,
  "data": {
    "message": "Success",
  }
}
```


### GET /api/admin/business

_This endpoint returns business categories_


#### Personal APIs

### GET /api/auth/personal

_This endpoint returns all personal users_

###### POST /api/auth/personal/signup

A sample of the request body is seen below

```
{
	"fullName" : "Ajao Abayomi",
	"email": "ajao@roombs.com",
	"gen": "M",
	"phoneNumber": "08039479493",
	"isSalaryEarner": true
	"location": "lekki"
	
}
```

A sample of the response body is seen below

```
{
  "status": true,
  "data": {
    "message": "Success",
  }
}
```

#### Business APIs

### GET /api/auth/business

_This endpoint returns all Business users_

###### POST /api/auth/personal/business

A sample of the request body is seen below

```
{
	"fullName" : "Ajao Abayomi",
	"email": "ajao@roombs.com",
	"gen": "M",
	"phoneNumber": "08039479493",
	"businessName": "Diano Fabrics",
	"businessCategoryId": "5da84af100977eb77eaa7ffa",
	"location": "lekki"
	
}
```

A sample of the response body is seen below

```
{
  "status": true,
  "data": {
    "message": "Success",
  }
}
```

# node-rest
