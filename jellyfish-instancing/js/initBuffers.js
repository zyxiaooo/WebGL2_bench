var vertexPositionBuffer = {};
var vertexNormalBuffer = {};
var vertexColorBuffer = {};
var vertexTextureCoordBuffer = {};
var vertexIndexBuffer = {};
var skinWeightBuffer = {};
var bufJoint0 = {};
var bufJoint1 = {};
var bufJoint2 = {};
var bufJoint3 = {};
var bufJointInstance = {};
var bufTime = {};
var bufScale = {};
var bufferOK = {};
function initBuffers(){
  loadObject('jellyfish0','meshes/jellyfish0.json');
  loadObject('jellyfish1','meshes/jellyfish1.json');
  loadObject('jellyfish2','meshes/jellyfish2.json');
  loadObject('jellyfish3','meshes/jellyfish3.json');
}

function loadObject(name, file, number){

  bufJoint0[name]= gl.createBuffer();
  bufJoint1[name]= gl.createBuffer();
  bufJoint2[name]= gl.createBuffer();
  bufJoint3[name]= gl.createBuffer();
  bufJointInstance[name]= gl.createBuffer();
  bufTime[name]= gl.createBuffer();
  bufScale[name]= gl.createBuffer();
  var request = new XMLHttpRequest();
  request.open("GET", file);
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      initInstanceBuffer1(name, JSON.parse(request.responseText), number);
      bufferOK[name] = 1;
    }
  };
  request.send();
}

