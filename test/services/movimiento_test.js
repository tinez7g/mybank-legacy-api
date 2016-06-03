var supertest = require("supertest");
var should = require("should");
var config = require('../../config');

// Para obtener un token del servidor
var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator(config.firebase.SECRET);
var token = tokenGenerator.createToken({ uid: "uniqueId1", some: "arbitrary", data: "here" });

var PUERTO = process.env.PORT || 8080;
var server = supertest.agent("http://localhost:" + PUERTO);

describe("Prueba Unitaria services/movimiento.js",function(){
  this.timeout(7000);

  it("Prueba metodo get lista de movimientos por producto_id con token valido",function(done){
    server
    .get("/api/v2/movimiento/get/123/email@test.com?token=" + token)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });

  it("Prueba metodo get lista de movimientos por producto_id con token invalido",function(done){
    server
    .get("/api/v2/movimiento/get/123/email@test.com?token=123")
    .expect(401)
    .end(function(err,res){
      res.status.should.equal(401);
      done();
    });
  });

/*  it("Prueba metodo get por id del movimiento con token valido",function(done){
    server
    .get("/api/v2/movimiento/get/id?token=" + token)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });
*/

  it("Prueba metodo get por id del movimiento con token invalido",function(done){
    server
    .get("/api/v2/movimiento/get/id?token=123")
    .expect(401)
    .end(function(err,res){
      res.status.should.equal(401);
      done();
    });
  });
});
