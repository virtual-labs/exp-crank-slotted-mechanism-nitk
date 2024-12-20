//program variables

//controls section
var simstatus = 0;
var rotstatus = 1;
//comments section
var commenttext = "Some Text";
var commentloc = 0;
//computing section
var trans = new point(300, 200);
var o = new point(0, 0, "O");
var a = new point(0, 0, "A");
var b = new point(0, 0, "B");
var c = new point(0, 0, "C");
var d = new point(0, 0, "D");
var e = new point(0, 0, "E");
var va = new point(0, 0, "Va");
var vc = new point(0, 0, "Vc");
var vd = new point(0, 0, "Vd");
var vae = new point(0, 0, "Vae");
var vcd = new point(0, 0, "Vcd");
var ve = new point(0, 0, "Ve");
var aan = new point(0, 0, "Aan");
var aat = new point(0, 0, "Aat");
var aes = new point(0, 0, "Aslip");
var aec = new point(0, 0, "Acoriolis");
var acn = new point(0, 0, "Acn");
var act = new point(0, 0, "Act");
var adcn = new point(0, 0, "Adcn");
var adct = new point(0, 0, "Adct");
var ads = new point(0, 0, "Ads");
//var f= new point(0,0,"F");
//var g= new point(0,0,"G");
/*var f= new point(0,0,"F");
var g= new point(0,0,"G");
var h= new point(0,0,"H");
var i= new point(0,0,"I");
var j= new point(0,0,"J");
var l= new point(0,0,"L");
var m= new point(0,0,"M");
var n= new point(0,0,"N");
var s= new point(0,0,"S");
var r= new point(0,0,"R");*/

var r1 = 50,
  r2,
  r3,
  r4 = 2 * r1,
  r5 = 2 * r1,
  l,
  ldot,
  lddot;
var th3 = 0,
  th4 = 0;
var state = "v";
var thi = 30; //BOQ = 30; // all angles to be defined either in degrees only or radians only throughout the program and convert as and when required
//var AQO; // All angles in Degrees. (mention the specification in the script like here)
var omega3 = 0,
  omega4 = 0,
  v1 = 0,
  v2 = 0,
  v3 = 0,
  v12 = 0,
  v23 = 0,
  vs = 0;
var a1n = 0,
  a1t = 0,
  a2s = 0,
  a2c = 0,
  a3n = 0,
  a3t = 0,
  a34n = 0,
  a34t = 0,
  a4s = 0,
  alph3 = 0,
  alph4 = 0;
var temp = 0;
var state1 = 1;
var functions = [velocity, acceleration];
var currentFunction = 0;
var count = 0;
//graphics section
var canvas;
var ctx;
var speed = 7;
var omega2;
//timing section
var simTimeId = setInterval("", "1000");
var time = 0;
//point tracing section
var ptx = [];
var pty = [];
//small point tracing section
//var utx = [];
//var uty = [];
var scalev = 1;
var scalea = 1;
/*
function trythis()
{ alert();}
*/

//change simulation specific css content. e.g. padding on top of variable to adjust appearance in variables window
hideall();
$("#commentboxleft").show();
function editcss() {
  $(".variable").css("padding-top", "40px");
}

function startsim() {
  simTimeId = setInterval("time=time+0.1; varupdate(); ", "100");
}

// switches state of simulation between 0:Playing & 1:Paused
function simstate() {
  var imgfilename = document.getElementById("playpausebutton").src;
  imgfilename = imgfilename.substring(
    imgfilename.lastIndexOf("/") + 1,
    imgfilename.lastIndexOf(".")
  );
  if (imgfilename == "bluepausedull") {
    document.getElementById("playpausebutton").src = "images/blueplaydull.svg";
    clearInterval(simTimeId);
    simstatus = 1;
    $("#alphaspinner").spinner("value", thi);
    pauseTime = setInterval("varupdate();", "100");
    document.querySelector("playPause").textContent = "Play";
  }
  if (imgfilename == "blueplaydull") {
    time = 0;
    clearInterval(pauseTime);
    document.getElementById("playpausebutton").src = "images/bluepausedull.svg";
    simTimeId = setInterval("time=time+0.1; varupdate(); ", "100");
    simstatus = 0;
    document.querySelector("playPause").textContent = "Pause";
  }
}

