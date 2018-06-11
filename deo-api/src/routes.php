<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

// get all halls
$app->get('/halls', function ($request, $response, $args) {
    $sth = $this->db->prepare("SELECT * FROM hall ORDER BY created_on");
    $sth->execute();
    $todos = $sth->fetchAll();
    return $this->response->withJson($todos);
});

// get hall with id 
$app->get('/hall/[{id}]', function ($request, $response, $args) {
    $sth = $this->db->prepare("SELECT * FROM hall WHERE id=:id");
   $sth->bindParam("id", $args['id']);
   $sth->execute();
   $todos = $sth->fetchObject();
   return $this->response->withJson($todos);
});

// create a new hall
$app->post('/hall', function ($request, $response) {
    $input = $request->getParsedBody();
    $sql = "INSERT INTO hall (hallid,name,status,type,description,price,capacity) VALUES (:hallid,:name,:status,:type,:description,:price,:capacity)";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("hallid", $input['hallid']);
    $sth->bindParam("name", $input['name']);
    $sth->bindParam("status", $input['status']);
    $sth->bindParam("type", $input['type']);
    $sth->bindParam("description", $input['description']);
    $sth->bindParam("price", $input['price']);
    $sth->bindParam("capacity", $input['capacity']);
    
    $sth->execute();
    $input['id'] = $this->db->lastInsertId();
    return $this->response->withJson($input);
});

// DELETE a hall with given id
$app->delete('/hall/[{id}]', function ($request, $response, $args) {
    $sth = $this->db->prepare("DELETE FROM hall WHERE id=:id");
    $sth->bindParam("id", $args['id']);
    $sth->execute();
    $sth = $this->db->prepare("SELECT * FROM hall ORDER BY created_on");
    $sth->execute();
    $todos = $sth->fetchAll();
    return $this->response->withJson($todos);
});

// Update hall with given id
$app->put('/hall/[{id}]', function ($request, $response, $args) {
    $input = $request->getParsedBody();
    $sql = "UPDATE hall SET hallid=:hallid,name=:name,status=:status,type=:type,description=:description,price=:price,capacity=:capacity WHERE id=:id";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("id", $args['id']);
    $sth->bindParam("hallid", $input['hallid']);
    $sth->bindParam("name", $input['name']);
    $sth->bindParam("status", $input['status']);
    $sth->bindParam("type", $input['type']);
    $sth->bindParam("description", $input['description']);
    $sth->bindParam("price", $input['price']);
    $sth->bindParam("capacity", $input['capacity']);

    $sth->execute();
    $input['id'] = $args['id'];
    return $this->response->withJson($input);
});

// get all Item
$app->get('/items', function ($request, $response, $args) {
    $sth = $this->db->prepare("SELECT * FROM item ORDER BY created_on");
    $sth->execute();
    $todos = $sth->fetchAll();
    return $this->response->withJson($todos);
});

// get item with id 
$app->get('/item/[{id}]', function ($request, $response, $args) {
    $sth = $this->db->prepare("SELECT * FROM item WHERE id=:id");
    $sth->bindParam("id", $args['id']);
    $sth->execute();
    $todos = $sth->fetchObject();
    return $this->response->withJson($todos);
});

// create a new item
$app->post('/item', function ($request, $response) {
    $input = $request->getParsedBody();
    $sql = "INSERT INTO item (itemid,name,status) VALUES (:itemid,:name,:status)";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("itemid", $input['itemid']);
    $sth->bindParam("name", $input['name']);
    $sth->bindParam("status", $input['status']);
    
    $sth->execute();
    $input['id'] = $this->db->lastInsertId();
    return $this->response->withJson($input);
});

// DELETE an item with given id
$app->delete('/item/[{id}]', function ($request, $response, $args) {
    $sth = $this->db->prepare("DELETE FROM item WHERE id=:id");
    $sth->bindParam("id", $args['id']);
    $sth->execute();
    $sth = $this->db->prepare("SELECT * FROM item ORDER BY created_on");
    $sth->execute();
    $todos = $sth->fetchAll();
    return $this->response->withJson($todos);
});

// Update item with given id
$app->put('/item/[{id}]', function ($request, $response, $args) {
    $input = $request->getParsedBody();
    $sql = "UPDATE item SET itemid=:itemid,name=:name,status=:status WHERE id=:id";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("id", $args['id']);
    $sth->bindParam("itemid", $input['itemid']);
    $sth->bindParam("name", $input['name']);
    $sth->bindParam("status", $input['status']);
   
    $sth->execute();
    $input['id'] = $args['id'];
    return $this->response->withJson($input);
});