/*function initBuffer(name, data) {
  vertexPositionBuffer[name] = gl.createBuffer();
  vertexNormalBuffer[name] = gl.createBuffer();
  vertexColorBuffer[name] = gl.createBuffer();
  vertexTextureCoordBuffer[name] = gl.createBuffer();
  skinWeightBuffer[name] = gl.createBuffer();
  vertexIndexBuffer[name] = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer[name]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.vertexPositions), gl.STATIC_DRAW);
  vertexPositionBuffer[name].itemSize = 3;
  vertexPositionBuffer[name].numItems = data.vertexPositions.length/3;  

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer[name]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.vertexNormals), gl.STATIC_DRAW);
  vertexNormalBuffer[name].itemSize = 3;
  vertexNormalBuffer[name].numItems = data.vertexNormals.length/3;

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer[name]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.vertexColors), gl.STATIC_DRAW);
  vertexColorBuffer[name].itemSize = 3;
  vertexColorBuffer[name].numItems = data.vertexColors.length/3;

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer[name]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.vertexTextureCoords), gl.STATIC_DRAW);
  vertexTextureCoordBuffer[name].itemSize = 3;
  vertexTextureCoordBuffer[name].numItems = data.vertexTextureCoords.length/3;

  weightData = [];
  for(var i=0; i<data.vertexPositions.length; i=i+3){
    var ypos = -data.vertexPositions[i+1]/3;
    var w0 = Math.max(Math.min(-ypos+1,1),0);
    var w1 = Math.max(Math.min(ypos,-ypos+2),0);
    var w2 = Math.max(Math.min(ypos-1,-ypos+3),0);
    var w3 = Math.max(Math.min(ypos-2,1),0);
    weightData.push(w0);
    weightData.push(w1);
    weightData.push(w2);
    weightData.push(w3);
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, skinWeightBuffer[name]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(weightData), gl.STATIC_DRAW);
  skinWeightBuffer[name].itemSize = 4;
  //skinWeightBuffer[name].numItems = weightData.length/4;

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer[name]);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data.indices), gl.STREAM_DRAW);
  vertexIndexBuffer[name].itemSize = 1;
  vertexIndexBuffer[name].numItems = data.indices.length;

}

function drawBuffer(name){
  if(vertexPositionBuffer[name]){
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer[name]);
    gl.vertexAttribPointer(currentProgram.vertexPositionAttribute, vertexPositionBuffer[name].itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer[name]);
    gl.vertexAttribPointer(currentProgram.vertexNormalAttribute, vertexNormalBuffer[name].itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer[name]);
    gl.vertexAttribPointer(currentProgram.vertexColorAttribute, vertexColorBuffer[name].itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer[name]);
    gl.vertexAttribPointer(currentProgram.textureCoordAttribute, vertexTextureCoordBuffer[name].itemSize, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, skinWeightBuffer[name]);
    gl.vertexAttribPointer(currentProgram.skinWeightAttribute, skinWeightBuffer[name].itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer[name]);

    gl.drawElements(gl.TRIANGLES, vertexIndexBuffer[name].numItems, gl.UNSIGNED_SHORT, 0);
  }
}*/
function initInstanceBuffer1(name, jellyfishData, number){
  var instancePositionData=[];
  var instanceNormalData=[];
  var instanceColorData=[];
  var instanceTextureCoordData=[];
  var instanceWeightData=[];
  var instanceIndexData=[];
  instancePositionData = instancePositionData.concat(jellyfishData.vertexPositions);
	instanceNormalData = instanceNormalData.concat(jellyfishData.vertexNormals);
	instanceColorData = instanceColorData.concat(jellyfishData.vertexColors);
	instanceTextureCoordData = instanceTextureCoordData.concat(jellyfishData.vertexTextureCoords);
  var weightData = [];
  for(var i=0; i<jellyfishData.vertexPositions.length; i=i+3){
   	var ypos = -jellyfishData.vertexPositions[i+1]/3;
    var w0 = Math.max(Math.min(-ypos+1,1),0);
   	var w1 = Math.max(Math.min(ypos,-ypos+2),0);
    var w2 = Math.max(Math.min(ypos-1,-ypos+3),0);
    var w3 = Math.max(Math.min(ypos-2,1),0);
   	weightData.push(w0);
   	weightData.push(w1);
   	weightData.push(w2);
   	weightData.push(w3);
 	}
	instanceWeightData = instanceWeightData.concat(weightData);
	instanceIndexData = instanceIndexData.concat(jellyfishData.indices);

  vertexPositionBuffer[name] = gl.createBuffer();
  vertexNormalBuffer[name] = gl.createBuffer();
  vertexColorBuffer[name] = gl.createBuffer();
  vertexTextureCoordBuffer[name] = gl.createBuffer();
  skinWeightBuffer[name] = gl.createBuffer();
  vertexIndexBuffer[name] = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer[name]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(instancePositionData), gl.STATIC_DRAW);
  vertexPositionBuffer[name].itemSize = 3;
  vertexPositionBuffer[name].numItems = jellyfishData.vertexPositions.length/3;

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer[name]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(instanceNormalData), gl.STATIC_DRAW);
  vertexNormalBuffer[name].itemSize = 3;
  vertexNormalBuffer[name].numItems = jellyfishData.vertexNormals.length/3;

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer[name]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(instanceColorData), gl.STATIC_DRAW);
  vertexColorBuffer[name].itemSize = 3;
  vertexColorBuffer[name].numItems = jellyfishData.vertexColors.length/3;

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer[name]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(instanceTextureCoordData), gl.STATIC_DRAW);
  vertexTextureCoordBuffer[name].itemSize = 3;
  vertexTextureCoordBuffer[name].numItems = jellyfishData.vertexTextureCoords.length/3;

  gl.bindBuffer(gl.ARRAY_BUFFER, skinWeightBuffer[name]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(instanceWeightData), gl.STATIC_DRAW);
  skinWeightBuffer[name].itemSize = 4;
  //skinWeightBuffer[name].numItems = weightData.length/4;

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer[name]);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(instanceIndexData), gl.STREAM_DRAW);
  vertexIndexBuffer[name].itemSize = 1;
  vertexIndexBuffer[name].numItems = jellyfishData.indices.length;
  bufJoint0[name]= gl.createBuffer();
  bufJoint1[name]= gl.createBuffer();
  bufJoint2[name]= gl.createBuffer();
  bufJoint3[name]= gl.createBuffer();
  bufJointInstance[name]= gl.createBuffer();
  bufTime[name]= gl.createBuffer();
  bufScale[name]= gl.createBuffer();

}