// switches state of rotation between 1:CounterClockWise & -1:Clockwise
function rotstate() {
  var imgfilename = document.getElementById("rotationbutton").src;
  imgfilename = imgfilename.substring(
    imgfilename.lastIndexOf("/") + 1,
    imgfilename.lastIndexOf(".")
  );
  if (imgfilename == "bluecwdull") {
    document.getElementById("rotationbutton").src = "images/blueccwdull.svg";
    rotstatus = -1;
  }
  if (imgfilename == "blueccwdull") {
    document.getElementById("rotationbutton").src = "images/bluecwdull.svg";
    rotstatus = 1;
  }
}

function varinit() {
  varchange();

  $("#ABslider").slider("value", 50);
  $("#ABspinner").spinner("value", 50);
  $("#con_rodslider").slider("value", 5 * r1);
  $("#con_rodspinner").spinner("value", 5 * r1);
  $("#ramslider").slider("value", 2 * r1);
  $("#ramspinner").spinner("value", 2 * r1);
  $("#alphaslider").slider("value", 55);
  $("#alphaspinner").spinner("value", 55);

  //Variable omega2 slider and number input types
  $("#omega2slider").slider("value", 1);
  $("#omega2spinner").spinner("value", 1);
}

// Initialise and Monitor variable containing user inputs of system parameters.
//change #id and repeat block for new variable. Make sure new <div> with appropriate #id is included in the markup
function varchange() {
  //Link AB
  // slider initialisation : jQuery widget
  $("#ABslider").slider({ max: 50, min: 20, step: 2 });

  // number initialisation : jQuery widget
  $("#ABspinner").spinner({ max: 50, min: 20, step: 2 });

  $("#con_rodslider").slider({ max: 270, min: 200, step: 20 });
  $("#con_rodspinner").spinner({ max: 270, min: 200, step: 20 });
  $("#ramslider").slider({ max: 110, min: 40, step: 10 });
  $("#ramspinner").spinner({ max: 110, min: 40, step: 10 });
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#ABslider").on("slide", function (e, ui) {
    $("#ABspinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#ABspinner").on("spin", function (e, ui) {
    $("#ABslider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#ABspinner").on("change", function () {
    varchange();
  });

  $("#con_rodslider").on("slide", function (e, ui) {
    $("#con_rodspinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#con_rodspinner").on("spin", function (e, ui) {
    $("#con_rodslider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#con_rodspinner").on("change", function () {
    varchange();
  });
  $("#ramslider").on("slide", function (e, ui) {
    $("#ramspinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#ramspinner").on("spin", function (e, ui) {
    $("#ramslider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#ramspinner").on("change", function () {
    varchange();
  });
  // Angle Alpha
  // slider initialisation : jQuery widget
  $("#alphaslider").slider({ max: 360, min: 0, step: 1 });

  // number initialisation : jQuery widget
  $("#alphaspinner").spinner({ max: 360, min: 0, step: 1 });

  //Speed Change
  //sliderintialisation : jquery widget
  //$('#speedslider').slider({ max : 30, min : 7, step : 2 });
  //$('#speedspinner').slider({ max : 30, min : 7, step : 2 });

  // monitoring change in value and connecting slider and number
  $("#alphaslider").on("slide", function (e, ui) {
    $("#alphaspinner").spinner("value", ui.value);
  });
  $("#alphaspinner").on("spin", function (e, ui) {
    $("#alphaslider").slider("value", ui.value);
  });
  $("#alphaspinner").on("change", function () {
    varchange();
  });

  //Variable omega2 slider and number input types
  $("#omega2slider").slider({ max: 2, min: 0.2, step: 0.2 }); // slider initialisation : jQuery widget
  $("#omega2spinner").spinner({ max: 2, min: 0.2, step: 0.2 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#omega2slider").on("slide", function (e, ui) {
    $("#omega2spinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#omega2spinner").on("spin", function (e, ui) {
    $("#omega2slider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#omega2spinner").on("change", function () {
    varchange();
  });

  varupdate();
}

function varupdate() {
  $("#ABslider").slider("value", $("#ABspinner").spinner("value"));
  $("#con_rodslider").slider("value", $("#con_rodspinner").spinner("value"));
  $("#ramslider").slider("value", $("#ramspinner").spinner("value")); //updating slider location with change in spinner(debug)
  $("#alphaslider").slider("value", $("#alphaspinner").spinner("value"));
  $("#omega2slider").slider("value", $("#omega2spinner").spinner("value"));
  //$('#speedslider').slider("value", $('#speedspinner').spinner('value'));

  r1 = $("#ABspinner").spinner("value");
  r2 = $("#con_rodspinner").spinner("value");
  r3 = $("#ramspinner").spinner("value");

  //printcomment("",1);
  //printcomment("AQ=OB <br/> OB:OQ:BC = 1 : 2 : 2.5",2);

  if (!simstatus) {
    //if(BOQ<38 || BOQ>93) rotstate();
    $("#alphaslider").slider("disable");
    $("#alphaspinner").spinner("disable");
    $("#omega2set").show();
    //'#speedspinner').spinner("enable");
    omega2 = rotstatus * $("#omega2spinner").spinner("value");
    thi = thi + 0.1 * deg(omega2);
    thi = thi % 360;
  }
  printcomment(
    "E is the point on link BC whereas A is the point on the slider.<br> <b>Vea</b> : Velocity of E wrt A<br><b> Adc</b> : Acceleration of D wrt C",
    1
  );
  if (simstatus) {
    $("#alphaslider").slider("enable");
    $("#alphaspinner").spinner("enable");
    $("#speedspinner").spinner("disable");
    $("#omega2set").hide();
    thi = $("#alphaspinner").spinner("value");
    omega2 = rotstatus * $("#omega2spinner").spinner("value");
  }
  /*First Leg*/
  //r2=r1/2, r3=2.5*r2, r4=2.5*r2;
  (r4 = 2 * r1), (r5 = 2 * r1);
  o.xcoord = 0;
  o.ycoord = 0;

  a.xcoord = o.xcoord + r1 * Math.cos(rad(thi));
  a.ycoord = o.ycoord + r1 * Math.sin(rad(thi));

  b.xcoord = 0;
  b.ycoord = -r4;

  th3 = deg(Math.atan2(a.ycoord + r4, a.xcoord));

  c.xcoord = b.xcoord + r2 * Math.cos(rad(th3));
  c.ycoord = b.ycoord + r2 * Math.sin(rad(th3));

  th4 = deg(Math.atan((c.ycoord - r5) / r3));
  d.ycoord = r5;
  d.xcoord = c.xcoord + r3 * Math.cos(rad(th4));

  l = Math.sqrt(
    (a.ycoord - b.ycoord) * (a.ycoord - b.ycoord) +
      (a.xcoord - b.xcoord) * (a.xcoord - b.xcoord)
  );
  ldot = (r1 * r4 * Math.cos(rad(thi)) * omega2) / l;
  lddot =
    r1 *
    r4 *
    ((-omega2 * omega2 * Math.sin(rad(thi)) - Math.cos(rad(thi)) * omega2) /
      (l * l));
  v1 = omega2 * r1;

  omega3 =
    (ldot * Math.cos(rad(th3)) + r1 * omega2 * Math.sin(rad(thi))) /
    (l * Math.sin(rad(th3))); //(Math.sin(rad(thi)) + (r4/l)*Math.cos(rad(thi)*Math.cos(rad(thi)))) * ((r1*omega2)/(l*Math.sin(rad(th3))));
  vs = ldot;
  v2 = omega3 * r2;

  v12 = ldot;
  omega4 = (r2 * omega3 * Math.cos(rad(th3))) / (r3 * Math.cos(rad(th4)));
  v23 = r3 * omega4;
  v3 = -r2 * omega3 * Math.sin(rad(th3)) + r3 * omega4 * Math.sin(rad(th4));
  if (omega2 > 0.8 && omega2 <= 1.2) {
    scalev = 0.8;

    //printcomment("Scale 1:2 ",2);
  } else if (omega2 > 1.2) {
    scalev = 0.5;

    //printcomment("Scale 1:1 ",2);
  } else {
    scalev = 1;
  }
  va.xcoord = a.xcoord + scalev * v1 * Math.cos(rad(thi + 90));
  va.ycoord = a.ycoord + scalev * v1 * Math.sin(rad(thi + 90));

  vc.xcoord = c.xcoord + scalev * v2 * Math.cos(rad(th3 + 90));
  vc.ycoord = c.ycoord + scalev * v2 * Math.sin(rad(th3 + 90));

  vd.xcoord = d.xcoord + scalev * v3;
  vd.ycoord = d.ycoord;
  state1 = 1;
  vcd.xcoord = d.xcoord + scalev * v23 * Math.cos(rad(180 - th4 + 90));
  vcd.ycoord = d.ycoord + scalev * v23 * Math.sin(rad(180 - th4 + 90));
  vae.xcoord = a.xcoord + scalev * v12 * Math.cos(rad(th3 + 180));
  vae.ycoord = a.ycoord + scalev * v12 * Math.sin(rad(th3 + 180));

  //Acceleration calculations

  a1n = omega2 * omega2 * r1;
  a3n = omega3 * omega3 * r2;
  a34n = omega4 * omega4 * r3;
  a1t = 0;
  alph3 =
    (lddot * Math.cos(rad(th3)) -
      2 * ldot * omega3 * Math.sin(rad(th3)) -
      l * omega3 * omega3 * Math.cos(rad(th3)) +
      r1 * omega2 * omega2 * Math.cos(rad(thi))) /
    (l * Math.sin(rad(th3)));

  a3t = r2 * alph3;
  a2c = 2 * ldot * omega3;
  a2s = lddot;

  alph4 =
    (r2 * alph3 * Math.cos(rad(th3)) -
      r2 * omega3 * omega3 * Math.sin(rad(th3)) +
      r3 * omega3 * omega3 * Math.sin(rad(th4))) /
    (r3 * Math.cos(rad(th4)));
  a4s =
    -r2 * alph3 * Math.sin(rad(th3)) -
    r2 * omega3 * omega3 * Math.cos(rad(th3)) +
    r3 * alph4 * Math.sin(rad(th4)) +
    r3 * omega4 * omega4 * Math.cos(rad(th4));
  a34t = r3 * alph4;
  log();
  if (omega2 > 0.8 && omega2 <= 1.2) {
    scalea = 0.5;

    //printcomment("Scale 1:2 ",2);
  } else if (omega2 > 1.2) {
    scalea = 0.2;

    //printcomment("Scale 1:1 ",2);
  } else {
    scalea = 1;
  }

  aan.xcoord = a.xcoord + scalea * a1n * Math.cos(rad(thi + 180));
  aan.ycoord = a.ycoord + scalea * a1n * Math.sin(rad(thi + 180));

  aes.xcoord = a.xcoord + scalea * a2s * Math.cos(rad(th3));
  aes.ycoord = a.ycoord + scalea * a2s * Math.sin(rad(th3));

  aec.xcoord = a.xcoord + scalea * a2c * Math.cos(rad(th3 + 90));
  aec.ycoord = a.ycoord + scalea * a2c * Math.sin(rad(th3 + 90));

  acn.xcoord = c.xcoord + scalea * a3n * Math.cos(rad(th3 + 180));
  acn.ycoord = c.ycoord + scalea * a3n * Math.sin(rad(th3 + 180));

  act.xcoord = c.xcoord + scalea * a3t * Math.cos(rad(th3 + 90));
  act.ycoord = c.ycoord + scalea * a3t * Math.sin(rad(th3 + 90));

  adcn.xcoord = d.xcoord + scalea * a34n * Math.cos(rad(180 - th4));
  adcn.ycoord = d.ycoord + scalea * a34n * Math.sin(rad(180 - th4));

  adct.xcoord = d.xcoord + scalea * a34t * Math.cos(rad(180 - th4 + 90));
  adct.ycoord = d.ycoord + scalea * a34t * Math.sin(rad(180 - th4 + 90));

  ads.xcoord = d.xcoord + scalea * a4s * Math.cos(rad(0));
  ads.ycoord = d.ycoord;
  if (count == 0) {
    $("#acceleration-table").hide();
    $("#velocity-table").show();
    $("vel-id").show();
    $("acc-id").hide();
    $("#aan").hide();
    $("#aes").hide();
    $("#aec").hide();
    $("#acn").hide();
    $("#act").hide();
    $("#adcn").hide();
    $("#adct").hide();
    $("#ads").hide();
  }

  draw();
}

function draw() {
  //pointdisp(a); to display point
  //pointjoin(a,b); to join to points with a line
  canvas = document.getElementById("simscreen");
  ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 600, 400); //clears the complete canvas#simscreen everytime

  o = pointtrans(o, trans);
  a = pointtrans(a, trans);
  b = pointtrans(b, trans);
  c = pointtrans(c, trans);
  d = pointtrans(d, trans);

  pointjoin(o, a, ctx, "red");
  pointjoin(b, c, ctx, "green");
  pointjoin(c, d, ctx, "black");

  pointdisp(o, ctx);
  pointdisp(a, ctx);
  pointdisp(b, ctx);
  pointdisp(c, ctx);
  pointdisp(d, ctx);
  ctx.lineWidth = "4";
  ctx.strokeStyle = "green";
  ctx.rect(d.xcoord - 20, d.ycoord - 20, 40, 40);

  if (state == "v") {
    drawvel(ctx);
  } else if (state == "a") {
    drawacc(ctx);
  }
}

function drawvel(ctx) {
  var arrae, arrd, arrvcd;
  //Velocity Diagram
  va = pointtrans(va, trans);
  vc = pointtrans(vc, trans);
  vd = pointtrans(vd, trans);
  vae = pointtrans(vae, trans);
  vcd = pointtrans(vcd, trans);
  if (vae.ycoord < a.ycoord) {
    arrae = 180 - th3;
  } else {
    arrae = -th3;
  }
  if (vd.xcoord < d.xcoord) {
    arrd = 0;
  } else {
    arrd = 180;
  }
  if (vcd.ycoord < d.ycoord) {
    arrvcd = th4 + 90;
  } else {
    arrvcd = th4 + 90 - 180;
  }

  ctx.font = "400 15px 'nunito', sans-serif";
  ctx.color = "yellow";
  pointjoin(a, va, ctx, "#0066FF", 2);
  drawArrow(
    va.xcoord,
    va.ycoord,
    ctx,
    180 - thi - rotstatus * 90,
    15,
    30,
    "#0066FF"
  );

  pointjoin(c, vc, ctx, "#D00000", 2);
  drawArrow(
    vc.xcoord,
    vc.ycoord,
    ctx,
    180 - th3 - signof(omega3) * 90,
    15,
    30,
    "#D00000"
  );

  pointjoin(d, vd, ctx, "#005500", 2);
  drawArrow(vd.xcoord, vd.ycoord, ctx, arrd, 15, 30, "#005500");

  pointjoin(a, vae, ctx, "#005500", 2);
  drawArrow(vae.xcoord, vae.ycoord, ctx, arrae, 15, 30, "white");

  pointjoin(d, vcd, ctx, "#005500", 2);
  drawArrow(vcd.xcoord, vcd.ycoord, ctx, arrvcd, 15, 30, "blue");
  ctx.lineWidth = 1;
  ctx.font = "400 16px 'nunito', sans-serif";
  ctx.strokeStyle = "#000000";
  ctx.strokeText("Velocity Diagram (Scale = 1:" + scalev + ")", 170, 350);
  ctx.restore();

  pointdisp(va, ctx, 2, "blue", "white", "black", "12px", "12px");
  pointdisp(vc, ctx, 2, "blue", "white", "black", "12px", "12px");
  pointdisp(vd, ctx, 2, "blue", "white", "black", "12px", "12px");
  pointdisp(vae, ctx, 2, "blue", "white", "black", "12px", "12px");
  pointdisp(vcd, ctx, 2, "blue", "white", "black", "12px", "12px");
  //positioning labels
  // document.getElementById("vc").style.position = 'absolute';
  // document.getElementById("va").style.position = 'absolute';
  // document.getElementById("vd").style.position = 'absolute';
  // document.getElementById("vae").style.position = 'absolute';
  // document.getElementById("vcd").style.position = 'absolute';
  // document.getElementById("vc").style.margin = '0';
  // document.getElementById("vd").style.margin = '0';
  // document.getElementById("va").style.margin = '0';
  // document.getElementById("vcd").style.margin = '0';
  // document.getElementById("vae").style.margin = '0';
  // document.getElementById("va").style.width = '10px';
  // document.getElementById("va").style.height = '10px';
  // document.getElementById("vc").style.width = '10px';
  // document.getElementById("vc").style.height = '10px';
  // document.getElementById("vd").style.width = '10px';
  // document.getElementById("vd").style.height = '10px';
  // document.getElementById("vcd").style.width = '10px';
  // document.getElementById("vcd").style.height = '10px';
  // document.getElementById("vae").style.width = '10px';
  // document.getElementById("vae").style.height = '10px';
  // document.getElementById("va").style.fontSize = '10px';
  // document.getElementById("vc").style.fontSize = '10px';
  // document.getElementById("vd").style.fontSize = '10px';
  // document.getElementById("vcd").style.fontSize = '10px';
  // document.getElementById("vae").style.fontSize = '10px';
  // document.getElementById("va").style.left = ""+(va.xcoord+20)+"px";
  // document.getElementById("va").style.top = ""+(va.ycoord+80)+"px";
  // document.getElementById("vc").style.left = ""+(10+vc.xcoord)+"px";
  // document.getElementById("vc").style.top = ""+(10+vc.ycoord+80)+"px";
  // document.getElementById("vd").style.left = ""+(vd.xcoord+20)+"px";
  // document.getElementById("vd").style.top = ""+(vd.ycoord+80)+"px";
  // document.getElementById("vcd").style.left = ""+(vcd.xcoord+20)+"px";
  // document.getElementById("vcd").style.top = ""+(vcd.ycoord+80)+"px";
  // document.getElementById("vae").style.left = ""+(vae.xcoord+20)+"px";
  // document.getElementById("vae").style.top = ""+(vae.ycoord+80)+"px";

  //drawacc(ctx);
}

function drawacc(ctx) {
  var arrcor, arrct, arrd, arradct;
  aan = pointtrans(aan, trans);
  aat = pointtrans(aat, trans);
  aes = pointtrans(aes, trans);
  aec = pointtrans(aec, trans);
  acn = pointtrans(acn, trans);
  act = pointtrans(act, trans);
  adcn = pointtrans(adcn, trans);
  adct = pointtrans(adct, trans);
  ads = pointtrans(ads, trans);
  angae = deg(Math.atan((a.ycoord - b.ycoord) / (a.xcoord - b.xcoord)));
  if (aec.xcoord > a.xcoord) {
    arrcor = 270 - th3;
  } else {
    arrcor = 270 - th3 - 180;
  }
  if (act.xcoord > c.xcoord) {
    arrct = 270 - th3;
  } else {
    arrct = 270 - th3 - 180;
  }
  if (ads.xcoord > d.xcoord) {
    arrd = 180;
  } else {
    arrd = 0;
  }
  if (adct.ycoord < d.ycoord) {
    arradct = th4 + 90;
  } else {
    arradct = th4 + 90 - 180;
  }
  ctx.font = "100 15px 'nunito', sans-serif";
  ctx.color = "yellow";
  ctx.strokeStyle = "green";
  pointjoin(a, aan, ctx, "#0066FF", 2);
  drawArrow(aan.xcoord, aan.ycoord, ctx, -thi, 15, 30, "#0066FF");

  pointjoin(a, aes, ctx, "#D00000", 2);
  drawArrow(aes.xcoord, aes.ycoord, ctx, 180 - th3, 15, 30, "#D00000");

  pointjoin(a, aec, ctx, "#005500", 2);
  drawArrow(aec.xcoord, aec.ycoord, ctx, arrcor, 15, 30, "#005500");

  pointjoin(c, acn, ctx, "#005500", 2);
  drawArrow(acn.xcoord, acn.ycoord, ctx, -th3, 15, 30, "white");

  pointjoin(c, act, ctx, "#0066FF", 2);
  drawArrow(act.xcoord, act.ycoord, ctx, arrct, 15, 30, "#0066FF");

  pointjoin(d, adcn, ctx, "#D00000", 2);
  drawArrow(adcn.xcoord, adcn.ycoord, ctx, th4, 15, 30, "#D00000");

  pointjoin(d, adct, ctx, "#005500", 2);
  drawArrow(adct.xcoord, adct.ycoord, ctx, arradct, 15, 30, "#005500");

  pointjoin(d, ads, ctx, "#005500", 2);
  drawArrow(ads.xcoord, ads.ycoord, ctx, arrd, 15, 30, "green");
  ctx.lineWidth = 1;
  ctx.font = "400 16px 'nunito', sans-serif";
  ctx.strokeStyle = "#000000";
  ctx.strokeText("Acceleration Diagram (Scale = 1:" + scalea + ")", 170, 350);
  ctx.restore();
  pointdisp(aan, ctx, 2, "blue", "white", "black", "12px", "12px");
  pointdisp(aes, ctx, 2, "blue", "white", "black", "12px", "12px");
  pointdisp(aec, ctx, 2, "blue", "white", "black", "12px", "12px");
  pointdisp(acn, ctx, 2, "blue", "white", "black", "12px", "12px");
  pointdisp(act, ctx, 2, "blue", "white", "black", "12px", "12px");
  pointdisp(adcn, ctx, 2, "blue", "white", "black", "12px", "12px");
  pointdisp(adct, ctx, 2, "blue", "white", "black", "12px", "12px");
  pointdisp(ads, ctx, 2, "blue", "white", "black", "12px", "12px");

  // document.getElementById("aan").style.position = 'absolute';
  // //document.getElementById("aat").style.position = 'absolute';
  // document.getElementById("aes").style.position = 'absolute';
  // document.getElementById("aec").style.position = 'absolute';
  // document.getElementById("acn").style.position = 'absolute';
  // document.getElementById("act").style.position = 'absolute';
  // document.getElementById("adcn").style.position = 'absolute';
  // document.getElementById("adct").style.position = 'absolute';
  // document.getElementById("ads").style.position = 'absolute';

  // document.getElementById("aan").style.margin = '0';
  // //document.getElementById("aat").style.margin = '0';
  // document.getElementById("aec").style.margin = '0';
  // document.getElementById("aes").style.margin = '0';
  // document.getElementById("acn").style.margin = '0';
  // document.getElementById("act").style.margin = '0';
  // document.getElementById("adcn").style.margin = '0';
  // document.getElementById("adct").style.margin = '0';
  // document.getElementById("ads").style.margin = '0';

  // document.getElementById("aan").style.width = '10px';
  // document.getElementById("aan").style.height = '10px';
  // document.getElementById("aes").style.width = '10px';
  // document.getElementById("aes").style.height = '10px';
  // document.getElementById("aec").style.width = '10px';
  // document.getElementById("aec").style.height = '10px';
  // document.getElementById("acn").style.width = '10px';
  // document.getElementById("acn").style.height = '10px';
  // document.getElementById("act").style.width = '10px';
  // document.getElementById("act").style.height = '10px';
  // document.getElementById("adcn").style.width = '10px';
  // document.getElementById("adcn").style.height = '10px';
  // document.getElementById("adct").style.width = '10px';
  // document.getElementById("adct").style.height = '10px';
  // document.getElementById("ads").style.width = '10px';
  // document.getElementById("ads").style.height = '10px';

  // document.getElementById("aan").style.fontSize = '10px';
  // document.getElementById("aes").style.fontSize = '10px';
  // document.getElementById("aec").style.fontSize = '10px';
  // document.getElementById("acn").style.fontSize = '10px';
  // document.getElementById("act").style.fontSize = '10px';
  // document.getElementById("adcn").style.fontSize = '10px';
  // document.getElementById("adct").style.fontSize = '10px';
  // document.getElementById("ads").style.fontSize = '10px';

  // document.getElementById("aan").style.left = ""+ aan.xcoord+"px";
  // document.getElementById("aan").style.top = ""+ aan.ycoord+80 +"px";
  // document.getElementById("aes").style.left = ""+(aes.xcoord)+"px";
  // document.getElementById("aes").style.top = ""+(aes.ycoord+80)+"px";
  // document.getElementById("aec").style.left = ""+(aec.xcoord)+"px";
  // document.getElementById("aec").style.top = ""+(aec.ycoord+80)+"px";
  // document.getElementById("acn").style.left = ""+(acn.xcoord)+"px";
  // document.getElementById("acn").style.top = ""+(acn.ycoord+80)+"px";
  // document.getElementById("act").style.left = ""+(act.xcoord)+"px";
  // document.getElementById("act").style.top = ""+(act.ycoord+80)+"px";
  // document.getElementById("adcn").style.left = ""+(adcn.xcoord)+"px";
  // document.getElementById("adcn").style.top = ""+(adcn.ycoord+80)+"px";
  // document.getElementById("adct").style.left = ""+(adct.xcoord)+"px";
  // document.getElementById("adct").style.top = ""+(adct.ycoord+80)+"px";
  // document.getElementById("ads").style.left = ""+(ads.xcoord)+"px";
  // document.getElementById("ads").style.top = ""+(ads.ycoord+80)+"px";
}

// prints comments passed as 'commenttext' in location specified by 'commentloc' in the comments box;
// 0 : Single comment box, 1 : Left comment box, 2 : Right comment box
function printcomment(commenttext, commentloc) {
  if (commentloc == 0) {
    document.getElementById("commentboxright").style.visibility = "hidden";
    // document.getElementById("commentboxleft").style.width = "570px";
    document.getElementById("commentboxleft").innerHTML = commenttext;
  } else if (commentloc == 1) {
    document.getElementById("commentboxright").style.visibility = "visible";
    // document.getElementById("commentboxleft").style.width = "285px";
    document.getElementById("commentboxleft").innerHTML = commenttext;
  } else if (commentloc == 2) {
    document.getElementById("commentboxright").style.visibility = "visible";
    // document.getElementById("commentboxleft").style.width = "285px";
    document.getElementById("commentboxright").innerHTML = commenttext;
  } else {
    document.getElementById("commentboxright").style.visibility = "hidden";
    // document.getElementById("commentboxleft").style.width = "570px";
    document.getElementById("commentboxleft").innerHTML =
      "<center>please report this issue to adityaraman@gmail.com</center>";
    // ignore use of deprecated tag <center> . Code is executed only if printcomment function receives inappropriate commentloc value
  }
}

function next() {
  currentFunction =
    currentFunction + 1 == functions.length ? 0 : currentFunction + 1;
  if (currentFunction == 1) {
    $("#next").hide();

    $("#prev").show();
  }
  document.getElementById("prev").src = "images/bluebkdulls.svg";
  functions[currentFunction]();
  count = count + 1;
  document.querySelector(".prevNext").textContent = "Prev";
}

function prev() {
  document.querySelector(".prevNext").textContent = "Next";
  currentFunction =
    currentFunction == 0 ? functions.length - 1 : currentFunction - 1;
  if (currentFunction == 0) {
    $("#prev").hide();

    $("#next").show();
  }
  document.getElementById("next").src = "images/bluebkwdulls.svg";
  functions[currentFunction]();
  count = count + 1;
}
function hideall() {
  //$('#position').hide();
  //$('#velocity').hide();
  //$('#acceleration').hide();
  $("#velocity-table").hide();
  $("#acceleration-table").hide();
  $("#vel-id").hide();
  $("#acc-id").hide();
}

function velocity(f) {
  state = "v";
  hideall();
  //initsize();
  //$('#velocity').show();
  //$('#position').show();
  $("#velocity-table").show();
  $("#acceleration-table").hide();
  $("#vel-id").show();
  $("#acc-id").hide();
  $("#aan").hide();
  $("#aes").hide();
  $("#aec").hide();
  $("#acn").hide();
  $("#act").hide();
  $("#adcn").hide();
  $("#adct").hide();
  $("#ads").hide();
  $("#va").show();
  $("#vae").show();
  $("#vc").show();
  $("#vd").show();
  $("#commentboxleft").show();

  //resize(document.getElementById("vel"), 350, 250);
  //vel.scale(1, -1);
  //alert(pos.sc);
  //precompute();
  //alert("I do reach here");
  //alert(pos.sc);

  //pos.sc=pos.sc*3;
  //pos.lineWidth = 5/pos.sc;
  //vel.sc = vel.sc;

  //refresh();
}

function acceleration(f) {
  state = "a";
  hideall();
  //initsize();
  //$('#position').show();
  //$('#velocity').show();
  //$('#acceleration').show();
  $("#acceleration-table").show();
  $("#velocity-table").hide();
  $("#vel-id").hide();
  $("#acc-id").show();
  $("#va").hide();
  $("#vae").hide();
  $("#vc").hide();
  $("#vd").hide();
  $("#aan").show();
  $("#aes").show();
  $("#aec").show();
  $("#acn").show();
  $("#act").show();
  $("#adcn").show();
  $("#adct").show();
  $("#ads").show();
  $("#commentboxleft").show();
  // initsize();
  //precompute();
  /*pos.sc = pos.sc*3;
      pos.lineWidth = 5/pos.sc;
      vel.sc = vel.sc*1.5;
      acc.sc = acc.sc;*/

  //  refresh();
}
function log() {
  document.getElementById("v1").innerHTML = v1.toFixed(2);
  document.getElementById("vs").innerHTML = vs.toFixed(2);
  document.getElementById("v2").innerHTML = v2.toFixed(2);
  document.getElementById("v23").innerHTML = v23.toFixed(2);
  document.getElementById("v3").innerHTML = v3.toFixed(2);
  document.getElementById("a1n").innerHTML = a1n.toFixed(2);
  document.getElementById("a1t").innerHTML = a1t.toFixed(2);
  document.getElementById("a2s").innerHTML = a2s.toFixed(2);
  document.getElementById("a2c").innerHTML = a2c.toFixed(2);
  document.getElementById("a3n").innerHTML = a3n.toFixed(2);
  document.getElementById("a3t").innerHTML = a3t.toFixed(2);
  document.getElementById("a34t").innerHTML = a34t.toFixed(2);
  document.getElementById("a34n").innerHTML = a34n.toFixed(2);
  document.getElementById("a4s").innerHTML = a4s.toFixed(2);
}