// get all bookings
$app->get('/bookings', function ($request, $response, $args) {
    $sth = $this->db->prepare("SELECT * FROM booking ORDER BY created_on desc");
    $sth->execute();
    $todos = $sth->fetchAll();
    return $this->response->withJson($todos);
});

// get booking with id 
$app->get('/booking/[{id}]', function ($request, $response, $args) {
    $sth = $this->db->prepare("SELECT * FROM booking WHERE id=:id");
    $sth->bindParam("id", $args['id']);
    $sth->execute();
    $todos = $sth->fetchObject();
    return $this->response->withJson($todos);
});

// create a new booking
$app->post('/booking', function ($request, $response) {
    $input = $request->getParsedBody();
    $sql = "INSERT INTO booking (bookingid,fromdate,todate,customer,phone,address,email,numberOfPpl,allItems,allHall,booking_price,catering_price,lightSound,other_price,invoice_num,gst_num) VALUES (:bookingid,:fromdate,:todate,:customer,:phone,:address,:email,:numberOfPpl,:allItems,:allHall,:booking_price,:catering_price,:lightSound,:other_price,:invoice_num,:gst_num)";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("bookingid", $input['bookingid']);
    $sth->bindParam("fromdate", $input['fromdate']);
    $sth->bindParam("todate", $input['todate']);
    $sth->bindParam("customer", $input['customer']);
    $sth->bindParam("phone", $input['phone']);
    $sth->bindParam("address", $input['address']);
    $sth->bindParam("email", $input['email']);
    $sth->bindParam("allItems", $input['allItems']);
    $sth->bindParam("allHall", $input['allHall']);
    $sth->bindParam("booking_price", $input['booking_price']);
    $sth->bindParam("catering_price", $input['catering_price']);
    $sth->bindParam("lightSound", $input['lightSound']);
    $sth->bindParam("other_price", $input['other_price']);
    $sth->bindParam("invoice_num", $input['invoice_num']);
    $sth->bindParam("gst_num", $input['gst_num']);
    $sth->bindParam("numberOfPpl", $input['numberOfPpl']);
    
    $sth->execute();
    $input['id'] = $this->db->lastInsertId();
    return $this->response->withJson($input);
});

// DELETE a booking with given id
$app->delete('/booking/[{id}]', function ($request, $response, $args) {
    $sth = $this->db->prepare("DELETE FROM booking WHERE id=:id");
    $sth->bindParam("id", $args['id']);
    $sth->execute();
    $sth = $this->db->prepare("SELECT * FROM booking ORDER BY created_on desc");
    $sth->execute();
    $todos = $sth->fetchAll();
   return $this->response->withJson($todos);
});

// Update booking with given id
$app->put('/booking/[{id}]', function ($request, $response, $args) {
    $input = $request->getParsedBody();
    $sql = "UPDATE booking SET bookingid=:bookingid,fromdate=:fromdate,todate=:todate,customer=:customer,phone=:phone,address=:address,email=:email,numberOfPpl=:numberOfPpl,allItems=:allItems,allHall=:allHall,booking_price=:booking_price,catering_price=:catering_price,lightSound=:lightSound,other_price=:other_price,invoice_num=:invoice_num,gst_num=:gst_num WHERE id=:id";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("id", $args['id']);
    $sth->bindParam("bookingid", $input['bookingid']);
    $sth->bindParam("fromdate", $input['fromdate']);
    $sth->bindParam("todate", $input['todate']);
    $sth->bindParam("customer", $input['customer']);
    $sth->bindParam("phone", $input['phone']);
    $sth->bindParam("address", $input['address']);
    $sth->bindParam("email", $input['email']);
    $sth->bindParam("allItems", $input['allItems']);
    $sth->bindParam("allHall", $input['allHall']);
    $sth->bindParam("booking_price", $input['booking_price']);
    $sth->bindParam("catering_price", $input['catering_price']);
    $sth->bindParam("lightSound", $input['lightSound']);
    $sth->bindParam("other_price", $input['other_price']);
    $sth->bindParam("invoice_num", $input['invoice_num']);
    $sth->bindParam("gst_num", $input['gst_num']);
    $sth->bindParam("numberOfPpl", $input['numberOfPpl']);
   
    $sth->execute();
    $input['id'] = $args['id'];
    return $this->response->withJson($input);
});

//default route
$app->get('/[{name}]', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});

