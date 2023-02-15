import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as BABYLON from 'babylonjs';

type shape =  |'box'|'cylinder';
type unit = 'מטר' | 'סנטימטר';
type components = 'height'|'length'|'depth';

interface IShapesComponents{
   height:number,
   depth:number,
   width:number,
   radius:number,
  }

class C3DScene{
  shapesComponents = {
    height:1,
    depth:1,
    width:1,
    radius:1
  }
  canvasDOM: HTMLCanvasElement;
  engine3D:BABYLON.Engine;
  scene:BABYLON.Scene;
  camera:BABYLON.FreeCamera;
  cameraVector ;
  light:BABYLON.HemisphericLight;
  shapeType:shape;
  shapeObject:BABYLON.Mesh;
  isChanged:boolean = false;
  constructor(shape:shape,canvasDOM:HTMLCanvasElement){
    this.shapeType = shape;
    this._initScene(canvasDOM);
    this._initCamera();
    this._initLight();
    this._initGround();
    this._initBuildings()
    this.shapeObject = BABYLON.Mesh.CreateBox("box", 
      1, this.scene,true);
    
    // Watch for browser/canvas resize events
    window.addEventListener("resize",  ()=> {
        this.engine3D.resize();
     });
    this.engine3D.runRenderLoop(()=> {
        
        if(this.isChanged){    
          let sc = this.shapesComponents;
          this.scene.meshes.pop();
          this.shapeObject = BABYLON.MeshBuilder.CreateBox ("box", 
            {width:sc.width,height:sc.height,depth:sc.depth}, this.scene);
          this.shapeObject.position = new BABYLON.Vector3(0 - (sc.depth/2),0,1)
         this.camera.position = new BABYLON.Vector3(0,sc.height * 1.4 + 1
            ,Math.max(sc.width *1.2,sc.depth*1.2 ) +1);
         this.camera.setTarget(this.shapeObject.position);
         this.isChanged = false;
        }
        this.scene.render();
      });
    }

    setComponents({height = null,width = null,depth = null,radius = null} ={}){
      let sc = this.shapesComponents;
      console.log(height)
      sc.height = 1,sc.width = 1,sc.depth = 1;
          if(height ){
            if(sc.height !== height){
                this.isChanged = true;
            }
            sc.height = height;
          }
          if(depth){
            if(sc.width !== width){
                this.isChanged = true;
            }
            sc.width = depth;
          }
          if(width){
            if(sc.depth !== depth){
                this.isChanged = true;
            }
            sc.depth = width;
          }
          console.log(sc)
          
    }