function initInstanceBuffer2(name, number, instanceJoint0, instanceJoint1, instanceJoint2, instanceJoint3, instanceJoint, instanceTime, instanceScale)
{

  
  gl.bindBuffer(gl.ARRAY_BUFFER, bufJoint0[name]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(instanceJoint0), gl.STATIC_DRAW);
  bufJoint0[name].itemSize = 3;
  gl.bindBuffer(gl.ARRAY_BUFFER, bufJoint1[name]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(instanceJoint1), gl.STATIC_DRAW);
  bufJoint1[name].itemSize = 3;
  gl.bindBuffer(gl.ARRAY_BUFFER, bufJoint2[name]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(instanceJoint2), gl.STATIC_DRAW);
  bufJoint2[name].itemSize = 3;
  gl.bindBuffer(gl.ARRAY_BUFFER, bufJoint3[name]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(instanceJoint3), gl.STATIC_DRAW);
  bufJoint3[name].itemSize = 3;
  gl.bindBuffer(gl.ARRAY_BUFFER, bufJointInstance[name]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(instanceJoint), gl.STATIC_DRAW);
  bufJointInstance[name].itemSize = 3;
  gl.bindBuffer(gl.ARRAY_BUFFER, bufTime[name]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(instanceTime), gl.STATIC_DRAW);
  bufTime[name].itemSize = 1;
  gl.bindBuffer(gl.ARRAY_BUFFER, bufScale[name]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(instanceScale), gl.STATIC_DRAW);
  bufScale[name].itemSize = 1;
}

function drawInstanceBuffer(name, number)
{
  if(vertexPositionBuffer[name]){
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer[name]);
  gl.vertexAttribPointer(currentProgram.vertexPositionAttribute, vertexPositionBuffer[name].itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer[name]);
  gl.vertexAttribPointer(currentProgram.vertexNormalAttribute, vertexNormalBuffer[name].itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer[name]);
  gl.vertexAttribPointer(currentProgram.vertexColorAttribute, vertexColorBuffer[name].itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer[name]);
  gl.vertexAttribPointer(currentProgram.textureCoordAttribute, vertexTextureCoordBuffer[name].itemSize, gl.FLOAT, false, 0, 0);
    
  gl.bindBuffer(gl.ARRAY_BUFFER, skinWeightBuffer[name]);
  gl.vertexAttribPointer(currentProgram.skinWeightAttribute, skinWeightBuffer[name].itemSize, gl.FLOAT, false, 0, 0);
    
  gl.bindBuffer(gl.ARRAY_BUFFER, bufJoint0[name]);
  gl.vertexAttribPointer(currentProgram.joint0Pos, bufJoint0[name].itemSize, gl.FLOAT, false, 0, 0);
  gl.vertexAttribDivisor(currentProgram.joint0Pos, 1);
  gl.bindBuffer(gl.ARRAY_BUFFER, bufJoint1[name]);
  gl.vertexAttribPointer(currentProgram.joint1Pos, bufJoint1[name].itemSize, gl.FLOAT, false, 0, 0);
  gl.vertexAttribDivisor(currentProgram.joint1Pos, 1);
  gl.bindBuffer(gl.ARRAY_BUFFER, bufJoint2[name]);
  gl.vertexAttribPointer(currentProgram.joint2Pos, bufJoint2[name].itemSize, gl.FLOAT, false, 0, 0);
  gl.vertexAttribDivisor(currentProgram.joint2Pos, 1);
  gl.bindBuffer(gl.ARRAY_BUFFER, bufJoint3[name]);
  gl.vertexAttribPointer(currentProgram.joint3Pos, bufJoint3[name].itemSize, gl.FLOAT, false, 0, 0);
  gl.vertexAttribDivisor(currentProgram.joint3Pos, 1);
  gl.bindBuffer(gl.ARRAY_BUFFER, bufJointInstance[name]);
  gl.vertexAttribPointer(currentProgram.instancePos, bufJointInstance[name].itemSize, gl.FLOAT, false, 0, 0);
  gl.vertexAttribDivisor(currentProgram.instancePos, 1);

  gl.bindBuffer(gl.ARRAY_BUFFER, bufTime[name]);
  gl.vertexAttribPointer(currentProgram.currentJellyfishTime, bufTime[name].itemSize, gl.FLOAT, false, 0, 0);
  gl.vertexAttribDivisor(currentProgram.currentJellyfishTime, 1);
  gl.bindBuffer(gl.ARRAY_BUFFER, bufScale[name]);
  gl.vertexAttribPointer(currentProgram.fishScale, bufScale[name].itemSize, gl.FLOAT, false, 0, 0);
  gl.vertexAttribDivisor(currentProgram.fishScale, 1);


  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer[name]);

  gl.drawElementsInstanced(gl.TRIANGLES, vertexIndexBuffer[name].numItems, gl.UNSIGNED_SHORT, 0, number);
  }
}