    private _initScene(canvasDOM:HTMLCanvasElement){
      this.canvasDOM = canvasDOM;
      this.engine3D = new BABYLON.Engine(this.canvasDOM, true); // Generate the BABYLON 3D engine
      this.scene = new BABYLON.Scene(this.engine3D);
    }
    private _initCamera(){
      let sc = this.shapesComponents;
      let vector = new BABYLON.Vector3(sc.width *1.5 ,sc.height *3 ,sc.depth *1.5 ) //x,y,z
      this.camera = new BABYLON.FreeCamera("Camera", vector, this.scene);
      this.camera.setTarget(BABYLON.Vector3.Zero());
      this.camera.attachControl(this.canvasDOM, true);
    }
    private _initLight(){
      this.light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
      this.light.intensity = 0.7;
    } 
    private _initGround(){
      let gMaterial = new BABYLON.StandardMaterial("gMaterial", this.scene);
      let texture = gMaterial.diffuseTexture = new BABYLON.Texture("/assets/images/grass.jpg", this.scene);
      texture.uScale =350;
      texture.vScale = 350;
      let ground = BABYLON.MeshBuilder.CreateGround("ground",{height:1000,width:1000},this.scene);
      ground.material = gMaterial;
      
    }
    private _initBuildings(){
      let mMaterial = new BABYLON.StandardMaterial("mMaterial", this.scene);
      let texture = mMaterial.diffuseTexture = new BABYLON.Texture("/assets/images/buildings.jpg", this.scene);
      texture.uScale = 10;
      texture.vScale = 10;
      let builder = BABYLON.MeshBuilder.CreateBox ("building1", 
         {width:10,height:20,depth:10}, this.scene)
         builder.position = new BABYLON.Vector3(0,0,-30);
         builder.material = mMaterial;
      builder = BABYLON.MeshBuilder.CreateBox ("building2", 
         {width:10,height:20,depth:10}, this.scene)
         builder.position = new BABYLON.Vector3(30,0,-30);
         builder.material = mMaterial;
      builder = BABYLON.MeshBuilder.CreateBox ("building3", 
         {width:10,height:20,depth:10}, this.scene)
         builder.position = new BABYLON.Vector3(-30,0,-30);
         builder.material = mMaterial;
         /*
         BABYLON.MeshBuilder.CreateBox ("building3", 
         {width:10,height:100,depth:10}, this.scene).position = new BABYLON.Vector3(-20,0,20);
         BABYLON.MeshBuilder.CreateBox ("building4", 
         {width:10,height:100,depth:10}, this.scene).position = new BABYLON.Vector3(20,0,-20);
         BABYLON.MeshBuilder.CreateBox ("building5", 
         {width:10,height:100,depth:10}, this.scene).position = new BABYLON.Vector3(20,0,0);
         BABYLON.MeshBuilder.CreateBox ("building6", 
         {width:10,height:100,depth:10}, this.scene).position = new BABYLON.Vector3(20,0,20);
         BABYLON.MeshBuilder.CreateBox ("building7", 
         {width:10,height:100,depth:10}, this.scene).position = new BABYLON.Vector3(-20,0,-20);
         BABYLON.MeshBuilder.CreateBox ("building8", 
         {width:10,height:100,depth:10}, this.scene).position = new BABYLON.Vector3(-20,0,0);
         BABYLON.MeshBuilder.CreateBox ("building9", 
         {width:10,height:100,depth:10}, this.scene).position = new BABYLON.Vector3(-20,0,20);
         BABYLON.MeshBuilder.CreateBox ("building10", 
         {width:10,height:100,depth:10}, this.scene).position = new BABYLON.Vector3(20,0,-20);
         BABYLON.MeshBuilder.CreateBox ("building11", 
         {width:10,height:100,depth:10}, this.scene).position = new BABYLON.Vector3(0,0,-20);
         BABYLON.MeshBuilder.CreateBox ("building12", 
        {width:10,height:100,depth:10}, this.scene).position = new BABYLON.Vector3(-20,0,-20);*/
    }
    
}
@Component({
  selector: 'app-concrete-calculator',
  templateUrl: './concrete-calculator.component.html',
  styleUrls: ['./concrete-calculator.component.css']
})
export class ConcreteCalculatorComponent implements OnInit {

  constructor() {} 
  currentShape:shape = 'box';
  boxFormData:FormGroup;
  c3Dscene:C3DScene;
  result:number = 0;
  ngOnInit() {
   this.initBoxFormData();
   
  }

  ngAfterViewInit(){
    this.init3DScene();
  }
  initBoxFormData(){
      this.boxFormData = new FormGroup({
        height:new FormControl(),
        heightUnit:new FormControl('סנטימטר'),
        width:new FormControl(),
        widthUnit:new FormControl('סנטימטר'),
        length:new FormControl(),
        lengthUnit:new FormControl('סנטימטר'),
     })
     setInterval(()=>{
      console.log(this.boxFormData)
     },2000)
    
   }

  getResult():number{
    let v = this.boxFormData.value;
    return    parseFloat(
                  (v.height * this.getUnitInDecimal(v.heightUnit) 
                            *  v.length * this.getUnitInDecimal(v.lengthUnit)
                            *  v.width  * this.getUnitInDecimal(v.widthUnit)
                    ).toFixed(2));
  } 

  getUnitInDecimal(unit:unit):number{
     switch(unit){
       case 'מטר':{return 1};break;
       case 'סנטימטר':{return 0.01};break;
     }
  }

  init3DScene(){
    let canvas = <HTMLCanvasElement> document.getElementById("renderCanvas"); 
    this.c3Dscene = new C3DScene('box',canvas);

      }

  onChangeComponent(){
    let v = this.boxFormData.value;
    this.c3Dscene.setComponents({
      height:parseFloat(v.height) * this.getUnitInDecimal(v.heightUnit) || 0,
      width:parseFloat(v.width) * this.getUnitInDecimal(v.widthUnit)|| 0,
      depth:parseFloat(v.length) * this.getUnitInDecimal(v.lengthUnit)|| 0})
  }

  getBoxVector(){

  }

  controlScene(){
    if(this.boxFormData.dirty){
     //this.shape3D.scaling = new BABYLON.Vector3(

      //)
    }
   }

  removeShape(){

  };
  resetShape(){};

}